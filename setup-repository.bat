@echo off
echo ========================================
echo   Setting Up Git Repository
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed
    echo Please install Git from https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Your repository location:
echo   Local: %CD%
echo.

REM Check if already a git repository
if exist ".git" (
    echo Repository already initialized!
    echo.
    git status
    echo.
    echo To connect to GitHub:
    echo   1. Go to https://github.com/new
    echo   2. Create a new repository (don't initialize with README)
    echo   3. Run: git remote add origin https://github.com/YOUR_USERNAME/luxestore.git
    echo   4. Run: git push -u origin main
    echo.
    pause
    exit /b 0
)

echo This will:
echo   1. Initialize a Git repository
echo   2. Add all your files
echo   3. Create the first commit
echo.
echo Press any key to continue...
pause >nul

echo.
echo [1/3] Initializing Git repository...
git init
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to initialize repository
    pause
    exit /b 1
)

echo.
echo [2/3] Adding all files...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)

echo.
echo [3/3] Creating first commit...
git commit -m "Initial commit - Luxe Store"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create commit
    echo Note: If you see an error about user.name/email, run:
    echo   git config --global user.name "Your Name"
    echo   git config --global user.email "your.email@example.com"
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Repository Created Successfully!
echo ========================================
echo.
echo Your local repository is at:
echo   %CD%
echo.
echo Next steps to push to GitHub:
echo.
echo   1. Go to https://github.com/new
echo      - Repository name: luxestore (or any name you want)
echo      - Choose Public or Private
echo      - DON'T check "Initialize with README"
echo      - Click "Create repository"
echo.
echo   2. Connect your local repository to GitHub:
echo      Run these commands:
echo.
echo      git remote add origin https://github.com/YOUR_USERNAME/luxestore.git
echo      git branch -M main
echo      git push -u origin main
echo.
echo   3. Replace YOUR_USERNAME with your GitHub username!
echo.
echo After pushing to GitHub, you can deploy to:
echo   - Railway: https://railway.app (connect GitHub repo)
echo   - Render: https://render.com (connect GitHub repo)
echo   - Vercel: https://vercel.com (connect GitHub repo)
echo.
echo ========================================
echo.
echo Press any key to close...
pause >nul

