from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

# Database: SQLite for local standalone development, or PostgreSQL if explicitly configured
if env.bool('USE_SQLITE', default=True) or not env('DATABASE_URL', default=''):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    DATABASES = {
        'default': env.db('DATABASE_URL')
    }

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Disable WhiteNoise manifest caching in development for instant asset reload
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
