-- ============================================
-- WorkConnect - Database Triggers
-- ============================================
-- 
-- Automated triggers for business logic
-- Version: 1.0.0
-- ============================================

-- ============================================
-- INVENTORY TRIGGERS
-- ============================================

-- Trigger 1: Atualizar Status do Produto
CREATE OR REPLACE FUNCTION fn_atualizar_status_produto()
RETURNS TRIGGER AS $$
DECLARE
    percentual DECIMAL;
BEGIN
    -- Calcular percentual em relação ao mínimo
    percentual := (NEW.quantidade_atual::DECIMAL / NULLIF(NEW.quantidade_minima, 0)) * 100;
    
    -- Definir status baseado no percentual
    IF NEW.quantidade_atual = 0 THEN
        NEW.status := 'CRITICO';
    ELSIF percentual < 30 THEN
        NEW.status := 'CRITICO';
    ELSIF percentual < 70 THEN
        NEW.status := 'BAIXO';
    ELSE
        NEW.status := 'OK';
    END IF;
    
    -- Atualizar timestamp
    NEW.data_atualizacao := CURRENT_TIMESTAMP;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_atualizar_status_produto
    BEFORE UPDATE OF quantidade_atual ON produto
    FOR EACH ROW
    EXECUTE FUNCTION fn_atualizar_status_produto();

COMMENT ON FUNCTION fn_atualizar_status_produto() IS 'Atualiza status automaticamente baseado em percentual';

-- Trigger 2: Gerar Alerta de Reposição
CREATE OR REPLACE FUNCTION fn_gerar_alerta_reposicao()
RETURNS TRIGGER AS $$
DECLARE
    prioridade_calculada VARCHAR(20);
    quantidade_sugerida_calc INTEGER;
    percentual DECIMAL;
BEGIN
    -- Só gera alerta se quantidade < mínimo
    IF NEW.quantidade_atual < NEW.quantidade_minima THEN
        
        -- Calcular percentual
        percentual := (NEW.quantidade_atual::DECIMAL / NULLIF(NEW.quantidade_minima, 0)) * 100;
        
        -- Definir prioridade
        IF NEW.quantidade_atual = 0 THEN
            prioridade_calculada := 'URGENTE';
        ELSIF percentual < 30 THEN
            prioridade_calculada := 'ALTA';
        ELSIF percentual < 70 THEN
            prioridade_calculada := 'MEDIA';
        ELSE
            prioridade_calculada := 'BAIXA';
        END IF;
        
        -- Quantidade sugerida = mínimo × 2
        quantidade_sugerida_calc := NEW.quantidade_minima * 2;
        
        -- Criar alerta (evitar duplicatas recentes)
        INSERT INTO alerta_reposicao (
            produto_id, 
            quantidade_sugerida, 
            prioridade
        )
        SELECT NEW.id, quantidade_sugerida_calc, prioridade_calculada
        WHERE NOT EXISTS (
            SELECT 1 FROM alerta_reposicao
            WHERE produto_id = NEW.id
              AND visualizado = FALSE
              AND data_alerta > CURRENT_TIMESTAMP - INTERVAL '24 hours'
        );
        
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_alerta_reposicao
    AFTER UPDATE OF quantidade_atual ON produto
    FOR EACH ROW
    EXECUTE FUNCTION fn_gerar_alerta_reposicao();

COMMENT ON FUNCTION fn_gerar_alerta_reposicao() IS 'Gera alertas automáticos quando estoque < mínimo';

-- Trigger 3: Calcular Custo Médio Ponderado
CREATE OR REPLACE FUNCTION fn_calcular_custo_medio()
RETURNS TRIGGER AS $$
DECLARE
    estoque_anterior INTEGER;
    custo_anterior DECIMAL(10,2);
    novo_custo DECIMAL(10,2);
BEGIN
    -- Só calcula para entradas de compra com preço
    IF NEW.tipo = 'ENTRADA_COMPRA' AND NEW.preco_unitario IS NOT NULL THEN
        
        -- Buscar valores atuais do produto
        SELECT quantidade_atual, custo_medio_ponderado
        INTO estoque_anterior, custo_anterior
        FROM produto
        WHERE id = NEW.produto_id;
        
        -- Fórmula: (estoque_anterior × custo_anterior + entrada × preco_entrada) / estoque_novo
        novo_custo := (
            (estoque_anterior * custo_anterior) + (NEW.quantidade * NEW.preco_unitario)
        ) / NULLIF(estoque_anterior + NEW.quantidade, 0);
        
        -- Atualizar custo médio do produto
        UPDATE produto
        SET custo_medio_ponderado = novo_custo
        WHERE id = NEW.produto_id;
        
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_calcular_custo_medio
    AFTER INSERT ON movimentacao_estoque
    FOR EACH ROW
    EXECUTE FUNCTION fn_calcular_custo_medio();

