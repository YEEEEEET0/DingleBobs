@echo off

echo Installing npm packages for backend...
cd backend
npm install
cd ..

echo Installing npm packages for frontend...
cd frontend
npm install
cd ..

echo Packages installation complete for both backend and frontend.
pause