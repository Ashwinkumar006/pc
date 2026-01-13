@echo off
echo ========================================
echo    PROCONNECT LOCAL SERVER
echo ========================================
echo.

REM Check if PHP is available
php --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] PHP is detected
    echo Starting local server...
    echo.
    echo Server: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    echo Open your browser and go to: http://localhost:8000
    echo ========================================
    cd /d "E:\New folder (6)\New folder (5)\New folder\Downloads\Pro-connect--main\Pro-connect--main"
    php -S localhost:8000 server.php
) else (
    echo [ERROR] PHP is not installed or not in PATH
    echo.
    echo Option 1: Install PHP from https://www.php.net/downloads.php
    echo Option 2: Use Python server: python -m http.server 8000
    echo Option 3: Use Node.js server: npx serve .
    echo.
    echo Choose an option and press any key to continue...
    pause >nul
)

echo.
echo ========================================
pause