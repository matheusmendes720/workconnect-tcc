# WorkConnect - Organize Remaining Files Script
# Organizes root-level files and remaining unorganized content

$ErrorActionPreference = "Stop"

Write-Host "Organizing remaining files..." -ForegroundColor Green

# Create additional directories if needed
$newDirs = @(
    "src/frontend/assets/images/screenshots",
    "docs/meta",
    "docs/development",
    "scripts/server",
    "scripts/database",
    "archive"
)

foreach ($dir in $newDirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created: $dir" -ForegroundColor Gray
    }
}

# Function to move file
function Move-FileToNewLocation {
    param(
        [string]$Source,
        [string]$Destination,
        [switch]$CreateBackup
    )
    
    if (Test-Path $Source) {
        $destDir = Split-Path -Parent $Destination
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        
        if ($CreateBackup -and (Test-Path $Destination)) {
            $backup = "$Destination.backup"
            Copy-Item -Path $Destination -Destination $backup -Force
        }
        
        Copy-Item -Path $Source -Destination $Destination -Force
        Write-Host "Moved: $Source -> $Destination" -ForegroundColor Gray
        return $true
    }
    return $false
}

# Move root-level documentation files
Write-Host "`nOrganizing root-level documentation..." -ForegroundColor Cyan

Move-FileToNewLocation "AGENTS.md" "docs/meta/AGENTS.md"
Move-FileToNewLocation "CLAUDE.md" "docs/meta/CLAUDE.md"
Move-FileToNewLocation "CRUSH.md" "docs/meta/CRUSH.md"
Move-FileToNewLocation "CHANGELOG_TUTORIAL.md" "docs/guides/CHANGELOG_TUTORIAL.md"
Move-FileToNewLocation "TUTORIAL_SUMMARY.md" "docs/guides/TUTORIAL_SUMMARY.md"
Move-FileToNewLocation "COMO_CONTRIBUIR_README.md" "docs/guides/COMO_CONTRIBUIR_README.md"
Move-FileToNewLocation "MOBILE_WORKFLOW_IMPLEMENTATION_REPORT.md" "docs/guides/MOBILE_WORKFLOW_IMPLEMENTATION_REPORT.md"
Move-FileToNewLocation "TEST_CHECKLIST.md" "docs/guides/TEST_CHECKLIST.md"

# Move screenshots
Write-Host "`nOrganizing screenshots..." -ForegroundColor Cyan

Move-FileToNewLocation "dashboard-screenshot.png" "src/frontend/assets/images/screenshots/dashboard-screenshot.png"
Move-FileToNewLocation "executive-dashboard.png" "src/frontend/assets/images/screenshots/executive-dashboard.png"

# Move server files
Write-Host "`nOrganizing server files..." -ForegroundColor Cyan

Move-FileToNewLocation "server.js" "scripts/server/server.js"
Move-FileToNewLocation "server.py" "scripts/server/server.py"
Move-FileToNewLocation "start-server.bat" "scripts/server/start-server.bat"
Move-FileToNewLocation "start-server.sh" "scripts/server/start-server.sh"

# Move presentation database scripts to database scripts
Write-Host "`nOrganizing database scripts..." -ForegroundColor Cyan

if (Test-Path "presentation/database") {
    Get-ChildItem "presentation/database" -File | ForEach-Object {
        $newName = $_.Name
        if ($newName -eq "setup.bat") { $newName = "setup-database.bat" }
        if ($newName -eq "setup.sh") { $newName = "setup-database.sh" }
        Move-FileToNewLocation $_.FullName "src/database/scripts/$newName"
    }
}

# Move presentation scripts to organized location
Write-Host "`nOrganizing presentation scripts..." -ForegroundColor Cyan

