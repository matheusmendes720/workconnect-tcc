# WorkConnect - Setup New GitHub Repository Script
# Configures git and prepares for push to new GitHub repository

$ErrorActionPreference = "Stop"

Write-Host "Setting up new GitHub repository..." -ForegroundColor Green

# Configuration
$githubUsername = "matheusmendes720"
$githubEmail = "datamaster720@gmail.com"
$repoName = "workconnect-tcc"
$repoTitle = "Work Connect - TCC"

Write-Host "`nConfiguration:" -ForegroundColor Cyan
Write-Host "  Username: $githubUsername"
Write-Host "  Email: $githubEmail"
Write-Host "  Repository: $repoName"
Write-Host "  Title: $repoTitle"

# Configure git user
Write-Host "`nConfiguring git user..." -ForegroundColor Cyan
git config user.name $githubUsername
git config user.email $githubEmail
Write-Host "Git user configured" -ForegroundColor Green

# Check if already initialized
if (-not (Test-Path ".git")) {
    Write-Host "`nInitializing git repository..." -ForegroundColor Cyan
    git init
    Write-Host "Git repository initialized" -ForegroundColor Green
}

# Add all files
Write-Host "`nAdding all files to staging..." -ForegroundColor Cyan
git add .
Write-Host "Files added to staging" -ForegroundColor Green

# Create initial commit
Write-Host "`nCreating initial commit..." -ForegroundColor Cyan
$commitMessage = "Initial commit: Work Connect - TCC - Complete repository reorganization v2.0.0"
git commit -m $commitMessage
Write-Host "Initial commit created" -ForegroundColor Green

# Remove old remote if exists
Write-Host "`nChecking for existing remotes..." -ForegroundColor Cyan
$remoteCheck = git remote show origin 2>&1
if ($LASTEXITCODE -eq 0) {
    $existingRemote = git remote get-url origin
    Write-Host "Found existing remote: $existingRemote" -ForegroundColor Yellow
    Write-Host "Removing old remote..." -ForegroundColor Yellow
    git remote remove origin
    Write-Host "Old remote removed" -ForegroundColor Green
} else {
    Write-Host "No existing remote found" -ForegroundColor Gray
}

# Add new remote
$newRemoteUrl = "https://github.com/$githubUsername/$repoName.git"
Write-Host "`nAdding new remote..." -ForegroundColor Cyan
Write-Host "Remote URL: $newRemoteUrl"
git remote add origin $newRemoteUrl
Write-Host "New remote added" -ForegroundColor Green

Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "SETUP COMPLETE!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Create the repository on GitHub:" -ForegroundColor Cyan
Write-Host "   - Go to: https://github.com/new" -ForegroundColor White
Write-Host "   - Repository name: $repoName" -ForegroundColor White
Write-Host "   - Description: $repoTitle" -ForegroundColor White
Write-Host "   - Visibility: Public" -ForegroundColor White
Write-Host "   - DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
Write-Host "   - Click 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "2. Push to GitHub:" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "   OR if you need to force push:" -ForegroundColor Yellow
Write-Host "   git push -u origin main --force" -ForegroundColor White
Write-Host ""
Write-Host "Repository URL will be:" -ForegroundColor Cyan
Write-Host "   https://github.com/$githubUsername/$repoName" -ForegroundColor White
Write-Host ""
