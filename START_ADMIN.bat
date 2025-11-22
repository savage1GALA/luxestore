@echo off
title Luxe Store - Admin Panel
color 0B
cls

echo.
echo ========================================
echo    STARTING ADMIN PANEL ONLY
echo ========================================
echo.
echo Starting admin panel on port 3001...
echo.
timeout /t 2 >nul

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Kill existing process on port 3001
echo Checking for existing processes on port 3001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
    echo Killing existing process on port 3001 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

echo.
echo Starting admin panel...
echo.

REM Start admin panel with Railway backend URL (set in the command window)
start "Luxe Store Admin" cmd /k "cd /d %~dp0admin-app && set VITE_API_URL=https://luxestore-production.up.railway.app&& npm run dev"

REM Wait a bit for admin to start
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Admin Panel Started!
echo ========================================
echo.
echo Admin Panel: http://localhost:3001
echo.
echo IMPORTANT: This admin panel connects to Railway backend!
echo Backend: https://luxestore-production.up.railway.app
echo.
echo The admin panel will show orders from the deployed backend.
echo Orders from https://luxestore-theta.vercel.app will appear here.
echo.
echo Opening admin panel in browser...
timeout /t 2 >nul
start http://localhost:3001
echo.
echo Press any key to close this window...
echo (The admin panel will continue running in a separate window)
pause >nul

