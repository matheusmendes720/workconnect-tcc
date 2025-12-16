# Documentação Completa do Projeto WorkConnect

## Índice

1.  **Introdução**
    *   O que é o WorkConnect?
    *   Contexto Acadêmico
    *   Público-Alvo
2.  **Análise de Negócio**
    *   O Problema: As Dores das PMEs
    *   A Solução: Como o WorkConnect Resolve
    *   Benefícios Quantificados
3.  **Arquitetura do Sistema**
    *   Visão Geral da Arquitetura
    *   Estrutura de Diretórios
    *   Tecnologias Utilizadas
4.  **Modelagem do Banco de Dados**
    *   Modelo Conceitual (MER)
    *   Diagrama de Classes (UML)
    *   Modelo Físico (DER)
    *   Scripts SQL e Estrutura das Tabelas
5.  **Funcionalidades do Sistema (Casos de Uso)**
    *   Dashboard
    *   Gestão de Produtos
    *   Gestão de Fornecedores
    *   Movimentações de Estoque
    *   Alertas Automáticos
    *   Relatórios
    *   Configurações e LGPD
6.  **Destaques da Implementação de Código**
    *   Estrutura do Frontend (Next.js e React)
    *   Gerenciamento de Estado
    *   Integração com a Base de Dados
7.  **Segurança e Conformidade com a LGPD**
    *   Dados Coletados e Bases Legais
    *   Direitos dos Titulares e Como Exercê-los
    *   Implementação Técnica da Conformidade
    *   Auditoria e Logs
8.  **Do Modelo Conceitual ao Código SQL: Uma Análise Detalhada**
    *   A Jornada do Dado: Do Conceito à Implementação
    *   Views: Abstraindo a Complexidade
    *   Triggers: Automatizando as Regras de Negócio
    *   Stored Procedures: Encapsulando Operações Complexas
9.  **Conclusão**
    *   Roadmap Futuro
    *   Como Contribuir

---

## 1. Introdução

### O que é o WorkConnect?

O WorkConnect é uma plataforma digital de gestão de estoque, concebida para atender às necessidades específicas de **Pequenas e Médias Empresas (PMEs)**. A solução visa substituir controles manuais e planilhas descentralizadas por um sistema centralizado, inteligente e automatizado. O objetivo principal é eliminar perdas, otimizar o capital de giro imobilizado em estoque e aumentar a eficiência operacional das empresas.

### Contexto Acadêmico

Este projeto foi desenvolvido como **Trabalho de Conclusão de Curso (TCC)** para o curso Técnico em Desenvolvimento de Sistemas do **SENAI (Serviço Nacional de Aprendizagem Industrial)**, durante o período de 2024-2025. Ele representa a aplicação prática dos conhecimentos adquiridos em engenharia de software, modelagem de dados, desenvolvimento de aplicações e conformidade legal.

### Público-Alvo

O sistema é desenhado para PMEs com as seguintes características:

*   **Faturamento Anual:** Entre R$ 360.000 e R$ 4.800.000.
*   **Número de Funcionários:** De 1 a 50 colaboradores.
*   **Setores:** Varejo, Indústria Leve, Serviços e outros que necessitem de controle de inventário.

---

## 2. Análise de Negócio

### O Problema: As Dores das PMEs

PMEs frequentemente enfrentam desafios significativos na gestão de estoque, que impactam diretamente sua lucratividade e competitividade. Os principais problemas identificados são:

| Problema                  | Impacto Direto                                      |
| ------------------------- | --------------------------------------------------- |
| **Dados Fragmentados**    | Informações espalhadas em planilhas, cadernos e e-mails, gerando inconsistência. |
| **Erros de Contagem**     | Divergências entre o estoque físico e o registrado, levando a decisões equivocadas. |
| **Falta de Estoque**      | Perda de vendas e de clientes por não ter o produto disponível quando necessário. |
| **Excesso de Estoque**    | Capital de giro parado em produtos obsoletos ou de baixa rotatividade, aumentando custos. |
| **Processos Manuais**     | Tempo excessivo gasto em tarefas repetitivas de controle, que poderiam ser automatizadas. |

### A Solução: Como o WorkConnect Resolve

O WorkConnect ataca esses problemas com uma abordagem integrada e automatizada:

