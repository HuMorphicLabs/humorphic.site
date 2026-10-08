from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoboticsProductViewSet

router = DefaultRouter()
router.register('', RoboticsProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
]
