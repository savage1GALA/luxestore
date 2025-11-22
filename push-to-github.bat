@echo off
echo ========================================
echo   Push to GitHub
echo ========================================
echo.
echo This will push your changes to GitHub.
echo.
set /p token="Enter your GitHub Personal Access Token: "

if "%token%"=="" (
    echo ERROR: Token is required
    pause
    exit /b 1
)

echo.
echo Setting remote URL with token...
git remote set-url origin https://%token%@github.com/savage1GALA/luxestore.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   Done!
echo ========================================
echo.
echo Your code has been pushed to GitHub.
echo Railway should automatically redeploy now!
echo.
echo Next steps:
echo   1. Go to Railway dashboard
echo   2. Check the "Settings" tab
echo   3. Set Root Directory to: server
echo   4. Verify Start Command: node server.js
echo   5. Redeploy if needed
echo.
pause

