# WorkConnect - File Migration Script
# Moves files to new structure and updates references

$ErrorActionPreference = "Stop"

Write-Host "Starting file migration..." -ForegroundColor Green

# Function to copy file and create directory if needed
function Copy-FileToNewLocation {
    param(
        [string]$Source,
        [string]$Destination
    )
    
    $destDir = Split-Path -Parent $Destination
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    
    if (Test-Path $Source) {
        Copy-Item -Path $Source -Destination $Destination -Force
        Write-Host "Copied: $Source -> $Destination" -ForegroundColor Gray
        return $true
    } else {
        Write-Host "Source not found: $Source" -ForegroundColor Yellow
        return $false
    }
}

# Frontend JavaScript files
Write-Host "`nMigrating Frontend JavaScript files..." -ForegroundColor Cyan

Copy-FileToNewLocation "app/dashboard/js/dash.js" "src/frontend/app/modules/dashboard/services/dashboardService.js"
Copy-FileToNewLocation "app/dashboard/js/estoque.js" "src/frontend/app/modules/estoque/services/estoqueService.js"
Copy-FileToNewLocation "app/dashboard/js/vendas.js" "src/frontend/app/modules/vendas/services/vendasService.js"
Copy-FileToNewLocation "app/dashboard/js/financas.js" "src/frontend/app/modules/financas/services/financasService.js"
Copy-FileToNewLocation "app/dashboard/js/logistica.js" "src/frontend/app/modules/logistica/services/logisticaService.js"
Copy-FileToNewLocation "app/dashboard/js/relatorios.js" "src/frontend/app/modules/relatorios/services/relatoriosService.js"
Copy-FileToNewLocation "app/dashboard/js/config.js" "src/frontend/app/modules/configuracoes/services/configService.js"
Copy-FileToNewLocation "app/dashboard/js/auth.js" "src/frontend/app/core/auth/auth.js"
Copy-FileToNewLocation "app/dashboard/js/common.js" "src/frontend/app/shared/utils/common.js"
Copy-FileToNewLocation "app/dashboard/js/app.js" "src/frontend/app/core/routing/app.js"
Copy-FileToNewLocation "app/dashboard/js/ux-enhancements.js" "src/frontend/app/shared/utils/ux-enhancements.js"

# Frontend HTML pages
Write-Host "`nMigrating Frontend HTML pages..." -ForegroundColor Cyan

Copy-FileToNewLocation "app/dashboard/pages/dash.html" "src/frontend/app/modules/dashboard/pages/DashboardPage.html"
Copy-FileToNewLocation "app/dashboard/pages/estoque.html" "src/frontend/app/modules/estoque/pages/EstoquePage.html"
Copy-FileToNewLocation "app/dashboard/pages/vendas.html" "src/frontend/app/modules/vendas/pages/VendasPage.html"
Copy-FileToNewLocation "app/dashboard/pages/financas.html" "src/frontend/app/modules/financas/pages/FinancasPage.html"
Copy-FileToNewLocation "app/dashboard/pages/relatorios.html" "src/frontend/app/modules/relatorios/pages/RelatoriosPage.html"
Copy-FileToNewLocation "app/dashboard/pages/configuracoes.html" "src/frontend/app/modules/configuracoes/pages/ConfiguracoesPage.html"
Copy-FileToNewLocation "app/dashboard/pages/login.html" "src/frontend/app/core/auth/pages/LoginPage.html"
Copy-FileToNewLocation "app/dashboard/pages/index.html" "src/frontend/app/core/routing/pages/IndexPage.html"
Copy-FileToNewLocation "app/landing/index.html" "src/frontend/app/landing/pages/index.html"

# Frontend CSS files
Write-Host "`nMigrating Frontend CSS files..." -ForegroundColor Cyan

Copy-FileToNewLocation "app/dashboard/css/common.css" "src/frontend/assets/styles/base/variables.css"
Copy-FileToNewLocation "app/dashboard/css/pages.css" "src/frontend/assets/styles/components/pages.css"
Copy-FileToNewLocation "app/dashboard/css/theme.css" "src/frontend/assets/styles/themes/theme.css"
Copy-FileToNewLocation "app/dashboard/css/modern-acrylic.css" "src/frontend/assets/styles/components/modern-acrylic.css"
Copy-FileToNewLocation "app/dashboard/css/dashboard-enhanced.css" "src/frontend/app/modules/dashboard/styles/dashboard.css"
Copy-FileToNewLocation "app/dashboard/css/enhancements.css" "src/frontend/assets/styles/components/enhancements.css"
Copy-FileToNewLocation "app/dashboard/css/ux-enhancements.css" "src/frontend/assets/styles/utilities/ux-enhancements.css"
Copy-FileToNewLocation "app/landing/css/landing.css" "src/frontend/app/landing/styles/landing.css"

