from django.contrib import admin
from .models import RoboticsProduct

@admin.register(RoboticsProduct)
class RoboticsProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sku', 'price', 'stock', 'category_name', 'is_available', 'created_at')
    list_filter = ('category_name', 'is_available', 'created_at')
    search_fields = ('name', 'sku', 'description')
    prepopulated_fields = {'slug': ('name',)}
