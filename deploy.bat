@echo off
setlocal enabledelayedexpansion

:: Ensure we have Git
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Git is not installed or not in PATH
    exit /b 1
)

:: Get repository name
for /f "tokens=*" %%a in ('git config --get remote.origin.url') do (
    set remote_url=%%a
)
for %%f in (!remote_url!) do set REPO_NAME=%%~nf

:: Read and increment version
set /p version=<version.txt
echo !version! > version.txt

:: Build the project
call npm run build

:: Copy version file to dist
copy version.txt dist\

:: Navigate to build directory
cd dist

:: Create .nojekyll file
type nul > .nojekyll

:: Initialize git and deploy
git init
git add -A
git commit -m "Deploy version !version!"

:: Push to gh-pages branch with the new repository URL
git push -f https://github.com/clickclick114/official.git HEAD:gh-pages

:: Return to previous directory
cd ..

echo Deployed successfully to https://clickclick114.github.io/official/