# Frontend assets
Write-Host "`nMigrating Frontend assets..." -ForegroundColor Cyan

if (Test-Path "app/dashboard/img") {
    Get-ChildItem "app/dashboard/img" | ForEach-Object {
        Copy-FileToNewLocation $_.FullName "src/frontend/assets/images/$($_.Name)"
    }
}

# Landing JavaScript
if (Test-Path "app/landing/js/landing.js") {
    Copy-FileToNewLocation "app/landing/js/landing.js" "src/frontend/app/landing/pages/landing.js"
}

# Database files
Write-Host "`nMigrating Database files..." -ForegroundColor Cyan

Copy-FileToNewLocation "database/schema.sql" "src/database/schemas/complete_schema.sql"
Copy-FileToNewLocation "database/seed.sql" "src/database/seeds/seed.sql"
Copy-FileToNewLocation "database/triggers.sql" "src/database/triggers/triggers.sql"
Copy-FileToNewLocation "database/views.sql" "src/database/views/views.sql"

if (Test-Path "database/migrations") {
    Get-ChildItem "database/migrations" | ForEach-Object {
        Copy-FileToNewLocation $_.FullName "src/database/migrations/$($_.Name)"
    }
}

# Documentation files
Write-Host "`nMigrating Documentation files..." -ForegroundColor Cyan

Copy-FileToNewLocation "doc/diagrama-classes-estoque.md" "docs/diagrams/classes/diagrama-classes-estoque.md"
Copy-FileToNewLocation "doc/diagrama-der-estoque.md" "docs/diagrams/database/diagrama-der-estoque.md"
Copy-FileToNewLocation "doc/diagrama-mer-conceitual.md" "docs/diagrams/database/diagrama-mer-conceitual.md"
Copy-FileToNewLocation "doc/diagrama-casos-de-uso-estoque.md" "docs/diagrams/use-cases/diagrama-casos-de-uso-estoque.md"
Copy-FileToNewLocation "doc/LGPD-COMPLIANCE.md" "docs/compliance/lgpd-compliance.md"
Copy-FileToNewLocation "doc/INDEX-DIAGRAMAS.md" "docs/diagrams/INDEX-DIAGRAMAS.md"
Copy-FileToNewLocation "doc/README-DIAGRAMAS.md" "docs/diagrams/README-DIAGRAMAS.md"

if (Test-Path "doc/strategic") {
    Get-ChildItem "doc/strategic" | ForEach-Object {
        Copy-FileToNewLocation $_.FullName "docs/requirements/$($_.Name)"
    }
}

# Presentation files
Write-Host "`nMigrating Presentation files..." -ForegroundColor Cyan

if (Test-Path "presentation/slides") {
    Get-ChildItem "presentation/slides" | ForEach-Object {
        Copy-FileToNewLocation $_.FullName "docs/presentation/slides/$($_.Name)"
    }
}

if (Test-Path "presentation/diagrams") {
    Get-ChildItem "presentation/diagrams" -Recurse | ForEach-Object {
        $relativePath = $_.FullName.Replace((Resolve-Path "presentation/diagrams").Path + "\", "")
        Copy-FileToNewLocation $_.FullName "docs/presentation/diagrams/$relativePath"
    }
}

# Configuration files
Write-Host "`nMigrating Configuration files..." -ForegroundColor Cyan

Copy-FileToNewLocation "app/dashboard/vite.config.js" "src/frontend/config/vite.config.js"

# Guides
Write-Host "`nMigrating Guide files..." -ForegroundColor Cyan

Copy-FileToNewLocation "CONTRIBUTING.md" "docs/guides/contributing.md"
Copy-FileToNewLocation "LAUNCH_GUIDE.md" "docs/guides/launch-guide.md"
Copy-FileToNewLocation "QUICK_START.md" "docs/guides/quick-start.md"
Copy-FileToNewLocation "SERVER_SETUP.md" "docs/guides/server-setup.md"
Copy-FileToNewLocation "TUTORIAL_CONTRIBUICAO_COMPLETO.md" "docs/guides/tutorial-contribuicao-completo.md"
Copy-FileToNewLocation "WORKFLOW_MOBILE_COMPLETO.md" "docs/guides/workflow-mobile-completo.md"

Write-Host "`nFile migration completed!" -ForegroundColor Green
Write-Host "`nNote: Original files are preserved. Please review and update references manually." -ForegroundColor Yellow




