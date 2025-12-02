# WorkConnect - Finalize Organization Script
# Moves remaining presentation scripts to organized locations

$ErrorActionPreference = "Stop"

Write-Host "Finalizing organization..." -ForegroundColor Green

# Create scripts directory in presentation docs if needed
$targetDir = "docs/presentation/scripts"
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

# Move remaining presentation scripts
$scriptsToMove = @(
    "dbeaver-connection-script.sql",
    "dbeaver-erd-checklist.md",
    "dbeaver-erd-guide.md",
    "dbeaver-quick-erd.md",
    "dbeaver-quick-import.md",
    "dbeaver-setup-helper.bat",
    "execute-all.bat",
    "execute-all.sh",
    "export-all.bat",
    "export-all.sh",
    "generate-diagrams.bat",
    "generate-diagrams.sh",
    "generate-schemaspy-docs.bat",
    "generate-schemaspy-docs.sh",
    "generate-summary-report.bat",
    "generate-summary-report.sh",
    "import-dbeaver-project.bat",
    "import-dbeaver-project.sh",
    "master-check.bat",
    "master-check.sh",
    "pgadmin-erd-guide.md",
    "README-DBEAVER.md",
    "schemaspy-setup-guide.md",
    "test-queries.bat",
    "verify-db.bat",
    "workconnect-dbeaver.dbs"
)

foreach ($script in $scriptsToMove) {
    $source = "presentation/scripts/$script"
    $dest = "$targetDir/$script"
    
    if (Test-Path $source) {
        Copy-Item -Path $source -Destination $dest -Force
        Write-Host "Moved: $script" -ForegroundColor Gray
    }
}

Write-Host "`nOrganization finalized!" -ForegroundColor Green




