# 🗺️ Roadmap de Desenvolvimento - Work Connect
## Planejamento Completo: MVP ao Sistema Funcional de Gestão de Estoque

📍 **Navegação:**
🏠 [README Principal](../README.md) | 📖 [Tutorial Completo](./TUTORIAL_CONTRIBUICAO_COMPLETO.md) | 📘 [CONTRIBUTING](./CONTRIBUTING.md)

---

**Projeto:** Work Connect - Sistema de Gestão de Estoque para PMEs  
**Período:** Dezembro 2024 - Agosto 2025 (9 meses)  
**Objetivo:** Protótipo completamente funcional com conformidade LGPD

> 📖 **Para implementar:** Consulte o [Tutorial Completo](./TUTORIAL_CONTRIBUICAO_COMPLETO.md) para guias passo-a-passo

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Timeline de Fases](#-timeline-de-fases)
- [FASE 1: MVP - Interface e Prototipagem](#-fase-1-mvp---interface-e-prototipagem)
- [FASE 2: Funcionalidades Avançadas Frontend](#-fase-2-funcionalidades-avançadas-frontend)
- [FASE 3: Backend e Banco de Dados](#-fase-3-backend-e-banco-de-dados)
- [FASE 4: Mobile com QR Codes](#-fase-4-mobile-com-qr-codes)
- [FASE 5: Integrações e Business Intelligence](#-fase-5-integrações-e-business-intelligence)
- [FASE 6: Testes e Qualidade](#-fase-6-testes-e-qualidade)
- [FASE 7: Deploy e Produção](#-fase-7-deploy-e-produção)
- [FASE 8: Documentação Final e Apresentação TCC](#-fase-8-documentação-final-e-apresentação-tcc)
- [Métricas de Sucesso](#-métricas-de-sucesso)
- [Priorização](#-priorização)
- [Como Contribuir](#-como-contribuir)

---

## 🎯 Visão Geral

### Objetivo do Roadmap

Desenvolver incrementalmente o **Work Connect**, partindo do MVP atual (interface HTML/CSS/JS) até um **sistema completo de gestão de estoque** pronto para uso por PMEs, com conformidade legal LGPD e deploy em produção.

### Escopo do Projeto (Baseado no PDF Oficial)

**Foco Principal:** 📦 Gestão de Estoque  
**Público-Alvo:** PMEs (R$ 360k-4.8M/ano, 1-50 funcionários)  
**Problema Resolvido:** Fragmentação de dados, perdas por falta, produtos obsoletos

**Funcionalidades Core:**
1. ✅ Cadastro de produtos/categorias/fornecedores
2. ✅ Registro de movimentações (entradas/saídas)
3. ✅ Alertas automáticos de reposição
4. ✅ Relatórios em PDF/Excel/CSV
5. ✅ Conformidade LGPD obrigatória
6. ✅ Dashboard com produtos críticos

**Stack Tecnológica:**
- Frontend: HTML/CSS/JS → **React.js**
- Backend: **Node.js + Express**
- Banco de Dados: **PostgreSQL**
- Mobile (futuro): **React Native** com QR codes
- Auth: **OAuth 2.0 + JWT**

**Fora do Escopo (removido do planejamento anterior):**
- ❌ Sistema RFID completo
- ❌ Módulo de Ordens de Serviço
- ❌ Sistema complexo de Vendas/Finanças
- ❌ Multi-localização avançada

### Metodologia de Desenvolvimento

**Desenvolvimento Incremental (Agile):**
- Sprints de 2 semanas
- Entregas pequenas e funcionais
- Testes contínuos
- Documentação atualizada

**Baseado em:**
- [📊 Diagrama de Classes](./doc/diagrama-classes-estoque.md) - 12 classes
- [🗄️ MER Conceitual](./doc/diagrama-mer-conceitual.md) - 8 entidades, 20 regras
- [💾 DER Físico](./doc/diagrama-der-estoque.md) - 10 tabelas + SQL
- [👥 Casos de Uso](./doc/diagrama-casos-de-uso-estoque.md) - 27 casos
- [🔒 LGPD](./doc/LGPD-COMPLIANCE.md) - Conformidade legal
- [📄 PDF Oficial do TCC](./doc/Projeto%20De%20Apresentaçao%20(2).pdf)

### Duração Total

**9 meses** (Dezembro 2024 - Agosto 2025)

---

## 📅 Timeline de Fases

```mermaid
timeline
    title Work Connect - Roadmap Completo (9 Meses)
    
    section FASE 1: MVP
        Dez 2024 - Jan 2025 : Interface HTML completa
                            : Dashboard com alertas visuais
                            : Gráficos Chart.js
                            : Exportação CSV
    
    section FASE 2: Frontend Avançado
        Jan - Fev 2025 : Migração para React.js
                       : CRUD completo
                       : Validações (CPF, CNPJ, email)
                       : LocalStorage
                       : Material-UI componentes
    
    section FASE 3: Backend + LGPD
        Fev - Mar 2025 : Node.js + Express API
                       : PostgreSQL 10 tabelas
                       : 4 Triggers automáticos
                       : Autenticação JWT
                       : LGPD compliance completo
    
    section FASE 4: Mobile QR
        Mar - Abr 2025 : React Native app
                       : Scanner QR Code
                       : Modo offline
                       : Sincronização automática
    
    section FASE 5: Integrações
        Abr - Mai 2025 : Integração ERP básica
                       : Dashboards KPIs
                       : Análise preditiva
                       : Relatórios avançados
    
    section FASE 6: Testes
        Mai - Jun 2025 : Testes automatizados
                       : Performance (Lighthouse)
                       : Segurança e LGPD audit
                       : Usabilidade (WCAG)
    
    section FASE 7: Deploy
        Jun - Jul 2025 : Cloud setup (AWS/Azure)
                       : CI/CD GitHub Actions
                       : Monitoramento Sentry
                       : Backup automático
    
    section FASE 8: TCC Final
        Jul - Ago 2025 : Documentação completa
                       : Manual do usuário
                       : Artigo científico ABNT
                       : Apresentação final
```

---

## 🚀 FASE 1: MVP - Interface e Prototipagem

**Status:** ✅ 70% Concluído  
**Prazo:** Dezembro 2024 - Janeiro 2025 (2 meses)  
**Objetivo:** Interface funcional com visualização de dados mockados

### 1.1. Interface HTML Completa

#### ✅ Concluído (Dezembro 2024)

- [x] **Landing page responsiva** ([`app/landing/index.html`](./app/landing/index.html))
  - Hero section com call-to-action
  - Seção de problemas e soluções
  - FAQ interativo (accordion)
  - Design sanguine/dark responsivo

- [x] **Dashboard principal** ([`app/dash.html`](./app/dash.html))
  - Métricas de vendas do mês, novos clientes
  - Gráfico de fluxo de caixa (Chart.js)
  - Lista de tarefas (to-do list interativa)
  - Tabela de transações recentes
  - Exportação CSV

- [x] **Páginas de módulos:**
  - [`app/estoque.html`](./app/estoque.html) - **Módulo principal** do projeto ⭐
  - [`app/financas.html`](./app/financas.html) - Finanças básicas
  - [`app/vendas.html`](./app/vendas.html) - Vendas básicas
  - [`app/relatorios.html`](./app/relatorios.html) - Relatórios
  - [`app/configuracoes.html`](./app/configuracoes.html) - Configurações

- [x] **Sidebar de navegação**
  - Links entre todas as páginas
  - Ícones Font Awesome
  - Responsiva (collapse em mobile)

#### 📅 Pendente (Janeiro 2025)

- [ ] **Transformar dashboard em foco de estoque**
  - Métricas: Total Produtos, Críticos, Baixos, OK
  - Gráfico de distribuição por categoria (pie chart)
  - Tabela de produtos abaixo do mínimo (top 10)
  - Card de alertas de reposição com badge
  - **Issue:** #1 - Refatorar dashboard para foco estoque
  - **Responsável:** A definir
  - **Prioridade:** 🔴 Alta

- [ ] **Formulários de cadastro**
  - Cadastro de produto (modal ou página)
  - Cadastro de fornecedor
  - Registro de movimentação
  - Validação client-side (JavaScript)
  - **Issue:** #2 - Implementar formulários
  - **Prioridade:** 🔴 Alta

### 1.2. Estilização CSS

#### ✅ Concluído

- [x] Design system com variáveis CSS ([`app/dashboard/css/common.css`](./app/dashboard/css/common.css))
  - Paleta de cores customizável
  - Tema dark/sanguine
  - Componentes reutilizáveis (cards, badges, tabelas)
  
- [x] Responsividade mobile (breakpoint 900px)
- [x] Cards com glassmorphism
- [x] Badges de status coloridos (OK=verde, BAIXO=amarelo, CRÍTICO=vermelho)

#### 📅 Pendente

- [ ] **Micro-interações**
  - Hover effects suaves
  - Loading states (spinners, skeletons)
  - Transições entre estados
  - **Biblioteca:** Tailwind CSS ou styled-components
  - **Prioridade:** 🟡 Média

### 1.3. JavaScript Básico

#### ✅ Concluído

- [x] Gráficos interativos (Chart.js)
- [x] To-do list (adicionar, marcar, remover)
- [x] Exportação CSV de tabelas
- [x] FAQ accordion

#### 📅 Pendente

- [ ] **LocalStorage para persistência**
  - Salvar produtos mockados
  - Salvar movimentações
  - Salvar preferências
  - **Arquivo:** `/app/js/storage.js`
  - **Prioridade:** 🟡 Média

- [ ] **Máscaras de input**
  - CNPJ: `00.000.000/0000-00`
  - Telefone: `(00) 00000-0000`
  - Moeda: `R$ 0.000,00`
  - **Biblioteca:** IMask.js ou Cleave.js
  - **Prioridade:** 🟡 Média

---

## 💎 FASE 2: Funcionalidades Avançadas Frontend

**Status:** 📅 Planejado  
**Prazo:** Janeiro - Fevereiro 2025 (2 meses)  
**Objetivo:** Migrar para React.js e implementar CRUD completo

### 2.1. Migração para React.js

- [ ] **Setup do projeto React**
  - Create React App ou Vite
  - Estrutura de pastas (components, pages, services)
  - Configurar ESLint + Prettier
  - **Comando:** `npx create-react-app workconnect-client`
  - **Duração:** 1 semana

- [ ] **Biblioteca de componentes**
  - **Opção A:** Material-UI (completo, maduro)
  - **Opção B:** Ant Design (empresarial)
  - **Recomendado:** Material-UI
  - **Install:** `npm install @mui/material @emotion/react @emotion/styled`

- [ ] **Rotas e navegação**
  - React Router v6
  - Rotas protegidas (autenticação)
  - Navegação com sidebar
  - **Arquivo:** `/src/routes/AppRoutes.jsx`

- [ ] **Migrar páginas HTML para React**
  - Dashboard → `/src/pages/Dashboard.jsx`
  - Estoque → `/src/pages/Estoque.jsx` (PRINCIPAL)
  - Fornecedores → `/src/pages/Fornecedores.jsx`
  - Movimentações → `/src/pages/Movimentacoes.jsx`
  - Relatórios → `/src/pages/Relatorios.jsx`
  - Configurações → `/src/pages/Configuracoes.jsx`

### 2.2. CRUD Completo de Produtos

- [ ] **Listar produtos** (UC204)
  - Tabela com paginação
  - Busca por nome/código
  - Filtros: categoria, status
  - Ordenação por colunas
  - **Componente:** `/src/components/ProdutosList.jsx`
  - **API Mock:** `/src/services/api/produtos.js`

- [ ] **Cadastrar produto** (UC201)
  - Modal ou página dedicada
  - Formulário com validações:
    - Código único (validação async)
    - Nome obrigatório
    - Quantidade mínima > 0
    - Quantidade máxima > mínima
    - Preço ≥ 0
  - Seleção de categoria (tree select hierárquico)
  - **Componente:** `/src/components/ProdutoForm.jsx`
  - **Validação:** React Hook Form + Yup

- [ ] **Editar produto** (UC202)
  - Mesmo formulário de cadastro
  - Pré-preenchido com dados atuais
  - **Ação:** PUT /api/produtos/:id

- [ ] **Excluir produto** (UC203)
  - Confirmação modal
  - Soft delete (ativo = false)
  - Validação: não pode excluir se houver movimentações
  - **Ação:** DELETE /api/produtos/:id

### 2.3. CRUD de Fornecedores

- [ ] **Listar fornecedores**
  - Tabela com busca
  - Indicador: quantos produtos fornece
  - **Componente:** `/src/components/FornecedoresList.jsx`

- [ ] **Cadastrar fornecedor** (UC301)
  - Formulário com validações:
    - CNPJ único e válido
    - Razão social obrigatória
    - Email válido (opcional)
    - Telefone formatado (opcional)
  - **Validação CNPJ:** Algoritmo de verificação de dígitos

- [ ] **Vincular produto a fornecedor** (UC302)
  - Tela de edição de produto
  - Adicionar até 3 fornecedores
  - Definir prioridade (1=Principal, 2=Secundário, 3=Backup)
  - Informar preço e prazo de entrega
  - **Componente:** `/src/components/VincularFornecedor.jsx`

### 2.4. Sistema de Validações

- [ ] **Biblioteca de validações**
  - Yup para schemas
  - Validadores customizados (CPF, CNPJ)
  - **Arquivo:** `/src/utils/validators.js`

```javascript
// Exemplo de validação
const produtoSchema = yup.object().shape({
  codigo: yup.string()
    .required('Código é obrigatório')
    .test('unique', 'Código já existe', async (value) => {
      return await verificarCodigoUnico(value);
    }),
  nome: yup.string().required('Nome é obrigatório'),
  quantidade_minima: yup.number()
    .required()
    .min(1, 'Mínimo deve ser maior que zero'),
  quantidade_maxima: yup.number()
    .required()
    .moreThan(yup.ref('quantidade_minima'), 'Máximo deve ser maior que mínimo'),
  preco_aquisicao: yup.number()
    .required()
    .min(0, 'Preço não pode ser negativo')
});
```

- [ ] **Validação de CNPJ**
  - Algoritmo de dígito verificador
  - Formatação automática
  - **Arquivo:** `/src/utils/cnpjValidator.js`

### 2.5. Feedback Visual

- [ ] **Toasts de notificação**
  - Sucesso, erro, aviso, info
  - Auto-dismiss (4 segundos)
  - **Biblioteca:** react-toastify ou notistack

- [ ] **Loading states**
  - Spinners em botões
  - Skeleton screens em tabelas
  - Progress bars para importações
  - **Biblioteca:** @mui/material CircularProgress

- [ ] **Mensagens de erro claras**
  - Contextuais e específicas
  - Sugestões de correção
  - **UX:** Inline errors + toast para erros gerais

---

## 🔧 FASE 3: Backend e Banco de Dados

**Status:** 📅 Planejado  
**Prazo:** Fevereiro - Março 2025 (2 meses)  
**Objetivo:** Persistência real de dados + conformidade LGPD

### 3.1. Setup do Backend Node.js

- [ ] **Estrutura do projeto**
  ```
  server/
  ├── src/
  │   ├── config/          # DB, env, etc
  │   ├── controllers/     # Lógica de negócio
  │   ├── models/          # Sequelize models
  │   ├── routes/          # Rotas API
  │   ├── middleware/      # Auth, LGPD audit, etc
  │   ├── services/        # Lógica reutilizável
  │   ├── utils/           # Helpers
  │   ├── jobs/            # Cron jobs LGPD
  │   └── app.js           # Express app
  ├── database/
  │   ├── migrations/      # Sequelize migrations
  │   ├── seeders/         # Dados de exemplo
  │   └── scripts/         # SQL direto (triggers, views)
  ├── tests/               # Jest tests
  ├── .env.example
  ├── package.json
  └── README.md
  ```

- [ ] **Dependências principais**
  ```json
  {
    "dependencies": {
      "express": "^4.18.0",
      "sequelize": "^6.35.0",
      "pg": "^8.11.0",
      "bcrypt": "^5.1.0",
      "jsonwebtoken": "^9.0.0",
      "dotenv": "^16.0.0",
      "cors": "^2.8.5",
      "helmet": "^7.1.0",
      "express-rate-limit": "^7.1.0",
      "winston": "^3.11.0",
      "node-cron": "^3.0.0"
    },
    "devDependencies": {
      "nodemon": "^3.0.0",
      "jest": "^29.7.0",
      "supertest": "^6.3.0"
    }
  }
  ```

### 3.2. Banco de Dados PostgreSQL

- [ ] **Criar banco de dados**
  ```sql
  CREATE DATABASE workconnect_db
    WITH ENCODING='UTF8'
         LC_COLLATE='pt_BR.UTF-8'
         LC_CTYPE='pt_BR.UTF-8';
  ```

- [ ] **Executar scripts de criação (10 tabelas)**
  - Baseado em [diagrama-der-estoque.md](./doc/diagrama-der-estoque.md)
  - Ordem de execução:
    1. perfil
    2. usuario (com campos LGPD)
    3. categoria
    4. produto
    5. fornecedor
    6. produto_fornecedor (N:M)
    7. movimentacao_estoque
    8. alerta_reposicao
    9. relatorio
    10. auditoria_lgpd
  - **Duração:** 2 dias
  - **Referência:** [Scripts SQL Completos](./doc/diagrama-der-estoque.md#scripts-sql-de-criação---postgresql)

- [ ] **Implementar triggers (4 automáticos)**
  1. `fn_atualizar_status_produto()` - Calcula OK/BAIXO/CRÍTICO
  2. `fn_gerar_alerta_reposicao()` - Cria alerta quando < mínimo
  3. `fn_calcular_custo_medio()` - Custo médio ponderado
  4. `fn_auditar_lgpd()` - Auditoria automática
  - **Referência:** [Triggers](./doc/diagrama-der-estoque.md#triggers-automáticos)

- [ ] **Criar views (5 úteis)**
  1. `vw_estoque_completo` - Join de produto + categoria + fornecedor
  2. `vw_produtos_criticos` - Produtos abaixo do mínimo
  3. `vw_movimentacoes_mes` - Movimentações do mês
  4. `vw_dashboard_alertas` - Métricas agregadas
  5. `vw_analise_fornecedores` - Desempenho de fornecedores
  - **Referência:** [Views](./doc/diagrama-der-estoque.md#views-úteis)

- [ ] **Criar procedures (3)**
  1. `sp_registrar_movimentacao()` - Lógica completa de movimentação
  2. `sp_exportar_dados_usuario()` - LGPD: exportação JSON
  3. `sp_anonimizar_usuario()` - LGPD: direito ao esquecimento
  - **Referência:** [Procedures](./doc/diagrama-der-estoque.md#stored-procedures)

- [ ] **Dados de exemplo (seed)**
  - 4 categorias de exemplo
  - 10 produtos variados
  - 3 fornecedores
  - 20 movimentações de exemplo
  - **Arquivo:** `/database/seeders/001-exemplo-dados.js`

### 3.3. API REST

**Estrutura de Endpoints:**

#### Autenticação (OAuth 2.0)
- [ ] `POST /api/auth/login` - Login com email/senha
- [ ] `POST /api/auth/refresh` - Renovar token JWT
- [ ] `POST /api/auth/logout` - Invalidar token
- [ ] `GET /api/auth/me` - Dados do usuário autenticado
- [ ] **Segurança:** JWT com expiração 30min, refresh token 7 dias

#### Produtos
- [ ] `GET /api/produtos` - Listar (paginado, filtros)
- [ ] `GET /api/produtos/:id` - Buscar um
- [ ] `POST /api/produtos` - Criar (Admin, Gerente)
- [ ] `PUT /api/produtos/:id` - Atualizar (Admin, Gerente)
- [ ] `DELETE /api/produtos/:id` - Soft delete (Admin)
- [ ] `GET /api/produtos/criticos` - Produtos abaixo do mínimo
- [ ] `GET /api/produtos/:id/historico` - Histórico de movimentações
- [ ] `POST /api/produtos/importar-excel` - Importação em massa

#### Fornecedores
- [ ] `GET /api/fornecedores` - Listar
- [ ] `POST /api/fornecedores` - Criar (Admin)
- [ ] `PUT /api/fornecedores/:id` - Atualizar
- [ ] `POST /api/produtos/:id/fornecedores` - Vincular fornecedor

#### Movimentações
- [ ] `GET /api/movimentacoes` - Listar (filtros por tipo, produto, período)
- [ ] `POST /api/movimentacoes` - Criar (Admin, Gerente, Operador)
  - Chama `sp_registrar_movimentacao()`
  - Retorna: nova quantidade, novo status, alerta gerado
- [ ] `GET /api/movimentacoes/resumo-mes` - Totais do mês

#### Alertas
- [ ] `GET /api/alertas` - Listar não visualizados
- [ ] `PUT /api/alertas/:id/visualizar` - Marcar visualizado
- [ ] `PUT /api/alertas/:id/resolver` - Marcar resolvido

#### Relatórios
- [ ] `POST /api/relatorios/gerar` - Gerar relatório
  - Parâmetros: tipo, periodo_inicio, periodo_fim, formato
  - Retorna: arquivo PDF/XLSX/CSV
  - **Bibliotecas:** pdfmake, exceljs

#### LGPD
- [ ] `POST /api/lgpd/consentimento` - Registrar consentimento
- [ ] `GET /api/lgpd/exportar-dados` - Exportar dados pessoais (UC702)
  - Chama `sp_exportar_dados_usuario()`
  - Envia email com link
- [ ] `POST /api/lgpd/solicitar-exclusao` - Solicitar exclusão (UC703)
- [ ] `GET /api/lgpd/auditoria` - Consultar logs (Admin)

**Padrões da API:**
- Versionamento: `/api/v1/`
- Paginação: `?page=1&limit=20`
- Filtros: `?status=CRITICO&categoria=1`
- Ordenação: `?sort=nome&order=asc`
- Formato resposta:
  ```json
  {
    "success": true,
    "data": { ... },
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 150
    }
  }
  ```

### 3.4. Autenticação e Autorização

- [ ] **JWT Authentication**
  - Access token (30 minutos)
  - Refresh token (7 dias)
  - Armazenamento: httpOnly cookies
  - **Middleware:** `/src/middleware/auth.js`

```javascript
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
```

- [ ] **Controle de permissões por perfil**
  - Middleware de autorização
  - Validação baseada em perfil
  - **Arquivo:** `/src/middleware/authorize.js`

```javascript
const authorize = (perfilPermitido) => {
  return (req, res, next) => {
    const perfil = req.user.perfil;
    
    if (!perfilPermitido.includes(perfil)) {
      return res.status(403).json({ 
        error: 'Acesso negado para seu perfil' 
      });
    }
    
    next();
  };
};

// Uso
router.post('/produtos', 
  verificarToken, 
  authorize(['ADMINISTRADOR', 'GERENTE']), 
  criarProduto
);
```

### 3.5. Conformidade LGPD (Backend)

- [ ] **Middleware de auditoria automática**
  - Intercepta rotas que acessam dados pessoais
  - Registra em auditoria_lgpd
  - **Arquivo:** `/src/middleware/lgpdAudit.js`

- [ ] **Controller LGPD**
  - Exportação de dados (JSON)
  - Solicitação de exclusão
  - Consulta de auditoria
  - **Arquivo:** `/src/controllers/lgpdController.js`
  - **Referência:** [LGPD Implementation](./doc/LGPD-COMPLIANCE.md#backend-nodejs)

- [ ] **Jobs automáticos (cron)**
  1. Anonimizar usuários (diário 04:00)
  2. Limpar alertas antigos (diário 02:00)
  3. Expirar relatórios (diário 03:00)
  - **Arquivo:** `/src/jobs/lgpdJobs.js`
  - **Biblioteca:** node-cron

### 3.6. Integração Frontend-Backend

- [ ] **Service layer (Axios)**
  - Wrapper de requisições
  - Interceptors para auth
  - Tratamento global de erros
  - **Arquivo:** `/src/services/api.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado - redirecionar para login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

- [ ] **Loading states globais**
  - Context API ou Redux
  - Loading overlay
  - **Arquivo:** `/src/contexts/LoadingContext.jsx`

- [ ] **Tratamento de erros**
  - Try-catch em todas as requisições
  - Mensagens amigáveis
  - Logging (Sentry futuro)

---

## 📱 FASE 4: Mobile com QR Codes

**Status:** 📅 Planejado  
**Prazo:** Março - Abril 2025 (2 meses)  
**Objetivo:** App nativo com scanner QR e modo offline

### 4.1. Aplicativo React Native

- [ ] **Setup do projeto**
  ```bash
  npx react-native init WorkConnectMobile
  cd WorkConnectMobile
  ```

- [ ] **Navegação**
  - React Navigation v6
  - Bottom tabs (Dashboard, Estoque, Movimentações, Alertas, Mais)
  - Stack navigation para detalhes
  - **Biblioteca:** @react-navigation/native

- [ ] **Telas principais**
  1. Login
  2. Dashboard (métricas mobile-friendly)
  3. Listagem de produtos (com busca)
  4. Scanner QR Code ⭐
  5. Registro de movimentação
  6. Alertas de reposição
  7. Configurações

### 4.2. Scanner QR Code

- [ ] **Implementação de scanner**
  - Acesso à câmera do dispositivo
  - Detecção de QR code
  - Feedback visual (quadrado de foco)
  - **Biblioteca:** react-native-camera ou react-native-vision-camera

```javascript
import { RNCamera } from 'react-native-camera';

const ScannerQRCode = ({ onScan }) => {
  const handleBarCodeRead = ({ data }) => {
    // data = código do produto
    onScan(data);
  };
  
  return (
    <RNCamera
      style={styles.camera}
      type={RNCamera.Constants.Type.back}
      onBarCodeRead={handleBarCodeRead}
      barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
    />
  );
};
```

- [ ] **Geração de QR codes**
  - Gerar QR para cada produto
  - Incluir: código do produto
  - Imprimir etiquetas
  - **Biblioteca:** qrcode (Node.js) ou react-native-qrcode-svg

- [ ] **Fluxo de uso:**
  1. Operador abre app
  2. Clica em "Registrar Saída"
  3. Escaneia QR code do produto
  4. Informa quantidade
  5. Sistema registra offline (se sem internet)
  6. Sincroniza quando reconectar

### 4.3. Modo Offline

- [ ] **Storage local**
  - AsyncStorage para React Native
  - Armazenar:
    - Produtos (cache)
    - Movimentações pendentes
    - Alertas
  - **Biblioteca:** @react-native-async-storage/async-storage

- [ ] **Sincronização automática**
  - Detectar reconexão
  - Enviar dados pendentes
  - Resolver conflitos (timestamp)
  - **Biblioteca:** react-native-netinfo

- [ ] **Indicador de status**
  - Badge: 🟢 Online | 🔴 Offline
  - Contador: "3 movimentações pendentes"
  - **UX:** Avisar antes de ações offline

### 4.4. Push Notifications

- [ ] **Alertas de reposição**
  - Notificação quando produto fica crítico
  - Badge no ícone do app
  - **Serviço:** Firebase Cloud Messaging (FCM)

- [ ] **Configurações de notificação**
  - Usuário pode ativar/desativar
  - Escolher horários (não receber à noite)
  - **Storage:** Preferências no backend

---

## 📊 FASE 5: Integrações e Business Intelligence

**Status:** 📅 Planejado  
**Prazo:** Abril - Maio 2025 (2 meses)  
**Objetivo:** Conectar com ERPs e dashboards avançados

### 5.1. Integração com ERPs

- [ ] **Escolher ERPs para integração**
  - **Prioridade 1:** Bling (popular em PMEs)
  - **Prioridade 2:** Conta Azul
  - **Prioridade 3:** Omie

- [ ] **Integração com Bling**
  - API REST do Bling
  - Sincronização de produtos
  - Sincronização de movimentações
  - **Docs:** [Bling API](https://developer.bling.com.br/)

- [ ] **Sincronização bidirecional**
  - Work Connect → ERP (exportar movimentações)
  - ERP → Work Connect (importar produtos)
  - Resolução de conflitos (master/slave ou timestamp)
  - **Periodicidade:** A cada hora ou manual

### 5.2. Dashboards KPIs Avançados

- [ ] **Taxa de Rotatividade de Estoque**
  - Fórmula: (Custo das Vendas / Estoque Médio)
  - Gráfico de tendência (últimos 6 meses)
  - **View SQL:** vw_rotatividade_estoque

- [ ] **Custo de Obsolescência**
  - Produtos sem movimentação > 90 dias
  - Valor parado em estoque
  - Sugestão de liquidação
  - **Algoritmo:** Análise de movimentações

- [ ] **Previsão de Demanda**
  - Baseado em histórico de saídas
  - Média móvel ou regressão linear
  - Sugestão de quantidade de compra
  - **Biblioteca:** ml.js ou TensorFlow.js (opcional)

- [ ] **Análise ABC de Produtos**
  - Classe A: 20% dos produtos, 80% do valor
  - Classe B: 30% dos produtos, 15% do valor
  - Classe C: 50% dos produtos, 5% do valor
  - **Gráfico:** Curva ABC

### 5.3. Relatórios Avançados

- [ ] **Relatórios parametrizáveis**
  - Filtros dinâmicos (múltiplos)
  - Salvar configurações de relatório
  - Agendamento (diário, semanal, mensal)
  - **Biblioteca:** node-cron para agendamento

- [ ] **Dashboards customizáveis**
  - Arrastar e soltar widgets
  - Salvar layout por usuário
  - Compartilhar dashboards
  - **Biblioteca:** react-grid-layout

- [ ] **Exportação avançada**
  - PDF com logo da empresa
  - Excel com múltiplas abas
  - Gráficos inclusos no PDF
  - **Bibliotecas:** pdfmake, exceljs

---

## ✅ FASE 6: Testes e Qualidade

**Status:** 📅 Planejado  
**Prazo:** Maio - Junho 2025 (2 meses)  
**Objetivo:** Garantir qualidade e estabilidade

### 6.1. Testes Automatizados

- [ ] **Testes unitários (Jest)**
  - Validadores (CNPJ, email, etc)
  - Funções de cálculo (custo médio, status)
  - Utilitários
  - **Cobertura:** > 80%
  - **Comando:** `npm test -- --coverage`

- [ ] **Testes de integração**
  - Endpoints da API
  - Fluxos completos (cadastro → movimentação → alerta)
  - **Ferramenta:** Supertest + Jest

- [ ] **Testes E2E (End-to-End)**
  - Simular usuário real
  - Cadastrar produto → Registrar saída → Verificar alerta
  - **Ferramenta:** Playwright ou Cypress
  - **Duração:** 3 semanas

### 6.2. Testes de Performance

- [ ] **Lighthouse score > 90**
  - Performance
  - Acessibilidade (WCAG 2.1)
  - Best Practices
  - SEO
  - **Ferramenta:** Chrome Lighthouse

- [ ] **Load testing**
  - Simular 50 usuários simultâneos
  - 10.000 produtos no banco
  - 100.000 movimentações
  - **Ferramenta:** Artillery ou K6

- [ ] **Otimizações**
  - Code splitting (React.lazy)
  - Lazy loading de imagens
  - Cache de consultas frequentes (Redis)
  - Minificação de assets

### 6.3. Testes de Segurança

- [ ] **Auditoria de vulnerabilidades**
  - `npm audit fix`
  - Snyk scan
  - OWASP Top 10 checklist
  - **Frequência:** Semanal

- [ ] **Testes de penetração (básicos)**
  - SQL injection (prevented by Sequelize)
  - XSS (sanitização de inputs)
  - CSRF protection
  - **Ferramenta:** OWASP ZAP

- [ ] **Auditoria LGPD**
  - Verificar logs de auditoria
  - Testar exportação de dados
  - Testar anonimização
  - Validar consentimento
  - **Checklist:** [LGPD Compliance](./doc/LGPD-COMPLIANCE.md#checklist-de-conformidade)

### 6.4. Testes de Usabilidade

- [ ] **Testes com usuários reais**
  - Recrutar 5-10 PMEs
  - Sessões de 30-60 minutos
  - Observar dificuldades
  - Coletar feedback
  - **Ferramenta:** UserTesting ou presencial

- [ ] **Acessibilidade (WCAG 2.1)**
  - Contraste adequado (AA)
  - Navegação por teclado
  - Alt text em imagens
  - Labels em formulários
  - **Ferramenta:** axe DevTools

---

## 🚀 FASE 7: Deploy e Produção

**Status:** 📅 Planejado  
**Prazo:** Junho - Julho 2025 (2 meses)  
**Objetivo:** Sistema no ar, monitorado e escalável

### 7.1. Infraestrutura Cloud

- [ ] **Escolher provider**
  - **Opção A:** Vercel (frontend) + Railway (backend) - **Recomendado para TCC**
    - Pros: Simples, CI/CD integrado, free tier generoso
    - Cons: Menos controle
  - **Opção B:** AWS (EC2, RDS, S3)
    - Pros: Escalável, controle total
    - Cons: Mais complexo, custo maior
  - **Opção C:** Azure (App Service, PostgreSQL)
    - Pros: Integração Microsoft
    - Cons: Curva de aprendizado

- [ ] **Configurar servidores**
  - **Frontend:** Vercel ou Netlify
  - **Backend:** Railway ou Heroku
  - **Banco:** Supabase (PostgreSQL managed) ou Railway
  - **Arquivos:** AWS S3 ou Cloudinary

- [ ] **Domínio e SSL**
  - Registrar domínio: workconnect.com.br
  - SSL gratuito: Let's Encrypt
  - **Custo:** ~R$ 40/ano

### 7.2. CI/CD (Integração e Deploy Contínuos)

- [ ] **GitHub Actions**
  - Workflow de testes
  - Workflow de deploy
  - **Arquivo:** `.github/workflows/deploy.yml`

```yaml
name: Deploy Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      
  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          
  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: railway-deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
```

- [ ] **Preview de PRs**
  - Deploy automático para cada PR
  - URL única para testes
  - **Vercel:** Automático

- [ ] **Rollback automático**
  - Se deploy falha, voltar para versão anterior
  - **Estratégia:** Blue-green deployment

### 7.3. Monitoramento

- [ ] **Logs centralizados**
  - Winston (Node.js) para logs
  - Agregação em serviço externo
  - **Ferramenta:** Logtail ou Papertrail (free tier)

- [ ] **Métricas de performance (APM)**
  - Response times
  - Error rates
  - Throughput
  - **Ferramenta:** New Relic (free tier) ou Datadog

- [ ] **Alertas de erro**
  - Captura de exceções frontend e backend
  - Stack traces detalhados
  - Notificações por email
  - **Ferramenta:** Sentry.io (free para projetos open-source)

- [ ] **Uptime monitoring**
  - Ping a cada 5 minutos
  - Alertas se downtime > 2 minutos
  - **Ferramenta:** UptimeRobot (free até 50 monitors)

### 7.4. Backup e Segurança

- [ ] **Backup automático do banco**
  - Diário às 00:00 (full backup)
  - Incremental a cada 6 horas (WAL archiving)
  - **Storage:** AWS S3 ou Backblaze B2
  - **Script:** pg_dump + upload para cloud

- [ ] **Disaster recovery plan**
  - Documentar procedimento de restore
  - Testar restore mensalmente
  - RTO: 4 horas | RPO: 6 horas
  - **Documento:** `/docs/disaster-recovery.md`

- [ ] **Segurança em produção**
  - HTTPS obrigatório (redirect HTTP → HTTPS)
  - HSTS headers
  - Rate limiting (100 req/min)
  - Helmet.js (security headers)

---

## 📚 FASE 8: Documentação Final e Apresentação TCC

**Status:** 📅 Planejado  
**Prazo:** Julho - Agosto 2025 (2 meses)  
**Objetivo:** Finalizar TCC com documentação completa

### 8.1. Documentação do Usuário

- [ ] **Manual do usuário (PDF)**
  - Guia passo a passo ilustrado
  - Screenshots anotados
  - Casos de uso práticos
  - Troubleshooting
  - **Ferramenta:** Gitbook ou Docusaurus
  - **Páginas:** ~50 páginas

- [ ] **Tutoriais em vídeo**
  - Como cadastrar produto (3 min)
  - Como registrar movimentação (2 min)
  - Como interpretar alertas (2 min)
  - Como gerar relatórios (3 min)
  - **Ferramenta:** OBS Studio + edição
  - **Total:** 4 vídeos (~10 min)

- [ ] **FAQ expandido**
  - 20+ perguntas frequentes
  - Categorizado por módulo
  - Busca integrada
  - **Formato:** Página web + PDF

### 8.2. Documentação Técnica

- [ ] **Atualizar diagramas finais**
  - Refletir implementação real
  - Adicionar diagramas de sequência (5 principais)
  - Adicionar diagramas de atividade (3 processos)
  - **Ferramenta:** Mermaid

- [ ] **Documentação da API (OpenAPI/Swagger)**
  - Todos os endpoints documentados
  - Exemplos de requests/responses
  - Try it out integrado
  - **Ferramenta:** Swagger UI
  - **Arquivo:** `/api-docs/swagger.yaml`

- [ ] **Guia de implantação**
  - Requisitos de servidor
  - Passo a passo de instalação
  - Configurações necessárias
  - Troubleshooting comum
  - **Arquivo:** `/docs/DEPLOYMENT.md`

- [ ] **Arquitetura de sistema**
  - Diagrama de infraestrutura
  - Fluxo de dados
  - Diagrama de componentes
  - **Ferramenta:** Draw.io ou Excalidraw

### 8.3. Apresentação do TCC

- [ ] **Slides de apresentação (PowerPoint/Google Slides)**
  - **Estrutura (20-30 slides):**
    1. Capa (título, autores, instituição)
    2. Problema (dados quantitativos de PMEs)
    3. Solução (Work Connect)
    4. Arquitetura técnica (diagramas)
    5. Funcionalidades principais (screenshots)
    6. Conformidade LGPD (diferencial)
    7. Demo ao vivo (ou vídeo)
    8. Resultados e métricas
    9. Conclusões e trabalhos futuros
  - **Design:** Profissional, visual, pouco texto
  - **Duração:** 15-20 minutos de apresentação

- [ ] **Demo ao vivo**
  - Ambiente de demonstração preparado
  - Dados de exemplo realistas
  - Roteiro ensaiado (5-7 minutos):
    1. Login e dashboard
    2. Cadastrar produto
    3. Registrar saída
    4. Mostrar alerta gerado
    5. Gerar relatório
    6. Exportar dados LGPD
  - **Backup:** Vídeo gravado se internet falhar

- [ ] **Vídeo demonstrativo (YouTube)**
  - Duração: 8-10 minutos
  - Narração profissional
  - Legendas PT-BR
  - Trilha sonora de fundo
  - **Ferramenta:** Camtasia ou DaVinci Resolve
  - **Roteiro:**
    1. Introdução ao problema (1 min)
    2. Apresentação do Work Connect (1 min)
    3. Tour pelas funcionalidades (5 min)
    4. Conformidade LGPD (1 min)
    5. Resultados e conclusão (1 min)

- [ ] **Artigo científico (ABNT)**
  - **Estrutura:**
    - Resumo (português + inglês)
    - Introdução
    - Referencial teórico
    - Metodologia
    - Desenvolvimento
    - Resultados e discussão
    - Conclusão
    - Referências bibliográficas
  - **Páginas:** 30-50 páginas
  - **Formatação:** ABNT (NBR 14724)
  - **Ferramenta:** Overleaf (LaTeX) ou Word com template ABNT
  - **Prazo:** Entregar 15 dias antes da apresentação

### 8.4. Testes Finais e Homologação

- [ ] **Teste de aceitação com PMEs**
  - 3-5 empresas pilotos
  - Período: 2 semanas de uso real
  - Coletar métricas:
    - Tempo de cadastro de produtos
    - Precisão de alertas
    - Satisfação (NPS)
    - Bugs encontrados

- [ ] **Correções finais**
  - Bugs críticos (prioridade máxima)
  - Melhorias de UX baseadas em feedback
  - Polimento final

- [ ] **Homologação completa**
  - Checklist de funcionalidades (27 casos de uso)
  - Checklist de LGPD (conformidade)
  - Checklist de performance
  - Aprovação do orientador

---

## 📊 Métricas de Sucesso

### Métricas Operacionais (Targets)

| Métrica | Target | Como Medir |
|---------|--------|------------|
| **Redução de tempo de atualização** | 30% | Tempo antes (planilha) vs depois (sistema) |
| **Precisão de inventário** | 99% | (Estoque físico / Estoque sistema) × 100 |
| **Tempo de geração de relatórios** | < 5 segundos | Para até 1.000 produtos |
| **Tempo de cadastro de produto** | < 2 minutos | Cronometragem de usuário teste |
| **Detecção de produtos críticos** | 95% | Alertas gerados vs real |

### Métricas Financeiras (Estimadas)

| Métrica | Target | Baseline |
|---------|--------|----------|
| **ROI (Return on Investment)** | 150% em 12 meses | Investimento R$ 35.000 |
| **Redução de perdas** | 40% | Perdas por falta de estoque |
| **Economia em armazenamento** | 30% | Custos com excesso de estoque |
| **Ganho de produtividade** | 15h/semana/funcionário | Tempo gasto em gestão manual |
| **Break-even** | 5-8 meses | Tempo para recuperar investimento |

### Métricas de Satisfação (NPS)

| Métrica | Target | Como Medir |
|---------|--------|------------|
| **Net Promoter Score (NPS)** | > 40 | Pergunta: "Recomendaria? 0-10" |
| **Taxa de adoção** | > 70% em 30 dias | Usuários ativos / Total de usuários |
| **Taxa de retenção** | > 85% em 12 meses | Empresas que continuam usando |
| **Tempo médio de treinamento** | < 4 horas | Por usuário novo |

### Métricas Técnicas

| Métrica | Target | Ferramenta |
|---------|--------|------------|
| **Uptime** | 99,5% | UptimeRobot |
| **Tempo de resposta API** | < 200ms (P95) | New Relic APM |
| **Lighthouse Score** | > 90 | Chrome Lighthouse |
| **Cobertura de testes** | > 80% | Jest coverage |
| **Bugs críticos em produção** | < 5 por mês | Sentry |

---

## 🎯 Priorização

### Prioridade CRÍTICA (Obrigatório para aprovação do TCC)

**Essencial para entrega:**

- 🔴 **FASE 1** - MVP (Interface funcional) - ✅ 70% concluído
- 🔴 **FASE 2** - Frontend React.js completo
- 🔴 **FASE 3** - Backend + PostgreSQL + LGPD
- 🔴 **FASE 6** - Testes (unitários, integração, E2E)
- 🔴 **FASE 7** - Deploy em cloud (mínimo staging)
- 🔴 **FASE 8** - Documentação e Apresentação TCC

**Prazo crítico:** Até Julho 2025 (entrega TCC)

**Casos de Uso Críticos:**
- UC201: Cadastrar Produto
- UC401/UC402: Registrar Entrada/Saída
- UC501: Visualizar Alertas
- UC603: Exportar Relatório
- UC701-703: LGPD (consentimento, exportação, exclusão)

---

### Prioridade ALTA (Diferenciais Importantes)

**Agregam valor significativo:**

- 🟠 **FASE 4** - Mobile com QR codes (diferencial técnico)
- 🟠 **FASE 5** - Integração ERP (diferencial de mercado)
- 🟠 Relatórios avançados (PDF profissional)
- 🟠 Dashboards KPIs (taxa de rotatividade, ABC)

**Prazo:** Até Junho 2025

**Justificativa:**
- Mobile mostra domínio de múltiplas plataformas
- Integração ERP mostra maturidade técnica
- KPIs demonstram entendimento de negócio

---

### Prioridade MÉDIA (Nice to Have)

**Extras se houver tempo:**

- 🟡 Análise preditiva de demanda (ML)
- 🟡 Dashboards customizáveis (drag-and-drop)
- 🟡 Multi-idioma (i18n)
- 🟡 Tema claro (modo escuro já implementado)

**Prazo:** Agosto 2025 (se sobrar tempo)

---

## 🤝 Como Contribuir com o Roadmap

### Escolhendo uma Tarefa

1. **Verifique a fase atual** (FASE 1 concluindo → FASE 2 próxima)
2. **Filtre por prioridade:** CRÍTICA > ALTA > MÉDIA
3. **Escolha conforme seu nível:**
   - 🟢 **Iniciante:** FASE 1 (HTML/CSS/JS)
   - 🟡 **Intermediário:** FASE 2 (React.js)
   - 🔴 **Avançado:** FASE 3 (Backend + BD)

### Processo de Contribuição

1. **Escolha um item não concluído** (`[ ]`)
2. **Crie uma Issue** referenciando o roadmap
   - Título: `[FASE X] Nome da tarefa`
   - Exemplo: `[FASE 3] Implementar trigger de alertas automáticos`
   - Label: `fase-3`, `backend`, `prioridade-crítica`

3. **Comente na Issue** manifestando interesse
4. **Siga o fluxo Git** em [CONTRIBUTING.md](./CONTRIBUTING.md):
   - Fork → Branch → Commit → PR

5. **Ao concluir:**
   - Marque `[x]` no roadmap
   - Faça PR atualizando este arquivo
   - Atualize progresso nas estatísticas

### Coordenação

- **Issues:** [GitHub Issues](https://github.com/seu-usuario/workconnect/issues)
- **Projects:** Board Kanban (vincular Issues)
- **Discussions:** Para dúvidas e brainstorming

---

## 📊 Progresso Geral

### Visão Geral por Fase

| Fase | Nome | Progresso | Prioridade | Prazo | Status |
|------|------|-----------|------------|-------|--------|
| 1 | MVP - Interface | 70% | 🔴 CRÍTICA | Dez 24 - Jan 25 | ✅ Em Andamento |
| 2 | Frontend React.js | 0% | 🔴 CRÍTICA | Jan - Fev 25 | 📅 Próxima |
| 3 | Backend + LGPD | 0% | 🔴 CRÍTICA | Fev - Mar 25 | 📅 Planejado |
| 4 | Mobile QR Codes | 0% | 🟠 ALTA | Mar - Abr 25 | 📅 Planejado |
| 5 | Integrações BI | 0% | 🟠 ALTA | Abr - Mai 25 | 📅 Planejado |
| 6 | Testes Qualidade | 0% | 🔴 CRÍTICA | Mai - Jun 25 | 📅 Planejado |
| 7 | Deploy Cloud | 0% | 🔴 CRÍTICA | Jun - Jul 25 | 📅 Planejado |
| 8 | TCC Final | 0% | 🔴 CRÍTICA | Jul - Ago 25 | 📅 Planejado |

**Progresso Total:** 9% (1 de 8 fases em andamento)

---

## 🎓 Referências do TCC

### Documentação Técnica Completa

- [📊 Diagrama de Classes](./doc/diagrama-classes-estoque.md) - 12 classes
- [🗄️ MER Conceitual](./doc/diagrama-mer-conceitual.md) - 8 entidades, 20 regras
- [💾 DER Físico](./doc/diagrama-der-estoque.md) - 10 tabelas + SQL completo
- [👥 Casos de Uso](./doc/diagrama-casos-de-uso-estoque.md) - 27 casos especificados
- [🔒 LGPD](./doc/LGPD-COMPLIANCE.md) - Conformidade legal (~900 linhas)
- [📚 Índice](./doc/INDEX-DIAGRAMAS.md) - Navegação centralizada

### Documentos Oficiais do Projeto

- [📄 PDF Oficial](./doc/Projeto%20De%20Apresentaçao%20(2).pdf) - Apresentação completa
- [📝 Requisitos](./doc/Requisitos%20principais%20do%20projeto.txt) - Especificações originais

---

## 👥 Equipe do TCC

### Autores

1. **Patrick Lima de Santana**
2. **Rafael Nascimento De Oliveira Bastos**
3. **Antonio Lucas da Silva da Conceição Lima**
4. **Rodrigo Santos de Oliveira Riquelme Damasceno Neri**
5. **Matheus Mendes Conceição Santana Santos**

### Instituição

**SENAI - Serviço Nacional de Aprendizagem Industrial**  
Curso Técnico em Desenvolvimento de Sistemas  
2024-2025

### Orientador

**[Nome do Professor/Orientador]**

---

## 📞 Suporte

### Dúvidas sobre o Roadmap?

- 💬 **Discussions:** [GitHub Discussions](https://github.com/seu-usuario/workconnect/discussions)
- 📧 **Email:** contato.workconnect@exemplo.com
- 📖 **Documentação:** [README.md](./README.md) | [CONTRIBUTING.md](./CONTRIBUTING.md)

### Reportar Problemas

- 🐛 **Bugs:** [Criar Issue](https://github.com/seu-usuario/workconnect/issues/new?template=bug_report.md)
- ✨ **Features:** [Criar Issue](https://github.com/seu-usuario/workconnect/issues/new?template=feature_request.md)

---

<div align="center">

## 🌟 Roadmap em Números

**8 Fases** | **9 Meses** | **200+ Tarefas** | **5 Autores**

**Sistema Completo de Gestão de Estoque com Conformidade LGPD**

---

**Roadmap criado para o TCC SENAI 2024-2025**

**Work Connect - Gestão Simplificada para PMEs**

[🏠 Voltar ao README](./README.md) · [🤝 Como Contribuir](./CONTRIBUTING.md) · [📚 Documentação](./doc/INDEX-DIAGRAMAS.md)

</div>

---

**Última atualização:** Janeiro 2025  
**Versão:** 2.0 - Refatorado para Escopo Real  
**Baseado em:** PDF Oficial do TCC + Análise de Requisitos
