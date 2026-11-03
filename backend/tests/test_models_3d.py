import io
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APIClient
from apps.users.models import User
from apps.models_3d.models import Category, Model3D

class Model3DTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='mech_designer',
            email='mech@humorphic.lab',
            password='TestPassword123!',
            role='designer'
        )
        self.other_user = User.objects.create_user(
            username='other_user',
            email='other@humorphic.lab',
            password='TestPassword123!'
        )

        self.category = Category.objects.create(
            name='Humanoid Anatomy',
            slug='humanoid-anatomy',
            description='Biomorphic humanoid components'
        )

        # Create valid dummy GLB binary data (header b'glTF' + version 2 + length 12)
        glb_header = b'glTF' + (2).to_bytes(4, byteorder='little') + (12).to_bytes(4, byteorder='little')
        self.valid_glb_file = SimpleUploadedFile(
            "robot_arm.glb",
            glb_header,
            content_type="model/gltf-binary"
        )

        self.model_instance = Model3D.objects.create(
            name='Kinematic Robotic Arm',
            slug='kinematic-robotic-arm',
            description='7-DOF Articulated robotic manipulator',
            category=self.category,
            model_file=self.valid_glb_file,
            uploaded_by=self.user,
            polygon_count=18500,
            is_featured=True
        )

    def test_list_models_unauthenticated(self):
        response = self.client.get('/api/v1/3d-models/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Kinematic Robotic Arm')

    def test_filter_models_by_category(self):
        response = self.client.get('/api/v1/3d-models/?category=humanoid-anatomy')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

        empty_response = self.client.get('/api/v1/3d-models/?category=non-existent-cat')
        self.assertEqual(empty_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(empty_response.data['results']), 0)

    def test_upload_model_requires_auth(self):
        new_glb = SimpleUploadedFile("torso.glb", b'glTF' + b'\x00' * 8, content_type="model/gltf-binary")
        response = self.client.post('/api/v1/3d-models/', {
            'name': 'Torso Hub',
            'model_file': new_glb,
        }, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_upload_invalid_file_extension_rejected(self):
        self.client.force_authenticate(user=self.user)
        invalid_file = SimpleUploadedFile("model.exe", b'malicious content', content_type="application/octet-stream")
        response = self.client.post('/api/v1/3d-models/', {
            'name': 'Malicious Asset',
            'model_file': invalid_file,
        }, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_permission_restricted_to_uploader(self):
        # Other user cannot modify
        self.client.force_authenticate(user=self.other_user)
        patch_response = self.client.patch(
            f'/api/v1/3d-models/{self.model_instance.id}/',
            {'name': 'Hacked Name'},
            format='json'
        )
        self.assertEqual(patch_response.status_code, status.HTTP_403_FORBIDDEN)

        # Original uploader can modify
        self.client.force_authenticate(user=self.user)
        owner_patch = self.client.patch(
            f'/api/v1/3d-models/{self.model_instance.id}/',
            {'name': 'Updated Arm Name'},
            format='json'
        )
        self.assertEqual(owner_patch.status_code, status.HTTP_200_OK)
        self.assertEqual(owner_patch.data['name'], 'Updated Arm Name')
