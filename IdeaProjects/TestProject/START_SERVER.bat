@echo off
REM Start Quiz Server
REM This script starts a local HTTP server on port 8000

cd /d "%~dp0"

echo ==========================================
echo.
echo   🎓 Quiz Application Server
echo.
echo   Starting server on port 8000...
echo.
echo   Open your browser to:
echo   http://localhost:8000
echo.
echo ==========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python found. Starting server...
    python -m http.server 8000
) else (
    echo ❌ Python not found. Trying alternative methods...
    echo.

    REM Try PHP
    php -S localhost:8000
)

