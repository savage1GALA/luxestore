@echo off
title Luxe Store
color 0A
cls

echo.
echo ========================================
echo       STARTING LUXE STORE
echo ========================================
echo.
echo Starting all servers...
echo   - Server: http://localhost:5000
echo   - Client: http://localhost:3000  
echo   - Admin:  http://localhost:3001
echo.
echo Press Ctrl+C in each window to stop servers.
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

REM Kill existing processes on ports 5000, 3000, and 3001
echo Checking for existing processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process on port 5000 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Killing process on port 3000 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
    echo Killing process on port 3001 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

echo.
echo [1/3] Starting server on port 5000...
start "Luxe Store Server" cmd /k "cd /d %~dp0server && npm run dev"

REM Wait a bit for server to start
timeout /t 3 /nobreak >nul

echo [2/3] Starting client on port 3000...
start "Luxe Store Client" cmd /k "cd /d %~dp0client && npm run dev"

REM Wait a bit for client to start
timeout /t 3 /nobreak >nul

echo [3/3] Starting admin panel on port 3001...
start "Luxe Store Admin" cmd /k "cd /d %~dp0admin-app && npm run dev"

REM Wait a bit for admin to start
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   All Servers Started!
echo ========================================
echo.
echo --- Local Access ---
echo Server: http://localhost:5000
echo Client: http://localhost:3000
echo Admin:  http://localhost:3001
echo.

REM Get local IP address for network access
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set LOCAL_IP=%%a
    goto :found_ip
)
:found_ip
set LOCAL_IP=%LOCAL_IP:~1%

echo --- Network Access (Same Wi-Fi) ---
echo Client: http://%LOCAL_IP%:3000
echo Server: http://%LOCAL_IP%:5000
echo Admin:  http://%LOCAL_IP%:3001
echo.
echo To access from mobile: Connect to same Wi-Fi and use the network IP above.
echo.
echo ========================================
echo.
echo Opening browser...
timeout /t 2 >nul
start http://localhost:3000
echo.
echo Press any key to close this window...
echo (The servers will continue running in separate windows)
pause >nul
