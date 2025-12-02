# WorkConnect - Cleanup Root Files Script
# Removes duplicate files from root and organizes remaining files

$ErrorActionPreference = "Stop"

Write-Host "Cleaning up root directory..." -ForegroundColor Green

# Files that should STAY in root (standard project files)
$keepInRoot = @(
    "README.md",
    "package.json",
    "package-lock.json",
    "CHANGELOG.md",
    "ROADMAP.md",
    "CONTRIBUTING.md",
    ".gitignore",
    ".cursorrules",
    "LICENSE"
)

# Files that have been copied and can be removed from root
$duplicatesToRemove = @(
    # Documentation files (already in docs/)
    "AGENTS.md",
    "CHANGELOG_TUTORIAL.md",
    "CLAUDE.md",
    "COMO_CONTRIBUIR_README.md",
    "CRUSH.md",
    "LAUNCH_GUIDE.md",
    "MOBILE_WORKFLOW_IMPLEMENTATION_REPORT.md",
    "QUICK_START.md",
    "SERVER_SETUP.md",
    "TEST_CHECKLIST.md",
    "TUTORIAL_CONTRIBUICAO_COMPLETO.md",
    "TUTORIAL_SUMMARY.md",
    "WORKFLOW_MOBILE_COMPLETO.md",
    
    # Scripts (already in scripts/)
    "server.js",
    "server.py",
    "start-server.bat",
    "start-server.sh",
    "setup-git-and-push.bat",
    
    # Images (already in assets/)
    "dashboard-screenshot.png",
    "executive-dashboard.png"
)

# Remove duplicate files
Write-Host "`nRemoving duplicate files from root..." -ForegroundColor Cyan
$removedCount = 0
$notFoundCount = 0

foreach ($file in $duplicatesToRemove) {
    if (Test-Path $file) {
        Remove-Item -Path $file -Force
        Write-Host "Removed: $file" -ForegroundColor Gray
        $removedCount++
    } else {
        $notFoundCount++
    }
}

Write-Host "`nRemoved $removedCount duplicate files" -ForegroundColor Green
if ($notFoundCount -gt 0) {
    Write-Host "$notFoundCount files not found (may have been removed already)" -ForegroundColor Yellow
}

# Check for old directories that should be archived
Write-Host "`nChecking for old directories..." -ForegroundColor Cyan

$oldDirs = @(
    "app",      # Old structure - files migrated to src/
    "doc",      # Old docs - files migrated to docs/
    "database", # Old database - files migrated to src/database/
    "cache",    # Cache - already archived
    "presentation" # Old presentation - files migrated to docs/presentation/
)

foreach ($dir in $oldDirs) {
    if (Test-Path $dir) {
        Write-Host "Found old directory: $dir" -ForegroundColor Yellow
        Write-Host "  Consider archiving or removing after verifying migration" -ForegroundColor Gray
    }
}

# List remaining root files
Write-Host "`nRemaining files in root:" -ForegroundColor Cyan
Get-ChildItem -Path . -File | Where-Object { $_.Name -notin $keepInRoot } | ForEach-Object {
    Write-Host "  ⚠️  $($_.Name)" -ForegroundColor Yellow
}

Write-Host "`nCleanup completed!" -ForegroundColor Green
Write-Host "`nNote: Old directories (app/, doc/, database/, presentation/) are preserved for reference." -ForegroundColor Yellow
Write-Host "You can remove them after verifying all files have been migrated." -ForegroundColor Yellow




