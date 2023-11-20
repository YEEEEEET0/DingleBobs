@echo off

REM Function to install packages and show output
:installPackages
cd /d "%~dp0%~1"
set "currentDir=%cd%"
if exist node_modules (
    echo %2 packages already installed in directory: "%currentDir%".
) else (
    echo Installing %2 packages in directory: "%currentDir%"...
    npm i >nul 2>&1
    if %errorlevel% neq 0 (
        echo Failed to install %2 packages in directory: "%currentDir%".
    ) else (
        echo %2 packages installed successfully in directory: "%currentDir%".
    )
)
echo.

REM Install packages for backend and frontend
call :installPackages "backend" Backend
call :installPackages "frontend" Frontend

pause
exit