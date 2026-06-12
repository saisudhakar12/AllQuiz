#!/usr/bin/env powershell

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  🎓 Quiz Application Server" -ForegroundColor Green
Write-Host ""
Write-Host "  Starting server on port 8000..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  💻 Open your browser to:" -ForegroundColor Cyan
Write-Host "  http://localhost:8000" -ForegroundColor White -BackgroundColor Black
Write-Host ""
Write-Host "  📋 Main Quiz: http://localhost:8000" -ForegroundColor Green
Write-Host "  🔍 Diagnostics: http://localhost:8000/test-fetch.html" -ForegroundColor Green
Write-Host "  📖 Setup Guide: SETUP.md" -ForegroundColor Green
Write-Host ""
Write-Host "  ❌ DO NOT open quiz.html from File Explorer!" -ForegroundColor Red
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to script directory
Push-Location $PSScriptRoot

# Try to start server
try {
    Write-Host "Checking for Python..." -ForegroundColor Yellow
    $pythonVersion = & python --version 2>&1
    Write-Host "✅ Found: $pythonVersion" -ForegroundColor Green
    Write-Host ""
    Write-Host "Starting server..." -ForegroundColor Yellow
    Write-Host ""
    & python -m http.server 8000
} catch {
    Write-Host "Python not available. Trying alternative..." -ForegroundColor Yellow
    try {
        Write-Host "Checking for PHP..." -ForegroundColor Yellow
        & php -S localhost:8000
    } catch {
        Write-Host "❌ No suitable server found!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install either Python or PHP and try again." -ForegroundColor Yellow
    }
}

Pop-Location

