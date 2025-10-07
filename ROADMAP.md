# 🗺️ Roadmap de Desenvolvimento - WorkConnect

**Planejamento Completo: Do MVP ao Protótipo Funcional**

Este roadmap detalha todas as fases de desenvolvimento do WorkConnect, desde o MVP atual até um sistema completo e funcional pronto para produção.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Timeline de Fases](#-timeline-de-fases)
- [FASE 1: MVP - Sistema Básico Funcional](#-fase-1-mvp---sistema-básico-funcional)
- [FASE 2: Funcionalidades Avançadas (Frontend)](#-fase-2-funcionalidades-avançadas-frontend)
- [FASE 3: Backend e Banco de Dados](#-fase-3-backend-e-banco-de-dados)
- [FASE 4: Sistema RFID e Rastreamento](#-fase-4-sistema-rfid-e-rastreamento)
- [FASE 5: Ordens de Serviço e Manutenção](#-fase-5-ordens-de-serviço-e-manutenção)
- [FASE 6: Alertas e Notificações](#-fase-6-alertas-e-notificações)
- [FASE 7: Relatórios Avançados](#-fase-7-relatórios-avançados)
- [FASE 8: Integrações Externas](#-fase-8-integrações-externas)
- [FASE 9: Mobile e PWA](#-fase-9-mobile-e-pwa)
- [FASE 10: Testes e Qualidade](#-fase-10-testes-e-qualidade)
- [FASE 11: Deploy e Produção](#-fase-11-deploy-e-produção)
- [FASE 12: Documentação Final e Apresentação](#-fase-12-documentação-final-e-apresentação)
- [Critérios de Conclusão](#-critérios-de-conclusão)
- [Priorização](#-priorização)
- [Como Contribuir](#-como-contribuir)

---

## 🎯 Visão Geral

### Objetivo

Desenvolver incrementalmente o WorkConnect, partindo do MVP atual (interface HTML/CSS/JS) até um **sistema completo de gestão empresarial** com:
- Backend robusto
- Banco de dados relacional
- Autenticação e autorização
- Sistema RFID de rastreamento
- Ordens de serviço e manutenção
- Alertas automáticos
- Relatórios avançados
- Mobile/PWA
- Deploy em produção

### Metodologia

**Desenvolvimento Incremental:**
1. Entregas pequenas e funcionais
2. Testes contínuos
3. Feedback constante
4. Documentação atualizada

**Baseado em:**
- [Diagramas de Classes](./doc/diagrama-classes-completo.md)
- [MER Conceitual](./doc/diagrama-mer-conceitual.md)
- [DER Completo](./doc/diagrama-der-completo.md)
- [Casos de Uso](./doc/diagrama-casos-de-uso.md)
- [Requisitos do TCC](./doc/Requisitos%20principais%20do%20projeto.txt)

### Duração Total Estimada

**9-10 meses** (Dezembro 2024 - Agosto 2025)

---

## 📅 Timeline de Fases

```mermaid
timeline
    title Roadmap WorkConnect - Desenvolvimento Completo
    
    section FASE 1: MVP
        Dez 2024 - Jan 2025 : Interface HTML completa
                            : CSS responsivo
                            : JavaScript básico
                            : Gráficos Chart.js
    
    section FASE 2: Frontend Avançado
        Jan - Fev 2025 : CRUD completo
                       : Validações
                       : LocalStorage
                       : Filtros avançados
    
    section FASE 3: Backend
        Fev - Mar 2025 : Node.js + Express
                       : PostgreSQL
                       : API REST
                       : Autenticação JWT
    
    section FASE 4: RFID
        Mar - Abr 2025 : Integração leitores
                       : Tags RFID
                       : Rastreamento automático
                       : Código de barras
    
    section FASE 5: Serviços
        Abr - Mai 2025 : Ordens de serviço
                       : Dashboard técnicos
                       : Integração estoque
    
    section FASE 6: Alertas
        Mai 2025 : Sistema de alertas
                 : Notificações
                 : Email & Push
    
    section FASE 7: Relatórios
        Mai - Jun 2025 : Relatórios parametrizáveis
                       : Business Intelligence
                       : Dashboards customizáveis
    
    section FASE 8: Integrações
        Jun 2025 : Integração bancária
                 : Integração fiscal
                 : APIs ERPs
    
    section FASE 9: Mobile
        Jun - Jul 2025 : Progressive Web App
                       : Otimização mobile
                       : App nativo (opcional)
    
    section FASE 10: Testes
        Jul 2025 : Testes automatizados
                 : Performance
                 : Segurança
                 : Usabilidade
    
    section FASE 11: Deploy
        Jul - Ago 2025 : Cloud setup
                       : CI/CD
                       : Monitoramento
                       : Backup
    
    section FASE 12: Finalização
        Ago 2025 : Documentação final
                 : Manual do usuário
                 : Apresentação TCC
```

---

## 🚀 FASE 1: MVP - Sistema Básico Funcional

**Status:** ✅ Em Andamento  
**Prazo:** Dezembro 2024 - Janeiro 2025  
**Objetivo:** Interface funcional com visualização de dados

### 1.1. Interface HTML Completa

#### ✅ Concluído

- [x] Landing page responsiva ([`app/landing/index.html`](./app/landing/index.html))
- [x] Dashboard com métricas ([`app/dash.html`](./app/dash.html))
- [x] Página de Finanças ([`app/financas.html`](./app/financas.html))
- [x] Página de Vendas ([`app/vendas.html`](./app/vendas.html))
- [x] Página de Estoque ([`app/estoque.html`](./app/estoque.html))
- [x] Página de Relatórios ([`app/relatorios.html`](./app/relatorios.html))
- [x] Página de Configurações ([`app/configuracoes.html`](./app/configuracoes.html))
- [x] Sidebar de navegação

#### 📅 Pendente

- [ ] **Validações client-side**
  - Validar campos obrigatórios
  - Validar formatos (email, CPF, telefone)
  - Feedback visual de erros
  - **Referência:** [Casos de Uso](./doc/diagrama-casos-de-uso.md) - Validações

- [ ] **Formulários interativos**
  - Cadastro de produtos
  - Cadastro de clientes
  - Registro de vendas
  - Lançamentos financeiros
  - **Issue:** Criar formulários com validação

### 1.2. Estilização CSS

#### ✅ Concluído

- [x] Design system com variáveis CSS ([`app/dashboard/css/common.css`](./app/dashboard/css/common.css))
- [x] Tema dark/sanguine
- [x] Responsividade mobile (breakpoint 900px)
- [x] Cards com glassmorphism
- [x] Badges de status coloridos
- [x] Sidebar retrátil

#### 📅 Pendente

- [ ] **Animações e transições**
  - Hover effects suaves
  - Loading skeletons
  - Transições entre páginas
  - Animações de entrada de cards
  - **Issue:** Adicionar micro-interações

- [ ] **Modo claro (opcional)**
  - Tema light como alternativa
  - Toggle entre temas
  - Persistência de preferência
  - **Prioridade:** Baixa

### 1.3. JavaScript Básico

#### ✅ Concluído

- [x] Gráficos com Chart.js ([`app/dashboard/js/dash.js`](./app/dashboard/js/dash.js))
- [x] To-do list interativa
  - Adicionar tarefa
  - Marcar como concluída
  - Remover tarefa
- [x] Exportação CSV ([`app/dashboard/js/common.js`](./app/dashboard/js/common.js))
- [x] FAQ accordion ([`app/landing/js/landing.js`](./app/landing/js/landing.js))

#### 📅 Pendente

- [ ] **LocalStorage para persistência**
  - Salvar to-do list
  - Salvar preferências do usuário
  - Cache de dados de exemplo
  - **Issue:** Implementar cache local

- [ ] **Validações de formulário**
  - Validar CPF/CNPJ
  - Validar email
  - Validar telefone
  - Validar valores numéricos
  - **Biblioteca sugerida:** [Vanilla-masker](https://github.com/vanilla-masker/vanilla-masker)

- [ ] **Máscaras de input**
  - Máscara de CPF: `000.000.000-00`
  - Máscara de CNPJ: `00.000.000/0000-00`
  - Máscara de telefone: `(00) 00000-0000`
  - Máscara de moeda: `R$ 0.000,00`
  - **Biblioteca sugerida:** [IMask.js](https://imask.js.org/)

---

## 💎 FASE 2: Funcionalidades Avançadas (Frontend)

**Status:** 📅 Planejado  
**Prazo:** Janeiro - Fevereiro 2025  
**Objetivo:** CRUD completo e interações avançadas

### 2.1. Gestão de Dados

- [ ] **CRUD completo de produtos**
  - Listar produtos (tabela paginada)
  - Criar produto (modal/página)
  - Editar produto
  - Excluir produto (soft delete)
  - **Referência:** [Casos de Uso UC201](./doc/diagrama-casos-de-uso.md#uc201)

- [ ] **CRUD de clientes**
  - Listar clientes
  - Cadastrar cliente
  - Editar dados do cliente
  - Histórico de compras do cliente
  - **Referência:** [Casos de Uso UC401](./doc/diagrama-casos-de-uso.md#uc401)

- [ ] **CRUD de categorias**
  - Categorias de produtos
  - Categorias financeiras
  - Hierarquia de categorias (opcional)
  - **Referência:** [DER - CATEGORIA_ESTOQUE](./doc/diagrama-der-completo.md)

- [ ] **Sistema de busca/filtros**
  - Busca por nome/código
  - Filtros múltiplos (categoria, status, etc)
  - Autocomplete
  - **Biblioteca sugerida:** [Fuse.js](https://fusejs.io/) para busca fuzzy

- [ ] **Paginação de tabelas**
  - Navegação por páginas
  - Itens por página configurável
  - Totalizadores
  - **Biblioteca sugerida:** [List.js](https://listjs.com/)

### 2.2. Validações e Feedback

- [ ] **Validação de CPF/CNPJ**
  - Algoritmo de validação
  - Feedback em tempo real
  - Formatação automática
  - **Código:** Implementar validadores

- [ ] **Validação de email**
  - Regex para formato
  - Verificação de domínio (opcional)
  - **Código:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

- [ ] **Mensagens de erro amigáveis**
  - Mensagens contextuais
  - Highlight de campos com erro
  - Ícones de status
  - **Design:** Seguir design system

- [ ] **Toasts de sucesso/erro**
  - Notificações temporárias
  - Posicionamento (top-right)
  - Auto-dismiss (3-5s)
  - **Biblioteca sugerida:** [Toastify](https://apvarun.github.io/toastify-js/)

- [ ] **Loading states**
  - Spinners em botões
  - Skeleton screens
  - Progress bars
  - Disable de ações durante loading
  - **Biblioteca sugerida:** [Skeleton](https://github.com/blivesta/skeleton)

### 2.3. Gráficos e Relatórios

- [ ] **Gráficos interativos avançados**
  - Tooltips customizados
  - Zoom e pan
  - Animações suaves
  - Temas consistentes
  - **Referência:** [Chart.js docs](https://www.chartjs.org/)

- [ ] **Filtros por período**
  - Date range picker
  - Presets (Hoje, Semana, Mês, Ano)
  - Comparação de períodos
  - **Biblioteca sugerida:** [Litepicker](https://litepicker.com/)

- [ ] **Comparativos mês a mês**
  - Gráficos de tendência
  - Percentuais de crescimento
  - Tabelas comparativas
  - **Referência:** [Dashboard Mockup](./app/dash.html)

- [ ] **Exportação PDF**
  - Gerar relatórios em PDF
  - Layout profissional
  - Gráficos inclusos
  - **Biblioteca sugerida:** [jsPDF](https://github.com/parallax/jsPDF)

- [ ] **Impressão otimizada**
  - CSS para @media print
  - Layout simplificado
  - Quebras de página corretas
  - **Arquivo:** Criar `print.css`

### 2.4. Dashboard Inteligente

- [ ] **Métricas calculadas em tempo real**
  - Atualização automática
  - WebSockets (futuramente)
  - Cálculos client-side
  - **Referência:** [Dashboard atual](./app/dash.html)

- [ ] **Cards de KPIs**
  - Vendas do mês
  - Ticket médio
  - Taxa de conversão
  - ROI
  - **Referência:** [Casos de Uso UC101](./doc/diagrama-casos-de-uso.md#uc101)

- [ ] **Alertas visuais**
  - Indicadores coloridos
  - Badges de atenção
  - Animações pulsantes
  - **Design:** Cores semânticas (vermelho=urgente, amarelo=atenção)

- [ ] **Widgets customizáveis**
  - Arrastar e soltar
  - Salvar layout
  - Ocultar/mostrar widgets
  - **Biblioteca sugerida:** [Muuri](https://muuri.dev/)

---

## 🔧 FASE 3: Backend e Banco de Dados

**Status:** 📅 Planejado  
**Prazo:** Fevereiro - Março 2025  
**Objetivo:** Persistência de dados e API REST

### 3.1. Escolha da Stack Backend

**Opções Avaliadas:**

#### ✅ Recomendado: Node.js + Express

**Vantagens:**
- Mesma linguagem do frontend (JavaScript)
- Ecossistema vasto (npm)
- Performance alta (V8 engine)
- Comunidade ativa
- Fácil deploy

**Stack Sugerida:**
```
- Node.js 18+ LTS
- Express.js 4.x
- PostgreSQL 15+
- Sequelize ORM
- JWT para auth
- Bcrypt para senhas
```

#### Alternativa 1: Python + Flask/Django

**Vantagens:**
- Python é didático
- Django tem admin pronto
- Bom para ML/IA futuro

**Stack:**
```
- Python 3.11+
- Django 4.x / Flask 3.x
- PostgreSQL
- Django ORM / SQLAlchemy
- Django Rest Framework
```

#### Alternativa 2: PHP + Laravel

**Vantagens:**
- Hospedagem barata
- Documentação extensa
- ORM Eloquent

**Stack:**
```
- PHP 8.2+
- Laravel 10.x
- MySQL/PostgreSQL
- Eloquent ORM
```

### 3.2. Banco de Dados

- [ ] **Implementar modelo de dados**
  - Baseado no [DER Completo](./doc/diagrama-der-completo.md)
  - Scripts SQL de criação
  - Migrations
  - **Referência:** [DER - Scripts SQL](./doc/diagrama-der-completo.md#scripts-sql-de-criação)

- [ ] **Criar tabelas (30+ tabelas)**
  - Usuario, Perfil, Permissao
  - Produto, ItemEstoque, Categoria
  - TagRFID, CodigoBarras, Leitor
  - MovimentacaoEstoque, LocalEstoque
  - Transacao, ContaBancaria, Categoria
  - Venda, ItemVenda, Cliente
  - OrdemServico, Tecnico, ItemUtilizado
  - Relatorio, AlertaReposicao
  - **Arquivo:** `/database/migrations/`

- [ ] **Índices e constraints**
  - Primary Keys
  - Foreign Keys
  - Unique constraints
  - Check constraints
  - Índices de busca
  - **Referência:** [DER - Índices](./doc/diagrama-der-completo.md#índices-recomendados)

- [ ] **Triggers automáticos**
  - Atualizar status de estoque
  - Gerar alertas de reposição
  - Atualizar saldo de conta
  - Calcular totais
  - **Referência:** [DER - Triggers](./doc/diagrama-der-completo.md#triggers-e-procedures)

- [ ] **Views para consultas**
  - `vw_estoque_completo`
  - `vw_vendas_resumo`
  - `vw_fluxo_caixa`
  - **Referência:** [DER - Views](./doc/diagrama-der-completo.md#views-úteis)

### 3.3. API REST

**Estrutura de Endpoints:**

#### Autenticação
- [ ] `POST /api/auth/login` - Login
- [ ] `POST /api/auth/register` - Cadastro
- [ ] `POST /api/auth/logout` - Logout
- [ ] `POST /api/auth/refresh` - Renovar token
- [ ] `GET /api/auth/me` - Dados do usuário autenticado

#### Produtos
- [ ] `GET /api/produtos` - Listar produtos
- [ ] `GET /api/produtos/:id` - Buscar produto
- [ ] `POST /api/produtos` - Criar produto
- [ ] `PUT /api/produtos/:id` - Atualizar produto
- [ ] `DELETE /api/produtos/:id` - Excluir produto
- [ ] `GET /api/produtos/estoque` - Estoque completo

#### Vendas
- [ ] `GET /api/vendas` - Listar vendas
- [ ] `GET /api/vendas/:id` - Buscar venda
- [ ] `POST /api/vendas` - Criar venda
- [ ] `PUT /api/vendas/:id` - Atualizar venda
- [ ] `DELETE /api/vendas/:id` - Cancelar venda
- [ ] `POST /api/vendas/:id/itens` - Adicionar item

#### Transações
- [ ] `GET /api/transacoes` - Listar transações
- [ ] `GET /api/transacoes/:id` - Buscar transação
- [ ] `POST /api/transacoes` - Criar transação
- [ ] `PUT /api/transacoes/:id` - Atualizar transação
- [ ] `GET /api/transacoes/fluxo-caixa` - Fluxo de caixa

#### Clientes
- [ ] `GET /api/clientes` - Listar clientes
- [ ] `GET /api/clientes/:id` - Buscar cliente
- [ ] `POST /api/clientes` - Criar cliente
- [ ] `PUT /api/clientes/:id` - Atualizar cliente
- [ ] `DELETE /api/clientes/:id` - Excluir cliente

#### Relatórios
- [ ] `GET /api/relatorios/financeiro` - Relatório financeiro
- [ ] `GET /api/relatorios/vendas` - Relatório de vendas
- [ ] `GET /api/relatorios/estoque` - Relatório de estoque
- [ ] `POST /api/relatorios/gerar` - Gerar relatório customizado

**Padrões da API:**
- Versionamento: `/api/v1/`
- Autenticação: Bearer token JWT
- Respostas: JSON
- Status codes: HTTP padrão
- Paginação: Query params `?page=1&limit=20`
- Filtros: Query params `?categoria=1&status=ativo`

### 3.4. Autenticação e Autorização

- [ ] **Sistema de login**
  - Endpoint de login
  - Validação de credenciais
  - Geração de JWT
  - Refresh tokens
  - **Referência:** [Casos de Uso - Login](./doc/diagrama-casos-de-uso.md)

- [ ] **JWT tokens**
  - Access token (curto prazo: 15min)
  - Refresh token (longo prazo: 7 dias)
  - Armazenamento seguro (httpOnly cookies)
  - **Biblioteca:** `jsonwebtoken`

- [ ] **Perfis de usuário**
  - Administrador (todas permissões)
  - Operador (criar, ler, editar)
  - Visualizador (apenas leitura)
  - **Referência:** [DER - PERFIL](./doc/diagrama-der-completo.md)

- [ ] **Permissões por módulo**
  - Dashboard: todos
  - Finanças: admin, operador
  - Vendas: admin, operador
  - Estoque: admin, operador
  - Relatórios: todos
  - Configurações: apenas admin
  - **Referência:** [MER - Regra RN02](./doc/diagrama-mer-conceitual.md)

- [ ] **Sessões seguras**
  - Logout em todos os dispositivos
  - Timeout de inatividade
  - Logs de acesso
  - **Segurança:** HTTPS obrigatório

### 3.5. Integração Frontend-Backend

- [ ] **Fetch API / Axios**
  - Wrapper de requisições
  - Interceptors para auth
  - Tratamento global de erros
  - **Arquivo:** `/app/js/api.js`

- [ ] **Tratamento de erros**
  - Try-catch em requisições
  - Mensagens amigáveis
  - Logging de erros
  - **Status codes:** 400, 401, 403, 404, 500

- [ ] **Loading states**
  - Mostrar spinners
  - Desabilitar botões
  - Progress bars
  - **UX:** Feedback visual

- [ ] **Cache estratégico**
  - Cache de dados estáticos
  - Invalidação inteligente
  - Cache-Control headers
  - **Estratégia:** SWR (Stale-While-Revalidate)

---

## 📡 FASE 4: Sistema RFID e Rastreamento

**Status:** 📅 Planejado  
**Prazo:** Março - Abril 2025  
**Objetivo:** Automação de movimentação de estoque

### 4.1. Infraestrutura RFID

- [ ] **Integração com leitores RFID**
  - Escolher hardware (Impinj, Zebra, etc)
  - Driver de comunicação
  - Protocolo de leitura
  - **Referência:** [Requisitos - RFID](./doc/Requisitos%20principais%20do%20projeto.txt)

- [ ] **API de comunicação com hardware**
  - Endpoint para leitores
  - WebSocket para tempo real
  - Buffer de leituras
  - **Arquivo:** `/api/rfid/reader.js`

- [ ] **Cadastro de tags RFID**
  - Vincular tag a produto
  - Ativar/desativar tags
  - Histórico de tags
  - **Referência:** [DER - TAG_RFID](./doc/diagrama-der-completo.md)

- [ ] **Vinculação tag-produto**
  - Interface de cadastro
  - Leitura de tag para vincular
  - Validação de unicidade
  - **Referência:** [Casos de Uso UC207](./doc/diagrama-casos-de-uso.md)

### 4.2. Rastreamento Automático

- [ ] **Detecção de entrada/saída**
  - Leitores na entrada do almoxarifado
  - Leitores na saída
  - Identificação de direção
  - **Lógica:** Múltiplas leituras para confirmar

- [ ] **Registro automático de movimentações**
  - Criar movimentação ao detectar
  - Identificar usuário (se possível)
  - Atualizar estoque instantaneamente
  - **Referência:** [Casos de Uso UC207](./doc/diagrama-casos-de-uso.md)

- [ ] **Histórico de leituras**
  - Todas as leituras registradas
  - Timestamp preciso
  - Leitor que detectou
  - **Referência:** [DER - HISTORICO_LEITURA](./doc/diagrama-der-completo.md)

- [ ] **Dashboard de rastreamento**
  - Visualização em tempo real
  - Mapa de calor do almoxarifado
  - Alertas de leituras anômalas
  - **UI:** Gráfico ao vivo

### 4.3. Código de Barras

- [ ] **Geração de códigos EAN-13**
  - Algoritmo de geração
  - Validação de check digit
  - Impressão de etiquetas
  - **Biblioteca:** `jsbarcode`

- [ ] **Scanner via câmera (mobile)**
  - Acesso à câmera do dispositivo
  - Detecção de código de barras
  - Feedback visual (quadrado de foco)
  - **Biblioteca:** [QuaggaJS](https://serratus.github.io/quaggaJS/)

- [ ] **Impressão de etiquetas**
  - Template de etiqueta
  - Integração com impressora térmica
  - Formato ZPL (Zebra)
  - **Referência:** [Código de Barras](./doc/diagrama-classes-completo.md)

- [ ] **Leitura via API**
  - Endpoint para validar código
  - Buscar produto por código
  - **Endpoint:** `GET /api/produtos/codigo/:codigo`

---

## 🛠️ FASE 5: Ordens de Serviço e Manutenção

**Status:** 📅 Planejado  
**Prazo:** Abril - Maio 2025  
**Objetivo:** Gestão completa de serviços

### 5.1. Gestão de Ordens de Serviço

- [ ] **Abertura de OS**
  - Formulário de abertura
  - Cliente e problema
  - Gerar número da OS
  - Status: ABERTA
  - **Referência:** [Casos de Uso UC501](./doc/diagrama-casos-de-uso.md)

- [ ] **Atribuição de técnicos**
  - Listar técnicos disponíveis
  - Atribuir à OS
  - Notificar técnico
  - **Referência:** [Casos de Uso UC502](./doc/diagrama-casos-de-uso.md)

- [ ] **Registro de itens utilizados**
  - Adicionar item à OS
  - Quantidade utilizada
  - Valor do item
  - **Referência:** [DER - ITEM_UTILIZADO](./doc/diagrama-der-completo.md)

- [ ] **Devolução de itens reutilizáveis**
  - Marcar item como devolvido
  - Registrar entrada no estoque
  - **Referência:** [Casos de Uso UC504](./doc/diagrama-casos-de-uso.md)

- [ ] **Cálculo automático de valores**
  - Somar itens utilizados
  - Somar serviços prestados
  - Total da OS
  - **Referência:** [Casos de Uso UC508](./doc/diagrama-casos-de-uso.md)

### 5.2. Dashboard para Técnicos

- [ ] **Visualizar OS atribuídas**
  - Lista de OS do técnico
  - Filtros por status
  - Detalhes da OS
  - **UI:** Card por OS

- [ ] **Registrar tempo de trabalho**
  - Cronômetro/timer
  - Pausar/retomar
  - Salvar tempo total
  - **Campo:** `tempo_trabalhado` em minutos

- [ ] **Listar itens necessários**
  - Ver itens planejados
  - Buscar no estoque
  - Verificar disponibilidade
  - **Integração:** Com módulo Estoque

- [ ] **Finalizar OS**
  - Descrever solução
  - Confirmar itens utilizados
  - Calcular total
  - Status: FINALIZADA
  - **Referência:** [Casos de Uso UC505](./doc/diagrama-casos-de-uso.md)

### 5.3. Integração com Estoque

- [ ] **Saída automática ao retirar itens**
  - Criar movimentação tipo SAIDA_USO_SERVICO
  - Atualizar quantidade
  - Vincular à OS
  - **Referência:** [MER - Regra RN24](./doc/diagrama-mer-conceitual.md)

- [ ] **Entrada automática ao devolver**
  - Criar movimentação tipo ENTRADA_DEVOLUCAO
  - Atualizar quantidade
  - **Referência:** [MER - Regra RN25](./doc/diagrama-mer-conceitual.md)

- [ ] **Alertas de itens em falta**
  - Verificar estoque antes de atribuir OS
  - Notificar se item crítico
  - **Integração:** Com FASE 6 - Alertas

- [ ] **Histórico por OS**
  - Todas as movimentações da OS
  - Itens utilizados vs devolvidos
  - Timeline da OS
  - **UI:** Linha do tempo

---

## 🔔 FASE 6: Alertas e Notificações

**Status:** 📅 Planejado  
**Prazo:** Maio 2025  
**Objetivo:** Sistema proativo de avisos

### 6.1. Sistema de Alertas

- [ ] **Alerta de estoque baixo (automático)**
  - Trigger quando quantidade < nivel_minimo
  - Criar alerta automaticamente
  - Prioridade: MÉDIA
  - **Referência:** [Casos de Uso UC206](./doc/diagrama-casos-de-uso.md)

- [ ] **Alerta de estoque crítico (urgente)**
  - Quando quantidade = 0 ou < 30% do mínimo
  - Prioridade: URGENTE
  - Destaque visual
  - **Referência:** [MER - Regra RN18](./doc/diagrama-mer-conceitual.md)

- [ ] **Sugestão de quantidade de reposição**
  - Calcular: nivel_minimo * 2
  - Baseado em histórico de vendas
  - **Lógica:** Média móvel de consumo

- [ ] **Priorização de alertas**
  - URGENTE: quantidade = 0
  - ALTA: quantidade < 30% mínimo
  - MÉDIA: quantidade < mínimo
  - BAIXA: quantidade próxima ao mínimo
  - **Referência:** [DER - ALERTA_REPOSICAO](./doc/diagrama-der-completo.md)

### 6.2. Notificações

- [ ] **Notificações in-app**
  - Badge de notificações não lidas
  - Central de notificações
  - Marcar como lida
  - **UI:** Dropdown no header

- [ ] **Email notifications**
  - Envio via SMTP/SendGrid
  - Templates HTML
  - Alertas críticos por email
  - **Biblioteca:** `nodemailer`

- [ ] **Push notifications (PWA)**
  - Service Worker configurado
  - Permissão do usuário
  - Notificações mesmo com app fechado
  - **API:** Web Push API

- [ ] **Central de notificações**
  - Histórico de notificações
  - Filtros por tipo
  - Ações rápidas
  - **UI:** Modal ou página dedicada

- [ ] **Marcação de lido/não lido**
  - Toggle individual
  - Marcar todas como lidas
  - Contadores
  - **Campo:** `lida` boolean

### 6.3. Dashboard de Alertas

- [ ] **Card de alertas no dashboard**
  - Resumo de alertas ativos
  - Número de itens críticos
  - Link para detalhes
  - **Referência:** [Dashboard atual](./app/dash.html)

- [ ] **Lista de alertas pendentes**
  - Ordenação por prioridade
  - Cores semânticas
  - Ações (resolver, ignorar)
  - **UI:** Tabela ou cards

- [ ] **Histórico de alertas resolvidos**
  - Data de resolução
  - Quem resolveu
  - Ação tomada
  - **Armazenamento:** Não deletar, marcar como resolvido

- [ ] **Ações rápidas**
  - "Criar pedido de compra"
  - "Transferir de outro local"
  - "Marcar como resolvido"
  - **UX:** Botões de ação

---

## 📊 FASE 7: Relatórios Avançados

**Status:** 📅 Planejado  
**Prazo:** Maio - Junho 2025  
**Objetivo:** Business Intelligence

### 7.1. Relatórios Parametrizáveis

- [ ] **Filtros dinâmicos**
  - Data início/fim
  - Categoria
  - Cliente
  - Produto
  - Status
  - **UI:** Form de filtros colapsável

- [ ] **Múltiplos formatos (CSV, PDF, XLSX)**
  - Botões de exportação
  - CSV: já implementado
  - PDF: jsPDF + autoTable
  - XLSX: SheetJS
  - **Bibliotecas:** `jspdf`, `xlsx`

- [ ] **Agendamento de relatórios**
  - Configurar periodicidade (diário, semanal, mensal)
  - Horário de envio
  - Destinatários
  - **Backend:** Cron jobs

- [ ] **Envio por email**
  - Relatório em anexo
  - Template profissional
  - Link para download
  - **Integração:** Com sistema de email

### 7.2. Dashboards Customizáveis

- [ ] **Arrastar e soltar widgets**
  - Grid layout
  - Redimensionar widgets
  - Posicionamento livre
  - **Biblioteca:** [Muuri](https://muuri.dev/) ou [Gridstack](https://gridstackjs.com/)

- [ ] **Salvar layouts**
  - Por usuário
  - Múltiplos layouts salvos
  - Layout padrão
  - **Armazenamento:** JSON no banco

- [ ] **Compartilhar dashboards**
  - Link de compartilhamento
  - Permissões de visualização
  - Embed em outras páginas
  - **Feature:** Opcional

- [ ] **Exportar imagens**
  - Screenshot do dashboard
  - PNG de alta qualidade
  - **Biblioteca:** `html2canvas`

### 7.3. Business Intelligence

- [ ] **Análise de tendências**
  - Crescimento/decrescimento
  - Sazonalidade
  - Projeções
  - **Gráficos:** Linhas de tendência

- [ ] **Previsão de demanda**
  - Baseado em histórico
  - Média móvel
  - Regressão linear
  - **Algoritmo:** ML.js ou TensorFlow.js

- [ ] **Produtos mais vendidos**
  - Top 10 produtos
  - Por período
  - Por categoria
  - **Query:** Agregação SQL

- [ ] **Clientes top**
  - Maiores compradores
  - Frequência de compra
  - Ticket médio por cliente
  - **Métrica:** Lifetime Value (LTV)

- [ ] **Margens de lucro**
  - Por produto
  - Por categoria
  - Por período
  - **Cálculo:** (Receita - Custo) / Receita * 100

---

## 🔗 FASE 8: Integrações Externas

**Status:** 📅 Planejado  
**Prazo:** Junho 2025  
**Objetivo:** Conectar com sistemas externos

### 8.1. Integração Bancária

- [ ] **Importação de extratos OFX**
  - Parser de arquivos OFX
  - Importação automática
  - Conciliação de transações
  - **Biblioteca:** `ofx` npm package

- [ ] **Conciliação automática**
  - Matching por valor/data
  - Sugestões de transações
  - Aprovar/rejeitar matches
  - **Algoritmo:** Fuzzy matching

- [ ] **Saldo em tempo real**
  - API bancária (Open Banking)
  - Sincronização automática
  - **Bancos:** BB, Bradesco, Itaú, Santander

### 8.2. Integração Fiscal

- [ ] **Emissão de NF-e**
  - Integração com SEFAZ
  - XML da nota
  - DANFE em PDF
  - **Serviço:** eNotas, NFe.io

- [ ] **Cálculo de impostos**
  - ICMS, IPI, PIS, COFINS
  - Tabelas atualizadas
  - Por estado/produto
  - **Referência:** Tabela IBPT

- [ ] **Exportação para contabilidade**
  - Formato SPED
  - CSV para sistemas contábeis
  - **Formato:** Layout padrão

### 8.3. Integração com ERPs

- [ ] **API para Bling**
  - Sincronização de produtos
  - Sincronização de vendas
  - Atualização de estoque
  - **Docs:** [Bling API](https://ajuda.bling.com.br/hc/pt-br/articles/360035558494)

- [ ] **API para Conta Azul**
  - OAuth 2.0
  - Sincronização financeira
  - **Docs:** [Conta Azul API](https://developers.contaazul.com/)

- [ ] **Sincronização bidirecional**
  - WorkConnect → ERP
  - ERP → WorkConnect
  - Resolução de conflitos
  - **Estratégia:** Master/slave ou two-way sync

---

## 📱 FASE 9: Mobile e PWA

**Status:** 📅 Planejado  
**Prazo:** Junho - Julho 2025  
**Objetivo:** Experiência mobile first

### 9.1. Progressive Web App

- [ ] **Manifest.json**
  - Nome, ícones, cores
  - Display: standalone
  - Orientação: portrait/landscape
  - **Arquivo:** `/manifest.json`

- [ ] **Service Worker**
  - Cache de assets
  - Offline first
  - Background sync
  - **Arquivo:** `/sw.js`

- [ ] **Instalável no dispositivo**
  - Prompt de instalação
  - Ícone na home screen
  - Splash screen
  - **Critérios:** Lighthouse PWA checklist

- [ ] **Funciona offline**
  - Cache de páginas principais
  - Sincronizar quando online
  - Indicador de status
  - **Estratégia:** Cache-first ou network-first

- [ ] **Push notifications**
  - Web Push API
  - Service Worker notifications
  - **Serviço:** OneSignal ou Firebase Cloud Messaging

### 9.2. Otimização Mobile

- [ ] **Gestos touch**
  - Swipe para deletar
  - Pull to refresh
  - Long press para opções
  - **Biblioteca:** Hammer.js

- [ ] **Menu hamburguer**
  - Sidebar retrátil
  - Overlay escuro
  - Animação suave
  - **Já implementado:** Responsivo em 900px

- [ ] **Telas otimizadas**
  - Botões grandes (min 44px)
  - Espaçamento adequado
  - Formulários mobile-friendly
  - **Referência:** Guidelines iOS/Android

- [ ] **Performance mobile**
  - Lazy loading de imagens
  - Code splitting
  - Minificação
  - **Target:** Lighthouse score > 90

### 9.3. App Nativo (Opcional)

- [ ] **React Native / Flutter**
  - Compartilhar lógica de negócio
  - UI nativa
  - **Escolha:** Flutter (Dart) ou React Native (JS)

- [ ] **Scanner de código de barras nativo**
  - Acesso à câmera
  - Performance superior
  - **Plugin:** react-native-camera

- [ ] **Acesso à câmera**
  - Captura de fotos
  - QR Code reader
  - **Permissões:** iOS/Android

- [ ] **Notificações nativas**
  - Push notifications nativas
  - Badge counts
  - **Serviço:** Firebase Cloud Messaging

---

## ✅ FASE 10: Testes e Qualidade

**Status:** 📅 Planejado  
**Prazo:** Julho 2025  
**Objetivo:** Garantir qualidade e estabilidade

### 10.1. Testes Automatizados

- [ ] **Testes unitários (Jest)**
  - Funções de validação
  - Cálculos de negócio
  - Utilitários
  - **Cobertura:** > 80%
  - **Arquivo:** `*.test.js`

- [ ] **Testes de integração**
  - Endpoints da API
  - Fluxos completos
  - **Ferramenta:** Supertest + Jest

- [ ] **Testes E2E (Playwright)**
  - Fluxos de usuário
  - Navegação entre páginas
  - Interações reais
  - **Ferramenta:** [Playwright](https://playwright.dev/)

- [ ] **Cobertura > 80%**
  - Relatório de cobertura
  - CI/CD gates
  - **Comando:** `npm test -- --coverage`

### 10.2. Testes de Performance

- [ ] **Lighthouse score > 90**
  - Performance
  - Acessibilidade
  - Best Practices
  - SEO
  - **Ferramenta:** Chrome Lighthouse

- [ ] **Otimização de imagens**
  - WebP format
  - Lazy loading
  - Responsive images
  - **Ferramenta:** ImageOptim, Squoosh

- [ ] **Lazy loading**
  - Componentes sob demanda
  - Imagens com Intersection Observer
  - **Atributo:** `loading="lazy"`

- [ ] **Code splitting**
  - Separar bundles por rota
  - Dynamic imports
  - **Ferramenta:** Webpack/Vite

### 10.3. Testes de Segurança

- [ ] **Auditoria de vulnerabilidades**
  - npm audit
  - Snyk
  - OWASP Top 10
  - **Comando:** `npm audit fix`

- [ ] **Sanitização de inputs**
  - XSS prevention
  - SQL injection prevention
  - **Biblioteca:** DOMPurify, validator.js

- [ ] **HTTPS obrigatório**
  - Certificado SSL
  - Redirect HTTP → HTTPS
  - **Servidor:** Nginx/Apache config

- [ ] **Rate limiting**
  - Limitar requisições por IP
  - Prevenir DDoS
  - **Middleware:** express-rate-limit

### 10.4. Testes de Usabilidade

- [ ] **Testes com usuários reais**
  - Sessões de teste
  - Feedback qualitativo
  - Heatmaps
  - **Ferramenta:** Hotjar, Maze

- [ ] **Acessibilidade (WCAG 2.1)**
  - Contraste adequado (AA)
  - Alt text em imagens
  - Labels em formulários
  - **Ferramenta:** axe DevTools

- [ ] **Navegação por teclado**
  - Tab order lógico
  - Focus visível
  - Atalhos de teclado
  - **Teste:** Navegar sem mouse

- [ ] **Leitores de tela**
  - NVDA, JAWS, VoiceOver
  - ARIA labels
  - Roles semânticos
  - **Teste:** Usar leitor de tela

---

## 🚀 FASE 11: Deploy e Produção

**Status:** 📅 Planejado  
**Prazo:** Julho - Agosto 2025  
**Objetivo:** Sistema no ar e monitorado

### 11.1. Infraestrutura

- [ ] **Escolher cloud provider**
  - **AWS:** Mais completo, escalável
  - **Azure:** Integração Microsoft
  - **GCP:** Preços competitivos
  - **Heroku/Vercel:** Mais simples para TCC
  - **Recomendação:** Vercel (frontend) + Railway (backend)

- [ ] **Configurar servidor**
  - VM ou container
  - Node.js runtime
  - Nginx reverse proxy
  - **Spec mínima:** 2 vCPU, 4GB RAM

- [ ] **Banco de dados em nuvem**
  - PostgreSQL managed
  - Backups automáticos
  - **Opções:** AWS RDS, Azure Database, Supabase

- [ ] **CDN para assets estáticos**
  - Imagens, CSS, JS
  - Cache global
  - **Opção:** Cloudflare, AWS CloudFront

### 11.2. CI/CD

- [ ] **GitHub Actions**
  - Workflow de build
  - Testes automáticos
  - Deploy automático
  - **Arquivo:** `.github/workflows/deploy.yml`

- [ ] **Deploy automático**
  - Push para `main` → deploy
  - Preview de PRs
  - Rollback automático em erros
  - **Plataforma:** Vercel, Netlify

- [ ] **Testes em pipeline**
  - Rodar testes em cada commit
  - Bloquear merge se falhar
  - **Stage:** test → build → deploy

- [ ] **Rollback automático**
  - Detectar falhas no deploy
  - Reverter para versão anterior
  - **Estratégia:** Blue-green deployment

### 11.3. Monitoramento

- [ ] **Logs centralizados**
  - Agregação de logs
  - Busca e filtros
  - **Ferramenta:** Logtail, Papertrail

- [ ] **Métricas de performance (APM)**
  - Response times
  - Error rates
  - Throughput
  - **Ferramenta:** New Relic, Datadog

- [ ] **Alertas de erro (Sentry)**
  - Captura de exceções
  - Stack traces
  - Notificações
  - **Serviço:** [Sentry.io](https://sentry.io)

- [ ] **Uptime monitoring**
  - Ping a cada minuto
  - Alertas de downtime
  - **Ferramenta:** UptimeRobot, Pingdom

### 11.4. Backup e Segurança

- [ ] **Backup automático diário**
  - Banco de dados
  - Uploads de usuários
  - Retenção: 30 dias
  - **Ferramenta:** pg_dump + S3

- [ ] **Disaster recovery plan**
  - Documentar procedimentos
  - Testar restore
  - RTO/RPO definidos
  - **Doc:** `/docs/disaster-recovery.md`

- [ ] **SSL/TLS**
  - Certificado HTTPS
  - Let's Encrypt gratuito
  - Auto-renovação
  - **Ferramenta:** Certbot

- [ ] **Firewall**
  - Regras de acesso
  - Apenas portas necessárias abertas
  - **Cloud:** Security Groups (AWS), Firewall Rules

---

## 📚 FASE 12: Documentação Final e Apresentação

**Status:** 📅 Planejado  
**Prazo:** Agosto 2025  
**Objetivo:** Finalizar TCC

### 12.1. Documentação do Usuário

- [ ] **Manual do usuário**
  - Guia passo a passo
  - Screenshots anotados
  - PDFformato profissional
  - **Ferramenta:** Gitbook, Docusaurus

- [ ] **Tutoriais em vídeo**
  - Screencast de funcionalidades
  - Narração clara
  - Legendas
  - **Ferramenta:** OBS Studio, Loom

- [ ] **FAQ expandido**
  - Dúvidas frequentes
  - Troubleshooting
  - **Formato:** FAQ colapsável

- [ ] **Troubleshooting**
  - Problemas comuns
  - Soluções passo a passo
  - **Arquivo:** `docs/TROUBLESHOOTING.md`

### 12.2. Documentação Técnica

- [ ] **Atualizar todos os diagramas**
  - Refletir implementação final
  - Adicionar diagramas de sequência
  - **Pasta:** `/doc`

- [ ] **Documentar APIs**
  - OpenAPI/Swagger
  - Exemplos de requests/responses
  - **Ferramenta:** Swagger UI

- [ ] **Guia de implantação**
  - Passo a passo para deploy
  - Requisitos de servidor
  - Configurações necessárias
  - **Arquivo:** `docs/DEPLOYMENT.md`

- [ ] **Arquitetura de sistemas**
  - Diagrama de infraestrutura
  - Fluxo de dados
  - **Ferramenta:** Draw.io, Excalidraw

### 12.3. Apresentação do TCC

- [ ] **Slides de apresentação**
  - Problema e solução
  - Arquitetura técnica
  - Demonstração
  - Resultados e conclusões
  - **Ferramenta:** PowerPoint, Google Slides, Reveal.js

- [ ] **Demo ao vivo**
  - Ambiente de demonstração
  - Dados de exemplo preparados
  - Roteiro de apresentação
  - **Backup:** Vídeo gravado se internet falhar

- [ ] **Vídeo demonstrativo**
  - 5-10 minutos
  - Qualidade profissional
  - Trilha sonora
  - **Ferramenta:** Camtasia, Final Cut, Premiere

- [ ] **Artigo científico**
  - Introdução, metodologia, resultados
  - Referências bibliográficas
  - Formatação ABNT
  - **Template:** Overleaf LaTeX

---

## ✅ Critérios de Conclusão

Cada fase é considerada **concluída** quando:

- ✅ Todos os itens da checklist estão finalizados
- ✅ Código revisado e aprovado (code review)
- ✅ Testes passando (unitários, integração, E2E)
- ✅ Documentação atualizada
- ✅ Deploy em ambiente de teste bem-sucedido
- ✅ Aprovação dos stakeholders (orientador, colegas)

---

## 🎯 Priorização

### Prioridade ALTA (Obrigatório para TCC)

**Essencial para aprovação:**

- ✅ **FASE 1** - MVP (Interface funcional)
- ✅ **FASE 2** - Funcionalidades Frontend Avançadas
- ✅ **FASE 3** - Backend e Banco de Dados
- ✅ **FASE 10** - Testes e Qualidade
- ✅ **FASE 11** - Deploy e Produção
- ✅ **FASE 12** - Documentação e Apresentação

**Prazo crítico:** Até Julho 2025

---

### Prioridade MÉDIA (Diferenciais)

**Agregam valor significativo:**

- 📊 **FASE 4** - Sistema RFID (diferencial do TCC)
- 🛠️ **FASE 5** - Ordens de Serviço
- 📈 **FASE 7** - Relatórios Avançados e BI

**Prazo:** Até Junho 2025

---

### Prioridade BAIXA (Extras)

**Nice to have, mas não essencial:**

- 🔗 **FASE 8** - Integrações Externas (bancária, fiscal)
- 📱 **FASE 9** - Mobile e PWA
- 🔔 **FASE 6** - Alertas avançados (email, push)

**Prazo:** Se houver tempo até Agosto 2025

---

## 🤝 Como Contribuir

### Escolhendo uma Tarefa

1. **Verifique a fase atual** no topo de cada seção
2. **Escolha items não concluídos** (`[ ]`)
3. **Veja sua compatibilidade:**
   - 🟢 Iniciante: FASE 1, 2
   - 🟡 Intermediário: FASE 3, 5, 6, 7
   - 🔴 Avançado: FASE 4, 8, 9, 10, 11

### Processo

1. **Crie uma Issue** referenciando o item do roadmap
   - Título: `[FASE X] Nome da tarefa`
   - Exemplo: `[FASE 2] Implementar validação de CPF`
   
2. **Comente na Issue** manifestando interesse

3. **Siga o fluxo de contribuição** em [CONTRIBUTING.md](./CONTRIBUTING.md)

4. **Ao concluir:**
   - Marque item como `[x]` no roadmap
   - Faça PR atualizando este arquivo
   - Documente mudanças no código

### Coordenação

- **Issues:** Para discussões específicas
- **Discussions:** Para ideias e dúvidas gerais
- **Projects:** Board Kanban no GitHub

---

## 📊 Progresso Geral

### Visão Geral por Fase

| Fase | Status | Progresso | Prioridade | Prazo |
|------|--------|-----------|------------|-------|
| FASE 1: MVP | ✅ Em Andamento | 70% | 🔴 ALTA | Dez 2024 - Jan 2025 |
| FASE 2: Frontend Avançado | 📅 Planejado | 0% | 🔴 ALTA | Jan - Fev 2025 |
| FASE 3: Backend | 📅 Planejado | 0% | 🔴 ALTA | Fev - Mar 2025 |
| FASE 4: RFID | 📅 Planejado | 0% | 🟡 MÉDIA | Mar - Abr 2025 |
| FASE 5: Serviços | 📅 Planejado | 0% | 🟡 MÉDIA | Abr - Mai 2025 |
| FASE 6: Alertas | 📅 Planejado | 0% | 🟢 BAIXA | Mai 2025 |
| FASE 7: Relatórios | 📅 Planejado | 0% | 🟡 MÉDIA | Mai - Jun 2025 |
| FASE 8: Integrações | 📅 Planejado | 0% | 🟢 BAIXA | Jun 2025 |
| FASE 9: Mobile | 📅 Planejado | 0% | 🟢 BAIXA | Jun - Jul 2025 |
| FASE 10: Testes | 📅 Planejado | 0% | 🔴 ALTA | Jul 2025 |
| FASE 11: Deploy | 📅 Planejado | 0% | 🔴 ALTA | Jul - Ago 2025 |
| FASE 12: Documentação | 📅 Planejado | 0% | 🔴 ALTA | Ago 2025 |

**Progresso Total:** 6% (1 de 12 fases iniciada)

---

## 📞 Suporte

### Dúvidas sobre o Roadmap?

- 💬 Abra uma [Discussion](https://github.com/seu-usuario/workconnect/discussions)
- 📧 Email: lucas@exemplo.com
- 📖 Leia: [README.md](./README.md) | [CONTRIBUTING.md](./CONTRIBUTING.md)

---

<div align="center">

**Roadmap criado para o TCC SENAI 2024-2025**

**Última atualização:** Janeiro 2025

[🏠 Voltar ao README](./README.md) · [🤝 Como Contribuir](./CONTRIBUTING.md)

</div>

