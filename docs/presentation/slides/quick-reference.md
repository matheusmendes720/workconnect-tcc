# WorkConnect - Quick Reference Card
## Modelo de Dados - Referência Rápida

---

## 📊 Estatísticas Principais

| Item | Quantidade |
|------|-----------|
| **Tabelas** | 30+ |
| **Módulos** | 7 |
| **Views** | 15 |
| **Triggers** | 11 |
| **Índices** | 80+ |
| **Foreign Keys** | 50+ |

---

## 🗂️ Módulos e Tabelas

### 1. Usuários & Autenticação (3 tabelas)
- `perfil` - Perfis de acesso
- `usuario` - Usuários
- `sessao` - Sessões

### 2. Inventário (6 tabelas)
- `categoria` - Categorias
- `produto` - Produtos
- `fornecedor` - Fornecedores
- `produto_fornecedor` - Relacionamento N:M
- `movimentacao_estoque` - Movimentações
- `alerta_reposicao` - Alertas

### 3. Vendas (6 tabelas)
- `cliente` - Clientes
- `venda` - Vendas
- `venda_item` - Itens
- `canal_venda` - Canais
- `pagamento` - Pagamentos
- `metodo_pagamento` - Métodos

### 4. Finanças (3 tabelas)
- `categoria_financeira` - Categorias
- `conta_financeira` - Contas
- `transacao_financeira` - Transações

### 5. Logística (7 tabelas)
- `armazem` - Armazéns
- `pedido` - Pedidos
- `pedido_item` - Itens
- `transportadora` - Transportadoras
- `motorista` - Motoristas
- `rota` - Rotas
- `envio` - Envios

### 6. Relatórios (1 tabela)
- `relatorio` - Relatórios

### 7. Auditoria (1 tabela)
- `auditoria_lgpd` - Auditoria LGPD

---

## 🔄 Integrações Principais

**Vendas → Estoque:**
- `venda` → `movimentacao_estoque` (trigger automático)

**Vendas → Finanças:**
- `pagamento` → `transacao_financeira` (trigger automático)

**Vendas → Logística:**
- `venda` → `pedido` (relacionamento)

**Estoque → Finanças:**
- `fornecedor` → `transacao_financeira` (despesas)

---

## ⚡ Triggers Principais

1. **fn_atualizar_status_produto** - Status automático
2. **fn_gerar_alerta_reposicao** - Alertas de estoque
3. **fn_calcular_custo_medio** - Custo médio ponderado
4. **fn_criar_movimentacao_venda** - Movimentação ao vender
5. **fn_criar_transacao_pagamento** - Receita ao pagar
6. **fn_atualizar_saldo_conta** - Saldo automático

---

## 📈 Views Principais

- `vw_dashboard_geral` - Métricas gerais
- `vw_estoque_completo` - Estoque completo
- `vw_produtos_criticos` - Produtos críticos
- `vw_vendas_resumo` - Resumo de vendas
- `vw_fluxo_caixa_diario` - Fluxo de caixa
- `vw_status_pedidos` - Status de pedidos

---

## 🔐 LGPD Compliance

- ✅ Consentimento explícito
- ✅ Auditoria completa
- ✅ Exportação de dados
- ✅ Anonimização
- ✅ Direito ao esquecimento

---

## 📁 Arquivos Principais

- `database/schema.sql` - Schema completo
- `database/triggers.sql` - Triggers
- `database/views.sql` - Views
- `database/seed.sql` - Dados de exemplo
- `doc/diagrama-der-completo.md` - Documentação

---

## 🚀 Setup Rápido

```bash
# 1. Criar banco
createdb -U postgres workconnect_db

# 2. Aplicar schema
psql -U postgres -d workconnect_db -f database/schema.sql
psql -U postgres -d workconnect_db -f database/triggers.sql
psql -U postgres -d workconnect_db -f database/views.sql
psql -U postgres -d workconnect_db -f database/seed.sql
```

---

## 📊 Queries Úteis

**Estatísticas:**
```sql
SELECT * FROM vw_dashboard_geral;
```

**Produtos Críticos:**
```sql
SELECT * FROM vw_produtos_criticos;
```

**Vendas do Mês:**
```sql
SELECT * FROM vw_vendas_resumo 
WHERE data >= DATE_TRUNC('month', CURRENT_DATE);
```

---

## 🎯 Pontos de Destaque

- ✅ Modelo normalizado (3NF)
- ✅ Integração automática
- ✅ Performance otimizada
- ✅ Conformidade LGPD
- ✅ Escalável