```mermaid
graph LR
    subgraph "Problemas"
        A[📋 Planilhas Dispersas]
        B[🔢 Erros Manuais]
        C[💸 Perda de Vendas]
        D[📦 Estoque Parado]
    end

    subgraph "Soluções WorkConnect"
        SA[☁️ Plataforma Centralizada]
        SB[🤖 Controle Automatizado]
        SC[🔔 Alertas de Reposição]
        SD[📊 Relatórios Inteligentes]
    end

    A --> SA
    B --> SB
    C --> SC
    D --> SD
```

### Benefícios Quantificados

A implementação do WorkConnect visa proporcionar retornos mensuráveis para as PMEs:

*   **Redução de 40%** nas perdas por falta de estoque.
*   **Economia de 30%** em custos de armazenamento e obsolescência.
*   **Ganho de 15 horas/semana** por funcionário em tarefas de gestão.
*   **Aumento de 99%** na precisão do inventário.
*   **Retorno sobre o Investimento (ROI)** estimado de **150%** no primeiro ano de uso.

---

## 3. Arquitetura do Sistema

### Visão Geral da Arquitetura

O sistema foi planejado com uma arquitetura moderna, escalável e modular, separando as responsabilidades em camadas distintas.

```mermaid
graph TB
    subgraph "👤 Camada de Apresentação"
        Web[🌐 Aplicação Web<br/>Next.js + React]
        Mobile[📱 App Móvel (Futuro)<br/>React Native]
    end

    subgraph "⚙️ Camada de Aplicação (Backend - Futuro)"
        API[🔌 API REST<br/>Node.js + Express]
        Auth[🔐 Autenticação<br/>JWT + OAuth 2.0]
    end

    subgraph "💾 Camada de Dados"
        DB[(🗄️ Banco de Dados<br/>PostgreSQL)]
        Cache[(⚡ Cache<br/>Redis - Opcional)]
    end

    subgraph "🔒 Conformidade"
        LGPD[📜 Auditoria LGPD<br/>Logs + Anonimização]
    end

    Web --> API
    Mobile --> API
    API --> Auth
    API --> DB
    API --> Cache
    API --> LGPD
    LGPD --> DB
```

Atualmente, o projeto está na fase de MVP (Produto Mínimo Viável), com o frontend e a camada de dados sendo o foco principal.

### Estrutura de Diretórios

O projeto segue uma estrutura de diretórios organizada por domínio e responsabilidade:

```
/
├── src/
│   ├── app/                # Rotas e páginas principais (Next.js App Router)
│   │   └── estoque/        # Módulo principal de gestão de estoque
│   ├── components/         # Componentes React reutilizáveis
│   │   └── estoque/        # Componentes específicos do módulo de estoque
│   ├── lib/                # Lógica de negócio, hooks e utilitários
│   │   ├── estoque/
│   │   └── utils/
│   ├── styles/             # Estilos globais
│   └── types/              # Definições de tipos TypeScript
├── database/               # Scripts SQL, migrations e seeds (Planejado)
├── doc/                    # Documentação técnica (Diagramas, etc.)
└── ...                     # Arquivos de configuração (package.json, etc.)
```

### Tecnologias Utilizadas

| Camada    | Tecnologia       | Justificativa                                        |
| --------- | ---------------- | ---------------------------------------------------- |
| Frontend  | **Next.js/React**| Framework moderno para interfaces reativas e componentizadas. |
| Estilização| **CSS Modules**    | Escopo local para estilos, evitando conflitos.     |
| Banco de Dados | **PostgreSQL**   | Banco relacional robusto, com suporte a transações e conformidade ACID. |
| ORM (Planejado)| **Sequelize**    | Mapeamento objeto-relacional para Node.js, facilitando a interação com o banco. |
| Backend (Planejado)| **Node.js/Express**| Ambiente de execução JavaScript no servidor, ideal para APIs REST. |

---

## 4. Modelagem do Banco de Dados

A base de dados é o coração do sistema, projetada para garantir integridade, performance e conformidade.

### Modelo Conceitual (MER)

O modelo conceitual define as principais entidades e seus relacionamentos, focando nas regras de negócio.

```mermaid
erDiagram
    PRODUTO }o--|| CATEGORIA : "pertence a"
    PRODUTO }o--o{ FORNECEDOR : "fornecido por"
    MOVIMENTACAO_ESTOQUE }o--|| PRODUTO : "movimenta"
    MOVIMENTACAO_ESTOQUE }o--|| USUARIO : "realizada por"
    ALERTA_REPOSICAO }o--|| PRODUTO : "alerta sobre"
    AUDITORIA_LGPD }o--|| USUARIO : "audita ações de"
```

