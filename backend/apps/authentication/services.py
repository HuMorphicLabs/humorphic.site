from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from apps.users.models import User

class AuthService:
    @staticmethod
    def generate_tokens_for_user(user: User) -> dict:
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    @classmethod
    def register_user(cls, validated_data: dict) -> tuple[User, dict]:
        password = validated_data.pop('password')
        validate_password(password)

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        tokens = cls.generate_tokens_for_user(user)
        return user, tokens

    @classmethod
    def authenticate_user(cls, username: str, password: str) -> tuple[User, dict]:
        # Support login with either username or email
        user = None
        if '@' in username:
            try:
                user_obj = User.objects.get(email__iexact=username)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                user = None
        else:
            user = authenticate(username=username, password=password)

        if not user:
            raise AuthenticationFailed('Invalid credentials provided. Please check your username/email and password.')

        if not user.is_active:
            raise AuthenticationFailed('This user account is inactive or disabled.')

        tokens = cls.generate_tokens_for_user(user)
        return user, tokens

    @staticmethod
    def blacklist_refresh_token(refresh_token_str: str) -> None:
        try:
            token = RefreshToken(refresh_token_str)
            token.blacklist()
        except Exception as e:
            raise ValidationError(f'Invalid or expired refresh token: {str(e)}')
