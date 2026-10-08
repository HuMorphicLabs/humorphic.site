from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from apps.products.models import RoboticsProduct

class RoboticsProductTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product = RoboticsProduct.objects.create(
            name='Harmonic Strain Wave Servo 180Nm',
            sku='ACT-180-HAR',
            description='Brushless zero-backlash actuator with optical encoder',
            price=1250.00,
            stock=15,
            category_name='Actuators',
            specs={'torque': '180 Nm', 'voltage': '48V', 'ratio': '100:1'}
        )

    def test_list_products(self):
        response = self.client.get('/api/v1/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['sku'], 'ACT-180-HAR')

    def test_search_products(self):
        response = self.client.get('/api/v1/products/?search=180Nm')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

        empty_resp = self.client.get('/api/v1/products/?search=Unobtainable')
        self.assertEqual(empty_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(empty_resp.data['results']), 0)
