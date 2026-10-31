@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel%==0 (
  npm run dev
) else (
  echo Node.js 18+ is required. Install it from https://nodejs.org/
  pause
)
