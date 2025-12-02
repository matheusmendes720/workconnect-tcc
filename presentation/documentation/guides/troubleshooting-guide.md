# Guia de Troubleshooting
## Solução de Problemas Comuns

---

## 🔧 PROBLEMAS COM MYSQL WORKBENCH

### Problema 1: MySQL Workbench não instala

**Sintomas:**
- Instalador não inicia
- Erro durante instalação
- Instalação falha

**Soluções:**

1. **Verificar Requisitos do Sistema**
   - Windows 10+ / macOS 10.14+ / Linux
   - 4 GB RAM mínimo (8 GB recomendado)
   - 500 MB espaço em disco

2. **Executar como Administrador**
   - Windows: Clique direito → "Executar como administrador"
   - Linux/Mac: Use `sudo` se necessário

3. **Desinstalar Versão Anterior**
   - Desinstale versões antigas primeiro
   - Limpe registros (Windows) ou cache (Mac/Linux)

4. **Baixar Versão Compatível**
   - Tente versão mais recente
   - Ou versão LTS (Long Term Support)

5. **Verificar Antivírus**
   - Temporariamente desative antivírus
   - Adicione exceção para MySQL Workbench

---

### Problema 2: MySQL Workbench não abre

**Sintomas:**
- Aplicação não inicia
- Tela preta
- Crash imediato

**Soluções:**

