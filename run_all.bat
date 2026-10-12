@echo off
title Humorphic Lab - Full Stack Launcher
echo =========================================================================
echo Launching Humorphic Lab 3D Cybernetics Platform
echo.
echo Local Machine URLs:
echo   Frontend:    http://localhost:3000/
echo   Backend API: http://localhost:8000/api/v1/health/
echo   Swagger UI:  http://localhost:8000/api/docs/
echo.
echo Ethernet / LAN Access URLs (from other devices on network):
echo   Frontend:    http://172.17.6.162:3000/
echo   Backend API: http://172.17.6.162:8000/api/v1/health/
echo =========================================================================
echo.
echo NOTE: Frontend uses production mode (next start).
echo       First run will auto-build if needed (2-4 min).
echo       After that, the site loads instantly.
echo =========================================================================

start "Humorphic Backend Server" cmd.exe /k "%~dp0run_backend.bat"
start "Humorphic Frontend Server" cmd.exe /k "%~dp0run_frontend.bat"

echo.
echo Both servers have been launched in separate windows!
echo Press any key to exit this launcher window...
pause >nul
