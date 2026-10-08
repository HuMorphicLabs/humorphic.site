from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from apps.users.models import User

class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = '/api/v1/auth/register/'
        self.login_url = '/api/v1/auth/login/'
        self.me_url = '/api/v1/auth/me/'
        self.logout_url = '/api/v1/auth/logout/'
        self.refresh_url = '/api/v1/auth/refresh/'

        self.user_data = {
            'username': 'cybernaut',
            'email': 'cybernaut@humorphic.lab',
            'password': 'SecureRoboPass123!',
            'password_confirm': 'SecureRoboPass123!',
            'first_name': 'Alex',
            'last_name': 'Vance',
            'role': 'engineer'
        }

    def test_user_registration_success(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['username'], 'cybernaut')
        self.assertEqual(response.data['user']['email'], 'cybernaut@humorphic.lab')

    def test_registration_password_mismatch(self):
        bad_data = self.user_data.copy()
        bad_data['password_confirm'] = 'DifferentPassword123!'
        response = self.client.post(self.register_url, bad_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_login_success(self):
        # Create user first
        self.client.post(self.register_url, self.user_data, format='json')

        login_data = {
            'username': 'cybernaut',
            'password': 'SecureRoboPass123!'
        }
        response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_protected_me_endpoint(self):
        reg_response = self.client.post(self.register_url, self.user_data, format='json')
        token = reg_response.data['access']

        # Unauthenticated request should fail
        unauth_resp = self.client.get(self.me_url)
        self.assertEqual(unauth_resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Authenticated request should succeed
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        auth_resp = self.client.get(self.me_url)
        self.assertEqual(auth_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(auth_resp.data['username'], 'cybernaut')

    def test_logout_blacklists_token(self):
        reg_response = self.client.post(self.register_url, self.user_data, format='json')
        access_token = reg_response.data['access']
        refresh_token = reg_response.data['refresh']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        logout_resp = self.client.post(self.logout_url, {'refresh': refresh_token}, format='json')
        self.assertEqual(logout_resp.status_code, status.HTTP_200_OK)

        # Attempting to refresh with the blacklisted token should fail
        refresh_resp = self.client.post(self.refresh_url, {'refresh': refresh_token}, format='json')
        self.assertEqual(refresh_resp.status_code, status.HTTP_401_UNAUTHORIZED)
