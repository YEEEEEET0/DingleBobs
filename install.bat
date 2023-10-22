@echo on
start "launching our project for morons" cmd /c "cd ./backend & npm i" 
@echo installed backend packages
start "launching our project for morons" cmd /c "cd ./frontend & npm i" 
@echo installed frontend packages
exit