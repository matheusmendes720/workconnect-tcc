# WorkConnect - Push to GitHub Script
# Helps push the repository to GitHub

$ErrorActionPreference = "Stop"

Write-Host "WorkConnect - GitHub Push Helper" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Check if repository exists
Write-Host "Step 1: Verify repository exists on GitHub" -ForegroundColor Cyan
Write-Host "  Repository URL: https://github.com/matheusmendes720/workconnect-tcc" -ForegroundColor White
Write-Host ""
Write-Host "  If repository doesn't exist:" -ForegroundColor Yellow
Write-Host "  1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "  2. Repository name: workconnect-tcc" -ForegroundColor White
Write-Host "  3. Description: Work Connect - TCC - Sistema de Gestão de Estoque Inteligente para PMEs" -ForegroundColor White
Write-Host "  4. Visibility: Public" -ForegroundColor White
Write-Host "  5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
Write-Host "  6. Click 'Create repository'" -ForegroundColor White
Write-Host ""

# Authentication setup
Write-Host "Step 2: Set up authentication" -ForegroundColor Cyan
Write-Host ""
Write-Host "Option A: Personal Access Token (Recommended)" -ForegroundColor Yellow
Write-Host "  1. Go to: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "  2. Click 'Generate new token' → 'Generate new token (classic)'" -ForegroundColor White
Write-Host "  3. Name: WorkConnect TCC" -ForegroundColor White
Write-Host "  4. Expiration: 90 days (or your preference)" -ForegroundColor White
Write-Host "  5. Select scope: repo (full control)" -ForegroundColor White
Write-Host "  6. Click 'Generate token'" -ForegroundColor White
Write-Host "  7. COPY THE TOKEN (you won't see it again!)" -ForegroundColor Red
Write-Host ""
Write-Host "Option B: GitHub CLI" -ForegroundColor Yellow
Write-Host "  gh auth login" -ForegroundColor White
Write-Host ""

# Push instructions
Write-Host "Step 3: Push to GitHub" -ForegroundColor Cyan
Write-Host ""
Write-Host "After creating repository and getting token:" -ForegroundColor White
Write-Host ""
Write-Host "  git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "When prompted for password, use your Personal Access Token" -ForegroundColor Yellow
Write-Host ""

# Alternative: Use token in URL (less secure but works)
Write-Host "Alternative: Push with token in URL (one-time)" -ForegroundColor Cyan
Write-Host "  git push https://YOUR_TOKEN@github.com/matheusmendes720/workconnect-tcc.git main" -ForegroundColor White
Write-Host ""

Write-Host "=================================" -ForegroundColor Green
Write-Host "Ready to push!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

