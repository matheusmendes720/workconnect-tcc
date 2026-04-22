# Script para sincronizar a documentação Docusaurus com o site principal Next.js

$ProjectRoot = Get-Location
$DocsDir = Join-Path $ProjectRoot "documentation"
$PublicDocsDir = Join-Path $ProjectRoot "public\docs"

Write-Host "[INFO] Iniciando sincronizacao da documentacao..." -ForegroundColor Cyan

# 1. Build da documentação
Write-Host "[BUILD] Gerando build do Docusaurus..." -ForegroundColor Yellow
Set-Location $DocsDir
cmd /c "npm run build"

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Erro ao gerar build do Docusaurus." -ForegroundColor Red
    Set-Location $ProjectRoot
    exit $LASTEXITCODE
}

# 2. Limpar pasta public/docs antiga
Write-Host "[CLEAN] Limpando pasta public/docs..." -ForegroundColor Yellow
if (Test-Path $PublicDocsDir) {
    Remove-Item -Recurse -Force $PublicDocsDir
}
New-Item -ItemType Directory -Path $PublicDocsDir -Force | Out-Null

# 3. Copiar arquivos do build para public/docs
Write-Host "[COPY] Copiando arquivos do build para public/docs..." -ForegroundColor Yellow
$BuildDir = Join-Path $DocsDir "build"
Copy-Item -Path "$BuildDir\*" -Destination $PublicDocsDir -Recurse -Force

Write-Host "[SUCCESS] Documentacao sincronizada com sucesso!" -ForegroundColor Green
Write-Host "[URL] Acesse em: http://localhost:3000/docs (ou http://localhost:3001/docs)" -ForegroundColor Cyan

Set-Location $ProjectRoot