### Diagrama de Classes (UML)

O diagrama de classes traduz o modelo conceitual para uma estrutura orientada a objetos, detalhando atributos e métodos.

```mermaid
classDiagram
    class Produto {
        +Long id
        +String codigo
        +String nome
        +Integer quantidadeAtual
        +Integer quantidadeMinima
        +StatusEstoque status
        +calcularCustoMedio()
        +atualizarStatus()
    }
    class MovimentacaoEstoque {
        +Long id
        +DateTime dataHora
        +Integer quantidade
        +TipoMovimentacao tipo
        +registrar()
    }
    class AlertaReposicao {
        +Long id
        +DateTime dataAlerta
        +PrioridadeAlerta prioridade
        +gerar()
    }
    class Usuario {
        +Long id
        +String nome
        +String email
        +exportarDadosPessoais()
        +solicitarExclusao()
    }
    Produto "*" -- "1" Categoria
    MovimentacaoEstoque "*" -- "1" Produto
    AlertaReposicao "*" -- "1" Produto
    MovimentacaoEstoque "*" -- "1" Usuario
```

### Modelo Físico (DER) e Scripts SQL

O modelo físico detalha a implementação no banco de dados, incluindo tipos de dados, chaves, índices e constraints.

**Tabela Principal: `produto`**

```sql
CREATE TABLE produto (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    categoria_id BIGINT NOT NULL REFERENCES categoria(id),
    quantidade_atual INTEGER NOT NULL DEFAULT 0 CHECK (quantidade_atual >= 0),
    quantidade_minima INTEGER NOT NULL CHECK (quantidade_minima > 0),
    custo_medio_ponderado DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'CRITICO',
    ativo BOOLEAN DEFAULT TRUE,
    CONSTRAINT chk_status CHECK (status IN ('OK', 'BAIXO', 'CRITICO'))
);
```

**Tabela Principal: `movimentacao_estoque`**

```sql
CREATE TABLE movimentacao_estoque (
    id BIGSERIAL PRIMARY KEY,
    produto_id BIGINT NOT NULL REFERENCES produto(id),
    usuario_id BIGINT NOT NULL REFERENCES usuario(id),
    tipo VARCHAR(30) NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario DECIMAL(10,2),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_tipo CHECK (tipo IN (
        'ENTRADA_COMPRA', 'ENTRADA_DEVOLUCAO',
        'SAIDA_VENDA', 'SAIDA_PERDA', 'AJUSTE_INVENTARIO'
    ))
);
```

O sistema também utiliza **Triggers** para automatizar regras de negócio críticas, como:
*   `fn_atualizar_status_produto()`: Recalcula o status (`OK`, `BAIXO`, `CRITICO`) sempre que a quantidade é alterada.
*   `fn_gerar_alerta_reposicao()`: Cria um alerta automaticamente quando `quantidade_atual` fica abaixo de `quantidade_minima`.
*   `fn_calcular_custo_medio()`: Recalcula o custo médio ponderado a cada `ENTRADA_COMPRA`.

---

## 5. Funcionalidades do Sistema (Casos de Uso)

O sistema é dividido em módulos, cada um com funcionalidades específicas para atender às necessidades do usuário.

### Dashboard (UC101, UC102)

*   **Visão Geral:** Métricas-chave como valor total em estoque, número de produtos críticos e distribuição por categoria.
*   **Alertas Visuais:** Destaque imediato para produtos que necessitam de reposição.

### Gestão de Produtos (UC201-UC208)

*   **Cadastro Completo:** Permite registrar produtos com código, nome, categoria, níveis de estoque, localização e mais.
*   **Categorias Hierárquicas:** Organização de produtos em uma estrutura de árvore (ex: Ferramentas > Manuais > Chaves).
*   **Importação em Massa:** Facilita a migração de dados a partir de planilhas Excel.

### Movimentações de Estoque (UC401-UC404)

*   **Registro Detalhado:** Registra todas as entradas (compras, devoluções) e saídas (vendas, perdas), com rastreamento por usuário.
*   **Ajuste de Inventário:** Ferramenta auditada para corrigir discrepâncias entre o estoque físico e o sistema.

### Alertas Automáticos (UC501-UC502)

*   **Geração Inteligente:** O sistema monitora o estoque e cria alertas automaticamente quando um produto atinge o nível mínimo.
*   **Priorização:** Os alertas são classificados por urgência (Urgente, Alta, Média, Baixa) para guiar a ação do gestor.

### Relatórios (UC601-UC605)