if (Test-Path "presentation/scripts") {
    # Database-related scripts
    $dbScripts = @("setup-database.bat", "setup-database.sh", "verify-db.bat", "test-queries.bat")
    foreach ($script in $dbScripts) {
        $source = "presentation/scripts/$script"
        if (Test-Path $source) {
            Move-FileToNewLocation $source "src/database/scripts/$script"
        }
    }
    
    # DBeaver scripts
    $dbeaverScripts = @("dbeaver-*.md", "dbeaver-*.bat", "dbeaver-*.sql", "*.dbs")
    Get-ChildItem "presentation/scripts" -Include $dbeaverScripts | ForEach-Object {
        Move-FileToNewLocation $_.FullName "docs/presentation/scripts/$($_.Name)"
    }
    
    # SchemaSpy scripts
    $schemaspyScripts = @("schemaspy-*.md", "generate-schemaspy-*.bat", "generate-schemaspy-*.sh")
    Get-ChildItem "presentation/scripts" -Include $schemaspyScripts | ForEach-Object {
        Move-FileToNewLocation $_.FullName "docs/presentation/scripts/$($_.Name)"
    }
    
    # pgAdmin scripts
    $pgadminScripts = @("pgadmin-*.md")
    Get-ChildItem "presentation/scripts" -Include $pgadminScripts | ForEach-Object {
        Move-FileToNewLocation $_.FullName "docs/presentation/scripts/$($_.Name)"
    }
    
    # General presentation scripts
    $generalScripts = @("export-all.*", "generate-diagrams.*", "generate-summary-report.*", "execute-all.*", "master-check.*", "import-dbeaver-project.*")
    Get-ChildItem "presentation/scripts" -Include $generalScripts | ForEach-Object {
        Move-FileToNewLocation $_.FullName "docs/presentation/scripts/$($_.Name)"
    }
}

# Move presentation markdown files
Write-Host "`nOrganizing presentation documentation..." -ForegroundColor Cyan

$presentationDocs = @(
    "ALL_IN_ONE.md",
    "ARCHITECTURE.md",
    "COMPLETE_CHECKLIST.md",
    "EXECUTION_STATUS.md",
    "EXPORT_CHECKLIST.md",
    "FINAL_STATUS.md",
    "NEXT_STEPS.md",
    "PRESENTATION_GUIDE.md",
    "QUICK_EXECUTE.md",
    "QUICK_START.md",
    "README_FINAL.md",
    "README.md",
    "SUMMARY.md",
    "TODO_STATUS.md"
)

foreach ($doc in $presentationDocs) {
    $source = "presentation/$doc"
    if (Test-Path $source) {
        Move-FileToNewLocation $source "docs/presentation/$doc"
    }
}

# Move presentation HTML and launch scripts
if (Test-Path "presentation/dashboard.html") {
    Move-FileToNewLocation "presentation/dashboard.html" "docs/presentation/dashboard.html"
}
if (Test-Path "presentation/launch.bat") {
    Move-FileToNewLocation "presentation/launch.bat" "docs/presentation/launch.bat"
}
if (Test-Path "presentation/launch.sh") {
    Move-FileToNewLocation "presentation/launch.sh" "docs/presentation/launch.sh"
}
if (Test-Path "presentation/start-dashboard.bat") {
    Move-FileToNewLocation "presentation/start-dashboard.bat" "docs/presentation/start-dashboard.bat"
}
if (Test-Path "presentation/start-dashboard.sh") {
    Move-FileToNewLocation "presentation/start-dashboard.sh" "docs/presentation/start-dashboard.sh"
}

# Move cache to archive
Write-Host "`nArchiving cache..." -ForegroundColor Cyan

if (Test-Path "cache") {
    Get-ChildItem "cache" | ForEach-Object {
        Move-FileToNewLocation $_.FullName "archive/cache/$($_.Name)"
    }
}

# Move git setup script
if (Test-Path "setup-git-and-push.bat") {
    Move-FileToNewLocation "setup-git-and-push.bat" "scripts/setup/setup-git-and-push.bat"
}

Write-Host "`nFile organization completed!" -ForegroundColor Green
Write-Host "`nNote: Original files are preserved. Review and delete originals after verification." -ForegroundColor Yellow




