from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'organization', 'is_staff', 'is_active', 'created_at')
    list_filter = ('role', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'organization')
    ordering = ('-created_at',)
    fieldsets = UserAdmin.fieldsets + (
        ('Cybernetics Profile', {'fields': ('role', 'bio', 'organization', 'avatar')}),
    )
