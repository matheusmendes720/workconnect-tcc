# Componentes de UI

Este documento fornece uma visão geral detalhada dos principais componentes de UI utilizados na aplicação Work Connect. Estes componentes estão localizados em `src/components/estoque/ui` e são projetados para serem reutilizáveis e modulares.

## AdvancedFilters.tsx

O componente `AdvancedFilters` fornece uma interface amigável para aplicar filtros complexos a tabelas de dados. Ele é projetado para ser facilmente configurável e pode ser adaptado a diferentes modelos de dados.

-   **Props**:
    -   `filters`: Um objeto que define os filtros disponíveis e seus valores atuais.
    -   `onFilterChange`: Uma função de callback que é invocada quando o valor de um filtro é alterado.
-   **Uso**: Este componente é usado em várias abas de funcionalidades para permitir que os usuários restrinjam os dados exibidos com base em critérios específicos.

## AlertCard.tsx

O componente `AlertCard` é usado para exibir alertas de estoque individuais em um formato claro e conciso. Ele inclui informações sobre a prioridade, o status e o produto relacionado ao alerta.

-   **Props**:
    -   `alert`: O objeto de alerta a ser exibido.
    -   `onMarkAsRead`: Uma função de callback para marcar o alerta como lido.
    -   `onResolve`: Uma função de callback para resolver o alerta.
-   **Uso**: Este componente é usado na Aba de Alertas para exibir uma lista de todos os alertas de estoque.

## BulkActionsBar.tsx

O componente `BulkActionsBar` fornece um conjunto de ações que podem ser executadas em múltiplos itens selecionados em uma tabela de dados. Ele é projetado para ser facilmente extensível com novas ações.

-   **Props**:
    -   `selectedItems`: Um array dos itens atualmente selecionados.
    -   `actions`: Um array de objetos de ação, cada um com um rótulo e um manipulador `onClick`.
-   **Uso**: Este componente é usado na Aba de Produtos para permitir que os usuários executem operações em massa, como excluir ou atualizar múltiplos produtos de uma vez.

## CapacityGauge.tsx

O componente `CapacityGauge` é uma representação visual da capacidade atual de um armazém ou local de armazenamento. Ele fornece uma maneira rápida e fácil de ver quanto espaço está disponível.

-   **Props**:
    -   `currentCapacity`: O nível de capacidade atual.
    -   `maxCapacity`: A capacidade máxima.
-   **Uso**: Este componente é usado na Aba de Armazéns para exibir a capacidade de cada armazém.

## DateRangePicker.tsx

O componente `DateRangePicker` permite que os usuários selecionem um intervalo de datas para filtrar dados. Ele é usado em várias partes da aplicação para fornecer filtragem baseada em tempo.

-   **Props**:
    -   `onDateChange`: Uma função de callback que é invocada quando o intervalo de datas é alterado.
-   **Uso**: Este componente é usado na Aba de Relatórios e na Aba de Movimentações para filtrar dados por data.

## ErrorState.tsx

O componente `ErrorState` é exibido quando ocorre um erro ao buscar ou exibir dados. Ele fornece uma mensagem amigável e uma opção para tentar a operação novamente.

-   **Props**:
    -   `message`: A mensagem de erro a ser exibida.
    -   `onRetry`: Uma função de callback para tentar a operação falha novamente.
-   **Uso**: Este componente é usado em toda a aplicação para lidar e exibir erros de forma graciosa.

## ExportButton.tsx

O componente `ExportButton` permite que os usuários exportem dados para vários formatos, como CSV ou PDF. Ele é projetado para ser facilmente integrado com diferentes fontes de dados.

-   **Props**:
    -   `data`: Os dados a serem exportados.
    -   `format`: O formato de exportação desejado.
-   **Uso**: Este componente é usado na Aba de Relatórios para permitir que os usuários exportem seus relatórios gerados.

## LoadingSkeleton.tsx

O componente `LoadingSkeleton` é usado para fornecer um placeholder visual enquanto os dados estão sendo carregados. Ele melhora a experiência do usuário, indicando que o conteúdo está a caminho.

-   **Props**:
    -   `count`: O número de itens de esqueleto a serem exibidos.
-   **Uso**: Este componente é usado em várias abas para fornecer um estado de carregamento enquanto os dados estão sendo buscados do servidor.

## LoadingState.tsx

O componente `LoadingState` é um componente simples que exibe um spinner de carregamento e uma mensagem para indicar que uma operação está em andamento.

-   **Props**:
    -   `message`: A mensagem a ser exibida.
-   **Uso**: Este componente é usado para estados de carregamento gerais onde um esqueleto completo não é necessário.

## NotificationCenter.tsx

O componente `NotificationCenter` é um local centralizado para exibir notificações ao usuário. Ele pode ser usado para mostrar mensagens de sucesso, avisos e erros.

-   **Props**:
    -   `notifications`: Um array de objetos de notificação a serem exibidos.
    -   `onClose`: Uma função de callback para fechar o centro de notificações.
-   **Uso**: Este componente é usado no layout principal da aplicação para exibir notificações globais.

## PageHeader.tsx

O componente `PageHeader` é usado para exibir o título da página atual, juntamente com quaisquer ações ou informações relevantes.

-   **Props**:
    -   `title`: O título da página.
    -   `actions`: Um array de componentes de ação a serem exibidos no cabeçalho.
-   **Uso**: Este componente é usado no topo de cada página para fornecer um cabeçalho consistente.

## QuickActions.tsx

O componente `QuickActions` fornece um conjunto de ações usadas com frequência no formato de um botão de ação flutuante. Ele permite que os usuários executem tarefas comuns rapidamente, sem navegar para uma página diferente.

-   **Props**:
    -   `actions`: Um array de objetos de ação, cada um com um rótulo, ícone e manipulador `onClick`.
-   **Uso**: Este componente é exibido em todas as páginas para fornecer acesso rápido a ações comuns.

## RealTimeBadge.tsx

O componente `RealTimeBadge` é um pequeno emblema que indica se a aplicação está recebendo atualizações em tempo real.

-   **Props**:
    -   `isActive`: Um booleano que indica se as atualizações em tempo real estão ativas.
-   **Uso**: Este componente é exibido no cabeçalho da página para fornecer uma indicação visual de dados em tempo real.

## TabNavigation.tsx

O componente `TabNavigation` fornece um conjunto de abas para navegar entre as diferentes seções da aplicação. Ele é projetado para ser facilmente configurável com diferentes layouts de abas.

-   **Props**:
    -   `tabs`: Um array de objetos de aba, cada um com um rótulo e um componente correspondente.
    -   `activeTab`: A aba atualmente ativa.
    -   `onTabChange`: Uma função de callback que é invocada quando uma aba é alterada.
-   **Uso**: Este componente é usado para criar a estrutura de navegação principal da aplicação.
