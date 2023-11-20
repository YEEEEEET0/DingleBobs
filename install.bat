@echo off

REM Function to install packages in a directory
:installPackages
cd /d "%~dp0%~1"
set "currentDir=%cd%"
echo Installing %2 packages in directory: "%currentDir%"...
start npm i >nul 2>&1
echo %2 packages installation initiated in directory: "%currentDir%".
echo.

REM Install packages for backend and frontend
call :installPackages "backend" Backend
call :installPackages "frontend" Frontend

pause
exit