*   **Exportação Flexível:** Gera relatórios em PDF, Excel (XLSX) e CSV.
*   **Análises Diversas:** Inclui relatórios de estoque geral, movimentações por período, produtos críticos e desempenho de fornecedores.

### Configurações e LGPD (UC701-UC703)

*   **Gestão de Dados Pessoais:** Permite que os usuários exerçam seus direitos garantidos pela LGPD, como exportar e solicitar a exclusão de seus dados.
*   **Conformidade:** Garante a coleta de consentimento e audita todas as ações relacionadas a dados pessoais.

---

## 6. Destaques da Implementação de Código

### Estrutura do Frontend (`src/app/estoque/page.tsx`)

A página principal de estoque (`page.tsx`) atua como um orquestrador, integrando todos os componentes, hooks e contextos necessários para a funcionalidade da aplicação.

```typescript
// src/app/estoque/page.tsx (Simplificado)
export default function EstoquePage() {
  return (
    <StockDataProvider> // Fornece os dados de estoque para toda a aplicação
      <EstoquePageContent />
    </StockDataProvider>
  );
}

function EstoquePageContent() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const stockData = useStockDataContext(); // Hook para acessar os dados

  // Renderiza a aba ativa
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'produtos': return <ProductsTab />;
      // ... outras abas
    }
  };

  return (
    <div>
      <PageHeader />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}
```

### Gerenciamento de Estado (`StockDataContext`)

Utilizamos o Context API do React para gerenciar o estado global dos dados de estoque. O `StockDataProvider` busca os dados (atualmente de um mock, mas preparado para uma API real) e os disponibiliza para todos os componentes filhos através do hook `useStockDataContext`. Isso evita o "prop drilling" e centraliza a lógica de manipulação de dados.

### Hooks Customizados (`useProducts`, `useCharts`)

A lógica de negócio é encapsulada em hooks customizados para promover a reutilização e a separação de responsabilidades.
*   **`useProducts`**: Gerencia a filtragem, seleção e manipulação de produtos.
*   **`useCharts`**: Processa os dados brutos para gerar as informações necessárias para os gráficos do dashboard.

---

## 7. Segurança e Conformidade com a LGPD

A conformidade com a LGPD é um pilar fundamental do projeto.

### Dados Coletados e Bases Legais

*   **Dados:** Nome, email, telefone (opcional), IP de acesso.
*   **Base Legal Principal:** **Consentimento**, obtido de forma explícita no primeiro acesso do usuário.
*   **Base Legal Secundária:** **Legítimo Interesse**, para registrar IPs e logs de acesso para fins de segurança e auditoria.

### Direitos dos Titulares e Como Exercê-los

O sistema implementa todos os direitos previstos no Art. 18 da LGPD:

| Direito             | Implementação no Sistema                               |
| ------------------- | ------------------------------------------------------ |
| **Acesso e Confirmação** | Menu "Meus Dados", que exibe todas as informações do usuário. |
| **Portabilidade**   | Botão "Exportar Meus Dados", que gera um arquivo JSON completo. |
| **Correção**        | Formulário de edição de perfil.                       |
| **Eliminação**      | Solicitação de exclusão, que aciona um processo de **anonimização** após 90 dias. |

### Implementação Técnica da Conformidade

*   **Tabela `auditoria_lgpd`**: Registra todas as ações sensíveis (login, exportação, solicitação de exclusão) com usuário, data/hora e IP.
*   **Processo de Anonimização**: Em vez de deletar o usuário (o que corromperia o histórico de movimentações), o sistema substitui seus dados pessoais por informações genéricas (ex: "Usuário Anônimo #123"), preservando a integridade referencial.
*   **Jobs Automáticos**: Scripts agendados para processar anonimizações pendentes e limpar logs antigos, garantindo a execução das políticas de retenção.

---

## 8. Do Modelo Conceitual ao Código SQL: Uma Análise Detalhada

Esta seção aprofunda a implementação técnica do banco de dados, demonstrando como as regras de negócio e os modelos conceituais foram traduzidos em código SQL funcional e eficiente no PostgreSQL. A automação e a integridade dos dados são garantidas por meio de Views, Triggers e Stored Procedures.

### A Jornada do Dado: Do Conceito à Implementação

