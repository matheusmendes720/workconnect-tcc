# 🚀 Quick Start - Physical Model

## Instalação Rápida (3 Passos)

### 1️⃣ Instalar Tudo de Uma Vez

```bash
mysql -u root -p workconnect_db < database/physical-model-views.sql
mysql -u root -p workconnect_db < database/physical-model-functions.sql
mysql -u root -p workconnect_db < database/physical-model-procedures.sql
```

### 2️⃣ Verificar Instalação

```bash
mysql -u root -p workconnect_db < database/physical-model-test.sql
```

### 3️⃣ Usar no Código

```sql
-- Exemplo: Ver dashboard
SELECT * FROM vw_dashboard_geral;

-- Exemplo: Calcular status
SELECT fn_calcular_status_produto(10, 20) AS status;

-- Exemplo: Registrar movimentação
CALL sp_registrar_movimentacao_estoque(
    1, 1, 'ENTRADA', 100, 15.50, NULL, NULL, NULL, @mov_id
);
```

---

## 📋 Views Mais Usadas

```sql
-- Dashboard completo
SELECT * FROM vw_dashboard_geral;

-- Produtos críticos
SELECT * FROM vw_produtos_criticos;

-- Vendas do mês
SELECT * FROM vw_vendas_resumo 
WHERE data >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);

-- Fluxo de caixa
SELECT * FROM vw_fluxo_caixa_diario 
WHERE data >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);
```

---

## ⚙️ Functions Mais Usadas

```sql
-- Status do produto
SELECT fn_calcular_status_produto(quantidade_atual, quantidade_minima) 
FROM produto WHERE id = 1;

-- Valor total do estoque
SELECT fn_valor_total_estoque();

-- Ticket médio
SELECT fn_ticket_medio('2025-01-01', '2025-01-31');
```

---

## 🔧 Procedures Mais Usadas

```sql
-- Registrar movimentação (atualiza estoque automaticamente)
CALL sp_registrar_movimentacao_estoque(
    @produto_id, @usuario_id, 'ENTRADA', 100, 15.50, 
    NULL, NULL, NULL, @mov_id
);

-- Criar venda completa
CALL sp_criar_venda(@cliente_id, @usuario_id, @canal_id, 
    10.00, 0.00, NULL, @venda_id, @numero);

-- Finalizar venda (atualiza estoque)
CALL sp_finalizar_venda(@venda_id, @usuario_id);
```

---

## 📚 Documentação Completa

Veja `PHYSICAL_MODEL_README.md` para documentação detalhada.

---

**Quick Start criado em:** 2025-01-12

