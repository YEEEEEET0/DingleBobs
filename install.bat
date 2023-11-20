@echo off

REM Echoing with colors and background installations
echo Installing backend packages...
cd /d "./backend"
if exist "node_modules" (
    echo Backend packages already installed.
) else (
    start /B npm i >nul 2>&1
)

echo Backend packages installation initiated.
echo.

REM Function for spinner animation (if needed)

echo Installing frontend packages...
cd /d "./frontend"
if exist "node_modules" (
    echo Frontend packages already installed.
) else (
    start /B npm i >nul 2>&1
)

echo Frontend packages installation initiated.
echo.

pause
exit