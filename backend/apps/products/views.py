from rest_framework import viewsets, permissions, filters
from drf_spectacular.utils import extend_schema
from .models import RoboticsProduct
from .serializers import RoboticsProductSerializer

@extend_schema(tags=['Products & Hardware'])
class RoboticsProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only catalog for Humorphic Lab modular hardware, actuators, and sensor kits.
    """
    queryset = RoboticsProduct.objects.filter(is_available=True)
    serializer_class = RoboticsProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'sku', 'category_name']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']
