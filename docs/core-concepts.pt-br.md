# Conceitos Essenciais

Este documento fornece uma explicação detalhada dos conceitos essenciais que sustentam a aplicação Work Connect, incluindo sua arquitetura, gerenciamento de estado e modelos de dados.

## Arquitetura da Aplicação

O Work Connect é uma aplicação web moderna, construída sobre uma arquitetura robusta e escalável. Os principais componentes de sua arquitetura são:

-   **Framework Frontend**: A aplicação é desenvolvida usando **Next.js**, um framework React popular que permite renderização no lado do servidor, geração de sites estáticos e uma experiência de desenvolvimento fluida.
-   **Estrutura Baseada em Componentes**: A UI é organizada em uma estrutura modular e baseada em componentes, o que promove a reutilização e a manutenibilidade. Os componentes estão localizados no diretório `src/components` e são categorizados por funcionalidade.
-   **Roteamento**: A aplicação utiliza um sistema de roteamento baseado em arquivos, com páginas e rotas definidas no diretório `src/app`. Essa abordagem simplifica a navegação e torna a estrutura da aplicação fácil de entender.
-   **Estilização**: A estilização da aplicação é gerenciada através de uma combinação de folhas de estilo globais e estilos específicos de componentes, garantindo uma interface de usuário consistente e visualmente atraente.

## Gerenciamento de Estado

A aplicação emprega uma solução de gerenciamento de estado centralizada para garantir uma única fonte de verdade e um fluxo de dados previsível. Os elementos-chave do sistema de gerenciamento de estado são:

-   **`StockDataProvider`**: Este é um provedor de Contexto React que envolve toda a aplicação e torna o estado global acessível a todos os componentes. Ele é implementado em `src/lib/estoque/context/StockDataContext.tsx`.
-   **Hook `useStockData`**: Este hook personalizado, localizado em `src/lib/estoque/hooks/useStockData.ts`, é o núcleo do sistema de gerenciamento de estado. Ele inicializa o estado da aplicação com dados de exemplo (mock) e fornece um conjunto de funções para realizar operações CRUD (Criar, Ler, Atualizar, Excluir) nos dados.
-   **Hook `useStockDataContext`**: Este hook fornece uma maneira conveniente para os componentes acessarem o estado global e as funções fornecidas pelo hook `useStockData`. Ele garante que os componentes só possam acessar o estado quando são renderizados dentro do `StockDataProvider`.

O fluxo de dados na aplicação é unidirecional, com as alterações de estado sendo iniciadas por ações do usuário e propagadas para os componentes. Isso torna o comportamento da aplicação previsível e fácil de depurar.

## Modelos de Dados

Os modelos de dados da aplicação são definidos em `src/types/estoque.ts` e fornecem uma estrutura clara e consistente para os dados usados em toda a aplicação. Os principais modelos de dados são:

-   **`Product`**: Representa um produto no inventário, com propriedades como nome, descrição, quantidade e preço.
-   **`Category`**: Representa uma categoria de produto, com propriedades para nome, descrição e categoria pai.
-   **`Supplier`**: Representa um fornecedor, com propriedades para nome da empresa, informações de contato e termos de entrega.
-   **`Movement`**: Representa uma movimentação de estoque, como uma venda ou compra, com propriedades para produto, quantidade e tipo de movimentação.
-   **`Alert`**: Representa um alerta de estoque, como um aviso de baixo estoque, com propriedades para produto, prioridade e status.
-   **`Warehouse`**: Representa um armazém ou local de armazenamento, com propriedades para nome, localização e capacidade.

Esses modelos de dados são usados em toda a aplicação, desde a geração de dados de exemplo até os componentes de UI, garantindo a consistência e a segurança de tipos dos dados.
