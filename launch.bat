@echo off
setlocal enabledelayedexpansion

if exist "compiled_frontend" (
    echo The compiled_frontend folder exists.
    cd frontend

    echo Starting frontend build...
    set start_time=!TIME!
    start /B cmd /c npm run watch:build > build.log 2>&1

    echo Waiting for frontend build to complete...
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
        echo Starting backend...
        start /B node backend\index.js
    ) || (
        goto CHECK_COMPLETION
    )
) else (
    echo.
)

exit /b