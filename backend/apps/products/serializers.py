from rest_framework import serializers
from .models import RoboticsProduct

class RoboticsProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoboticsProduct
        fields = (
            'id',
            'name',
            'slug',
            'sku',
            'description',
            'price',
            'stock',
            'category_name',
            'specs',
            'image',
            'is_available',
            'created_at',
        )
        read_only_fields = ('id', 'slug', 'created_at')
