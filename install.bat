@echo off

REM Function to install packages in a directory
:installPackages
cd /d "%~dp0%~1"
set "currentDir=%cd%"
echo Installing %2 packages in directory: "%currentDir%"...
if exist package.json (
    call npm i >nul 2>&1
    if %errorlevel% equ 0 (
        echo %2 packages installed successfully in directory: "%currentDir%".
    ) else (
        echo Failed to install %2 packages in directory: "%currentDir%".
    )
) else (
    echo Package.json not found in directory: "%currentDir%".
)
echo.

REM Exit if both backend and frontend have been installed
if "%~1" == "frontend" (
    echo All packages installed successfully.
    pause
    exit
)

REM Install packages for backend
call :installPackages "backend" Backend

REM Install packages for frontend
call :installPackages "frontend" Frontend

pause
exit