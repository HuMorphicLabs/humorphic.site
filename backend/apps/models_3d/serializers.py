from rest_framework import serializers
from .models import Category, Model3D
from .validators import validate_3d_file

class CategorySerializer(serializers.ModelSerializer):
    models_count = serializers.IntegerField(source='models.count', read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description', 'icon_name', 'models_count', 'created_at')

class Model3DSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)
    uploaded_by_username = serializers.CharField(source='uploaded_by.username', read_only=True)
    file_size_formatted = serializers.SerializerMethodField()

    class Meta:
        model = Model3D
        fields = (
            'id',
            'name',
            'slug',
            'description',
            'category',
            'category_id',
            'model_file',
            'thumbnail',
            'file_size',
            'file_size_formatted',
            'polygon_count',
            'format',
            'is_active',
            'is_featured',
            'uploaded_by_username',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('id', 'slug', 'file_size', 'format', 'created_at', 'updated_at')

    def get_file_size_formatted(self, obj) -> str:
        if obj.file_size < 1024 * 1024:
            return f"{round(obj.file_size / 1024, 1)} KB"
        return f"{round(obj.file_size / (1024 * 1024), 2)} MB"

class Model3DCreateSerializer(serializers.ModelSerializer):
    model_file = serializers.FileField(validators=[validate_3d_file])

    class Meta:
        model = Model3D
        fields = (
            'name',
            'description',
            'category',
            'model_file',
            'thumbnail',
            'polygon_count',
            'is_featured',
        )

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['uploaded_by'] = user
        return super().create(validated_data)
