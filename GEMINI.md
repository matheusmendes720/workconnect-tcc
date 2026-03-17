# WorkConnect - Contexto de Instrução (GEMINI.md)

Este arquivo serve como o contexto principal e guia de referência para todas as interações da IA com o projeto **WorkConnect**. Ele detalha a arquitetura, convenções e fluxos de trabalho do sistema.

## 🚀 Visão Geral do Projeto
O **WorkConnect** é um Sistema de Gestão de Estoque Inteligente desenvolvido para Pequenas e Médias Empresas (PMEs). O objetivo é eliminar o controle manual, reduzir perdas e garantir conformidade com a LGPD.

### 🛠️ Stack Tecnológica
- **Framework:** Next.js 16 (App Router + Turbopack)
- **Biblioteca UI:** React 19
- **Estilização:** Tailwind CSS 3.4
- **Linguagem:** TypeScript 5.9
- **Ícones:** Lucide React & FontAwesome 7
- **Gráficos:** Chart.js 4 & react-chartjs-2
- **Componentes UI:** Radix UI & Shadcn/UI (customizado)
- **Segurança:** Bcryptjs para hashing de senhas
- **Banco de Dados:** MySQL (Arquivos de schema e migração em `/database`)

## 🏗️ Arquitetura e Estrutura de Diretórios
O projeto segue a estrutura padrão do Next.js com foco em modularidade.

```
workconnect-tcc/
├── src/
│   ├── app/                    # Rotas do Next.js (App Router)
│   │   ├── dashboard/          # Rota principal (debug mode via ?debug=true)
│   │   ├── lp/                 # Landing Page pública
│   │   ├── estoque/            # Gestão de estoque (Legado/Modular)
│   │   └── configuracoes/      # Configurações do usuário e LGPD
│   ├── components/             # Componentes React reutilizáveis
│   │   ├── estoque/            # Componentes específicos de estoque
│   │   │   ├── auth/           # AuthWrapper, Login, UserConfig
│   │   │   ├── tabs/           # Conteúdo das abas do Dashboard
│   │   │   └── ui/             # Elementos de UI específicos (Navigation, Header)
│   │   └── landing/            # Componentes da Landing Page
│   ├── contexts/               # Contextos do React (AuthContext, StockDataContext)
│   ├── lib/                    # Utilitários, hooks e lógica de negócio
│   │   ├── estoque/            # Hooks (useProducts, useCharts, etc)
│   │   └── utils/              # Formatadores e utilitários globais
│   ├── styles/                 # Arquivos CSS globais e módulos Tailwind
│   └── types/                  # Definições de tipos TypeScript
├── database/                   # Scripts SQL (MySQL), triggers e views
├── docs/                       # Documentação completa em Markdown
└── scripts/                    # Scripts de automação (PowerShell)
```

## 🔐 Segurança e Autenticação
- **AuthWrapper:** Componente que protege rotas. Suporta um modo `debug=true` via URL que persiste na `sessionStorage` para facilitar o desenvolvimento.
- **AuthContext:** Gerencia o estado de autenticação global, login, logout e persistência de dados do usuário.
- **LGPD:** Implementa consentimento, exportação de dados (JSON) e solicitações de exclusão para conformidade total.

## 🚦 Comandos de Desenvolvimento
- `npm run dev`: Inicia o servidor de desenvolvimento (Next.js 16).
- `npm run build`: Gera a build de produção.
- `npm run lint`: Executa a verificação de linting.
- `npm run setup`: Script PowerShell para configurar a estrutura inicial.
- `npm run organize`: Script para organizar arquivos legados.

## 📝 Convenções e Padrões
1. **Roteamento:** Use o App Router (`src/app`). Novas páginas devem ser criadas como pastas com um arquivo `page.tsx`.
2. **Componentes:** Prefira componentes funcionais com hooks. Use `'use client'` explicitamente para componentes interativos.
3. **Estilização:** Use classes utilitárias do Tailwind CSS. Evite CSS puro, a menos que seja para animações complexas em `globals.css`.
4. **Tipagem:** Todos os novos dados e funções devem ser tipados rigorosamente em `src/types/estoque.ts`.
5. **Hydration:** Para evitar erros de hidratação com extensões de browser, use `suppressHydrationWarning` no `html`, `body` e elementos críticos do `layout.tsx`.

## 🛠️ Fluxo de Trabalho de Debug
Para acessar o sistema sem passar pela tela de login durante o desenvolvimento:
1. Acesse `http://localhost:3000/?debug=true`.
2. O sistema salvará o estado de debug na sessão e permitirá navegação completa entre abas e configurações.

---
*Este documento é atualizado automaticamente conforme o projeto evolui.*