1. **Verificar Logs de Erro**
   - Windows: `%APPDATA%\MySQL\Workbench\log\`
   - macOS: `~/Library/Application Support/MySQL/Workbench/log/`
   - Linux: `~/.mysql/workbench/log/`

2. **Reinstalar Visual C++ Redistributable** (Windows)
   - Baixe e instale: Microsoft Visual C++ Redistributable
   - Versão x64

3. **Verificar Permissões**
   - Certifique-se de ter permissões de escrita
   - Verifique permissões de pasta de usuário

4. **Resetar Configurações**
   - Feche MySQL Workbench
   - Renomeie pasta de configurações
   - Abra novamente (criará configurações novas)

---

### Problema 3: Modelo EER não salva

**Sintomas:**
- Erro ao salvar
- Arquivo não é criado
- Permissão negada

**Soluções:**

1. **Verificar Permissões de Pasta**
   - Certifique-se de ter permissão de escrita
   - Tente salvar em local diferente primeiro

2. **Verificar Espaço em Disco**
   - Certifique-se de ter espaço suficiente
   - Limpe espaço se necessário

3. **Verificar Nome do Arquivo**
   - Não use caracteres especiais
   - Use apenas letras, números e underscore
   - Não use espaços (use underscore)

4. **Salvar em Local Alternativo**
   - Tente salvar em Desktop primeiro
   - Depois mova para local correto

---

### Problema 4: Diagrama não exporta

**Sintomas:**
- Exportação falha
- Arquivo não é criado
- Erro durante exportação

**Soluções:**

1. **Reduzir Resolução**
   - Tente 150 DPI ao invés de 300 DPI
   - Reduza tamanho do diagrama

2. **Exportar em Partes**
   - Exporte módulos separadamente
   - Combine depois se necessário

3. **Verificar Espaço em Disco**
   - Arquivos PNG/PDF podem ser grandes
   - Certifique-se de ter espaço

4. **Usar Screenshots como Alternativa**
   - Use ferramenta de screenshot
   - Capture áreas do diagrama
   - Combine se necessário

---

## 🔧 PROBLEMAS COM MODELO EER

### Problema 5: Tabelas não aparecem no diagrama

**Sintomas:**
- Tabelas criadas mas não visíveis
- Canvas vazio
- Tabelas ocultas

**Soluções:**

1. **Verificar Aba Correta**
   - Certifique-se de estar na aba "EER Diagram"
   - Não na aba "Model Overview"

2. **Verificar Zoom**
   - Use `Ctrl+0` para ajustar zoom
   - Tabelas podem estar fora da área visível

3. **Verificar Filtros**
   - Verifique se filtros não estão ocultando tabelas
   - Menu: View → Show/Hide

4. **Recarregar Diagrama**
   - Feche e reabra o diagrama
   - Ou crie novo diagrama e adicione tabelas

---

### Problema 6: Relacionamentos não funcionam

**Sintomas:**
- Não consegue criar relacionamento
- Erro ao selecionar colunas
- Relacionamento não aparece

**Soluções:**

1. **Verificar Colunas Existem**
   - Certifique-se de que colunas FK existem
   - Verifique nomes das colunas

2. **Verificar Tipos de Dados**
   - Colunas devem ter tipos compatíveis
   - BIGINT → BIGINT (não INT → BIGINT)

3. **Criar Coluna FK Primeiro**
   - Crie a coluna foreign key na tabela filho
   - Depois crie o relacionamento

4. **Usar Ferramenta Correta**
   - Use "Place a Relationship Using Existing Columns"
   - Não "Place a Relationship"

---

### Problema 7: Layout desorganizado

**Sintomas:**
- Tabelas sobrepostas
- Relacionamentos cruzados
- Difícil de visualizar

**Soluções:**

1. **Usar Auto-Layout**
   - Clique direito no canvas
   - Selecione "Auto-Layout"
   - Ajuste manualmente depois

2. **Organizar Manualmente**
   - Arraste tabelas para posições
   - Deixe espaço entre módulos
   - Alinhe tabelas

3. **Agrupar por Módulos**
   - Organize tabelas por módulo
   - Deixe espaço visual entre módulos

4. **Ajustar Tamanho das Tabelas**
   - Redimensione tabelas
   - Tabelas principais maiores
   - Auxiliares menores

---

## 🔧 PROBLEMAS COM EXPORTAÇÃO

### Problema 8: Diagrama exportado está borrado

**Sintomas:**
- Imagem pixelada
- Texto ilegível
- Baixa qualidade

**Soluções:**

1. **Aumentar Resolução**
   - Use 300 DPI ao invés de 72 DPI
   - Ou maior se disponível

2. **Exportar como PDF**
   - PDF é vetorial (não pixeliza)
   - Melhor para impressão

3. **Exportar como SVG**
   - SVG é vetorial
   - Melhor para web/edição

4. **Aumentar Zoom Antes de Exportar**
   - Zoom in antes de exportar
   - Exporta em maior resolução

---

### Problema 9: Arquivo exportado muito grande

**Sintomas:**
- PNG muito pesado (>10 MB)
- Lento para abrir
- Difícil de compartilhar

**Soluções:**

1. **Reduzir Resolução**
   - Use 150 DPI ao invés de 300 DPI
   - Suficiente para apresentação na tela

2. **Comprimir PNG**
   - Use ferramenta de compressão
   - TinyPNG, ImageOptim, etc.

3. **Exportar como PDF**
   - PDF geralmente menor
   - Melhor compressão

4. **Exportar em Partes**
   - Exporte módulos separadamente
   - Arquivos menores

---

## 🔧 PROBLEMAS COM APRESENTAÇÃO

### Problema 10: MySQL Workbench lento durante apresentação

**Sintomas:**
- Lag ao navegar
- Zoom lento
- Interface travando

**Soluções:**

1. **Fechar Outros Programas**
   - Feche programas desnecessários
   - Libere memória RAM

2. **Reduzir Complexidade do Diagrama**
   - Oculte detalhes desnecessários
   - Mostre apenas nomes de colunas

3. **Usar Screenshots**
   - Capture áreas importantes
   - Use screenshots durante apresentação

4. **Reiniciar MySQL Workbench**
   - Feche e reabra antes da apresentação
   - Limpa cache e memória

---

### Problema 11: Projetor não mostra corretamente

**Sintomas:**
- Cores diferentes
- Texto ilegível
- Resolução errada

**Soluções:**

1. **Ajustar Resolução do Projetor**
   - Use resolução nativa do projetor
   - Geralmente 1024x768 ou 1920x1080

2. **Aumentar Tamanho das Fontes**
   - Aumente tamanho das tabelas
   - Facilita leitura à distância

3. **Usar Modo de Alto Contraste**
   - Ajuste cores para alto contraste
   - Preto e branco se necessário

4. **Testar Antes**
   - Teste com projetor antes da apresentação
   - Ajuste configurações

---

## 🔧 PROBLEMAS GERAIS

### Problema 12: Esqueci de salvar

**Sintomas:**
- Trabalho perdido
- Mudanças não salvas

**Soluções:**

1. **Verificar Auto-Save**
   - MySQL Workbench pode ter auto-save
   - Verifique pasta de backup

2. **Salvar Frequentemente**
   - Use `Ctrl+S` frequentemente
   - Crie hábito de salvar

3. **Usar Versões**
   - Salve versões diferentes
   - `workconnect-eer-v1.mwb`, `v2.mwb`, etc.

---

### Problema 13: Não consigo encontrar arquivo

**Sintomas:**
- Arquivo perdido
- Não lembra onde salvou

**Soluções:**

1. **Buscar por Nome**
   - Use busca do sistema operacional
   - Busque por `*.mwb`

2. **Verificar Locais Padrão**
   - Windows: `Documents\MySQL Workbench\`
   - macOS: `~/Documents/`
   - Linux: `~/Documents/`

3. **Usar Histórico Recente**
   - MySQL Workbench: File → Recent Models
   - Mostra arquivos recentes

---

## 📞 RECURSOS ADICIONAIS

### Documentação Oficial
- MySQL Workbench Manual: https://dev.mysql.com/doc/workbench/en/
- Fórum MySQL: https://forums.mysql.com/

### Arquivos de Apoio
- `documentation/guides/step-by-step-eer-creation.md`
- `documentation/guides/mysql-workbench-setup.md`
- `AUTOMATED-VS-MANUAL-TASKS.md`

---

## ✅ CHECKLIST DE TROUBLESHOOTING

Antes de pedir ajuda:

- [ ] Verifiquei logs de erro
- [ ] Tentei reiniciar aplicação
- [ ] Verifiquei permissões
- [ ] Verifiquei espaço em disco
- [ ] Tentei solução alternativa
- [ ] Consultei documentação
- [ ] Verifiquei requisitos do sistema

---

**Lembre-se: Mantenha a calma e use os backups!**

