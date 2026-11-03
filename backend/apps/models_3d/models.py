import uuid
import os
from django.db import models
from django.conf import settings
from django.utils.text import slugify
from .validators import validate_3d_file

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, db_index=True)
    description = models.TextField(blank=True, default='')
    icon_name = models.CharField(max_length=50, blank=True, default='Box')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Model3D(models.Model):
    FORMAT_CHOICES = (
        ('glb', 'Binary glTF (.glb)'),
        ('gltf', 'glTF JSON (.gltf)'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=180, db_index=True)
    slug = models.SlugField(max_length=200, unique=True, db_index=True)
    description = models.TextField(blank=True, default='')
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='models'
    )
    model_file = models.FileField(
        upload_to='models_3d/%Y/%m/',
        validators=[validate_3d_file]
    )
    thumbnail = models.ImageField(
        upload_to='thumbnails/%Y/%m/',
        blank=True,
        null=True
    )
    file_size = models.BigIntegerField(default=0, help_text="File size in bytes")
    polygon_count = models.PositiveIntegerField(default=0)
    format = models.CharField(max_length=10, choices=FORMAT_CHOICES, default='glb')
    is_active = models.BooleanField(default=True, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='uploaded_models'
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['category', 'is_active']),
            models.Index(fields=['is_featured', 'is_active']),
            models.Index(fields=['-created_at']),
        ]

    def __str__(self):
        return f"{self.name} ({self.format.upper()})"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Model3D.objects.filter(slug=slug).exclude(id=self.id).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug

        if self.model_file:
            # Auto-populate file_size
            try:
                self.file_size = self.model_file.size
            except Exception:
                pass

            # Auto-detect format from extension
            ext = os.path.splitext(self.model_file.name)[1].lower().replace('.', '')
            if ext in ['glb', 'gltf']:
                self.format = ext

        super().save(*args, **kwargs)