COMMENT ON FUNCTION fn_calcular_custo_medio() IS 'Calcula custo médio ponderado a cada entrada';

-- Trigger 4: Atualizar Quantidade do Produto ao Registrar Movimentação
CREATE OR REPLACE FUNCTION fn_atualizar_quantidade_produto()
RETURNS TRIGGER AS $$
DECLARE
    quantidade_anterior INTEGER;
    nova_quantidade INTEGER;
BEGIN
    -- Buscar quantidade atual
    SELECT quantidade_atual INTO quantidade_anterior
    FROM produto
    WHERE id = NEW.produto_id FOR UPDATE;
    
    -- Calcular nova quantidade baseado no tipo
    IF NEW.tipo IN ('ENTRADA_COMPRA', 'ENTRADA_DEVOLUCAO') THEN
        nova_quantidade := quantidade_anterior + NEW.quantidade;
    ELSIF NEW.tipo IN ('SAIDA_VENDA', 'SAIDA_PERDA') THEN
        nova_quantidade := quantidade_anterior - NEW.quantidade;
        
        -- Validar: não pode ficar negativo
        IF nova_quantidade < 0 THEN
            RAISE EXCEPTION 'Quantidade insuficiente em estoque. Disponível: %, Solicitado: %', 
                quantidade_anterior, NEW.quantidade;
        END IF;
    ELSE
        -- TRANSFERENCIA ou AJUSTE_INVENTARIO
        nova_quantidade := NEW.quantidade;
    END IF;
    
    -- Atualizar quantidade do produto (trigger de status será acionado)
    UPDATE produto
    SET quantidade_atual = nova_quantidade
    WHERE id = NEW.produto_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_atualizar_quantidade_produto
    AFTER INSERT ON movimentacao_estoque
    FOR EACH ROW
    EXECUTE FUNCTION fn_atualizar_quantidade_produto();

COMMENT ON FUNCTION fn_atualizar_quantidade_produto() IS 'Atualiza quantidade do produto automaticamente ao registrar movimentação';

-- ============================================
-- SALES TRIGGERS
-- ============================================

-- Trigger 5: Atualizar Total da Venda ao Adicionar/Remover Itens
CREATE OR REPLACE FUNCTION fn_atualizar_total_venda()
RETURNS TRIGGER AS $$
DECLARE
    v_subtotal DECIMAL(10,2);
    v_desconto DECIMAL(10,2);
    v_acrescimo DECIMAL(10,2);
    v_total DECIMAL(10,2);
