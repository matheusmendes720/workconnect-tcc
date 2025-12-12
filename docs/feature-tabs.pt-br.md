# Abas de Funcionalidades

Este documento fornece uma visão geral detalhada das abas de funcionalidades na aplicação Work Connect. Estas abas estão localizadas em `src/components/estoque/tabs` e fornecem a funcionalidade principal da aplicação.

## DashboardTab.tsx

O componente `DashboardTab` é a principal página de destino da aplicação. Ele fornece uma visão geral de alto nível do status do estoque, incluindo métricas chave, gráficos e atividades recentes.

-   **Lógica**: O componente busca e exibe dados resumidos do `useStockDataContext`, fornecendo um instantâneo das informações mais importantes.
-   **Manuseio de Dados**: Ele usa o hook `useCharts` para gerar visualizações de dados e o hook `useStockData` para acessar os dados principais.
-   **Interações do Usuário**: Os usuários podem interagir com os gráficos para obter informações mais detalhadas e usar os botões de ação rápida para navegar para outras partes da aplicação.

## ProductsTab.tsx

O componente `ProductsTab` é usado para gerenciar os produtos no inventário. Ele fornece uma tabela de dados com todos os produtos, juntamente com opções para filtrar, ordenar e executar ações em massa.

-   **Lógica**: O componente usa o hook `useProducts` para lidar com a seleção e filtragem de produtos. Ele também se integra com o `useStockDataContext` para executar operações CRUD nos produtos.
-   **Manuseio de Dados**: Ele recebe uma lista de produtos do `StockDataProvider` principal e permite que os usuários modifiquem esses dados.
-   **Interações do Usuário**: Os usuários podem adicionar, editar e excluir produtos, bem como selecionar múltiplos produtos para operações em massa.

## CategoriesTab.tsx

O componente `CategoriesTab` é usado para gerenciar as categorias de produtos. Ele fornece uma visão hierárquica das categorias e permite que os usuários as adicionem, editem e excluam.

-   **Lógica**: O componente usa o hook `useCategories` para gerenciar a hierarquia de categorias e fornece uma interface simples para operações CRUD.
-   **Manuseio de Dados**: Ele interage com o `StockDataProvider` para atualizar os dados das categorias.
-   **Interações do Usuário**: Os usuários podem criar novas categorias, editar as existentes e excluir categorias que não são mais necessárias.

## SuppliersTab.tsx

O componente `SuppliersTab` é usado para gerenciar os fornecedores. Ele fornece uma lista de todos os fornecedores, juntamente com suas informações de contato e métricas de desempenho.

-   **Lógica**: O componente fornece uma interface direta para gerenciar os dados dos fornecedores, com opções para adicionar, editar e excluir fornecedores.
-   **Manuseio de Dados**: Ele usa o `StockDataProvider` para gerenciar os dados dos fornecedores.
-   **Interações do Usuário**: Os usuários podem adicionar novos fornecedores, atualizar suas informações e removê-los do sistema.

## MovementsTab.tsx

O componente `MovementsTab` é usado para rastrear todas as movimentações de estoque, como vendas, compras e transferências. Ele fornece um registro detalhado de todas as transações, com opções para filtrar e pesquisar.

-   **Lógica**: O componente exibe uma lista de todas as movimentações de estoque e permite que os usuários adicionem novas movimentações.
-   **Manuseio de Dados**: Ele usa o `StockDataProvider` para acessar os dados de movimentação e adicionar novas entradas.
-   **Interações do Usuário**: Os usuários podem visualizar os detalhes de cada movimentação e adicionar novas movimentações ao registro.

## AlertsTab.tsx

O componente `AlertsTab` é usado para gerenciar os alertas de estoque, como avisos de baixo estoque e alertas de validade. Ele fornece uma lista de todos os alertas ativos, com opções para marcá-los como lidos ou resolvê-los.

-   **Lógica**: O componente exibe uma lista de todos os alertas de estoque e permite que os usuários tomem ações sobre eles.
-   **Manuseio de Dados**: Ele usa o `StockDataProvider` para acessar os dados dos alertas e atualizar seu status.
-   **Interações do Usuário**: Os usuários podem marcar alertas como lidos, resolvê-los e executar ações em massa em múltiplos alertas.

## WarehousesTab.tsx

O componente `WarehousesTab` é usado para gerenciar os armazéns e locais de armazenamento. Ele fornece uma lista de todos os armazéns, juntamente com sua capacidade e utilização atual.

-   **Lógica**: O componente exibe uma lista de todos os armazéns e permite que os usuários os adicionem, editem e excluam.
-   **Manuseio de Dados**: Ele usa o `StockDataProvider` para gerenciar os dados dos armazéns.
-   **Interações do Usuário**: Os usuários podem adicionar novos armazéns, atualizar suas informações e removê-los do sistema.

## ExpirationsTab.tsx

O componente `ExpirationsTab` é usado para rastrear produtos que estão próximos da data de validade. Ele fornece uma lista de todos os produtos com data de validade, com opções para filtrar e ordenar.

-   **Lógica**: O componente exibe uma lista de todos os produtos com data de validade, destacando aqueles que estão próximos de vencer.
-   **Manuseio de Dados**: Ele usa o `StockDataProvider` para acessar os dados dos produtos e suas datas de validade.
-   **Interações do Usuário**: Os usuários podem visualizar o status de validade dos produtos e tomar medidas para evitar o desperdício.

## ReportsTab.tsx

O componente `ReportsTab` é usado para gerar e visualizar relatórios sobre vários aspectos do sistema de gerenciamento de estoque. Ele fornece um conjunto de relatórios predefinidos, bem como opções para criar relatórios personalizados.

-   **Lógica**: O componente permite que os usuários selecionem um tipo de relatório, apliquem filtros e gerem um relatório.
-   **Manuseio de Dados**: Ele usa o `StockDataProvider` para acessar os dados necessários para os relatórios.
-   **Interações do Usuário**: Os usuários podem gerar, visualizar e exportar relatórios em vários formatos.
