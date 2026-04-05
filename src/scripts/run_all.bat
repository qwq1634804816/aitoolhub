@echo off
echo ============================================
echo Running all scripts...
echo ============================================
echo.

call "%~dp0rename_files.bat"
echo.
echo ============================================
echo.
call "%~dp0format_markdown.bat"

echo.
echo ============================================
echo All tasks completed!
echo ============================================
pause
