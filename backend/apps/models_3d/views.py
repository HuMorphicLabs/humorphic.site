from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from .models import Category, Model3D
from .serializers import (
    CategorySerializer,
    Model3DSerializer,
    Model3DCreateSerializer,
)
from .permissions import IsUploaderOrReadOnly
from .services import Model3DService

@extend_schema(tags=['3D Models'])
class Model3DViewSet(viewsets.ModelViewSet):
    """
    CRUD ViewSet for 3D interactive models with file upload, filtering, and search.
    """
    queryset = Model3D.objects.filter(is_active=True).select_related('category', 'uploaded_by')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsUploaderOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'category__name']
    ordering_fields = ['created_at', 'name', 'file_size', 'polygon_count']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return Model3DCreateSerializer
        return Model3DSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category')
        format_type = self.request.query_params.get('format')
        featured = self.request.query_params.get('featured')
        featured_bool = featured.lower() in ['true', '1'] if featured else False

        return Model3DService.get_queryset(
            user=self.request.user,
            category_slug=category,
            format_type=format_type,
            featured_only=featured_bool,
        )

    def perform_destroy(self, instance):
        Model3DService.delete_model_with_files(instance)

    @extend_schema(
        summary="List User Uploaded Models",
        description="Returns all 3D models uploaded by the authenticated user."
    )
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_models(self, request):
        user_models = Model3D.objects.filter(uploaded_by=request.user).select_related('category', 'uploaded_by').order_by('-created_at')
        page = self.paginate_queryset(user_models)
        if page is not None:
            serializer = Model3DSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = Model3DSerializer(user_models, many=True, context={'request': request})
        return Response(serializer.data)

@extend_schema(tags=['Categories'])
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint for browsing 3D model categories.
    """
    queryset = Category.objects.all().prefetch_related('models')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