1.  **Modelo Conceitual (O Quê?)**: Define as entidades de negócio (`Produto`, `Fornecedor`) e suas relações ("um produto é fornecido por muitos fornecedores"). É a fase de entendimento do problema.
2.  **Modelo Lógico (Como?)**: Estrutura as entidades em um formato mais próximo ao de um banco de dados, definindo chaves primárias e estrangeiras, mas ainda sem se prender a um SGBD específico.
3.  **Modelo Físico (A Implementação)**: Traduz o modelo lógico para o dialeto SQL específico do SGBD escolhido (PostgreSQL), definindo tipos de dados (`VARCHAR`, `BIGINT`), `CONSTRAINTS`, `INDEXES` e a lógica de automação.

### Views: Abstraindo a Complexidade para a Aplicação

Views são, essencialmente, consultas SQL armazenadas que se comportam como tabelas virtuais. Elas são usadas para simplificar o acesso a dados complexos, desnormalizar informações para leitura e garantir que a aplicação sempre consuma dados consistentes e pré-processados.

**`vw_estoque_completo`**
*   **Propósito**: Fornecer uma visão unificada e rica de cada produto, juntando informações de múltiplas tabelas (`produto`, `categoria`, `fornecedor`).
*   **Análise do Código**:
    ```sql
    CREATE OR REPLACE VIEW vw_estoque_completo AS
    SELECT
        p.id AS produto_id,
        p.codigo,
        p.nome,
        c.nome AS categoria,
        -- ...
        p.quantidade_atual * p.custo_medio_ponderado AS valor_total_estoque,
        f.razao_social AS fornecedor_principal
    FROM produto p
    INNER JOIN categoria c ON p.categoria_id = c.id
    LEFT JOIN produto_fornecedor pf ON p.id = pf.produto_id AND pf.prioridade = 1
    LEFT JOIN fornecedor f ON pf.fornecedor_id = f.id
    WHERE p.ativo = TRUE;
    ```
*   **Benefícios**:
    *   **Simplicidade**: A aplicação (frontend/backend) não precisa executar `JOINs` complexos; ela simplesmente faz um `SELECT * FROM vw_estoque_completo`.
    *   **Performance**: Otimiza consultas comuns, pois o plano de execução da view pode ser cacheado pelo PostgreSQL.
    *   **Consistência**: Garante que cálculos como `valor_total_estoque` sejam feitos sempre da mesma maneira.

**`vw_produtos_criticos`**
*   **Propósito**: Isolar rapidamente os produtos que exigem atenção imediata (estoque baixo ou crítico), servindo como a principal fonte de dados para o dashboard e o módulo de alertas.
*   **Análise do Código**:
    ```sql
    CREATE OR REPLACE VIEW vw_produtos_criticos AS
    SELECT
        p.id,
        p.nome,
        p.quantidade_atual,
        p.quantidade_minima,
        p.status
        -- ... dados do fornecedor para reposição
    FROM produto p
    WHERE p.ativo = TRUE
      AND p.status IN ('BAIXO', 'CRITICO');
    ```
*   **Benefícios**:
    *   **Foco**: Filtra o "ruído", permitindo que a aplicação se concentre apenas nos itens acionáveis.
    *   **Eficiência**: Uma consulta `SELECT` nesta view é muito mais rápida do que escanear a tabela `produto` inteira e aplicar o filtro em tempo de execução.

---

### Triggers: Automatizando as Regras de Negócio

Triggers são procedimentos que são executados automaticamente em resposta a determinados eventos (`INSERT`, `UPDATE`, `DELETE`) em uma tabela. Eles são a espinha dorsal da automação e da integridade de dados no WorkConnect.

**`fn_atualizar_status_produto()`**
*   **Evento**: `BEFORE UPDATE` na coluna `quantidade_atual` da tabela `produto`.
*   **Propósito**: Garantir que o status de um produto (`OK`, `BAIXO`, `CRITICO`) seja sempre um reflexo fiel da sua quantidade em estoque em relação ao mínimo definido.
*   **Análise do Código**:
    ```sql
    -- Lógica principal dentro da função do trigger
    percentual := (NEW.quantidade_atual::DECIMAL / NEW.quantidade_minima) * 100;
    IF percentual < 30 THEN
        NEW.status := 'CRITICO';
    ELSIF percentual < 70 THEN
        NEW.status := 'BAIXO';
    ELSE
        NEW.status := 'OK';
    END IF;
    ```
*   **Benefícios**:
    *   **Consistência**: Elimina a necessidade da aplicação se lembrar de calcular o status. A regra de negócio é aplicada diretamente no banco de dados, garantindo que nenhum `UPDATE` possa deixar o status inconsistente.
    *   **Atomicidade**: A atualização da quantidade e do status ocorrem juntas, como uma única operação.

