@echo off
echo ========================================
echo   Starting Luxe Store for Public Access
echo   Using Serveo (SSH-based, No Install)
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if SSH is available (usually available on Windows 10+)
where ssh >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ========================================
    echo   SSH not found!
    echo ========================================
    echo.
    echo Serveo requires SSH which should be built into Windows 10/11.
    echo If you don't have SSH, try one of these instead:
    echo   - start-localtunnel.bat (Recommended - uses npm)
    echo   - start-cloudflare.bat (Uses Cloudflare Tunnel)
    echo.
    echo To enable SSH on Windows:
    echo   1. Open Settings
    echo   2. Go to Apps ^> Optional Features
    echo   3. Add "OpenSSH Client"
    echo.
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
echo [1/4] Starting server on port 5000...
start "Luxe Store Server" cmd /k "cd /d %~dp0server && npm run dev"

REM Wait a bit for server to start
timeout /t 3 /nobreak >nul

echo [2/4] Starting client on port 3000...
start "Luxe Store Client" cmd /k "cd /d %~dp0client && npm run dev"

REM Wait a bit for client to start
timeout /t 3 /nobreak >nul

echo [3/4] Starting admin panel on port 3001...
start "Luxe Store Admin" cmd /k "cd /d %~dp0admin-app && npm run dev"

REM Wait a bit for admin to start
timeout /t 3 /nobreak >nul

echo [4/4] Creating public tunnel with Serveo...
echo.
echo ========================================
echo   Creating Public URL...
echo ========================================
echo.
echo IMPORTANT: Keep this window open while friends are using your site!
echo The public URL will appear in the Serveo window that opens.
echo.
echo NOTE: Serveo is FREE and requires NO INSTALLATION or SIGNUP!
echo       Uses SSH (built into Windows 10/11).
echo.
timeout /t 2 /nobreak >nul

REM Start Serveo tunnel using SSH
REM Serveo automatically assigns a random subdomain
start "Luxe Store - Public Access (Serveo)" cmd /k "ssh -R 80:localhost:3000 serveo.net"

echo.
echo ========================================
echo   Setup Complete!
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
echo Server: http://%LOCAL_IP%:5000
echo Client: http://%LOCAL_IP%:3000
echo Admin:  http://%LOCAL_IP%:3001
echo.
echo ========================================
echo   PUBLIC ACCESS (For Friends)
echo ========================================
echo.
echo Look at the "Serveo" window that just opened!
echo You'll see a message with a URL like: https://xxxx.serveo.net
echo.
echo That's the URL you can share with friends anywhere!
echo They can access your site from any device, anywhere in the world.
echo.
echo NOTE: Keep Serveo running while friends are using your site.
echo       The URL stays active as long as the SSH connection is open.
echo.
echo ========================================
echo.
echo Press any key to close this window...
echo (The servers and tunnel will continue running in separate windows)
pause >nul

