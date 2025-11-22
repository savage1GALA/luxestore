@echo off
echo ========================================
echo   Fix GitHub Authentication
echo ========================================
echo.
echo This will help you fix the GitHub authentication issue.
echo.
echo Your repository: savage1GALA/luxestore
echo Current user (wrong): gaylan10xpr
echo.
echo Choose an option:
echo.
echo [1] Clear cached credentials and try again
echo [2] Switch to SSH authentication
echo [3] Show instructions for Personal Access Token
echo [4] Exit
echo.
set /p choice="Enter option (1-4): "

if "%choice%"=="1" goto clear_creds
if "%choice%"=="2" goto ssh_setup
if "%choice%"=="3" goto show_token_info
if "%choice%"=="4" exit

:clear_creds
echo.
echo Clearing cached credentials...
git credential-manager-core erase
echo.
echo Credentials cleared!
echo.
echo Now try pushing again:
echo   git push -u origin main
echo.
echo When prompted, use a Personal Access Token (not password).
echo See FIX_AUTH.md for instructions on creating a token.
echo.
pause
exit /b 0

:ssh_setup
echo.
echo Setting up SSH authentication...
echo.
echo Step 1: Check if you have an SSH key...
if exist "%USERPROFILE%\.ssh\id_ed25519.pub" (
    echo SSH key found!
    type "%USERPROFILE%\.ssh\id_ed25519.pub"
    echo.
    echo Copy this key and add it to GitHub:
    echo   https://github.com/settings/keys
    echo.
) else (
    echo No SSH key found. Generating one...
    ssh-keygen -t ed25519 -C "savage1GALA@github.com" -f "%USERPROFILE%\.ssh\id_ed25519"
    echo.
    echo SSH key generated! Show the public key:
    type "%USERPROFILE%\.ssh\id_ed25519.pub"
    echo.
    echo Copy this key and add it to GitHub:
    echo   https://github.com/settings/keys
    echo   Click "New SSH key", paste the key above, and save.
    echo.
    pause
)

echo.
echo Step 2: Switching to SSH remote URL...
git remote set-url origin git@github.com:savage1GALA/luxestore.git
echo.
echo Remote URL changed to SSH!
echo.
echo Now try pushing:
echo   git push -u origin main
echo.
pause
exit /b 0

:show_token_info
echo.
echo ========================================
echo   Personal Access Token Instructions
echo ========================================
echo.
echo 1. Go to: https://github.com/settings/tokens
echo.
echo 2. Click "Generate new token" ^> "Generate new token (classic)"
echo.
echo 3. Name it: "Luxe Store Deployment"
echo.
echo 4. Select scope: Check "repo" (full repository access)
echo.
echo 5. Click "Generate token"
echo.
echo 6. COPY THE TOKEN (you won't see it again!)
echo.
echo 7. Clear cached credentials:
echo    git credential-manager-core erase
echo.
echo 8. Push again:
echo    git push -u origin main
echo.
echo 9. When prompted:
echo    Username: savage1GALA
echo    Password: [paste your Personal Access Token]
echo.
echo See FIX_AUTH.md for more details.
echo.
pause
exit /b 0

