# Guia Visual de Apresentação
## Dicas para Apresentar o Modelo EER

---

## 🎨 Ajustes Visuais no MySQL Workbench

### 1. Organização por Módulos

**Como fazer:**
1. Arraste tabelas para agrupar por módulo
2. Deixe espaço visual entre módulos
3. Use alinhamento para organização

**Layout Sugerido:**
```
[Módulo 1]    [Módulo 2]    [Módulo 3]
[Auth]        [Inventory]   [Sales]

[Módulo 4]    [Módulo 5]    [Módulo 6-7]
[Finances]    [Logistics]   [Reports/Audit]
```

### 2. Cores por Módulo (Se Disponível)

**Como fazer:**
1. Clique com botão direito na tabela
2. Selecione "Table Color" ou "Fill Color"
3. Escolha cor diferente para cada módulo

**Sugestão de Cores:**
- Módulo 1 (Auth): Azul claro (#E3F2FD)
- Módulo 2 (Inventory): Verde claro (#E8F5E9)
- Módulo 3 (Sales): Amarelo claro (#FFF9C4)
- Módulo 4 (Finances): Laranja claro (#FFE0B2)
- Módulo 5 (Logistics): Roxo claro (#F3E5F5)
- Módulo 6-7: Cinza claro (#F5F5F5)

### 3. Tamanho das Tabelas

**Para Apresentação:**
- Aumente tamanho das tabelas principais
- Reduza tamanho de tabelas auxiliares
- Facilita visualização à distância

**Como fazer:**
1. Selecione tabela
2. Arraste cantos para redimensionar
3. Ajuste para legibilidade

### 4. Ocultar Detalhes (Foco Conceitual)

**Para apresentação conceitual:**
1. Clique com botão direito na tabela
2. Selecione "Show Columns" → "Names Only"
3. Isso oculta tipos de dados
4. Foca em entidades e relacionamentos

---

## 📊 Durante a Apresentação

### Navegação no Diagrama

**Zoom:**
- `Ctrl + 0`: Ajustar para caber tudo
- `Ctrl + +`: Zoom in
- `Ctrl + -`: Zoom out
- Roda do mouse: Zoom suave

**Pan (Mover):**
- Espaço + Arrastar: Mover canvas
- Setas do teclado: Mover suavemente

### Destacar Áreas

**Durante explicação:**
1. Use zoom para focar em módulo específico
2. Aponte com mouse/cursor
3. Siga relacionamentos com o cursor

### Transições Suaves

**Ao mudar de módulo:**
1. Zoom out para ver tudo
2. Zoom in no próximo módulo
3. Explique relacionamentos visíveis

---

## 🎯 Pontos a Destacar Visualmente

### 1. Relacionamentos Complexos

**Exemplo: VENDA conecta múltiplos módulos**
- Mostre como VENDA se conecta a:
  - VENDA_ITEM (próprio módulo)
  - MOVIMENTACAO_ESTOQUE (Inventory)
  - TRANSACAO_FINANCEIRA (Finances)
  - PEDIDO (Logistics)

**Como mostrar:**
- Zoom in em VENDA
- Siga cada linha de relacionamento
- Explique cada conexão

### 2. Relacionamento N:M

**Exemplo: PRODUTO ↔ FORNECEDOR**
- Mostre tabela de junção PRODUTO_FORNECEDOR
- Explique por que precisa de tabela intermediária
- Mostre as duas relações 1:N

### 3. Self-References

**Exemplo: CATEGORIA → CATEGORIA**
- Mostre hierarquia
- Explique categoria pai/filho
- Mostre como funciona

---

## 📸 Screenshots para Backup

### Antes da Apresentação:

1. **Screenshot do ERD Completo**
   - Zoom ajustado para ver tudo
   - Layout organizado
   - Salvar como backup

2. **Screenshots por Módulo**
   - Um screenshot por módulo
   - Zoom in para clareza
   - Útil se precisar mostrar individualmente

3. **Screenshots de Detalhes**
   - Relacionamentos complexos
   - Tabelas principais
   - Áreas de interesse

---

## 🎤 Dicas de Apresentação Oral

### Ao Mostrar o Diagrama:

1. **Comece pelo Panorama Geral**
   - "Este é o modelo completo com 30+ tabelas"
   - Mostre ERD completo
   - Explique organização por módulos

2. **Depois Detalhe por Módulo**
   - Zoom in em cada módulo
   - Explique tabelas principais
   - Mostre relacionamentos internos

3. **Finalmente Mostre Integrações**
   - Zoom out novamente
   - Siga relacionamentos entre módulos
   - Explique fluxos de dados

### Linguagem a Usar:

**Bom:**
- "Esta tabela se relaciona com..."
- "Podemos ver que..."
- "O relacionamento mostra que..."
- "Esta cardinalidade indica que..."

**Evitar:**
- "Acho que..."
- "Provavelmente..."
- "Talvez..."

---

## ✅ Checklist Visual

Antes da apresentação:

- [ ] Diagrama organizado e limpo
- [ ] Tabelas legíveis (tamanho adequado)
- [ ] Relacionamentos visíveis
- [ ] Cardinalidades claras
- [ ] Cores aplicadas (se desejado)
- [ ] Título e legenda presentes
- [ ] Screenshots de backup criados
- [ ] Zoom testado e funcionando
- [ ] Navegação praticada

---

## 🎬 Sequência de Apresentação Visual

### 1. Abertura (30 segundos)
- Mostre ERD completo
- "Este é o modelo de dados do WorkConnect"
- "30+ tabelas organizadas em 7 módulos"

### 2. Visão Geral (1 minuto)
- Zoom out completo
- Explique organização por módulos
- Mostre estrutura geral

### 3. Módulos Individuais (2 min cada)
- Zoom in em cada módulo
- Explique tabelas principais
- Mostre relacionamentos internos

### 4. Integrações (3 minutos)
- Zoom out
- Siga relacionamentos entre módulos
- Explique fluxos de dados
- Destaque VENDA como exemplo

### 5. Detalhes Técnicos (2 minutos)
- Mostre relacionamento N:M
- Mostre self-references
- Explique cardinalidades

### 6. Fechamento (30 segundos)
- Zoom out final
- Resumo visual
- Perguntas

---

**Boa apresentação!**

