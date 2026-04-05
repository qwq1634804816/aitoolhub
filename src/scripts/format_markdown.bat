@echo off
setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"
set "DIR1=%SCRIPT_DIR%..\data\directory"
set "DIR2=%SCRIPT_DIR%..\data\directory-zh"

echo Starting markdown formatting...
echo.

set "count=0"

for /r "%DIR1%" %%f in (*.md) do (
    powershell -NoProfile -Command ^
        "$content = Get-Content '%%f' -Raw; " ^
        "$newContent = $content -replace '(?m)^(\s+)```', '```'; " ^
        "if ($content -ne $newContent) { Set-Content -Path '%%f' -Value $newContent -NoNewline; Write-Host 'Formatted: %%~nxf' }"
    if errorlevel 1 (
        echo Failed to format: %%~nxf
    )
)

for /r "%DIR2%" %%f in (*.md) do (
    powershell -NoProfile -Command ^
        "$content = Get-Content '%%f' -Raw; " ^
        "$newContent = $content -replace '(?m)^(\s+)```', '```'; " ^
        "if ($content -ne $newContent) { Set-Content -Path '%%f' -Value $newContent -NoNewline; Write-Host 'Formatted: %%~nxf' }"
    if errorlevel 1 (
        echo Failed to format: %%~nxf
    )
)

echo.
echo Formatting completed!
pause