BEGIN
    -- Calcular subtotal da venda
    SELECT 
        COALESCE(SUM(total_item), 0),
        COALESCE(MAX(v.desconto), 0),
        COALESCE(MAX(v.acrescimo), 0)
    INTO v_subtotal, v_desconto, v_acrescimo
    FROM venda_item vi
    INNER JOIN venda v ON vi.venda_id = v.id
    WHERE vi.venda_id = COALESCE(NEW.venda_id, OLD.venda_id);
    
    -- Calcular total
    v_total := v_subtotal - v_desconto + v_acrescimo;
    
    -- Atualizar venda
    UPDATE venda
    SET 
        subtotal = v_subtotal,
        total = v_total,
        data_atualizacao = CURRENT_TIMESTAMP
    WHERE id = COALESCE(NEW.venda_id, OLD.venda_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_atualizar_total_venda
    AFTER INSERT OR UPDATE OR DELETE ON venda_item
    FOR EACH ROW
    EXECUTE FUNCTION fn_atualizar_total_venda();

COMMENT ON FUNCTION fn_atualizar_total_venda() IS 'Atualiza total da venda automaticamente ao modificar itens';

-- Trigger 6: Criar Movimentação de Estoque ao Confirmar Venda
CREATE OR REPLACE FUNCTION fn_criar_movimentacao_venda()
RETURNS TRIGGER AS $$
DECLARE
    v_item RECORD;
BEGIN
    -- Só processa quando status muda para CONFIRMADA
    IF NEW.status = 'CONFIRMADA' AND (OLD.status IS NULL OR OLD.status != 'CONFIRMADA') THEN
        
        -- Para cada item da venda, criar movimentação de saída
        FOR v_item IN 
            SELECT produto_id, quantidade
            FROM venda_item
            WHERE venda_id = NEW.id
        LOOP
            INSERT INTO movimentacao_estoque (
                produto_id,
                usuario_id,
                tipo,
                quantidade,
                venda_id,
                observacao
            ) VALUES (
                v_item.produto_id,
                NEW.usuario_id,
                'SAIDA_VENDA',
                v_item.quantidade,
                NEW.id,
                'Venda #' || NEW.numero_venda
            );
        END LOOP;
        
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_criar_movimentacao_venda
    AFTER UPDATE OF status ON venda
    FOR EACH ROW
    EXECUTE FUNCTION fn_criar_movimentacao_venda();

COMMENT ON FUNCTION fn_criar_movimentacao_venda() IS 'Cria movimentação de estoque ao confirmar venda';

-- Trigger 7: Criar Transação Financeira ao Confirmar Pagamento
CREATE OR REPLACE FUNCTION fn_criar_transacao_pagamento()
RETURNS TRIGGER AS $$
DECLARE
    v_venda RECORD;
    v_categoria_id BIGINT;
BEGIN
    -- Só processa quando pagamento é confirmado
    IF NEW.status = 'PAGO' AND (OLD.status IS NULL OR OLD.status != 'PAGO') THEN
        
        -- Buscar dados da venda
        SELECT * INTO v_venda
        FROM venda
        WHERE id = NEW.venda_id;
        
        -- Buscar categoria de receita (Vendas)
        SELECT id INTO v_categoria_id
        FROM categoria_financeira
        WHERE nome = 'Vendas' AND tipo = 'RECEITA'
        LIMIT 1;
        
        -- Criar transação financeira de receita
        IF v_categoria_id IS NOT NULL THEN
            INSERT INTO transacao_financeira (
                conta_financeira_id,
                categoria_financeira_id,
                tipo,
                descricao,
                valor,
                data_transacao,
                data_pagamento,
                status,
                venda_id,
                usuario_id
            ) VALUES (
                1, -- Conta padrão (Caixa)
                v_categoria_id,
                'RECEITA',
                'Venda #' || v_venda.numero_venda,
                NEW.valor,
                CURRENT_DATE,
                CURRENT_DATE,
                'PAGO',
                NEW.venda_id,
                v_venda.usuario_id
            );
            
            -- Atualizar saldo da conta
            UPDATE conta_financeira
            SET saldo_atual = saldo_atual + NEW.valor
            WHERE id = 1;
        END IF;
        
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_criar_transacao_pagamento
    AFTER UPDATE OF status ON pagamento
    FOR EACH ROW
    EXECUTE FUNCTION fn_criar_transacao_pagamento();

COMMENT ON FUNCTION fn_criar_transacao_pagamento() IS 'Cria transação financeira ao confirmar pagamento';

-- ============================================
-- FINANCES TRIGGERS
-- ============================================

-- Trigger 8: Atualizar Saldo da Conta ao Registrar Transação
CREATE OR REPLACE FUNCTION fn_atualizar_saldo_conta()
RETURNS TRIGGER AS $$
DECLARE
    v_valor_ajuste DECIMAL(10,2);
BEGIN
    -- Calcular ajuste de saldo
    IF TG_OP = 'INSERT' THEN
        IF NEW.status = 'PAGO' THEN
            IF NEW.tipo = 'RECEITA' THEN
                v_valor_ajuste := NEW.valor;
            ELSE
                v_valor_ajuste := -NEW.valor;
            END IF;
        ELSE
            v_valor_ajuste := 0;
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Reverter valor antigo
        IF OLD.status = 'PAGO' THEN
            IF OLD.tipo = 'RECEITA' THEN
                v_valor_ajuste := -OLD.valor;
            ELSE
                v_valor_ajuste := OLD.valor;
            END IF;
        END IF;
        
        -- Aplicar valor novo
        IF NEW.status = 'PAGO' THEN
            IF NEW.tipo = 'RECEITA' THEN
                v_valor_ajuste := v_valor_ajuste + NEW.valor;
            ELSE
                v_valor_ajuste := v_valor_ajuste - NEW.valor;
            END IF;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.status = 'PAGO' THEN
            IF OLD.tipo = 'RECEITA' THEN
                v_valor_ajuste := -OLD.valor;
            ELSE
                v_valor_ajuste := OLD.valor;
            END IF;
        ELSE
            v_valor_ajuste := 0;
        END IF;
    END IF;
    
    -- Atualizar saldo da conta
    IF v_valor_ajuste != 0 THEN
        UPDATE conta_financeira
        SET saldo_atual = saldo_atual + v_valor_ajuste
        WHERE id = COALESCE(NEW.conta_financeira_id, OLD.conta_financeira_id);
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_atualizar_saldo_conta
    AFTER INSERT OR UPDATE OF status, valor, tipo OR DELETE ON transacao_financeira
    FOR EACH ROW
    EXECUTE FUNCTION fn_atualizar_saldo_conta();

COMMENT ON FUNCTION fn_atualizar_saldo_conta() IS 'Atualiza saldo da conta financeira automaticamente';

-- ============================================
-- LOGISTICS TRIGGERS
-- ============================================

-- Trigger 9: Atualizar Capacidade do Armazém
CREATE OR REPLACE FUNCTION fn_atualizar_capacidade_armazem()
RETURNS TRIGGER AS $$
DECLARE
    v_armazem_id BIGINT;
    v_capacidade_atual INTEGER;
BEGIN
    -- Determinar armazém afetado
    v_armazem_id := COALESCE(NEW.armazem_id, OLD.armazem_id);
    
    IF v_armazem_id IS NOT NULL THEN
        -- Recalcular capacidade atual
        SELECT COALESCE(SUM(quantidade_atual), 0)
        INTO v_capacidade_atual
        FROM produto
        WHERE armazem_id = v_armazem_id AND ativo = TRUE;
        
        -- Atualizar armazém
        UPDATE armazem
        SET capacidade_atual = v_capacidade_atual
        WHERE id = v_armazem_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_atualizar_capacidade_armazem
    AFTER INSERT OR UPDATE OF armazem_id, quantidade_atual OR DELETE ON produto
    FOR EACH ROW
    EXECUTE FUNCTION fn_atualizar_capacidade_armazem();

COMMENT ON FUNCTION fn_atualizar_capacidade_armazem() IS 'Atualiza capacidade atual do armazém';

-- Trigger 10: Atualizar Status do Pedido baseado em Itens
CREATE OR REPLACE FUNCTION fn_atualizar_status_pedido()
RETURNS TRIGGER AS $$
DECLARE
    v_total_itens INTEGER;
    v_itens_separados INTEGER;
    v_status VARCHAR(50);
BEGIN
    -- Contar itens do pedido
    SELECT 
        COUNT(*),
        SUM(quantidade_separada)
    INTO v_total_itens, v_itens_separados
    FROM pedido_item
    WHERE pedido_id = COALESCE(NEW.pedido_id, OLD.pedido_id);
    
    -- Determinar status baseado na separação
    IF v_itens_separados = 0 THEN
        v_status := 'PENDENTE';
    ELSIF v_itens_separados < v_total_itens THEN
        v_status := 'SEPARACAO';
    ELSE
        v_status := 'EMPACOTAMENTO';
    END IF;
    
    -- Atualizar pedido (se status ainda não foi alterado manualmente)
    UPDATE pedido
    SET 
        status = v_status,
        data_atualizacao = CURRENT_TIMESTAMP
    WHERE id = COALESCE(NEW.pedido_id, OLD.pedido_id)
      AND status NOT IN ('ENVIADO', 'EM_TRANSITO', 'ENTREGUE', 'CANCELADO');
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_atualizar_status_pedido
    AFTER INSERT OR UPDATE OF quantidade_separada OR DELETE ON pedido_item
    FOR EACH ROW
    EXECUTE FUNCTION fn_atualizar_status_pedido();

COMMENT ON FUNCTION fn_atualizar_status_pedido() IS 'Atualiza status do pedido baseado na separação de itens';

-- ============================================
-- AUDIT TRIGGERS
-- ============================================

-- Trigger 11: Auditoria Automática LGPD
CREATE OR REPLACE FUNCTION fn_auditar_lgpd()
RETURNS TRIGGER AS $$
BEGIN
    -- Registrar acesso a dados pessoais
    INSERT INTO auditoria_lgpd (
        usuario_id,
        acao,
        ip_origem,
        dados_acessados
    ) VALUES (
        COALESCE(NEW.id, OLD.id),
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'CONSENTIMENTO'
            WHEN TG_OP = 'UPDATE' AND NEW.data_exclusao_solicitada IS NOT NULL THEN 'EXCLUSAO_DADOS'
            ELSE 'ACESSO_DADOS'
        END,
        COALESCE(inet_client_addr()::TEXT, '0.0.0.0'),
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'Novo cadastro'
            WHEN TG_OP = 'UPDATE' THEN 'Atualização de dados'
            ELSE 'Exclusão solicitada'
        END
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auditar_lgpd
    AFTER INSERT OR UPDATE ON usuario
    FOR EACH ROW
    EXECUTE FUNCTION fn_auditar_lgpd();

COMMENT ON FUNCTION fn_auditar_lgpd() IS 'Auditoria automática de ações sobre dados pessoais';

-- ============================================
-- END OF TRIGGERS
-- ============================================

