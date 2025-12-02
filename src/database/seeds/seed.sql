-- ============================================
-- WorkConnect - Sample Data (Seed)
-- ============================================
-- 
-- Sample data for testing and development
-- Version: 1.0.0
-- ============================================

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

-- Insert sample users (passwords should be hashed in production)
INSERT INTO usuario (nome, email, hash_senha, telefone, perfil_id, ativo, consentimento_lgpd, data_consentimento) VALUES
('João Empreendedor', 'joao@workconnect.com', '$2b$10$example_hash_here', '(11) 98765-4321', 1, TRUE, TRUE, CURRENT_TIMESTAMP),
('Maria Gerente', 'maria@workconnect.com', '$2b$10$example_hash_here', '(11) 98765-4322', 2, TRUE, TRUE, CURRENT_TIMESTAMP),
('Pedro Vendedor', 'pedro@workconnect.com', '$2b$10$example_hash_here', '(11) 98765-4323', 4, TRUE, TRUE, CURRENT_TIMESTAMP),
('Ana Operadora', 'ana@workconnect.com', '$2b$10$example_hash_here', '(11) 98765-4324', 3, TRUE, TRUE, CURRENT_TIMESTAMP);

-- ============================================
-- INVENTORY - CATEGORIES
-- ============================================

-- Insert categories
INSERT INTO categoria (nome, descricao, categoria_pai_id) VALUES
('Eletrônicos', 'Produtos eletrônicos diversos', NULL),
('Roupas', 'Vestuário e acessórios', NULL),
('Alimentos', 'Produtos alimentícios', NULL),
('Casa', 'Produtos para casa', NULL),
('Esportes', 'Artigos esportivos', NULL),
('Livros', 'Livros e publicações', NULL),
('Smartphones', 'Smartphones e celulares', 1),
('Notebooks', 'Notebooks e laptops', 1),
('Camisetas', 'Camisetas diversas', 2),
('Calças', 'Calças e bermudas', 2);

-- ============================================
-- INVENTORY - SUPPLIERS
-- ============================================

INSERT INTO fornecedor (razao_social, nome_fantasia, cnpj, telefone, email, endereco, cidade, estado, tempo_medio_entrega_dias, avaliacao) VALUES
('Fornecedor Alpha Ltda', 'Fornecedor Alpha', '12.345.678/0001-90', '(11) 3456-7890', 'contato@alpha.com', 'Rua A, 123', 'São Paulo', 'SP', 7, 4.5),
('Fornecedor Beta SA', 'Fornecedor Beta', '98.765.432/0001-10', '(11) 3456-7891', 'contato@beta.com', 'Rua B, 456', 'São Paulo', 'SP', 5, 4.8),
('Fornecedor Gamma ME', 'Fornecedor Gamma', '11.222.333/0001-44', '(11) 3456-7892', 'contato@gamma.com', 'Rua C, 789', 'São Paulo', 'SP', 10, 4.2);

-- ============================================
-- INVENTORY - WAREHOUSES
-- ============================================

INSERT INTO armazem (nome, descricao, endereco, cidade, estado, capacidade, capacidade_atual, responsavel_id) VALUES
('Armazém Central', 'Armazém principal da empresa', 'Av. Principal, 1000', 'São Paulo', 'SP', 1000, 650, 1),
('Armazém Norte', 'Armazém regional norte', 'Rua Norte, 500', 'Brasília', 'DF', 500, 320, 2),
('Armazém Sul', 'Armazém regional sul', 'Av. Sul, 800', 'Curitiba', 'PR', 800, 480, 2);

-- ============================================
-- INVENTORY - PRODUCTS
-- ============================================

