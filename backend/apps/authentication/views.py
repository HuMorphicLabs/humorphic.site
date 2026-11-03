from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.views import TokenRefreshView
from drf_spectacular.utils import extend_schema, OpenApiResponse
from apps.users.serializers import UserSerializer
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    LogoutSerializer,
    AuthResponseSerializer,
)
from .services import AuthService

@extend_schema(tags=['Authentication'])
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="Register New User",
        request=RegisterSerializer,
        responses={
            201: AuthResponseSerializer,
            400: OpenApiResponse(description="Validation error")
        }
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        validated_data.pop('password_confirm', None)

        user, tokens = AuthService.register_user(validated_data)
        user_data = UserSerializer(user).data

        return Response({
            'status': 'success',
            'user': user_data,
            'access': tokens['access'],
            'refresh': tokens['refresh']
        }, status=status.HTTP_201_CREATED)

@extend_schema(tags=['Authentication'])
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="Login with Credentials",
        request=LoginSerializer,
        responses={
            200: AuthResponseSerializer,
            401: OpenApiResponse(description="Invalid credentials")
        }
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user, tokens = AuthService.authenticate_user(username, password)
        user_data = UserSerializer(user).data

        return Response({
            'status': 'success',
            'user': user_data,
            'access': tokens['access'],
            'refresh': tokens['refresh']
        }, status=status.HTTP_200_OK)

@extend_schema(tags=['Authentication'])
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="Logout & Blacklist Refresh Token",
        request=LogoutSerializer,
        responses={200: dict}
    )
    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        refresh_token = serializer.validated_data['refresh']

        AuthService.blacklist_refresh_token(refresh_token)

        return Response({
            'status': 'success',
            'message': 'Successfully logged out and revoked refresh token.'
        }, status=status.HTTP_200_OK)

@extend_schema(tags=['Authentication'])
class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="Get Current User Profile",
        responses={200: UserSerializer}
    )
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
