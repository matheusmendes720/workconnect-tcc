@echo off
echo ========================================
echo Git Setup and Push Script
echo ========================================
echo.

echo Step 1: Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo Error: Failed to initialize git
    pause
    exit /b 1
)
echo ✓ Git initialized

echo.
echo Step 2: Adding all files...
git add .
if %errorlevel% neq 0 (
    echo Error: Failed to add files
    pause
    exit /b 1
)
echo ✓ Files added

echo.
echo Step 3: Committing changes...
git commit -m "feat: Complete production frontend restructure - Separated landing/dashboard with organized CSS/JS/HTML structure"
if %errorlevel% neq 0 (
    echo Error: Failed to commit
    pause
    exit /b 1
)
echo ✓ Changes committed

echo.
echo Step 4: Renaming branch to main...
git branch -M main
if %errorlevel% neq 0 (
    echo Warning: Failed to rename branch (might already be main)
)
echo ✓ Branch set to main

echo.
echo Step 5: Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/matheusfly/Work-Conect_TCC.git
if %errorlevel% neq 0 (
    echo Error: Failed to add remote
    pause
    exit /b 1
)
echo ✓ Remote added

echo.
echo Step 6: Pushing to GitHub...
echo NOTE: You may be prompted for GitHub credentials
git push -u origin main
if %errorlevel% neq 0 (
    echo Error: Failed to push to remote
    echo Please check your GitHub credentials and repository access
    pause
    exit /b 1
)
echo ✓ Successfully pushed to GitHub!

echo.
echo ========================================
echo SUCCESS! Repository pushed to:
echo https://github.com/matheusfly/Work-Conect_TCC
echo ========================================
echo.
pause

