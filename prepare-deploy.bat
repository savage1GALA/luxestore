@echo off
echo ========================================
echo   Preparing Luxe Store for Deployment
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

echo This script will:
echo   1. Build the frontend for production
echo   2. Check that everything is ready
echo   3. Show you what to do next
echo.
echo Press any key to continue...
pause >nul

echo.
echo [1/3] Installing dependencies...
cd client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install client dependencies
    pause
    exit /b 1
)
cd ..

cd server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install server dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [2/3] Building frontend for production...
cd client
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to build frontend
    pause
    exit /b 1
)
cd ..

echo.
echo [3/3] Checking build output...
if exist "client\dist" (
    echo SUCCESS: Frontend build created in client\dist folder!
) else (
    echo ERROR: Build folder not found
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo Your site is ready for deployment!
echo.
echo Next steps:
echo   1. See DEPLOY_GUIDE.md for deployment instructions
echo   2. Recommended: Deploy to Railway (easiest) or Render (full stack)
echo   3. Update API URLs in your deployment settings
echo.
echo Build output:
echo   - Frontend: client\dist (ready to deploy)
echo   - Backend: server\ (deploy as Node.js service)
echo.
echo ========================================
echo.
echo Press any key to close...
pause >nul

