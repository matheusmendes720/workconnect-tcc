# Documentação Técnica do Work Connect (Versão de Apresentação)

Esta documentação fornece uma visão geral abrangente da aplicação Work Connect, detalhando sua arquitetura, componentes, estruturas de dados e lógica de negócios, com trechos de código para ilustrar os conceitos chave.

## Índice

-   [1. Conceitos Essenciais](#1-conceitos-essenciais)
    -   [1.1. Arquitetura da Aplicação](#11-arquitetura-da-aplicacao)
    -   [1.2. Gerenciamento de Estado](#12-gerenciamento-de-estado)
    -   [1.3. Modelos de Dados](#13-modelos-de-dados)
-   [2. Componentes de UI](#2-componentes-de-ui)
    -   [2.1. PageHeader.tsx](#21-pageheadertsx)
-   [3. Abas de Funcionalidades](#3-abas-de-funcionalidades)
    -   [3.1. DashboardTab.tsx](#31-dashboardtabtsx)
-   [4. Lógica de Negócios e Hooks](#4-logica-de-negocios-e-hooks)
    -   [4.1. useStockData.ts](#41-usestockdatats)
-   [5. Dados e Serviços](#5-dados-e-servicos)
    -   [5.1. Geração de Dados de Exemplo (Mock)](#51-geracao-de-dados-de-exemplo-mock)

---

## 1. Conceitos Essenciais

Esta seção aborda os conceitos fundamentais que sustentam a aplicação Work Connect.

### 1.1. Arquitetura da Aplicação

O Work Connect é uma aplicação web moderna, construída sobre uma arquitetura robusta e escalável.

-   **Framework Frontend**: A aplicação é desenvolvida usando **Next.js**.
-   **Estrutura Baseada em Componentes**: A UI é organizada em uma estrutura modular no diretório `src/components`.
-   **Roteamento**: A aplicação utiliza um sistema de roteamento baseado em arquivos no diretório `src/app`.

### 1.2. Gerenciamento de Estado

A aplicação emprega uma solução de gerenciamento de estado centralizada para garantir um fluxo de dados previsível.

-   **`StockDataProvider`**: Um provedor de Contexto React que envolve a aplicação.
-   **Hook `useStockData`**: O núcleo do sistema de gerenciamento de estado.
-   **Hook `useStockDataContext`**: Fornece acesso ao estado global.

### 1.3. Modelos de Dados

Os modelos de dados, definidos em `src/types/estoque.ts`, fornecem uma estrutura clara para os dados da aplicação.

-   **`Product`**: Representa um produto.
-   **`Category`**: Representa uma categoria de produto.
-   **`Supplier`**: Representa um fornecedor.
-   **`Movement`**: Representa uma movimentação de estoque.
-   **`Alert`**: Representa um alerta de estoque.
-   **`Warehouse`**: Representa um armazém.

---

## 2. Componentes de UI

Visão geral dos principais componentes de UI reutilizáveis.

### 2.1. PageHeader.tsx

O `PageHeader` é usado para exibir o título da página e ações relevantes.

-   **Localização**: `src/components/estoque/ui/PageHeader.tsx`
-   **Trecho de Código**:
    ```typescript
    export function PageHeader({
      title,
      subtitle,
      actions,
      notificationCount = 0,
      onNotificationClick,
      className = '',
    }: PageHeaderProps) {
      return (
        <header className={`page-header ${className}`}>
          <div className="header-content">
            <div className="header-title-section">
              <h1 className="page-title">{title}</h1>
              {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
            <div className="header-actions">
              {actions}
              {onNotificationClick && (
                <button
                  className="notification-bell"
                  onClick={onNotificationClick}
                  aria-label="Notificações"
                >
                  <FontAwesomeIcon icon={faBell} />
                  {notificationCount > 0 && (
                    <span className="notification-badge">{notificationCount}</span>
                  )}
                </button>
              )}
            </div>
          </div>
        </header>
      );
    }
    ```

---

## 3. Abas de Funcionalidades

As abas de funcionalidades fornecem a funcionalidade principal da aplicação.

### 3.1. DashboardTab.tsx

O `DashboardTab` é a página inicial, com métricas e gráficos.

-   **Localização**: `src/components/estoque/tabs/DashboardTab.tsx`
-   **Trecho de Código**:
    ```typescript
    export const DashboardTab = React.memo(function DashboardTab({ data, metrics, insights, className = '' }: DashboardTabProps) {
      return (
        <div className={`dashboard-tab ${className}`}>
          {/* Metrics Cards */}
          <div className="metrics-grid">
            {/* ... */}
          </div>

          {/* Charts Grid */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <h3>Distribuição de Status</h3>
              </div>
              <StatusChart products={data.produtos} />
            </div>
            {/* ... */}
          </div>
        </div>
      );
    });
    ```

---

## 4. Lógica de Negócios e Hooks

Os hooks personalizados encapsulam as regras de negócio.

### 4.1. useStockData.ts

O `useStockData` é o núcleo do sistema de gerenciamento de estado.

-   **Localização**: `src/lib/estoque/hooks/useStockData.ts`
-   **Trecho de Código**:
    ```typescript
    export function useStockData(): UseStockDataReturn {
      const [data, setData] = useState<StockData>(() => ({
        produtos: [...MockDataEstoque.produtos],
        categorias: [...MockDataEstoque.categorias],
        fornecedores: [...MockDataEstoque.fornecedores],
        movimentacoes: [...MockDataEstoque.movimentacoes],
        alertas: [...MockDataEstoque.alertas],
        produto_fornecedor: [...MockDataEstoque.produto_fornecedor],
        armazens: [...MockDataEstoque.armazens],
        usuarios: [...MockDataEstoque.usuarios],
      }));

      const updateProduct = useCallback((id: number, updates: Partial<Product>) => {
        setData((prev) => ({
          ...prev,
          produtos: prev.produtos.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      }, []);

      // ...outras funções de manipulação de dados

      return {
        data,
        updateProduct,
        // ...
      };
    }
    ```

---

## 5. Dados e Serviços

Gerenciamento de dados e comunicação com serviços externos.

### 5.1. Geração de Dados de Exemplo (Mock)

A aplicação utiliza um gerador de dados de exemplo para desenvolvimento e testes.

-   **Localização**: `src/lib/estoque/mock-data.ts`
-   **Uso**: Os dados de exemplo são usados para inicializar o hook `useStockData`.
