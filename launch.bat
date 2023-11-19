@echo off

if exist "compiled_frontend" (
    echo The compiled_frontend folder exists.
    cd frontend
    npm run build
    if %errorlevel% equ 0 (
        echo Frontend build successful. Starting backend...
        cd ..
        node backend\index.js
    ) else (
        echo Frontend build failed.
    )
) else (
    echo The compiled_frontend folder does not exist.
)

pause