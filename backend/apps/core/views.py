from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from drf_spectacular.utils import extend_schema
from django.db import connection

class HealthCheckView(APIView):
    """
    Health check endpoint for Docker container probes and load balancers.
    """
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Service Health Check",
        description="Returns service availability status along with database ping check.",
        responses={200: dict}
    )
    def get(self, request, *args, **kwargs):
        db_healthy = True
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
        except Exception:
            db_healthy = False

        data = {
            "status": "ok" if db_healthy else "degraded",
            "database": "connected" if db_healthy else "unreachable",
            "service": "humorphic-api-v1"
        }
        return Response(data, status=status.HTTP_200_OK if db_healthy else status.HTTP_503_SERVICE_UNAVAILABLE)
