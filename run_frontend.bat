@echo off
title Humorphic Lab - Frontend Web Client
echo ========================================================
echo Starting Humorphic Lab Frontend (Next.js 15 + Three.js)
echo Local URL:     http://localhost:3000/
echo Network URL:   http://0.0.0.0:3000/
echo ========================================================
cd /d "%~dp0frontend"
npm.cmd run dev -- -H 0.0.0.0 -p 3000
pause
