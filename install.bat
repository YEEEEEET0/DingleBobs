@echo off

REM Function to echo colored text
:colorEcho
echo off
<nul set /p ".=%~2"
findstr /v $ "%~2" nul
echo.
if "%~1" neq "" exit /b %~1

REM Function to install packages and show output
:installPackages
cd /d "%~1"
if exist "node_modules" (
    echo %2 packages already installed.
) else (
    echo Installing %2 packages...
    npm i
    if errorlevel 1 (
        echo Failed to install %2 packages.
    ) else (
        echo %2 packages installed successfully.
    )
)
echo %2 packages installation initiated.
echo.

REM Echoing with colors and background installations
call :installPackages ".\backend" Backend
call :installPackages ".\frontend" Frontend

pause
exit