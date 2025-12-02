# WorkConnect - Arquitetura do Modelo de Dados

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    WorkConnect Database                      │
│                  PostgreSQL 15+ Database                     │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Module 1   │    │   Module 2   │    │   Module 3   │
│ Users & Auth │    │  Inventory   │    │    Sales     │
│              │    │              │    │              │
│ • perfil     │    │ • categoria  │    │ • cliente    │
│ • usuario    │    │ • produto    │    │ • venda      │
│ • sessao     │    │ • fornecedor │    │ • venda_item │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Module 4   │    │   Module 5   │    │   Module 6   │
│  Finances    │    │  Logistics   │    │   Reports    │
│              │    │              │    │              │
│ • conta_     │    │ • armazem    │    │ • relatorio  │
│   financeira │    │ • pedido     │    │              │
│ • transacao_ │    │ • envio      │    │              │
│   financeira │    │ • rota       │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
                              │
                              ▼
                    ┌──────────────┐
                    │   Module 7   │
                    │    Audit     │
                    │              │
                    │ • auditoria_ │
                    │   lgpd       │
                    └──────────────┘
```

## Fluxo de Integração

### Fluxo Principal: Venda Completa

```
1. VENDA criada
   │
   ├─► VENDA_ITEM (produtos vendidos)
   │
   ├─► [TRIGGER] MOVIMENTACAO_ESTOQUE (saída)
   │   │
   │   └─► [TRIGGER] PRODUTO.quantidade_atual atualizado
   │       │
   │       └─► [TRIGGER] PRODUTO.status recalculado
   │
   ├─► PAGAMENTO registrado
   │   │
   │   └─► [TRIGGER] TRANSACAO_FINANCEIRA (receita)
   │       │
   │       └─► [TRIGGER] CONTA_FINANCEIRA.saldo_atual atualizado
   │
   └─► PEDIDO gerado (logística)
       │
       └─► ENVIO criado
           │
           └─► ROTA definida
```

## Camadas do Modelo

### Camada 1: Entidades Base
- **Usuários**: perfil, usuario, sessao
- **Catálogo**: categoria, produto, fornecedor
- **Clientes**: cliente

### Camada 2: Transações
- **Vendas**: venda, venda_item, pagamento
- **Finanças**: transacao_financeira
- **Estoque**: movimentacao_estoque
- **Logística**: pedido, pedido_item, envio

### Camada 3: Configuração
- **Canais**: canal_venda
- **Métodos**: metodo_pagamento
- **Categorias**: categoria_financeira
- **Contas**: conta_financeira
- **Armazéns**: armazem
- **Transporte**: transportadora, motorista, rota

### Camada 4: Monitoramento
- **Alertas**: alerta_reposicao
- **Relatórios**: relatorio
- **Auditoria**: auditoria_lgpd

## Relacionamentos Principais

### Hierárquicos
- `categoria` → `categoria` (self-reference)
- `categoria_financeira` → `categoria_financeira` (self-reference)

### Um-para-Muitos (1:N)
- `usuario` → `sessao`
- `categoria` → `produto`
- `produto` → `movimentacao_estoque`
- `cliente` → `venda`
- `venda` → `venda_item`
- `venda` → `pagamento`
- `venda` → `pedido`
- `conta_financeira` → `transacao_financeira`
- `pedido` → `pedido_item`
- `pedido` → `envio`

### Muitos-para-Muitos (N:M)
- `produto` ↔ `fornecedor` (via `produto_fornecedor`)

## Automações (Triggers)

### Nível de Produto
1. **Atualizar Status** - Calcula OK/BAIXO/CRÍTICO
2. **Gerar Alerta** - Quando estoque < mínimo
3. **Calcular Custo Médio** - Custo médio ponderado
4. **Atualizar Quantidade** - Ao registrar movimentação

### Nível de Venda
5. **Atualizar Total** - Recalcula total da venda
6. **Criar Movimentação** - Ao confirmar venda
7. **Criar Transação** - Ao confirmar pagamento

### Nível Financeiro
8. **Atualizar Saldo** - Com transações

### Nível Logístico
9. **Atualizar Capacidade** - Recalcula capacidade do armazém
10. **Atualizar Status Pedido** - Baseado em separação

### Nível Auditoria
11. **Auditar LGPD** - Registra ações sobre dados pessoais

## Views Estratégicas

### Dashboard Geral
- `vw_dashboard_geral` - Métricas consolidadas

### Inventário
- `vw_estoque_completo` - Estoque com informações agregadas
- `vw_produtos_criticos` - Produtos que precisam atenção
- `vw_movimentacoes_mes` - Movimentações do mês

### Vendas
- `vw_vendas_resumo` - Resumo de vendas por período
- `vw_vendas_cliente` - Análise por cliente
- `vw_produtos_mais_vendidos` - Ranking de produtos
- `vw_vendas_canal` - Análise por canal

### Finanças
- `vw_fluxo_caixa_diario` - Fluxo de caixa diário
- `vw_despesas_categoria` - Despesas por categoria
- `vw_saldo_contas` - Saldo atual das contas

### Logística
- `vw_status_pedidos` - Status detalhado dos pedidos
- `vw_envios_transito` - Envios em trânsito
- `vw_capacidade_armazens` - Capacidade e ocupação

## Índices Estratégicos

### Performance Crítica
- Foreign keys (50+ índices)
- Campos de busca frequente (código, nome)
- Datas para filtros temporais
- Status para filtros de estado

### Busca Full-Text
- Nomes de produtos (GIN)
- Nomes de clientes (GIN)
- Nomes de fornecedores (GIN)

### Compostos
- (data_venda, status) para vendas
- (produto_id, data) para movimentações
- (conta_id, data_transacao) para transações

## Conformidade LGPD

### Implementações
- ✅ Consentimento explícito obrigatório
- ✅ Auditoria completa de ações
- ✅ Exportação de dados pessoais
- ✅ Anonimização (não exclusão)
- ✅ Direito ao esquecimento
- ✅ Retenção de logs (6 meses mínimo)

### Tabelas Envolvidas
- `usuario` - Campos LGPD
- `auditoria_lgpd` - Registro de ações

## Escalabilidade

### Preparado para
- 100K+ produtos
- 1M+ vendas
- 10M+ movimentações
- Particionamento de tabelas grandes (auditoria)
- Arquivo histórico (views suportam)

### Otimizações
- Índices estratégicos
- Views materializadas (se necessário)
- Particionamento por data (futuro)
- Arquivo de dados antigos (futuro)

## Extensibilidade

### Fácil Adicionar
- Novos módulos (seguindo padrão)
- Novos campos (soft deletes preservam histórico)
- Novos relacionamentos (FK bem definidas)
- Novos triggers (padrão estabelecido)
- Novas views (estrutura clara)

### Padrões Estabelecidos
- Nomenclatura consistente
- Soft deletes (deleted_at)
- Timestamps (created_at, updated_at)
- Status com enums
- Foreign keys indexadas