**`fn_gerar_alerta_reposicao()`**
*   **Evento**: `AFTER UPDATE` na coluna `quantidade_atual` da tabela `produto`.
*   **Propósito**: Implementar a regra de negócio "se a quantidade ficar abaixo do mínimo, um alerta deve ser gerado".
*   **Benefícios**:
    *   **Proatividade**: O sistema notifica os gestores sobre problemas potenciais antes que eles causem perda de vendas.
    *   **Desacoplamento**: A lógica de movimentação de estoque não precisa saber sobre a lógica de alertas. Ela apenas atualiza a quantidade, e o trigger cuida do resto.

**`fn_calcular_custo_medio()`**
*   **Evento**: `AFTER INSERT` na tabela `movimentacao_estoque`.
*   **Propósito**: Atualizar o `custo_medio_ponderado` do produto, uma métrica financeira crucial, sempre que uma nova compra é registrada (`ENTRADA_COMPRA`).
*   **Análise da Lógica**: A função aplica a fórmula padrão: `(valor_estoque_antigo + valor_nova_compra) / nova_quantidade_total`.
*   **Benefícios**:
    *   **Precisão Financeira**: Garante que os relatórios de valoração de estoque estejam sempre corretos e atualizados, sem depender de cálculos manuais ou na camada de aplicação.

---

### Stored Procedures (Functions): Encapsulando Operações Complexas

Stored Procedures (ou Funções no PostgreSQL) permitem encapsular uma sequência de comandos SQL em uma única função, que pode ser chamada pela aplicação. Elas são ideais para operações que precisam ser transacionais (ou tudo funciona, ou nada funciona).

**`sp_registrar_movimentacao()`**
*   **Propósito**: Centralizar toda a lógica de uma movimentação de estoque em uma única chamada de função segura e transacional.
*   **Análise do Processo**:
    1.  **Validação**: Verifica se há estoque suficiente para uma saída. Se não, lança uma exceção, abortando a operação.
    2.  **Inserção**: Cria o registro na tabela `movimentacao_estoque`.
    3.  **Atualização**: Modifica a `quantidade_atual` na tabela `produto`.
    4.  **Retorno**: Devolve para a aplicação o resultado da operação, como a nova quantidade e o novo status.
*   **Benefícios**:
    *   **Segurança**: Previne condições de corrida e garante que o estoque nunca fique negativo.
    *   **Atomicidade (Transação)**: Se qualquer passo falhar (por exemplo, a atualização do produto), toda a operação é desfeita (`ROLLBACK`), evitando inconsistências nos dados. A aplicação só precisa chamar uma função e tratar o sucesso ou o erro.

**`sp_anonimizar_usuario()`**
*   **Propósito**: Executar o processo de "direito ao esquecimento" da LGPD de forma segura e auditável.
*   **Análise do Processo**:
    1.  **Verificação**: Confere se o período de 90 dias desde a solicitação de exclusão já passou.
    2.  **Anonimização**: Sobrescreve os dados pessoais do usuário (`nome`, `email`, `telefone`) com valores genéricos.
    3.  **Desativação**: Marca o usuário como `ativo = FALSE`.
    4.  **Auditoria**: Registra a operação na tabela `auditoria_lgpd`.
*   **Benefícios**:
    *   **Conformidade Legal**: Garante que o processo de LGPD seja seguido à risca.
    *   **Preservação da Integridade**: Ao invés de deletar o registro (`DELETE FROM usuario`), o que criaria registros "órfãos" na tabela de movimentações, a anonimização preserva o histórico de forma íntegra e não identificável.

---

## 9. Conclusão

### Roadmap Futuro

O WorkConnect, em seu estado atual, é um MVP robusto. O roadmap futuro inclui:

1.  **Desenvolvimento do Backend**: Construção da API REST em Node.js para substituir os dados mockados.
2.  **Aplicativo Móvel**: Desenvolvimento de um app em React Native para leitura de código de barras e gestão na palma da mão.
3.  **Integrações**: Conexão com plataformas de e-commerce e sistemas de ERP.
4.  **Inteligência Artificial**: Módulos de previsão de demanda baseados no histórico de movimentações.

### Como Contribuir

O projeto é de código aberto e contribuições são bem-vindas. Para mais detalhes, consulte o [Guia de Contribuição](./CONTRIBUTING.md) e o [Roadmap](./ROADMAP.md) completo.