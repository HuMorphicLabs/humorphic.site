@echo off
title Humorphic Lab - Backend API Server
echo ========================================================
echo Starting Humorphic Lab Backend (Django REST Framework)
echo Local URL:     http://localhost:8000/
echo Network URL:   http://0.0.0.0:8000/
echo Health Check:  http://localhost:8000/api/v1/health/
echo Swagger UI:    http://localhost:8000/api/docs/
echo ========================================================
cd /d "%~dp0backend"
python manage.py runserver 0.0.0.0:8000
pause