INSERT INTO produto (codigo, nome, descricao, categoria_id, quantidade_atual, quantidade_minima, quantidade_maxima, preco_aquisicao, preco_venda, armazem_id, localizacao_fisica) VALUES
('ELEC-001', 'Smartphone XYZ', 'Smartphone 128GB, 6GB RAM', 7, 15, 10, 100, 800.00, 1200.00, 1, 'Setor A - Prateleira 1'),
('ELEC-002', 'Notebook ABC', 'Notebook 15.6", 8GB RAM, 256GB SSD', 8, 8, 5, 50, 2500.00, 3500.00, 1, 'Setor A - Prateleira 2'),
('ROUP-001', 'Camiseta Básica', 'Camiseta 100% algodão, várias cores', 9, 50, 20, 200, 25.00, 49.90, 1, 'Setor B - Prateleira 1'),
('ROUP-002', 'Calça Jeans', 'Calça jeans masculina, vários tamanhos', 10, 30, 15, 150, 80.00, 149.90, 1, 'Setor B - Prateleira 2'),
('ALIM-001', 'Produto Alimentício A', 'Produto alimentício genérico', 3, 100, 50, 500, 10.00, 18.50, 1, 'Setor C - Prateleira 1'),
('CASA-001', 'Produto Casa A', 'Produto para casa genérico', 4, 40, 20, 200, 50.00, 89.90, 1, 'Setor D - Prateleira 1'),
('ESPT-001', 'Produto Esportivo A', 'Produto esportivo genérico', 5, 25, 10, 100, 120.00, 199.90, 1, 'Setor E - Prateleira 1'),
('LIVR-001', 'Livro Exemplo', 'Livro de exemplo para estoque', 6, 60, 30, 300, 30.00, 55.00, 1, 'Setor F - Prateleira 1');

-- Link products to suppliers
INSERT INTO produto_fornecedor (produto_id, fornecedor_id, preco_atual, prazo_entrega_dias, prioridade) VALUES
(1, 1, 800.00, 7, 1), -- Principal
(1, 2, 820.00, 5, 2), -- Secundário
(2, 1, 2500.00, 10, 1),
(3, 3, 25.00, 7, 1),
(4, 3, 80.00, 7, 1),
(5, 2, 10.00, 5, 1),
(6, 1, 50.00, 7, 1),
(7, 2, 120.00, 5, 1),
(8, 3, 30.00, 7, 1);

-- ============================================
-- INVENTORY - STOCK MOVEMENTS
-- ============================================

INSERT INTO movimentacao_estoque (produto_id, usuario_id, tipo, quantidade, preco_unitario, documento_fiscal, observacao) VALUES
(1, 1, 'ENTRADA_COMPRA', 20, 800.00, 'NF-001', 'Compra inicial'),
(2, 1, 'ENTRADA_COMPRA', 10, 2500.00, 'NF-002', 'Compra inicial'),
(3, 1, 'ENTRADA_COMPRA', 60, 25.00, 'NF-003', 'Compra inicial'),
(4, 1, 'ENTRADA_COMPRA', 40, 80.00, 'NF-004', 'Compra inicial'),
(5, 1, 'ENTRADA_COMPRA', 120, 10.00, 'NF-005', 'Compra inicial'),
(6, 1, 'ENTRADA_COMPRA', 50, 50.00, 'NF-006', 'Compra inicial'),
(7, 1, 'ENTRADA_COMPRA', 30, 120.00, 'NF-007', 'Compra inicial'),
(8, 1, 'ENTRADA_COMPRA', 70, 30.00, 'NF-008', 'Compra inicial');

-- ============================================
-- SALES - CUSTOMERS
-- ============================================

INSERT INTO cliente (nome, tipo, cpf, email, telefone, celular, endereco, cidade, estado, cep) VALUES
('Maria Silva', 'FISICA', '123.456.789-00', 'maria.silva@email.com', '(11) 3456-7890', '(11) 98765-4321', 'Rua das Flores, 123', 'São Paulo', 'SP', '01234-567'),
('João Souza', 'FISICA', '987.654.321-00', 'joao.souza@email.com', '(11) 3456-7891', '(11) 98765-4322', 'Av. Paulista, 456', 'São Paulo', 'SP', '01310-100'),
('Empresa XYZ Ltda', 'JURIDICA', NULL, 'contato@xyz.com', '(11) 3456-7892', NULL, 'Rua Comercial, 789', 'São Paulo', 'SP', '01415-000'),
('Lucas Lima', 'FISICA', '111.222.333-44', 'lucas.lima@email.com', '(11) 3456-7893', '(11) 98765-4323', 'Rua Nova, 321', 'São Paulo', 'SP', '01520-000'),
('Ana Costa', 'FISICA', '555.666.777-88', 'ana.costa@email.com', '(11) 3456-7894', '(11) 98765-4324', 'Av. Central, 654', 'São Paulo', 'SP', '01630-000');

