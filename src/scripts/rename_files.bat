@echo off
setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"
set "DIR1=%SCRIPT_DIR%..\data\directory"
set "DIR2=%SCRIPT_DIR%..\data\directory-zh"

echo Starting rename process...
echo.

for /r "%DIR1%" %%f in (*-en.md) do (
    set "filename=%%~nf"
    set "newname=!filename:-en=!"
    ren "%%f" "!newname!.md"
    if errorlevel 1 (
        echo Failed to rename: %%~nxf
    ) else (
        echo Renamed: %%~nxf -^> !newname!.md
    )
)

for /r "%DIR1%" %%f in (*-zh.md) do (
    set "filename=%%~nf"
    set "newname=!filename:-zh=!"
    ren "%%f" "!newname!.md"
    if errorlevel 1 (
        echo Failed to rename: %%~nxf
    ) else (
        echo Renamed: %%~nxf -^> !newname!.md
    )
)

for /r "%DIR2%" %%f in (*-en.md) do (
    set "filename=%%~nf"
    set "newname=!filename:-en=!"
    ren "%%f" "!newname!.md"
    if errorlevel 1 (
        echo Failed to rename: %%~nxf
    ) else (
        echo Renamed: %%~nxf -^> !newname!.md
    )
)

for /r "%DIR2%" %%f in (*-zh.md) do (
    set "filename=%%~nf"
    set "newname=!filename:-zh=!"
    ren "%%f" "!newname!.md"
    if errorlevel 1 (
        echo Failed to rename: %%~nxf
    ) else (
        echo Renamed: %%~nxf -^> !newname!.md
    )
)

echo.
echo Rename process completed!
pause
