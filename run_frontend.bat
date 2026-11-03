@echo off
title Humorphic Lab - Frontend Web Client
echo ========================================================
echo Humorphic Lab Frontend (Next.js 15 + Three.js)
echo Local URL:     http://localhost:3000/
echo Network URL:   http://0.0.0.0:3000/
echo ========================================================
echo.
cd /d "%~dp0frontend"

IF NOT EXIST "node_modules" (
    echo.
    echo [INSTALLING DEPENDENCIES] node_modules not found.
    echo Running npm install...
    echo.
    call npm install
    IF ERRORLEVEL 1 (
        echo [ERROR] npm install failed. Please ensure Node.js is installed.
        pause
        exit /b 1
    )
)

IF NOT EXIST ".next\BUILD_ID" (
    echo.
    echo [BUILD REQUIRED] No production build found.
    echo Running: npm run build  -- this may take 1-2 minutes...
    echo.
    set NEXT_TELEMETRY_DISABLED=1
    call npm run build
    IF ERRORLEVEL 1 (
        echo [ERROR] Build failed. Falling back to development server...
        call npm run dev -- -p 3000
        pause
        exit /b 1
    )
    echo.
    echo Build complete!
    echo.
)

echo Starting production server on http://localhost:3000 ...
set NEXT_TELEMETRY_DISABLED=1
call npm run start -- -H 0.0.0.0 -p 3000
IF ERRORLEVEL 1 (
    echo Production server stopped. Starting dev server fallback...
    call npm run dev -- -p 3000
)
pause