-- Update CNPJ for juridical customer
UPDATE cliente SET cnpj = '12.345.678/0001-99' WHERE nome = 'Empresa XYZ Ltda';

-- ============================================
-- SALES - SALES
-- ============================================

INSERT INTO venda (numero_venda, cliente_id, usuario_id, canal_venda_id, data_venda, subtotal, desconto, acrescimo, total, status) VALUES
('VEN-2025-001', 1, 3, 1, CURRENT_TIMESTAMP - INTERVAL '5 days', 1249.90, 0, 0, 1249.90, 'ENTREGUE'),
('VEN-2025-002', 2, 3, 2, CURRENT_TIMESTAMP - INTERVAL '3 days', 3500.00, 100.00, 0, 3400.00, 'CONFIRMADA'),
('VEN-2025-003', 3, 3, 1, CURRENT_TIMESTAMP - INTERVAL '2 days', 199.80, 0, 0, 199.80, 'CONFIRMADA'),
('VEN-2025-004', 4, 3, 2, CURRENT_TIMESTAMP - INTERVAL '1 day', 149.90, 0, 0, 149.90, 'PENDENTE');

-- Sales items
INSERT INTO venda_item (venda_id, produto_id, quantidade, preco_unitario, desconto, total_item) VALUES
-- Venda 1
(1, 1, 1, 1200.00, 0, 1200.00),
(1, 3, 1, 49.90, 0, 49.90),
-- Venda 2
(2, 2, 1, 3500.00, 100.00, 3400.00),
-- Venda 3
(3, 3, 2, 49.90, 0, 99.80),
(3, 4, 1, 149.90, 0, 149.90),
-- Venda 4
(4, 4, 1, 149.90, 0, 149.90);

-- Payments
INSERT INTO pagamento (venda_id, metodo_pagamento_id, valor, data_pagamento, status) VALUES
(1, 1, 1249.90, CURRENT_TIMESTAMP - INTERVAL '5 days', 'PAGO'),
(2, 3, 3400.00, CURRENT_TIMESTAMP - INTERVAL '3 days', 'PAGO'),
(3, 2, 199.80, CURRENT_TIMESTAMP - INTERVAL '2 days', 'PAGO'),
(4, 4, 149.90, NULL, 'PENDENTE');

-- ============================================
-- FINANCES - FINANCIAL ACCOUNTS
-- ============================================

INSERT INTO conta_financeira (nome, descricao, tipo, banco, agencia, conta, saldo_inicial, saldo_atual) VALUES
('Caixa Principal', 'Caixa principal da empresa', 'CAIXA', NULL, NULL, NULL, 0, 0),
('Banco do Brasil', 'Conta corrente principal', 'BANCO', 'Banco do Brasil', '1234-5', '12345-6', 10000.00, 10000.00),
('Cartão de Crédito', 'Cartão de crédito empresarial', 'CARTAO', 'Banco do Brasil', NULL, '****1234', 0, 0);

-- Financial transactions
INSERT INTO transacao_financeira (conta_financeira_id, categoria_financeira_id, tipo, descricao, valor, data_transacao, data_pagamento, status, venda_id, usuario_id) VALUES
-- Receitas (from sales)
(1, 1, 'RECEITA', 'Venda VEN-2025-001', 1249.90, CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE - INTERVAL '5 days', 'PAGO', 1, 3),
(1, 1, 'RECEITA', 'Venda VEN-2025-002', 3400.00, CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE - INTERVAL '3 days', 'PAGO', 2, 3),
(1, 1, 'RECEITA', 'Venda VEN-2025-003', 199.80, CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE - INTERVAL '2 days', 'PAGO', 3, 3),
-- Despesas
(1, 4, 'DESPESA', 'Compra de produtos - NF-001 a NF-008', 5000.00, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE - INTERVAL '10 days', 'PAGO', NULL, 1),
(1, 5, 'DESPESA', 'Salários do mês', 8000.00, CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE - INTERVAL '5 days', 'PAGO', NULL, 1),
(1, 6, 'DESPESA', 'Impostos do mês', 500.00, CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE - INTERVAL '3 days', 'PAGO', NULL, 1);

