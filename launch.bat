@echo off
setlocal enabledelayedexpansion

for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (set "DEL=%%a")

if exist "compiled_frontend" (
    call :PainText 02 "The compiled_frontend folder exists."

    cd frontend

    call :PainText 06 "Starting frontend build..."
    set start_time=!TIME!
    start /B cmd /c npm run watch:build > build.log 2>&1

    call :PainText 06 "Waiting for frontend build to complete..."
    :CHECK_COMPLETION
    timeout /t 2 >nul
    findstr /C:"built in" build.log >nul && (
        set end_time=!TIME!
        
        for /F "tokens=1-4 delims=:., " %%a in ("!start_time!") do (
            set /A "start_millis=(((1%%a*60)+1%%b %% 100)*60+1%%c %% 100)*1000+1%%d %% 1000-1000"
        )
        for /F "tokens=1-4 delims=:., " %%a in ("!end_time!") do (
            set /A "end_millis=(((1%%a*60)+1%%b %% 100)*60+1%%c %% 100)*1000+1%%d %% 1000-1000"
        )

        set /A "elapsed_time=end_millis - start_millis"
        echo Frontend build completed. Time taken: !elapsed_time! milliseconds.

        cd ..
        call :PainText 02 "Starting backend..."
        start /B node backend\index.js

        set "rebuilt_flag=1"
    ) || (
        goto CHECK_COMPLETION
    )
) else (
    echo.
)

if defined rebuilt_flag (
    powershell -ExecutionPolicy Bypass -File "build_monitor.ps1"
)

exit /b


:PainText
<nul set /p "=%DEL%" > "%~2"
findstr /v /a:%1 /R "+" "%~2" nul
del "%~2" > nul
echo.
goto :eof

  