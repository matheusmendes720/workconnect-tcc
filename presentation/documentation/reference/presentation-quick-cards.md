# Cartões de Referência Rápida para Apresentação
## Use estes cartões durante a apresentação

---

## 📊 Cartão 1: Estatísticas Principais

```
┌─────────────────────────────────────┐
│   WORKCONNECT - ESTATÍSTICAS        │
├─────────────────────────────────────┤
│ 30+ Tabelas                         │
│ 7 Módulos Funcionais                │
│ 11 Triggers Automatizados           │
│ 15 Views para Dashboards            │
│ 80+ Índices para Performance        │
│ 50+ Foreign Keys                    │
│ 100+ Constraints                    │
│ 100% LGPD Compliant                 │
│ 3NF Normalizado                     │
└─────────────────────────────────────┘
```

---

## 🗂️ Cartão 2: Módulos e Tabelas

```
MÓDULO 1: Usuários & Autenticação (3)
  • perfil
  • usuario
  • sessao

MÓDULO 2: Inventário (6)
  • categoria
  • produto
  • fornecedor
  • produto_fornecedor
  • movimentacao_estoque
  • alerta_reposicao

MÓDULO 3: Vendas (6)
  • cliente
  • venda
  • venda_item
  • canal_venda
  • pagamento
  • metodo_pagamento

MÓDULO 4: Finanças (3)
  • categoria_financeira
  • conta_financeira
  • transacao_financeira

MÓDULO 5: Logística (7)
  • armazem
  • pedido
  • pedido_item
  • transportadora
  • motorista
  • rota
  • envio

MÓDULO 6: Relatórios (1)
  • relatorio

MÓDULO 7: Auditoria (1)
  • auditoria_lgpd
```

---

## 🔄 Cartão 3: Integrações Principais

```
VENDA → MOVIMENTACAO_ESTOQUE
  (Trigger automático ao confirmar venda)

VENDA → TRANSACAO_FINANCEIRA
  (Trigger automático ao confirmar pagamento)

VENDA → PEDIDO
  (Gera pedido de logística)

PRODUTO ↔ FORNECEDOR
  (Relacionamento N:M via produto_fornecedor)

CATEGORIA → CATEGORIA
  (Hierarquia - self-reference)
```

---

## ⚡ Cartão 4: Triggers Principais

```
1. fn_atualizar_status_produto
   → Calcula OK/BAIXO/CRÍTICO automaticamente

2. fn_gerar_alerta_reposicao
   → Gera alertas quando estoque < mínimo

3. fn_calcular_custo_medio
   → Calcula custo médio ponderado

4. fn_criar_movimentacao_venda
   → Cria movimentação ao confirmar venda

5. fn_criar_transacao_pagamento
   → Cria receita ao confirmar pagamento

6. fn_atualizar_saldo_conta
   → Atualiza saldo automaticamente
```

---

## 📈 Cartão 5: Views Principais

```
Dashboard:
  • vw_dashboard_geral

Inventário:
  • vw_estoque_completo
  • vw_produtos_criticos

Vendas:
  • vw_vendas_resumo
  • vw_produtos_mais_vendidos

Finanças:
  • vw_fluxo_caixa_diario
  • vw_saldo_contas

Logística:
  • vw_status_pedidos
```

---

## 🔐 Cartão 6: LGPD Compliance

```
✅ Consentimento explícito obrigatório
✅ Auditoria completa de ações
✅ Exportação de dados pessoais
✅ Anonimização (não exclusão)
✅ Direito ao esquecimento
✅ Retenção de logs (6 meses)
```

---

## 🎯 Cartão 7: Pontos de Destaque

```
✓ Modelo normalizado (3NF)
✓ Integração automática entre módulos
✓ Performance otimizada (80+ índices)
✓ Conformidade LGPD completa
✓ Escalável (preparado para crescimento)
✓ Triggers automatizam processos
✓ Views otimizadas para dashboards
```

---

## 📝 Cartão 8: Respostas para Perguntas Comuns

```
P: Quantas tabelas?
R: 30+ tabelas em 7 módulos

P: Normalização?
R: 3NF, sem redundâncias

P: Integração?
R: Foreign keys + triggers automáticos

P: Performance?
R: 80+ índices estratégicos

P: LGPD?
R: Implementação completa com auditoria

P: Automações?
R: 11 triggers automatizam processos
```

---

## 🎨 Cartão 9: Navegação no MySQL Workbench

```
Zoom:
  Ctrl+0 = Ajustar para caber tudo
  Ctrl++ = Zoom in
  Ctrl+- = Zoom out
  Roda mouse = Zoom suave

Mover:
  Espaço + Arrastar = Pan
  Setas = Mover suave

Selecionar:
  Clique = Selecionar tabela
  Clique + Arrastar = Selecionar área
  Ctrl+A = Selecionar tudo
```

---

## ⏱️ Cartão 10: Tempo de Apresentação

```
Introdução:           2 min
Visão Geral:          3 min
Módulos (7x2min):    14 min
Integrações:          5 min
Automações:           5 min
LGPD:                 3 min
Normalização:         2 min
Demo ao Vivo:         5 min
Q&A:                  5 min
─────────────────────────
TOTAL:                ~40 min
```

---

**Imprima estes cartões e mantenha ao lado durante a apresentação!**

