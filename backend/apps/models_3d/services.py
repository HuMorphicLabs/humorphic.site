import os
from django.db.models import QuerySet
from .models import Model3D, Category

class Model3DService:
    @staticmethod
    def get_queryset(user=None, category_slug: str = None, format_type: str = None, featured_only: bool = False) -> QuerySet:
        qs = Model3D.objects.filter(is_active=True).select_related('category', 'uploaded_by')

        if category_slug:
            qs = qs.filter(category__slug=category_slug)

        if format_type:
            qs = qs.filter(format=format_type.lower())

        if featured_only:
            qs = qs.filter(is_featured=True)

        return qs.order_by('-created_at')

    @staticmethod
    def delete_model_with_files(instance: Model3D) -> None:
        if instance.model_file and os.path.isfile(instance.model_file.path):
            try:
                os.remove(instance.model_file.path)
            except OSError:
                pass

        if instance.thumbnail and os.path.isfile(instance.thumbnail.path):
            try:
                os.remove(instance.thumbnail.path)
            except OSError:
                pass

        instance.delete()
