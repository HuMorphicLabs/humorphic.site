from rest_framework import permissions

class IsUploaderOrReadOnly(permissions.BasePermission):
    """
    Allow read-only requests for any user,
    while restricting write operations to the original uploader or administrators.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.uploaded_by == request.user or request.user.is_staff
