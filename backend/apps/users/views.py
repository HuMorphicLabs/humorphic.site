from rest_framework import viewsets, permissions, filters
from drf_spectacular.utils import extend_schema
from .models import User
from .serializers import UserSerializer, UserUpdateSerializer
from .permissions import IsSelfOrAdmin

@extend_schema(tags=['Users'])
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsSelfOrAdmin]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name', 'organization']
    ordering_fields = ['created_at', 'username']

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return UserUpdateSerializer
        return UserSerializer
