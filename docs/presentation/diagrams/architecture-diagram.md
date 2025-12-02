# WorkConnect - Diagrama de Arquitetura

## Diagrama ER Simplificado (Mermaid)

```mermaid
erDiagram
    %% Module 1: Users & Auth
    PERFIL ||--o{ USUARIO : "has"
    USUARIO ||--o{ SESSAO : "creates"
    
    %% Module 2: Inventory
    CATEGORIA ||--o{ PRODUTO : "categorizes"
    PRODUTO }o--o{ FORNECEDOR : "supplied_by"
    PRODUTO ||--o{ MOVIMENTACAO_ESTOQUE : "has"
    PRODUTO ||--o{ ALERTA_REPOSICAO : "triggers"
    
    %% Module 3: Sales
    CLIENTE ||--o{ VENDA : "makes"
    VENDA ||--o{ VENDA_ITEM : "contains"
    VENDA_ITEM }o--|| PRODUTO : "references"
    VENDA ||--o{ PAGAMENTO : "has"
    VENDA }o--|| CANAL_VENDA : "via"
    PAGAMENTO }o--|| METODO_PAGAMENTO : "using"
    
    %% Module 4: Finances
    CONTA_FINANCEIRA ||--o{ TRANSACAO_FINANCEIRA : "has"
    TRANSACAO_FINANCEIRA }o--|| CATEGORIA_FINANCEIRA : "categorized_by"
    TRANSACAO_FINANCEIRA }o--o| VENDA : "from_sale"
    
    %% Module 5: Logistics
    ARMAZEM ||--o{ PEDIDO : "stores"
    PEDIDO }o--|| CLIENTE : "for"
    PEDIDO ||--o{ PEDIDO_ITEM : "contains"
    PEDIDO_ITEM }o--|| PRODUTO : "references"
    PEDIDO ||--o{ ENVIO : "shipped_as"
    ENVIO }o--|| TRANSPORTADORA : "via"
    ENVIO }o--|| ROTA : "follows"
    ROTA }o--|| MOTORISTA : "driven_by"
    
    %% Module 6: Reports
    RELATORIO }o--o| USUARIO : "generated_by"
    
    %% Module 7: Audit
    AUDITORIA_LGPD }o--|| USUARIO : "tracks"
    
    %% Integration Points
    VENDA ||--o| MOVIMENTACAO_ESTOQUE : "creates"
    VENDA ||--o| TRANSACAO_FINANCEIRA : "creates"
    VENDA ||--o| PEDIDO : "generates"
```

## Fluxo de Integração (Mermaid)

```mermaid
flowchart TD
    A[Venda Criada] --> B[Venda Item]
    A --> C[Pagamento]
    
    B --> D[Trigger: Movimentação Estoque]
    D --> E[Atualiza Quantidade Produto]
    E --> F[Recalcula Status Produto]
    F --> G{Gera Alerta?}
    G -->|Sim| H[Alerta Reposição]
    
    C --> I[Trigger: Transação Financeira]
    I --> J[Atualiza Saldo Conta]
    
    A --> K[Gera Pedido]
    K --> L[Pedido Item]
    L --> M[Envio]
    M --> N[Rota]
    
    style A fill:#e1f5ff
    style D fill:#fff4e1
    style I fill:#fff4e1
    style F fill:#e8f5e9
    style J fill:#e8f5e9
```

## Módulos e Tabelas (Mermaid)

```mermaid
mindmap
  root((WorkConnect))
    Module 1: Users & Auth
      PERFIL
      USUARIO
      SESSAO
    Module 2: Inventory
      CATEGORIA
      PRODUTO
      FORNECEDOR
      MOVIMENTACAO_ESTOQUE
      ALERTA_REPOSICAO
    Module 3: Sales
      CLIENTE
      VENDA
      VENDA_ITEM
      CANAL_VENDA
      PAGAMENTO
      METODO_PAGAMENTO
    Module 4: Finances
      CATEGORIA_FINANCEIRA
      CONTA_FINANCEIRA
      TRANSACAO_FINANCEIRA
    Module 5: Logistics
      ARMAZEM
      PEDIDO
      PEDIDO_ITEM
      TRANSPORTADORA
      MOTORISTA
      ROTA
      ENVIO
    Module 6: Reports
      RELATORIO
    Module 7: Audit
      AUDITORIA_LGPD
```

## Estatísticas (Mermaid)

```mermaid
pie title "Distribuição de Tabelas por Módulo"
    "Inventory" : 6
    "Logistics" : 7
    "Sales" : 6
    "Users & Auth" : 3
    "Finances" : 3
    "Reports" : 1
    "Audit" : 1
```

## Como Usar

Estes diagramas Mermaid podem ser visualizados em:
- GitHub (renderiza automaticamente)
- Mermaid Live Editor: https://mermaid.live/
- VS Code com extensão Mermaid
- Documentação Markdown compatível

## Exportar como Imagem

1. Copie o código Mermaid
2. Cole em https://mermaid.live/
3. Exporte como PNG/SVG
4. Salve em `presentation/diagrams/`

