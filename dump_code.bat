@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo Выберите файлы для дампа (введите номера через пробел, 0 = все):

set "count=0"
set "base=%~dp0src\"
for /r src %%f in (*.js *.jsx *.ts *.tsx *.css *.html) do (
    set /a count+=1
    set "relpath=%%f"
    set "relpath=!relpath:%base%=!"
    set "relpath=!relpath:\=/!"
    echo !count! - /!relpath!
    set "file!count!=%%f"
)

set /p choice="Ваш выбор: "

if "%choice%"=="0" (
    for /r src %%f in (*.js *.jsx *.ts *.tsx *.css *.html) do (
        set "relpath=%%f"
        set "relpath=!relpath:%base%=!"
        set "relpath=!relpath:\=/!"
        echo.
        echo === /!relpath! ===
        type "%%f"
        echo.
    )
) else (
    for %%c in (%choice%) do (
        set "relpath=!file%%c!"
        set "relpath=!relpath:%base%=!"
        set "relpath=!relpath:\=/!"
        echo.
        echo === /!relpath! ===
        type "!file%%c!"
        echo.
    )
)

pause