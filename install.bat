@echo on
start "" cmd /c "cd ./backend & npm i" 
@echo installed backend packages
start "" cmd /c "cd ./frontend & npm i" 
@echo installed frontend packages
exit