@echo off
title Humorphic Lab - Frontend Web Client
echo ========================================================
echo Humorphic Lab Frontend (Next.js 15 + Three.js)
echo Local URL:     http://localhost:3000/
echo Network URL:   http://172.17.6.162:3000/
echo ========================================================
echo.
echo Checking for production build...
cd /d "%~dp0frontend"

IF NOT EXIST ".next\BUILD_ID" (
    echo.
    echo [BUILD REQUIRED] No production build found.
    echo Running: next build  -- this may take 2-4 minutes...
    echo.
    set NEXT_TELEMETRY_DISABLED=1
    node_modules\.bin\next.cmd build
    echo.
    echo Build complete!
    echo.
)

echo Starting production server...
set NEXT_TELEMETRY_DISABLED=1
node_modules\.bin\next.cmd start -H 0.0.0.0 -p 3000
pause
