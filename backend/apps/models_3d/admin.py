from django.contrib import admin
from .models import Category, Model3D

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon_name', 'created_at')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')

@admin.register(Model3D)
class Model3DAdmin(admin.ModelAdmin):
    list_display = ('name', 'format', 'category', 'file_size', 'polygon_count', 'is_featured', 'is_active', 'uploaded_by', 'created_at')
    list_filter = ('format', 'category', 'is_featured', 'is_active', 'created_at')
    search_fields = ('name', 'description', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('file_size', 'created_at', 'updated_at')