-- Update account balances (triggers should handle this, but setting initial values)
UPDATE conta_financeira SET saldo_atual = saldo_inicial + 
    (SELECT COALESCE(SUM(CASE WHEN tipo = 'RECEITA' THEN valor ELSE -valor END), 0)
     FROM transacao_financeira 
     WHERE conta_financeira_id = conta_financeira.id AND status = 'PAGO')
WHERE id IN (1, 2, 3);

-- ============================================
-- LOGISTICS - CARRIERS & DRIVERS
-- ============================================

INSERT INTO transportadora (razao_social, nome_fantasia, cnpj, telefone, email, endereco, cidade, estado) VALUES
('Transportadora Correios', 'Correios', '34.028.316/0001-03', '(11) 3003-0100', 'contato@correios.com.br', 'Sede dos Correios', 'Brasília', 'DF'),
('Transportadora ABC', 'Transportadora ABC', '12.345.678/0001-11', '(11) 3456-7890', 'contato@abc.com', 'Rua Transporte, 100', 'São Paulo', 'SP');

INSERT INTO motorista (nome, cpf, cnh, telefone, email) VALUES
('Carlos Santos', '111.222.333-44', '12345678901', '(11) 98765-1111', 'carlos@email.com'),
('Ana Costa', '555.666.777-88', '98765432109', '(11) 98765-2222', 'ana.motorista@email.com');

-- ============================================
-- LOGISTICS - ORDERS
-- ============================================

INSERT INTO pedido (numero_pedido, venda_id, cliente_id, armazem_id, status, prioridade, data_pedido, data_previsao_entrega, usuario_id) VALUES
('PED-2025-001', 1, 1, 1, 'ENTREGUE', 'NORMAL', CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_DATE - INTERVAL '3 days', 3),
('PED-2025-002', 2, 2, 1, 'ENVIADO', 'NORMAL', CURRENT_TIMESTAMP - INTERVAL '3 days', CURRENT_DATE + INTERVAL '2 days', 3),
('PED-2025-003', 3, 3, 1, 'SEPARACAO', 'NORMAL', CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_DATE + INTERVAL '3 days', 3),
('PED-2025-004', 4, 4, 1, 'PENDENTE', 'NORMAL', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_DATE + INTERVAL '5 days', 3);

-- Order items
INSERT INTO pedido_item (pedido_id, produto_id, quantidade, quantidade_separada) VALUES
-- Pedido 1
(1, 1, 1, 1),
(1, 3, 1, 1),
-- Pedido 2
(2, 2, 1, 1),
-- Pedido 3
(3, 3, 2, 1),
(3, 4, 1, 0),
-- Pedido 4
(4, 4, 1, 0);

-- Shipments
INSERT INTO envio (pedido_id, transportadora_id, codigo_rastreamento, status, data_envio, data_previsao_entrega, data_entrega) VALUES
(1, 1, 'BR123456789BR', 'ENTREGUE', CURRENT_DATE - INTERVAL '4 days', CURRENT_DATE - INTERVAL '3 days', CURRENT_DATE - INTERVAL '3 days'),
(2, 2, 'ABC987654321', 'EM_TRANSITO', CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE + INTERVAL '2 days', NULL);

-- Routes
INSERT INTO rota (nome, descricao, motorista_id, data_rota, status, total_paradas, paradas_concluidas) VALUES
('Rota Centro', 'Rota de entrega região central', 1, CURRENT_DATE, 'EM_ANDAMENTO', 5, 2),
('Rota Norte', 'Rota de entrega região norte', 2, CURRENT_DATE + INTERVAL '1 day', 'AGENDADA', 3, 0);

-- Link shipment to route
UPDATE envio SET rota_id = 1 WHERE id = 2;

-- ============================================
-- END OF SAMPLE DATA
-- ============================================

