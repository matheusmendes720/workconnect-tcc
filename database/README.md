# WorkConnect Database Schema

## Visão Geral

Este diretório contém o schema completo do banco de dados PostgreSQL para o sistema WorkConnect, incluindo todos os módulos:

- **Usuários & Autenticação**
- **Inventário (Estoque)**
- **Vendas**
- **Finanças**
- **Logística**
- **Relatórios**
- **Auditoria LGPD**

## Estrutura de Arquivos

```
database/
├── schema.sql              # Schema completo (tabelas, constraints, índices)
├── triggers.sql            # Triggers e funções automatizadas
├── views.sql               # Views para dashboard e relatórios
├── seed.sql                # Dados de exemplo para desenvolvimento
├── migrations/
│   └── 001_initial_schema.sql  # Script de migração
└── README.md               # Este arquivo
```

## Instalação

### Pré-requisitos

- PostgreSQL 15 ou superior
- Extensões: `pg_trgm` (para busca full-text)

### Passo a Passo

1. **Criar o banco de dados:**
```bash
createdb -U postgres workconnect_db
```

2. **Aplicar o schema:**
```bash
psql -U postgres -d workconnect_db -f database/schema.sql
```

3. **Aplicar triggers:**
```bash
psql -U postgres -d workconnect_db -f database/triggers.sql
```

4. **Aplicar views:**
```bash
psql -U postgres -d workconnect_db -f database/views.sql
```

5. **Inserir dados de exemplo (opcional):**
```bash
psql -U postgres -d workconnect_db -f database/seed.sql
```

### Script Completo

```bash
# Criar banco
createdb -U postgres workconnect_db

# Aplicar tudo em ordem
psql -U postgres -d workconnect_db -f database/schema.sql
psql -U postgres -d workconnect_db -f database/triggers.sql
psql -U postgres -d workconnect_db -f database/views.sql
psql -U postgres -d workconnect_db -f database/seed.sql
```

## Módulos do Sistema

### 1. Usuários & Autenticação
- `perfil`: Perfis de acesso
- `usuario`: Usuários do sistema
- `sessao`: Sessões ativas

### 2. Inventário (Estoque)
- `categoria`: Categorias hierárquicas
- `produto`: Produtos do estoque
- `fornecedor`: Fornecedores
- `produto_fornecedor`: Relacionamento produto-fornecedor
- `movimentacao_estoque`: Histórico de movimentações
- `alerta_reposicao`: Alertas de estoque baixo

### 3. Vendas
- `cliente`: Clientes (PF e PJ)
- `canal_venda`: Canais de venda
- `venda`: Vendas realizadas
- `venda_item`: Itens das vendas
- `metodo_pagamento`: Métodos de pagamento
- `pagamento`: Pagamentos das vendas

### 4. Finanças
- `categoria_financeira`: Categorias de receitas/despesas
- `conta_financeira`: Contas financeiras
- `transacao_financeira`: Transações financeiras

### 5. Logística
- `armazem`: Armazéns
- `pedido`: Pedidos de logística
- `pedido_item`: Itens dos pedidos
- `transportadora`: Transportadoras
- `motorista`: Motoristas
- `rota`: Rotas de entrega
- `envio`: Envios e rastreamento

### 6. Relatórios
- `relatorio`: Relatórios gerados

### 7. Auditoria
- `auditoria_lgpd`: Auditoria LGPD

## Views Principais

- `vw_estoque_completo`: Estoque completo com informações agregadas
- `vw_produtos_criticos`: Produtos que precisam atenção
- `vw_vendas_resumo`: Resumo de vendas
- `vw_vendas_cliente`: Análise de vendas por cliente
- `vw_produtos_mais_vendidos`: Ranking de produtos
- `vw_fluxo_caixa_diario`: Fluxo de caixa diário
- `vw_despesas_categoria`: Análise de despesas
- `vw_status_pedidos`: Status de pedidos
- `vw_envios_transito`: Envios em trânsito
- `vw_dashboard_geral`: Métricas gerais do dashboard

## Triggers Automáticos

1. **Atualizar Status do Produto**: Calcula status baseado em percentual
2. **Gerar Alerta de Reposição**: Gera alertas quando estoque < mínimo
3. **Calcular Custo Médio**: Recalcula custo médio a cada entrada
4. **Atualizar Quantidade**: Atualiza quantidade ao registrar movimentação
5. **Atualizar Total da Venda**: Recalcula total ao modificar itens
6. **Criar Movimentação de Venda**: Cria movimentação ao confirmar venda
7. **Criar Transação de Pagamento**: Cria transação ao confirmar pagamento
8. **Atualizar Saldo da Conta**: Atualiza saldo com transações
9. **Atualizar Capacidade do Armazém**: Recalcula capacidade atual
10. **Atualizar Status do Pedido**: Atualiza status baseado em separação
11. **Auditoria LGPD**: Registra ações sobre dados pessoais

## Dados de Exemplo

O arquivo `seed.sql` inclui:

- 4 usuários de exemplo
- 10 categorias de produtos
- 3 fornecedores
- 3 armazéns
- 8 produtos
- 5 clientes
- 4 vendas com itens e pagamentos
- Transações financeiras
- Pedidos e envios
- Rotas e motoristas

## Documentação Completa

Para documentação detalhada do modelo lógico, consulte:
- `doc/diagrama-der-completo.md`: Diagrama ER completo com todas as entidades e relacionamentos

## Manutenção

### Backup

```bash
pg_dump -U postgres -Fc workconnect_db > backup_$(date +%Y%m%d).dump
```

### Restore

```bash
pg_restore -U postgres -d workconnect_db backup_YYYYMMDD.dump
```

### Vacuum e Analyze

```sql
VACUUM ANALYZE;
```

## Suporte

Para questões sobre o schema, consulte a documentação completa em `doc/diagrama-der-completo.md`.

