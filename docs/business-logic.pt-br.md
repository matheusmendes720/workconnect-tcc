# Lógica de Negócios e Hooks

Este documento fornece uma visão geral detalhada da lógica de negócios e dos hooks personalizados utilizados na aplicação Work Connect. Estes hooks estão localizados em `src/lib/estoque/hooks` e encapsulam as regras de negócio e a lógica de manipulação de dados da aplicação.

## Hooks Personalizados

### useAlerts.ts

O hook `useAlerts` é responsável por gerenciar os alertas de estoque. Ele fornece funções para buscar, criar e atualizar alertas, bem como para lidar com a lógica de negócios relacionada a alertas.

-   **Propósito**: Encapsular a lógica para gerenciar alertas de estoque.
-   **Valores de Retorno**: Um objeto contendo a lista de alertas e funções para manipulá-los.
-   **Regras de Negócio**: Implementa regras para gerar alertas com base nos níveis de estoque, datas de validade e outros critérios.

### useCategories.ts

O hook `useCategories` é usado para gerenciar as categorias de produtos. Ele fornece funções para buscar, criar, atualizar e excluir categorias, bem como para lidar com a lógica específica de categorias.

-   **Propósito**: Gerenciar a hierarquia de categorias de produtos e a lógica de negócios relacionada.
-   **Valores de Retorno**: Um objeto contendo a lista de categorias e funções para gerenciá-las.
-   **Regras de Negócio**: Implementa regras para lidar com categorias aninhadas e para garantir a consistência dos dados quando as categorias são modificadas.

### useCharts.ts

O hook `useCharts` é responsável por gerar os dados necessários para os gráficos e visualizações na Aba de Dashboard.

-   **Propósito**: Encapsular a lógica de agregação e formatação de dados para gráficos.
-   **Valores de Retorno**: Um objeto contendo os dados para todos os gráficos da aplicação.
-   **Regras de Negócio**: Implementa a lógica para calcular métricas chave e para transformar dados brutos em um formato adequado para gráficos.

### useDatabaseIntegration.ts

O hook `useDatabaseIntegration` é responsável por lidar com a integração com o banco de dados. Ele fornece funções para buscar, salvar e sincronizar dados com um banco de dados remoto.

-   **Propósito**: Abstrair os detalhes da integração com o banco de dados e fornecer uma API consistente para a persistência de dados.
-   **Valores de Retorno**: Um objeto contendo o status da conexão com o banco de dados e funções para interagir com ele.
-   **Regras de Negócio**: Implementa a lógica para lidar com a sincronização de dados, resolução de conflitos e tratamento de erros.

### useExpirations.ts

O hook `useExpirations` é usado para gerenciar as datas de validade dos produtos. Ele fornece funções para rastrear produtos que estão próximos de sua data de validade e para gerar alertas.

-   **Propósito**: Encapsular a lógica para gerenciar as validades dos produtos.
-   **Valores de Retorno**: Um objeto contendo a lista de produtos prestes a vencer e dados relacionados.
-   **Regras de Negócio**: Implementa as regras para identificar e sinalizar produtos que estão próximos de sua data de validade.

### useFilters.ts

O hook `useFilters` é responsável por gerenciar os filtros usados nas tabelas de dados. Ele fornece uma maneira flexível e extensível de filtrar dados com base na entrada do usuário.

-   **Propósito**: Fornecer uma solução centralizada para gerenciar filtros de dados.
-   **Valores de Retorno**: Um objeto contendo o estado atual do filtro e funções para atualizá-lo.
-   **Regras de Negócio**: Implementa a lógica para aplicar filtros aos dados e para garantir que o estado do filtro seja consistente.

### useMovements.ts

O hook `useMovements` é usado para gerenciar as movimentações de estoque. Ele fornece funções para buscar, criar e rastrear movimentações de estoque.

-   **Propósito**: Encapsular a lógica para gerenciar as movimentações de estoque.
-   **Valores de Retorno**: Um objeto contendo a lista de movimentações e funções para gerenciá-las.
-   **Regras de Negócio**: Implementa as regras para validar e processar movimentações de estoque, bem como para atualizar os níveis de estoque de acordo.

### useProducts.ts

O hook `useProducts` é responsável por gerenciar os produtos no inventário. Ele fornece funções para buscar, criar, atualizar e excluir produtos.

-   **Propósito**: Encapsular a lógica para gerenciar produtos.
-   **Valores de Retorno**: Um objeto contendo a lista de produtos e funções para gerenciá-los.
-   **Regras de Negócio**: Implementa as regras para calcular o status do estoque, lidar com variantes de produtos e garantir a consistência dos dados.

### useRealTimeUpdates.ts

O hook `useRealTimeUpdates` é usado para fornecer atualizações em tempo real para a aplicação. Ele usa uma conexão WebSocket para receber atualizações do servidor e para atualizar o estado da aplicação em tempo real.

-   **Propósito**: Fornecer uma experiência de usuário fluida e responsiva, mantendo os dados atualizados em tempo real.
-   **Valores de Retorno**: Um objeto contendo o status da conexão em tempo real.
-   **Regras de Negócio**: Implementa a lógica para lidar com atualizações em tempo real, incluindo resolução de conflitos e tratamento de erros.

### useReports.ts

O hook `useReports` é responsável por gerar e gerenciar relatórios. Ele fornece funções para criar, personalizar e exportar relatórios em vários formatos.

-   **Propósito**: Fornecer uma solução de relatórios flexível e poderosa.
-   **Valores de Retorno**: Um objeto contendo os dados do relatório gerado e funções para gerenciar relatórios.
-   **Regras de Negócio**: Implementa a lógica para agregar e formatar dados para relatórios, bem como para lidar com a personalização e exportação de relatórios.

### useStockData.ts

O hook `useStockData` é o núcleo do sistema de gerenciamento de estado. Ele inicializa o estado da aplicação e fornece um conjunto de funções para realizar operações CRUD nos dados.

-   **Proposto**: Fornecer uma maneira centralizada e consistente de gerenciar o estado da aplicação.
-   **Valores de Retorno**: Um objeto contendo o estado da aplicação e funções para atualizá-lo.
-   **Regras de Negócio**: Implementa a lógica de negócios principal da aplicação, incluindo validação de dados e verificações de consistência.

### useSuppliers.ts

O hook `useSuppliers` é usado para gerenciar os fornecedores. Ele fornece funções para buscar, criar, atualizar e excluir fornecedores.

-   **Propósito**: Encapsular a lógica para gerenciar fornecedores.
-   **Valores de Retorno**: Um objeto contendo a lista de fornecedores e funções para gerenciá-los.
-   **Regras de Negócio**: Implementa as regras para lidar com os dados dos fornecedores, incluindo informações de contato, métricas de desempenho e condições de pagamento.

### useWarehouses.ts

O hook `useWarehouses` é usado para gerenciar os armazéns e locais de armazenamento. Ele fornece funções para buscar, criar, atualizar e excluir armazéns.

-   **Propósito**: Encapsular a lógica para gerenciar armazéns.
-   **Valores de Retorno**: Um objeto contendo a lista de armazéns e funções para gerenciá-los.
-   **Regras de Negócio**: Implementa as regras para lidar com os dados dos armazéns, incluindo gerenciamento de capacidade e rastreamento de localização.
