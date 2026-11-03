from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Model3DViewSet, CategoryViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('', Model3DViewSet, basename='model-3d')

urlpatterns = [
    path('', include(router.urls)),
]
