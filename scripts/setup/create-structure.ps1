# WorkConnect - Directory Structure Creation Script
# Creates the complete project structure

$ErrorActionPreference = "Stop"

Write-Host "Creating WorkConnect directory structure..." -ForegroundColor Green

# Frontend structure
$frontendDirs = @(
    "src/frontend/app/modules/dashboard/components",
    "src/frontend/app/modules/dashboard/pages",
    "src/frontend/app/modules/dashboard/services",
    "src/frontend/app/modules/dashboard/styles",
    "src/frontend/app/modules/estoque/components",
    "src/frontend/app/modules/estoque/pages",
    "src/frontend/app/modules/estoque/services",
    "src/frontend/app/modules/estoque/styles",
    "src/frontend/app/modules/vendas/components",
    "src/frontend/app/modules/vendas/pages",
    "src/frontend/app/modules/vendas/services",
    "src/frontend/app/modules/vendas/styles",
    "src/frontend/app/modules/financas/components",
    "src/frontend/app/modules/financas/pages",
    "src/frontend/app/modules/financas/services",
    "src/frontend/app/modules/financas/styles",
    "src/frontend/app/modules/logistica/components",
    "src/frontend/app/modules/logistica/pages",
    "src/frontend/app/modules/logistica/services",
    "src/frontend/app/modules/logistica/styles",
    "src/frontend/app/modules/relatorios/components",
    "src/frontend/app/modules/relatorios/pages",
    "src/frontend/app/modules/relatorios/services",
    "src/frontend/app/modules/relatorios/styles",
    "src/frontend/app/modules/configuracoes/components",
    "src/frontend/app/modules/configuracoes/pages",
    "src/frontend/app/modules/configuracoes/services",
    "src/frontend/app/modules/configuracoes/styles",
    "src/frontend/app/shared/components",
    "src/frontend/app/shared/services",
    "src/frontend/app/shared/utils",
    "src/frontend/app/shared/constants",
    "src/frontend/app/core/auth",
    "src/frontend/app/core/routing",
    "src/frontend/app/core/state",
    "src/frontend/app/core/api",
    "src/frontend/app/landing/components",
    "src/frontend/app/landing/pages",
    "src/frontend/app/landing/styles",
    "src/frontend/assets/styles/base",
    "src/frontend/assets/styles/components",
    "src/frontend/assets/styles/themes",
    "src/frontend/assets/styles/utilities",
    "src/frontend/assets/images",
    "src/frontend/assets/icons",
    "src/frontend/assets/fonts",
    "src/frontend/config"
)

# Backend structure
$backendDirs = @(
    "src/backend/src/modules/auth/controllers",
    "src/backend/src/modules/auth/services",
    "src/backend/src/modules/auth/models",
    "src/backend/src/modules/auth/routes",
    "src/backend/src/modules/auth/middleware",
    "src/backend/src/modules/estoque/controllers",
    "src/backend/src/modules/estoque/services",
    "src/backend/src/modules/estoque/models",
    "src/backend/src/modules/estoque/routes",
    "src/backend/src/modules/estoque/middleware",
    "src/backend/src/modules/vendas/controllers",
    "src/backend/src/modules/vendas/services",
    "src/backend/src/modules/vendas/models",
    "src/backend/src/modules/vendas/routes",
    "src/backend/src/modules/vendas/middleware",
    "src/backend/src/modules/financas/controllers",
    "src/backend/src/modules/financas/services",
    "src/backend/src/modules/financas/models",
    "src/backend/src/modules/financas/routes",
    "src/backend/src/modules/financas/middleware",
    "src/backend/src/modules/logistica/controllers",
    "src/backend/src/modules/logistica/services",
    "src/backend/src/modules/logistica/models",
    "src/backend/src/modules/logistica/routes",
    "src/backend/src/modules/logistica/middleware",
    "src/backend/src/modules/relatorios/controllers",
    "src/backend/src/modules/relatorios/services",
    "src/backend/src/modules/relatorios/models",
    "src/backend/src/modules/relatorios/routes",
    "src/backend/src/modules/relatorios/middleware",
    "src/backend/src/shared/middleware",
    "src/backend/src/shared/utils",
    "src/backend/src/shared/validators",
    "src/backend/src/shared/errors",
    "src/backend/src/core/database",
    "src/backend/src/core/config",
    "src/backend/src/core/server",
    "src/backend/src/infrastructure/logging",
    "src/backend/src/infrastructure/monitoring",
    "src/backend/src/infrastructure/cache",
    "src/backend/tests/unit",
    "src/backend/tests/integration",
    "src/backend/tests/e2e"
)

# Database structure
$databaseDirs = @(
    "src/database/migrations",
    "src/database/schemas",
    "src/database/seeds",
    "src/database/triggers",
    "src/database/views",
    "src/database/functions",
    "src/database/scripts"
)

# Documentation structure
$docsDirs = @(
    "docs/architecture",
    "docs/diagrams/classes",
    "docs/diagrams/database",
    "docs/diagrams/use-cases",
    "docs/compliance",
    "docs/guides",
    "docs/requirements",
    "docs/presentation/slides",
    "docs/presentation/diagrams"
)

# Other directories
$otherDirs = @(
    "scripts/setup",
    "scripts/build",
    "scripts/deploy",
    "scripts/maintenance",
    "tests/e2e",
    "tests/integration",
    "tests/fixtures",
    "config/environments",
    "config/docker",
    ".github/workflows",
    ".github/ISSUE_TEMPLATE",
    ".vscode",
    ".husky"
)

# Combine all directories
$allDirs = $frontendDirs + $backendDirs + $databaseDirs + $docsDirs + $otherDirs

# Create directories
foreach ($dir in $allDirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created: $dir" -ForegroundColor Gray
    } else {
        Write-Host "Exists: $dir" -ForegroundColor Yellow
    }
}

Write-Host "`nDirectory structure created successfully!" -ForegroundColor Green




