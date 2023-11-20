@echo off
echo Installing npm packages in frontend...
cd frontend
call npm install
cd ..

echo Installing npm packages in backend...
cd backend
call npm install
cd ..

echo Packages installation complete.
pause