@echo off

REM Function to echo colored text
:colorEcho
echo off
<nul set /p ".=%~2"
findstr /v $ "%~2" nul
echo.

if "%~1" neq "" exit /b %~1

REM Echoing with colors
echo Installing backend packages...
start "" cmd /c "cd ./backend & npm i"
echo Installed backend packages
echo.

echo Installing frontend packages...
start "" cmd /c "cd ./frontend & npm i"
echo Installed frontend packages
echo.

pause
exit