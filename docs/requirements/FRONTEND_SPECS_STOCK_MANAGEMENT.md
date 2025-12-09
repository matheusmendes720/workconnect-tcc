# Frontend Specifications - Stock Management System
## WorkConnect - Sistema de Gestão de Estoque Inteligente

**Versão:** 1.0.0  
**Data:** 2025-01-12  
**Tipo:** Frontend Only - Mock Data Implementation  
**Status:** Especificação Completa

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Design System](#design-system)
3. [Component Library](#component-library)
4. [Feature Requirements](#feature-requirements)
5. [User Interactions](#user-interactions)
6. [Mock Data Structure](#mock-data-structure)
7. [Technical Specifications](#technical-specifications)

---

## 🎯 Visão Geral

### Objetivo
Criar uma interface frontend completa e funcional para gestão de estoque, utilizando **apenas dados mock** (sem backend), focada em demonstrações ao vivo e usabilidade.

### Escopo
- **Frontend Only**: Nenhuma lógica de backend
- **Mock Data**: Todos os dados são simulados e armazenados em memória
- **Single Page Application**: Interface única com navegação por abas
- **Tema Escuro Dourado**: Design system moderno com glassmorphism

### Funcionalidades Principais
1. Dashboard com métricas e gráficos
2. Gestão de Produtos (CRUD completo)
3. Gestão de Categorias (hierárquica)
4. Gestão de Fornecedores
5. Movimentações de Estoque
6. Alertas de Reposição
7. Relatórios e Análises

---

## 🎨 Design System

### Paleta de Cores

#### Cores Primárias (Dourado)
```css
--color-primary: #FFD54F;      /* Dourado Principal */
--color-accent: #FFC107;       /* Âmbar/Amarelo */
```

#### Cores Base (Escuro)
```css
--color-base-black: #0D0D0D;   /* Preto Profundo */
--color-surface-dark: #1E1E1E; /* Cinza Escuro */
--color-glass-gray: rgba(42, 42, 42, 0.5); /* Cinza Translúcido */
```

#### Cores de Texto
```css
--color-text-primary: #FFFFFF;   /* Branco */
--color-text-secondary: #B0B0B0; /* Cinza Claro */
--color-text-muted: #808080;     /* Cinza Médio */
```

#### Cores de Status
```css
--color-success: #00E676;  /* Verde Sucesso */
--color-error: #FF5252;    /* Vermelho Erro */
--color-warning: #FFD54F;  /* Amarelo Aviso */
--color-info: #42A5F5;     /* Azul Info */
```

### Gradientes

```css
/* Gradiente Dourado */
--gradient-gold: linear-gradient(135deg, #FFD54F 0%, #FFC107 100%);

/* Gradiente Escuro */
--gradient-dark: linear-gradient(145deg, #0D0D0D 0%, #1E1E1E 100%);

/* Gradiente Radial Dourado */
--gradient-gold-radial: radial-gradient(circle at 30% 50%, rgba(255, 213, 79, 0.15), #0D0D0D 90%);
```

### Tipografia

#### Fontes
- **Display/Logo**: `Poppins` (ExtraBold, Uppercase)
- **Headings**: `Inter` (SemiBold)
- **Body**: `Inter` (Regular)
- **Monospace**: `JetBrains Mono` (para código/logs)

#### Tamanhos
```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
--font-size-3xl: 2rem;     /* 32px */
--font-size-4xl: 2.25rem;  /* 36px */
```

### Espaçamento

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
```

### Bordas e Raios

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

### Sombras

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
--shadow-gold: 0 4px 20px rgba(255, 213, 79, 0.3);
--shadow-gold-hover: 0 6px 30px rgba(255, 213, 79, 0.5);
```

### Efeitos Glassmorphic

```css
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.15);
--glass-blur: blur(16px);
--glass-saturate: saturate(180%);
--glass-brightness: brightness(1.1);
```

---

## 🧩 Component Library

### Botões

#### Botão Primário (Dourado)
```html
<button class="btn-gold">
  <i class="fas fa-plus"></i>
  <span>Adicionar Produto</span>
</button>
```

**Estados:**
- Default: Gradiente dourado, sombra suave
- Hover: Brilho aumentado, elevação
- Active: Escala reduzida (0.98)
- Disabled: Opacidade 0.5, cursor not-allowed
- Loading: Spinner animado

#### Botão Secundário
```html
<button class="btn-secondary">Cancelar</button>
```

#### Botão de Perigo
```html
<button class="btn-danger">
  <i class="fas fa-trash"></i>
  Excluir
</button>
```

### Cards

#### Card Glassmorphic
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Título do Card</h3>
    <i class="fas fa-icon card-icon"></i>
  </div>
  <div class="card-body">
    <!-- Conteúdo -->
  </div>
</div>
```

**Características:**
- Background translúcido com blur
- Borda sutil
- Efeito shimmer no hover
- Animação de entrada suave

### Formulários

#### Input
```html
<div class="form-group">
  <label class="form-label">Nome do Produto</label>
  <input type="text" class="form-input" placeholder="Digite o nome...">
</div>
```

**Estados:**
- Default: Background translúcido, borda sutil
- Focus: Borda dourada, sombra dourada, elevação
- Valid: Borda verde, ícone de check
- Invalid: Borda vermelha, animação shake, mensagem de erro

#### Select
```html
<select class="form-select">
  <option value="">Selecione...</option>
  <option value="1">Opção 1</option>
</select>
```

#### Textarea
```html
<textarea class="form-textarea" rows="4" placeholder="Descrição..."></textarea>
```

### Tabelas

#### Data Table
```html
<div class="table-container">
  <table class="data-table">
    <thead>
      <tr>
        <th>Código</th>
        <th>Nome</th>
        <th>Estoque</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <!-- Linhas -->
    </tbody>
  </table>
</div>
```

**Funcionalidades:**
- Ordenação por coluna
- Filtros
- Paginação
- Busca
- Ações inline

### Modais

#### Modal Structure
```html
<div class="modal-overlay" id="modalId">
  <div class="modal-content">
    <div class="modal-header">
      <h2 class="modal-title">Título do Modal</h2>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <!-- Conteúdo -->
    </div>
    <div class="modal-footer">
      <button class="btn-secondary">Cancelar</button>
      <button class="btn-gold">Salvar</button>
    </div>
  </div>
</div>
```

### Badges de Status

```html
<span class="status-badge status-success">OK</span>
<span class="status-badge status-warning">BAIXO</span>
<span class="status-badge status-error">CRÍTICO</span>
```

### Tabs

```html
<div class="tab-nav">
  <button class="tab-button active" data-tab="dashboard">
    <i class="fas fa-chart-line"></i>
    <span>Dashboard</span>
  </button>
  <button class="tab-button" data-tab="produtos">
    <i class="fas fa-box"></i>
    <span>Produtos</span>
  </button>
</div>

<div class="tab-panel active" id="dashboard-tab">
  <!-- Conteúdo -->
</div>
```

### Toast Notifications

```javascript
toast.success('Produto adicionado com sucesso!');
toast.error('Erro ao salvar produto');
toast.warning('Estoque baixo');
toast.info('Informação importante');
```

---

## 📦 Feature Requirements

### 1. Dashboard Tab

#### Métricas Principais
- **Total de Produtos**: Contador animado
- **Itens em Estoque Baixo**: Badge com prioridade
- **Valor Total do Estoque**: Formatação monetária
- **Categorias Ativas**: Contador

#### Gráficos
- **Distribuição de Status**: Pie chart (OK/BAIXO/CRÍTICO)
- **Movimentações Recentes**: Line chart (últimos 30 dias)
- **Top 10 Produtos**: Bar chart (por quantidade)

#### Ações Rápidas
- Botão: Adicionar Produto
- Botão: Nova Movimentação
- Botão: Ver Alertas

#### Atividades Recentes
- Lista das últimas 10 movimentações
- Formato: Data, Produto, Tipo, Quantidade, Usuário

### 2. Produtos Tab

#### Lista de Produtos
**Colunas:**
- Código
- Nome
- Categoria
- Estoque Atual
- Estoque Mínimo
- Status (Badge)
- Ações (Editar, Excluir, Ver Detalhes)

**Funcionalidades:**
- Busca por código/nome
- Filtro por categoria
- Filtro por status
- Ordenação por qualquer coluna
- Paginação (10 itens por página)

#### Modal Adicionar/Editar Produto
**Campos:**
- Código (obrigatório, único)
- Nome (obrigatório)
- Descrição (opcional, textarea)
- Categoria (select, obrigatório)
- Estoque Mínimo (number, obrigatório)
- Estoque Máximo (number, obrigatório)
- Preço de Aquisição (number, obrigatório)
- Unidade de Medida (select: UN, KG, L, M, etc.)
- Localização Física (text, opcional)
- Prazo de Validade (date, opcional)

**Validações:**
- Código único
- Estoque mínimo > 0
- Estoque máximo > estoque mínimo
- Preço >= 0

### 3. Categorias Tab

#### Árvore de Categorias
- Visualização hierárquica
- Expandir/colapsar nós
- Indicador visual de nível

#### Gestão de Categorias
- Adicionar categoria raiz
- Adicionar subcategoria
- Editar categoria
- Excluir categoria (com validação: não pode ter produtos)

**Formulário:**
- Nome (obrigatório)
- Descrição (opcional)
- Categoria Pai (select, opcional)

### 4. Fornecedores Tab

#### Lista de Fornecedores
**Colunas:**
- Razão Social
- CNPJ
- Telefone
- Email
- Produtos Fornecidos (contador)
- Ações

#### Modal Adicionar/Editar Fornecedor
**Campos:**
- Razão Social (obrigatório)
- Nome Fantasia (opcional)
- CNPJ (obrigatório, formato validado)
- Telefone (opcional)
- Email (opcional, formato validado)
- Endereço (opcional, textarea)
- Tempo Médio de Entrega (number, dias)
- Condições de Pagamento (textarea, opcional)

### 5. Movimentações Tab

#### Histórico de Movimentações
**Colunas:**
- Data/Hora
- Produto
- Tipo
- Quantidade
- Preço Unitário
- Valor Total
- Usuário
- Documento Fiscal
- Ações

**Filtros:**
- Tipo (Entrada/Saída/Transferência/Ajuste)
- Produto
- Período (data início - data fim)
- Usuário

#### Modal Nova Movimentação
**Campos:**
- Tipo (select obrigatório):
  - Entrada - Compra
  - Entrada - Devolução
  - Saída - Venda
  - Saída - Perda
  - Transferência
  - Ajuste de Inventário
- Produto (select obrigatório)
- Quantidade (number obrigatório, > 0)
- Preço Unitário (number, obrigatório para compras)
- Documento Fiscal (text, opcional)
- Observação (textarea, obrigatório para ajustes)
- Local Origem (text, para transferências)
- Local Destino (text, para transferências)

### 6. Alertas Tab

#### Lista de Alertas
**Card de Alerta:**
- Produto (nome, código)
- Estoque Atual
- Estoque Mínimo
- Quantidade Sugerida
- Prioridade (Badge: URGENTE/ALTA/MÉDIA/BAIXA)
- Data do Alerta
- Ações:
  - Marcar como Visualizado
  - Criar Pedido de Compra
  - Dismiss

**Filtros:**
- Prioridade
- Visualizado/Não Visualizado

### 7. Relatórios Tab

#### Tipos de Relatórios
1. **Visão Geral de Estoque**
   - Lista completa de produtos
   - Status, quantidades, valores

2. **Histórico de Movimentações**
   - Movimentações por período
   - Agrupado por tipo

3. **Produtos Críticos**
   - Produtos abaixo do mínimo
   - Ordenado por prioridade

4. **Análise de Fornecedores**
   - Fornecedores e produtos
   - Preços médios

#### Controles
- Seletor de Tipo de Relatório
- Seletor de Período (Data Início - Data Fim)
- Botão Gerar Relatório
- Botões de Exportação (PDF, Excel, CSV)

#### Visualização
- Tabela com dados do relatório
- Gráficos quando aplicável
- Opção de impressão

---

## 🖱️ User Interactions

### Navegação por Tabs
- Clique em tab para alternar
- Indicador visual de tab ativa
- Animação suave de transição
- Histórico de navegação (opcional)

### Modais
- Abrir: Clique em botão de ação
- Fechar: Botão X, clique fora, ESC
- Animação de entrada/saída
- Foco automático no primeiro campo

### Formulários
- Validação em tempo real
- Mensagens de erro inline
- Submit com loading state
- Feedback de sucesso (toast)

### Tabelas
- Ordenação: Clique no header
- Filtros: Inputs acima da tabela
- Paginação: Controles na parte inferior
- Ações: Botões inline por linha

### Busca
- Busca em tempo real
- Highlight de resultados
- Limpar busca

---

## 📊 Mock Data Structure

### Produtos (30+ itens)
```javascript
{
  id: 1,
  codigo: "PROD-001",
  nome: "Parafuso M5 x 20mm",
  descricao: "Parafuso de aço inox...",
  categoria_id: 2,
  quantidade_atual: 150,
  quantidade_minima: 50,
  quantidade_maxima: 500,
  preco_aquisicao: 0.50,
  custo_medio_ponderado: 0.48,
  unidade_medida: "UN",
  localizacao_fisica: "Prateleira A-01",
  prazo_validade: null,
  status: "OK", // OK, BAIXO, CRITICO
  ativo: true,
  data_cadastro: "2024-01-15T10:00:00Z"
}
```

### Categorias (15+ itens, hierárquica)
```javascript
{
  id: 1,
  nome: "Ferramentas",
  descricao: "Ferramentas diversas",
  categoria_pai_id: null,
  ativo: true,
  data_criacao: "2024-01-01T00:00:00Z"
}
```

### Fornecedores (10+ itens)
```javascript
{
  id: 1,
  razao_social: "Ferragens ABC Ltda",
  nome_fantasia: "Ferragens ABC",
  cnpj: "12.345.678/0001-90",
  telefone: "(11) 98765-4321",
  email: "contato@ferragensabc.com",
  endereco: "Rua Exemplo, 123...",
  tempo_medio_entrega_dias: 7,
  condicoes_pagamento: "30/60 dias",
  ativo: true,
  data_cadastro: "2024-01-01T00:00:00Z"
}
```

### Movimentações (50+ itens)
```javascript
{
  id: 1,
  produto_id: 1,
  usuario_id: 1,
  tipo: "ENTRADA_COMPRA", // ENTRADA_COMPRA, ENTRADA_DEVOLUCAO, SAIDA_VENDA, SAIDA_PERDA, TRANSFERENCIA, AJUSTE_INVENTARIO
  quantidade: 100,
  preco_unitario: 0.48,
  documento_fiscal: "NF-12345",
  observacao: "Compra regular",
  local_origem: null,
  local_destino: null,
  data_hora: "2024-01-20T14:30:00Z"
}
```

### Alertas (15+ itens)
```javascript
{
  id: 1,
  produto_id: 3,
  data_alerta: "2024-01-25T08:00:00Z",
  quantidade_sugerida: 100,
  prioridade: "URGENTE", // URGENTE, ALTA, MEDIA, BAIXA
  visualizado: false,
  data_visualizacao: null,
  data_resolucao: null,
  observacao: null
}
```

### Usuários (5+ itens)
```javascript
{
  id: 1,
  nome: "João Silva",
  email: "joao@empresa.com",
  perfil: "GERENTE"
}
```

---

## 🔧 Technical Specifications

### Tecnologias
- **HTML5**: Estrutura semântica
- **CSS3**: Variáveis CSS, Grid, Flexbox, Animations
- **JavaScript (Vanilla)**: Sem frameworks (ou jQuery mínimo)
- **Chart.js**: Gráficos e visualizações
- **Font Awesome**: Ícones
- **Google Fonts**: Poppins, Inter, JetBrains Mono

### Estrutura de Arquivos
```
app/dashboard/
├── pages/
│   └── estoque-completo.html
├── css/
│   ├── theme-unified.css
│   ├── common.css
│   └── [outros CSS]
├── js/
│   ├── estoque-completo.js
│   └── mock-data-estoque.js
└── ...
```

### Performance
- Lazy loading de tabs (carregar conteúdo sob demanda)
- Debounce em buscas (300ms)
- Virtual scrolling para listas grandes (opcional)
- Otimização de animações (will-change, transform)

### Acessibilidade
- ARIA labels em todos os elementos interativos
- Navegação por teclado (Tab, Enter, ESC)
- Indicadores de foco visíveis
- Contraste adequado (WCAG AA)
- Suporte a screen readers

### Responsividade
- **Mobile**: < 768px
  - Tabs scrolláveis horizontalmente
  - Tabelas com scroll horizontal
  - Modais em tela cheia
  - Botões maiores (touch-friendly)

- **Tablet**: 768px - 1024px
  - Layout adaptado
  - Tabs visíveis

- **Desktop**: > 1024px
  - Layout completo
  - Todas as funcionalidades

### Compatibilidade
- Chrome/Edge: Últimas 2 versões
- Firefox: Últimas 2 versões
- Safari: Últimas 2 versões
- Mobile: iOS Safari, Chrome Mobile

---

## ✅ Checklist de Implementação

### Fase 1: Estrutura Base
- [ ] HTML base com tabs
- [ ] CSS theme unificado
- [ ] Estrutura de mock data

### Fase 2: Componentes
- [ ] Cards, botões, inputs
- [ ] Modais
- [ ] Tabelas
- [ ] Formulários

### Fase 3: Funcionalidades
- [ ] Dashboard com métricas
- [ ] CRUD de produtos
- [ ] Gestão de categorias
- [ ] Gestão de fornecedores
- [ ] Movimentações
- [ ] Alertas
- [ ] Relatórios

### Fase 4: Interações
- [ ] Navegação por tabs
- [ ] Modais funcionais
- [ ] Formulários com validação
- [ ] Busca e filtros
- [ ] Gráficos

### Fase 5: Polish
- [ ] Animações suaves
- [ ] Responsividade
- [ ] Acessibilidade
- [ ] Testes finais

---

**Documento criado para:** WorkConnect - Sistema de Gestão de Estoque  
**Autor:** Equipe de Desenvolvimento  
**Última atualização:** 2025-01-12

