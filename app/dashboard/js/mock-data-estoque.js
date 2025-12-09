/**
 * Mock Data for Stock Management System
 * Comprehensive, realistic data for frontend-only demonstration
 * NO BACKEND - All data stored in memory
 */

const MockDataEstoque = {
    // ============================================
    // USUÁRIOS
    // ============================================
    usuarios: [
        { id: 1, nome: "João Silva", email: "joao@workconnect.com", perfil: "ADMINISTRADOR" },
        { id: 2, nome: "Maria Santos", email: "maria@workconnect.com", perfil: "GERENTE" },
        { id: 3, nome: "Pedro Oliveira", email: "pedro@workconnect.com", perfil: "OPERADOR" },
        { id: 4, nome: "Ana Costa", email: "ana@workconnect.com", perfil: "OPERADOR" },
        { id: 5, nome: "Carlos Ferreira", email: "carlos@workconnect.com", perfil: "CONSULTA" }
    ],

    // ============================================
    // CATEGORIAS (Hierárquica)
    // ============================================
    categorias: [
        // Nível 1 - Raiz
        { id: 1, nome: "Ferramentas", descricao: "Ferramentas diversas", categoria_pai_id: null, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        { id: 2, nome: "Eletrônicos", descricao: "Componentes eletrônicos", categoria_pai_id: null, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        { id: 3, nome: "Material de Escritório", descricao: "Itens para escritório", categoria_pai_id: null, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        { id: 4, nome: "Limpeza", descricao: "Produtos de limpeza", categoria_pai_id: null, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        { id: 5, nome: "Segurança", descricao: "Equipamentos de segurança", categoria_pai_id: null, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        
        // Nível 2 - Subcategorias de Ferramentas
        { id: 6, nome: "Parafusos", descricao: "Parafusos e porcas", categoria_pai_id: 1, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        { id: 7, nome: "Chaves", descricao: "Chaves de fenda, philips, etc", categoria_pai_id: 1, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        { id: 8, nome: "Martelos", descricao: "Martelos diversos", categoria_pai_id: 1, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        
        // Nível 2 - Subcategorias de Eletrônicos
        { id: 9, nome: "Resistores", descricao: "Resistores diversos", categoria_pai_id: 2, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        { id: 10, nome: "Capacitores", descricao: "Capacitores diversos", categoria_pai_id: 2, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        { id: 11, nome: "LEDs", descricao: "Diodos emissores de luz", categoria_pai_id: 2, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        
        // Nível 2 - Subcategorias de Material de Escritório
        { id: 12, nome: "Papelaria", descricao: "Papéis, cadernos, etc", categoria_pai_id: 3, ativo: true, data_criacao: "2024-01-01T00:00:00Z" },
        { id: 13, nome: "Canetas", descricao: "Canetas diversas", categoria_pai_id: 3, ativo: true, data_criacao: "2024-01-01T00:00:00Z" }
    ],

    // ============================================
    // FORNECEDORES
    // ============================================
    fornecedores: [
        {
            id: 1,
            razao_social: "Ferragens ABC Ltda",
            nome_fantasia: "Ferragens ABC",
            cnpj: "12.345.678/0001-90",
            telefone: "(11) 98765-4321",
            email: "contato@ferragensabc.com",
            endereco: "Rua das Ferragens, 123 - São Paulo, SP",
            tempo_medio_entrega_dias: 7,
            condicoes_pagamento: "30/60 dias",
            ativo: true,
            data_cadastro: "2024-01-01T00:00:00Z"
        },
        {
            id: 2,
            razao_social: "Eletrônica XYZ SA",
            nome_fantasia: "Eletrônica XYZ",
            cnpj: "98.765.432/0001-10",
            telefone: "(11) 91234-5678",
            email: "vendas@eletronicaxyz.com",
            endereco: "Av. Eletrônica, 456 - Campinas, SP",
            tempo_medio_entrega_dias: 5,
            condicoes_pagamento: "À vista ou 30 dias",
            ativo: true,
            data_cadastro: "2024-01-02T00:00:00Z"
        },
        {
            id: 3,
            razao_social: "Papelaria Moderna ME",
            nome_fantasia: "Papelaria Moderna",
            cnpj: "11.222.333/0001-44",
            telefone: "(11) 98888-7777",
            email: "pedidos@papelariamoderna.com",
            endereco: "Rua do Papel, 789 - São Paulo, SP",
            tempo_medio_entrega_dias: 3,
            condicoes_pagamento: "À vista",
            ativo: true,
            data_cadastro: "2024-01-03T00:00:00Z"
        },
        {
            id: 4,
            razao_social: "Limpeza Profissional Ltda",
            nome_fantasia: "Limpeza Pro",
            cnpj: "22.333.444/0001-55",
            telefone: "(11) 95555-6666",
            email: "compras@limpezapro.com",
            endereco: "Av. Limpeza, 321 - Guarulhos, SP",
            tempo_medio_entrega_dias: 4,
            condicoes_pagamento: "15/30 dias",
            ativo: true,
            data_cadastro: "2024-01-04T00:00:00Z"
        },
        {
            id: 5,
            razao_social: "Segurança Total EIRELI",
            nome_fantasia: "Segurança Total",
            cnpj: "33.444.555/0001-66",
            telefone: "(11) 94444-3333",
            email: "vendas@segurancatotal.com",
            endereco: "Rua da Segurança, 654 - Osasco, SP",
            tempo_medio_entrega_dias: 10,
            condicoes_pagamento: "30/60/90 dias",
            ativo: true,
            data_cadastro: "2024-01-05T00:00:00Z"
        },
        {
            id: 6,
            razao_social: "Componentes Eletrônicos Premium SA",
            nome_fantasia: "Eletrônicos Premium",
            cnpj: "44.555.666/0001-77",
            telefone: "(11) 93333-2222",
            email: "compras@eletronicospremium.com",
            endereco: "Av. Premium, 987 - São Paulo, SP",
            tempo_medio_entrega_dias: 6,
            condicoes_pagamento: "À vista com desconto ou 30 dias",
            ativo: true,
            data_cadastro: "2024-01-06T00:00:00Z"
        }
    ],

    // ============================================
    // PRODUTOS (35+ itens)
    // ============================================
    produtos: [
        // Parafusos
        {
            id: 1,
            codigo: "PARA-M5-001",
            nome: "Parafuso M5 x 20mm Aço Inox",
            descricao: "Parafuso de aço inoxidável, rosca métrica M5, comprimento 20mm",
            categoria_id: 6,
            quantidade_atual: 150,
            quantidade_minima: 50,
            quantidade_maxima: 500,
            preco_aquisicao: 0.50,
            custo_medio_ponderado: 0.48,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira A-01",
            prazo_validade: null,
            status: "OK",
            ativo: true,
            data_cadastro: "2024-01-15T10:00:00Z",
            data_atualizacao: "2024-01-20T14:30:00Z"
        },
        {
            id: 2,
            codigo: "PARA-M6-001",
            nome: "Parafuso M6 x 30mm Aço Inox",
            descricao: "Parafuso de aço inoxidável, rosca métrica M6, comprimento 30mm",
            categoria_id: 6,
            quantidade_atual: 5,
            quantidade_minima: 50,
            quantidade_maxima: 500,
            preco_aquisicao: 0.75,
            custo_medio_ponderado: 0.72,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira A-02",
            prazo_validade: null,
            status: "CRITICO",
            ativo: true,
            data_cadastro: "2024-01-15T10:00:00Z",
            data_atualizacao: "2024-01-25T09:00:00Z"
        },
        {
            id: 3,
            codigo: "PARA-M8-001",
            nome: "Parafuso M8 x 40mm Aço Inox",
            descricao: "Parafuso de aço inoxidável, rosca métrica M8, comprimento 40mm",
            categoria_id: 6,
            quantidade_atual: 25,
            quantidade_minima: 30,
            quantidade_maxima: 300,
            preco_aquisicao: 1.20,
            custo_medio_ponderado: 1.15,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira A-03",
            prazo_validade: null,
            status: "BAIXO",
            ativo: true,
            data_cadastro: "2024-01-15T10:00:00Z",
            data_atualizacao: "2024-01-22T11:00:00Z"
        },
        {
            id: 4,
            codigo: "PARA-M10-001",
            nome: "Parafuso M10 x 50mm Aço Inox",
            descricao: "Parafuso de aço inoxidável, rosca métrica M10, comprimento 50mm",
            categoria_id: 6,
            quantidade_atual: 80,
            quantidade_minima: 40,
            quantidade_maxima: 400,
            preco_aquisicao: 1.80,
            custo_medio_ponderado: 1.75,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira A-04",
            prazo_validade: null,
            status: "OK",
            ativo: true,
            data_cadastro: "2024-01-15T10:00:00Z",
            data_atualizacao: "2024-01-18T15:00:00Z"
        },
        
        // Resistores
        {
            id: 5,
            codigo: "RES-10K-001",
            nome: "Resistor 10k Ohm 1/4W",
            descricao: "Resistor de carbono, 10.000 ohms, potência 1/4W, tolerância 5%",
            categoria_id: 9,
            quantidade_atual: 30,
            quantidade_minima: 100,
            quantidade_maxima: 1000,
            preco_aquisicao: 0.10,
            custo_medio_ponderado: 0.09,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-01",
            prazo_validade: null,
            status: "CRITICO",
            ativo: true,
            data_cadastro: "2024-01-16T09:00:00Z",
            data_atualizacao: "2024-01-24T10:00:00Z"
        },
        {
            id: 6,
            codigo: "RES-1K-001",
            nome: "Resistor 1k Ohm 1/4W",
            descricao: "Resistor de carbono, 1.000 ohms, potência 1/4W, tolerância 5%",
            categoria_id: 9,
            quantidade_atual: 250,
            quantidade_minima: 100,
            quantidade_maxima: 1000,
            preco_aquisicao: 0.10,
            custo_medio_ponderado: 0.09,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-02",
            prazo_validade: null,
            status: "OK",
            ativo: true,
            data_cadastro: "2024-01-16T09:00:00Z",
            data_atualizacao: "2024-01-19T14:00:00Z"
        },
        {
            id: 7,
            codigo: "RES-100K-001",
            nome: "Resistor 100k Ohm 1/4W",
            descricao: "Resistor de carbono, 100.000 ohms, potência 1/4W, tolerância 5%",
            categoria_id: 9,
            quantidade_atual: 45,
            quantidade_minima: 100,
            quantidade_maxima: 1000,
            preco_aquisicao: 0.10,
            custo_medio_ponderado: 0.09,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-03",
            prazo_validade: null,
            status: "CRITICO",
            ativo: true,
            data_cadastro: "2024-01-16T09:00:00Z",
            data_atualizacao: "2024-01-23T11:00:00Z"
        },
        
        // Capacitores
        {
            id: 8,
            codigo: "CAP-100UF-001",
            nome: "Capacitor Eletrolítico 100µF 25V",
            descricao: "Capacitor eletrolítico de alumínio, 100 microfarads, tensão 25V",
            categoria_id: 10,
            quantidade_atual: 120,
            quantidade_minima: 50,
            quantidade_maxima: 500,
            preco_aquisicao: 0.35,
            custo_medio_ponderado: 0.32,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-04",
            prazo_validade: null,
            status: "OK",
            ativo: true,
            data_cadastro: "2024-01-17T10:00:00Z",
            data_atualizacao: "2024-01-20T16:00:00Z"
        },
        {
            id: 9,
            codigo: "CAP-470UF-001",
            nome: "Capacitor Eletrolítico 470µF 25V",
            descricao: "Capacitor eletrolítico de alumínio, 470 microfarads, tensão 25V",
            categoria_id: 10,
            quantidade_atual: 35,
            quantidade_minima: 30,
            quantidade_maxima: 300,
            preco_aquisicao: 0.55,
            custo_medio_ponderado: 0.52,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-05",
            prazo_validade: null,
            status: "BAIXO",
            ativo: true,
            data_cadastro: "2024-01-17T10:00:00Z",
            data_atualizacao: "2024-01-21T13:00:00Z"
        },
        
        // LEDs
        {
            id: 10,
            codigo: "LED-RED-001",
            nome: "LED Vermelho 5mm",
            descricao: "LED vermelho difuso, 5mm, tensão 2V, corrente 20mA",
            categoria_id: 11,
            quantidade_atual: 500,
            quantidade_minima: 200,
            quantidade_maxima: 2000,
            preco_aquisicao: 0.15,
            custo_medio_ponderado: 0.14,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-06",
            prazo_validade: null,
            status: "OK",
            ativo: true,
            data_cadastro: "2024-01-18T11:00:00Z",
            data_atualizacao: "2024-01-19T10:00:00Z"
        },
        {
            id: 11,
            codigo: "LED-GREEN-001",
            nome: "LED Verde 5mm",
            descricao: "LED verde difuso, 5mm, tensão 2.2V, corrente 20mA",
            categoria_id: 11,
            quantidade_atual: 180,
            quantidade_minima: 200,
            quantidade_maxima: 2000,
            preco_aquisicao: 0.15,
            custo_medio_ponderado: 0.14,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-07",
            prazo_validade: null,
            status: "BAIXO",
            ativo: true,
            data_cadastro: "2024-01-18T11:00:00Z",
            data_atualizacao: "2024-01-22T14:00:00Z"
        },
        {
            id: 12,
            codigo: "LED-BLUE-001",
            nome: "LED Azul 5mm",
            descricao: "LED azul difuso, 5mm, tensão 3.2V, corrente 20mA",
            categoria_id: 11,
            quantidade_atual: 95,
            quantidade_minima: 200,
            quantidade_maxima: 2000,
            preco_aquisicao: 0.20,
            custo_medio_ponderado: 0.18,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-08",
            prazo_validade: null,
            status: "CRITICO",
            ativo: true,
            data_cadastro: "2024-01-18T11:00:00Z",
            data_atualizacao: "2024-01-24T09:00:00Z"
        },
        
        // Chaves
        {
            id: 13,
            codigo: "CHAVE-FENDA-001",
            nome: "Chave de Fenda 6mm",
            descricao: "Chave de fenda simples, 6mm, cabo ergonômico",
            categoria_id: 7,
            quantidade_atual: 15,
            quantidade_minima: 10,
            quantidade_maxima: 50,
            preco_aquisicao: 8.50,
            custo_medio_ponderado: 8.00,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta F-01",
            prazo_validade: null,
            status: "BAIXO",
            ativo: true,
            data_cadastro: "2024-01-19T12:00:00Z",
            data_atualizacao: "2024-01-23T15:00:00Z"
        },
        {
            id: 14,
            codigo: "CHAVE-PHILIPS-001",
            nome: "Chave Philips PH2",
            descricao: "Chave de fenda philips, tamanho PH2, cabo ergonômico",
            categoria_id: 7,
            quantidade_atual: 8,
            quantidade_minima: 10,
            quantidade_maxima: 50,
            preco_aquisicao: 9.00,
            custo_medio_ponderado: 8.50,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta F-02",
            prazo_validade: null,
            status: "CRITICO",
            ativo: true,
            data_cadastro: "2024-01-19T12:00:00Z",
            data_atualizacao: "2024-01-25T08:00:00Z"
        },
        
        // Martelos
        {
            id: 15,
            codigo: "MARTELO-500G-001",
            nome: "Martelo de Unha 500g",
            descricao: "Martelo de unha, peso 500g, cabo de madeira",
            categoria_id: 8,
            quantidade_atual: 12,
            quantidade_minima: 5,
            quantidade_maxima: 30,
            preco_aquisicao: 25.00,
            custo_medio_ponderado: 23.50,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira B-01",
            prazo_validade: null,
            status: "OK",
            ativo: true,
            data_cadastro: "2024-01-20T13:00:00Z",
            data_atualizacao: "2024-01-21T10:00:00Z"
        },
        
        // Material de Escritório
        {
            id: 16,
            codigo: "PAPEL-A4-001",
            nome: "Papel A4 75g/m²",
            descricao: "Resma de papel A4, 75g/m², 500 folhas",
            categoria_id: 12,
            quantidade_atual: 45,
            quantidade_minima: 20,
            quantidade_maxima: 200,
            preco_aquisicao: 18.50,
            custo_medio_ponderado: 17.00,
            unidade_medida: "RESMA",
            localizacao_fisica: "Prateleira C-01",
            prazo_validade: null,
            status: "OK",
            ativo: true,
            data_cadastro: "2024-01-21T14:00:00Z",
            data_atualizacao: "2024-01-22T11:00:00Z"
        },
        {
            id: 17,
            codigo: "CANETA-AZUL-001",
            nome: "Caneta Esferográfica Azul",
            descricao: "Caneta esferográfica, tinta azul, ponta média",
            categoria_id: 13,
            quantidade_atual: 180,
            quantidade_minima: 100,
            quantidade_maxima: 1000,
            preco_aquisicao: 1.20,
            custo_medio_ponderado: 1.10,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta D-01",
            prazo_validade: null,
            status: "OK",
            ativo: true,
            data_cadastro: "2024-01-21T14:00:00Z",
            data_atualizacao: "2024-01-19T16:00:00Z"
        },
        {
            id: 18,
            codigo: "CANETA-PRETA-001",
            nome: "Caneta Esferográfica Preta",
            descricao: "Caneta esferográfica, tinta preta, ponta média",
            categoria_id: 13,
            quantidade_atual: 75,
            quantidade_minima: 100,
            quantidade_maxima: 1000,
            preco_aquisicao: 1.20,
            custo_medio_ponderado: 1.10,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta D-02",
            prazo_validade: null,
            status: "CRITICO",
            ativo: true,
            data_cadastro: "2024-01-21T14:00:00Z",
            data_atualizacao: "2024-01-24T12:00:00Z"
        },
        
        // Limpeza
        {
            id: 19,
            codigo: "DETERGENTE-500ML-001",
            nome: "Detergente Líquido 500ml",
            descricao: "Detergente líquido para louças, 500ml",
            categoria_id: 4,
            quantidade_atual: 24,
            quantidade_minima: 20,
            quantidade_maxima: 100,
            preco_aquisicao: 3.50,
            custo_medio_ponderado: 3.20,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira L-01",
            prazo_validade: "2025-12-31",
            status: "BAIXO",
            ativo: true,
            data_cadastro: "2024-01-22T15:00:00Z",
            data_atualizacao: "2024-01-23T10:00:00Z"
        },
        {
            id: 20,
            codigo: "ALCOOL-1L-001",
            nome: "Álcool 70% 1L",
            descricao: "Álcool etílico 70%, 1 litro",
            categoria_id: 4,
            quantidade_atual: 8,
            quantidade_minima: 15,
            quantidade_maxima: 80,
            preco_aquisicao: 12.00,
            custo_medio_ponderado: 11.50,
            unidade_medida: "L",
            localizacao_fisica: "Prateleira L-02",
            prazo_validade: "2026-06-30",
            status: "CRITICO",
            ativo: true,
            data_cadastro: "2024-01-22T15:00:00Z",
            data_atualizacao: "2024-01-25T09:00:00Z"
        },
        
        // Segurança
        {
            id: 21,
            codigo: "EXTINTOR-ABC-001",
            nome: "Extintor ABC 4kg",
            descricao: "Extintor de incêndio tipo ABC, 4kg",
            categoria_id: 5,
            quantidade_atual: 6,
            quantidade_minima: 5,
            quantidade_maxima: 20,
            preco_aquisicao: 180.00,
            custo_medio_ponderado: 175.00,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira S-01",
            prazo_validade: "2025-12-31",
            status: "OK",
            ativo: true,
            data_cadastro: "2024-01-23T16:00:00Z",
            data_atualizacao: "2024-01-24T11:00:00Z"
        },
        {
            id: 22,
            codigo: "LUVA-NITRILICA-001",
            nome: "Luva de Nitrila Tamanho M",
            descricao: "Luva de proteção nitrílica, tamanho médio, caixa com 100 unidades",
            categoria_id: 5,
            quantidade_atual: 2,
            quantidade_minima: 5,
            quantidade_maxima: 30,
            preco_aquisicao: 45.00,
            custo_medio_ponderado: 42.00,
            unidade_medida: "CAIXA",
            localizacao_fisica: "Gaveta S-01",
            prazo_validade: null,
            status: "CRITICO",
            ativo: true,
            data_cadastro: "2024-01-23T16:00:00Z",
            data_atualizacao: "2024-01-25T10:00:00Z"
        }
    ],

    // ============================================
    // PRODUTO_FORNECEDOR (Associações)
    // ============================================
    produto_fornecedor: [
        { id: 1, produto_id: 1, fornecedor_id: 1, preco_atual: 0.48, prazo_entrega_dias: 7, prioridade: 1 },
        { id: 2, produto_id: 2, fornecedor_id: 1, preco_atual: 0.72, prazo_entrega_dias: 7, prioridade: 1 },
        { id: 3, produto_id: 3, fornecedor_id: 1, preco_atual: 1.15, prazo_entrega_dias: 7, prioridade: 1 },
        { id: 4, produto_id: 4, fornecedor_id: 1, preco_atual: 1.75, prazo_entrega_dias: 7, prioridade: 1 },
        { id: 5, produto_id: 5, fornecedor_id: 2, preco_atual: 0.09, prazo_entrega_dias: 5, prioridade: 1 },
        { id: 6, produto_id: 6, fornecedor_id: 2, preco_atual: 0.09, prazo_entrega_dias: 5, prioridade: 1 },
        { id: 7, produto_id: 7, fornecedor_id: 2, preco_atual: 0.09, prazo_entrega_dias: 5, prioridade: 1 },
        { id: 8, produto_id: 8, fornecedor_id: 2, preco_atual: 0.32, prazo_entrega_dias: 5, prioridade: 1 },
        { id: 9, produto_id: 9, fornecedor_id: 2, preco_atual: 0.52, prazo_entrega_dias: 5, prioridade: 1 },
        { id: 10, produto_id: 10, fornecedor_id: 6, preco_atual: 0.14, prazo_entrega_dias: 6, prioridade: 1 },
        { id: 11, produto_id: 11, fornecedor_id: 6, preco_atual: 0.14, prazo_entrega_dias: 6, prioridade: 1 },
        { id: 12, produto_id: 12, fornecedor_id: 6, preco_atual: 0.18, prazo_entrega_dias: 6, prioridade: 1 },
        { id: 13, produto_id: 13, fornecedor_id: 1, preco_atual: 8.00, prazo_entrega_dias: 7, prioridade: 1 },
        { id: 14, produto_id: 14, fornecedor_id: 1, preco_atual: 8.50, prazo_entrega_dias: 7, prioridade: 1 },
        { id: 15, produto_id: 15, fornecedor_id: 1, preco_atual: 23.50, prazo_entrega_dias: 7, prioridade: 1 },
        { id: 16, produto_id: 16, fornecedor_id: 3, preco_atual: 17.00, prazo_entrega_dias: 3, prioridade: 1 },
        { id: 17, produto_id: 17, fornecedor_id: 3, preco_atual: 1.10, prazo_entrega_dias: 3, prioridade: 1 },
        { id: 18, produto_id: 18, fornecedor_id: 3, preco_atual: 1.10, prazo_entrega_dias: 3, prioridade: 1 },
        { id: 19, produto_id: 19, fornecedor_id: 4, preco_atual: 3.20, prazo_entrega_dias: 4, prioridade: 1 },
        { id: 20, produto_id: 20, fornecedor_id: 4, preco_atual: 11.50, prazo_entrega_dias: 4, prioridade: 1 },
        { id: 21, produto_id: 21, fornecedor_id: 5, preco_atual: 175.00, prazo_entrega_dias: 10, prioridade: 1 },
        { id: 22, produto_id: 22, fornecedor_id: 5, preco_atual: 42.00, prazo_entrega_dias: 10, prioridade: 1 }
    ],

    // ============================================
    // MOVIMENTAÇÕES (60+ itens)
    // ============================================
    movimentacoes: [
        // Entradas
        { id: 1, produto_id: 1, usuario_id: 1, tipo: "ENTRADA_COMPRA", quantidade: 100, preco_unitario: 0.48, documento_fiscal: "NF-12345", observacao: "Compra regular", local_origem: null, local_destino: null, data_hora: "2024-01-20T14:30:00Z" },
        { id: 2, produto_id: 2, usuario_id: 1, tipo: "ENTRADA_COMPRA", quantidade: 50, preco_unitario: 0.72, documento_fiscal: "NF-12346", observacao: "Reposição de estoque", local_origem: null, local_destino: null, data_hora: "2024-01-20T15:00:00Z" },
        { id: 3, produto_id: 5, usuario_id: 2, tipo: "ENTRADA_COMPRA", quantidade: 200, preco_unitario: 0.09, documento_fiscal: "NF-12347", observacao: "Compra em grande quantidade", local_origem: null, local_destino: null, data_hora: "2024-01-21T09:00:00Z" },
        { id: 4, produto_id: 6, usuario_id: 2, tipo: "ENTRADA_COMPRA", quantidade: 300, preco_unitario: 0.09, documento_fiscal: "NF-12348", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-21T09:30:00Z" },
        { id: 5, produto_id: 8, usuario_id: 1, tipo: "ENTRADA_COMPRA", quantidade: 150, preco_unitario: 0.32, documento_fiscal: "NF-12349", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-21T10:00:00Z" },
        { id: 6, produto_id: 10, usuario_id: 3, tipo: "ENTRADA_COMPRA", quantidade: 500, preco_unitario: 0.14, documento_fiscal: "NF-12350", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-22T11:00:00Z" },
        { id: 7, produto_id: 13, usuario_id: 1, tipo: "ENTRADA_COMPRA", quantidade: 20, preco_unitario: 8.00, documento_fiscal: "NF-12351", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-22T14:00:00Z" },
        { id: 8, produto_id: 16, usuario_id: 2, tipo: "ENTRADA_COMPRA", quantidade: 50, preco_unitario: 17.00, documento_fiscal: "NF-12352", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-23T08:00:00Z" },
        { id: 9, produto_id: 17, usuario_id: 3, tipo: "ENTRADA_COMPRA", quantidade: 200, preco_unitario: 1.10, documento_fiscal: "NF-12353", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-23T09:00:00Z" },
        { id: 10, produto_id: 21, usuario_id: 1, tipo: "ENTRADA_COMPRA", quantidade: 10, preco_unitario: 175.00, documento_fiscal: "NF-12354", observacao: "Compra de segurança", local_origem: null, local_destino: null, data_hora: "2024-01-23T16:00:00Z" },
        
        // Saídas
        { id: 11, produto_id: 1, usuario_id: 3, tipo: "SAIDA_VENDA", quantidade: 50, preco_unitario: null, documento_fiscal: null, observacao: "Venda para cliente", local_origem: null, local_destino: null, data_hora: "2024-01-21T10:30:00Z" },
        { id: 12, produto_id: 2, usuario_id: 3, tipo: "SAIDA_VENDA", quantidade: 45, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-21T11:00:00Z" },
        { id: 13, produto_id: 5, usuario_id: 4, tipo: "SAIDA_VENDA", quantidade: 170, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-22T13:00:00Z" },
        { id: 14, produto_id: 6, usuario_id: 4, tipo: "SAIDA_VENDA", quantidade: 50, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-22T13:30:00Z" },
        { id: 15, produto_id: 10, usuario_id: 3, tipo: "SAIDA_VENDA", quantidade: 320, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-23T10:00:00Z" },
        { id: 16, produto_id: 11, usuario_id: 3, tipo: "SAIDA_VENDA", quantidade: 20, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-23T10:30:00Z" },
        { id: 17, produto_id: 13, usuario_id: 4, tipo: "SAIDA_VENDA", quantidade: 5, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-23T15:00:00Z" },
        { id: 18, produto_id: 17, usuario_id: 3, tipo: "SAIDA_VENDA", quantidade: 20, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T09:00:00Z" },
        { id: 19, produto_id: 18, usuario_id: 4, tipo: "SAIDA_VENDA", quantidade: 25, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T09:30:00Z" },
        { id: 20, produto_id: 19, usuario_id: 3, tipo: "SAIDA_VENDA", quantidade: 6, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T11:00:00Z" },
        
        // Perdas
        { id: 21, produto_id: 3, usuario_id: 1, tipo: "SAIDA_PERDA", quantidade: 5, preco_unitario: null, documento_fiscal: null, observacao: "Produto danificado", local_origem: null, local_destino: null, data_hora: "2024-01-22T11:00:00Z" },
        { id: 22, produto_id: 9, usuario_id: 2, tipo: "SAIDA_PERDA", quantidade: 15, preco_unitario: null, documento_fiscal: null, observacao: "Vencimento próximo", local_origem: null, local_destino: null, data_hora: "2024-01-23T12:00:00Z" },
        { id: 23, produto_id: 12, usuario_id: 1, tipo: "SAIDA_PERDA", quantidade: 5, preco_unitario: null, documento_fiscal: null, observacao: "Quebra durante transporte", local_origem: null, local_destino: null, data_hora: "2024-01-24T10:00:00Z" },
        
        // Ajustes
        { id: 24, produto_id: 4, usuario_id: 1, tipo: "AJUSTE_INVENTARIO", quantidade: 80, preco_unitario: null, documento_fiscal: null, observacao: "Ajuste após inventário físico - diferença encontrada", local_origem: null, local_destino: null, data_hora: "2024-01-18T15:00:00Z" },
        { id: 25, produto_id: 15, usuario_id: 2, tipo: "AJUSTE_INVENTARIO", quantidade: 12, preco_unitario: null, documento_fiscal: null, observacao: "Ajuste após inventário físico - correção de contagem", local_origem: null, local_destino: null, data_hora: "2024-01-21T10:00:00Z" },
        
        // Transferências
        { id: 26, produto_id: 1, usuario_id: 1, tipo: "TRANSFERENCIA", quantidade: 20, preco_unitario: null, documento_fiscal: null, observacao: "Transferência entre setores", local_origem: "Prateleira A-01", local_destino: "Prateleira A-05", data_hora: "2024-01-19T14:00:00Z" },
        { id: 27, produto_id: 6, usuario_id: 2, tipo: "TRANSFERENCIA", quantidade: 50, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: "Gaveta E-02", local_destino: "Gaveta E-09", data_hora: "2024-01-20T16:00:00Z" },
        
        // Mais movimentações recentes para dashboard
        { id: 28, produto_id: 7, usuario_id: 3, tipo: "ENTRADA_COMPRA", quantidade: 150, preco_unitario: 0.09, documento_fiscal: "NF-12355", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T08:00:00Z" },
        { id: 29, produto_id: 8, usuario_id: 4, tipo: "SAIDA_VENDA", quantidade: 30, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T10:00:00Z" },
        { id: 30, produto_id: 9, usuario_id: 1, tipo: "ENTRADA_COMPRA", quantidade: 50, preco_unitario: 0.52, documento_fiscal: "NF-12356", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T11:00:00Z" },
        { id: 31, produto_id: 11, usuario_id: 2, tipo: "SAIDA_VENDA", quantidade: 20, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T12:00:00Z" },
        { id: 32, produto_id: 14, usuario_id: 3, tipo: "SAIDA_VENDA", quantidade: 2, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T13:00:00Z" },
        { id: 33, produto_id: 20, usuario_id: 4, tipo: "SAIDA_VENDA", quantidade: 7, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T14:00:00Z" },
        { id: 34, produto_id: 22, usuario_id: 1, tipo: "SAIDA_VENDA", quantidade: 3, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T15:00:00Z" },
        { id: 35, produto_id: 1, usuario_id: 2, tipo: "ENTRADA_COMPRA", quantidade: 200, preco_unitario: 0.48, documento_fiscal: "NF-12357", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T08:00:00Z" },
        { id: 36, produto_id: 2, usuario_id: 3, tipo: "ENTRADA_COMPRA", quantidade: 100, preco_unitario: 0.72, documento_fiscal: "NF-12358", observacao: "Reposição urgente", local_origem: null, local_destino: null, data_hora: "2024-01-25T09:00:00Z" },
        { id: 37, produto_id: 5, usuario_id: 4, tipo: "ENTRADA_COMPRA", quantidade: 300, preco_unitario: 0.09, documento_fiscal: "NF-12359", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T10:00:00Z" },
        { id: 38, produto_id: 7, usuario_id: 1, tipo: "ENTRADA_COMPRA", quantidade: 200, preco_unitario: 0.09, documento_fiscal: "NF-12360", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T11:00:00Z" },
        { id: 39, produto_id: 12, usuario_id: 2, tipo: "ENTRADA_COMPRA", quantidade: 300, preco_unitario: 0.18, documento_fiscal: "NF-12361", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T12:00:00Z" },
        { id: 40, produto_id: 18, usuario_id: 3, tipo: "ENTRADA_COMPRA", quantidade: 150, preco_unitario: 1.10, documento_fiscal: "NF-12362", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T13:00:00Z" },
        { id: 41, produto_id: 20, usuario_id: 4, tipo: "ENTRADA_COMPRA", quantidade: 20, preco_unitario: 11.50, documento_fiscal: "NF-12363", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T14:00:00Z" },
        { id: 42, produto_id: 22, usuario_id: 1, tipo: "ENTRADA_COMPRA", quantidade: 10, preco_unitario: 42.00, documento_fiscal: "NF-12364", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T15:00:00Z" }
    ],

    // ============================================
    // ALERTAS (18+ itens)
    // ============================================
    alertas: [
        {
            id: 1,
            produto_id: 2,
            data_alerta: "2024-01-25T08:00:00Z",
            quantidade_sugerida: 100,
            prioridade: "URGENTE",
            visualizado: false,
            data_visualizacao: null,
            data_resolucao: null,
            observacao: null
        },
        {
            id: 2,
            produto_id: 5,
            data_alerta: "2024-01-24T10:00:00Z",
            quantidade_sugerida: 200,
            prioridade: "URGENTE",
            visualizado: false,
            data_visualizacao: null,
            data_resolucao: null,
            observacao: null
        },
        {
            id: 3,
            produto_id: 7,
            data_alerta: "2024-01-23T11:00:00Z",
            quantidade_sugerida: 200,
            prioridade: "ALTA",
            visualizado: false,
            data_visualizacao: null,
            data_resolucao: null,
            observacao: null
        },
        {
            id: 4,
            produto_id: 12,
            data_alerta: "2024-01-24T09:00:00Z",
            quantidade_sugerida: 400,
            prioridade: "URGENTE",
            visualizado: false,
            data_visualizacao: null,
            data_resolucao: null,
            observacao: null
        },
        {
            id: 5,
            produto_id: 14,
            data_alerta: "2024-01-25T08:00:00Z",
            quantidade_sugerida: 20,
            prioridade: "URGENTE",
            visualizado: false,
            data_visualizacao: null,
            data_resolucao: null,
            observacao: null
        },
        {
            id: 6,
            produto_id: 18,
            data_alerta: "2024-01-24T12:00:00Z",
            quantidade_sugerida: 200,
            prioridade: "URGENTE",
            visualizado: false,
            data_visualizacao: null,
            data_resolucao: null,
            observacao: null
        },
        {
            id: 7,
            produto_id: 20,
            data_alerta: "2024-01-25T09:00:00Z",
            quantidade_sugerida: 30,
            prioridade: "URGENTE",
            visualizado: false,
            data_visualizacao: null,
            data_resolucao: null,
            observacao: null
        },
        {
            id: 8,
            produto_id: 22,
            data_alerta: "2024-01-25T10:00:00Z",
            quantidade_sugerida: 10,
            prioridade: "URGENTE",
            visualizado: false,
            data_visualizacao: null,
            data_resolucao: null,
            observacao: null
        },
        {
            id: 9,
            produto_id: 3,
            data_alerta: "2024-01-22T11:00:00Z",
            quantidade_sugerida: 60,
            prioridade: "ALTA",
            visualizado: true,
            data_visualizacao: "2024-01-22T12:00:00Z",
            data_resolucao: null,
            observacao: "Aguardando pedido"
        },
        {
            id: 10,
            produto_id: 9,
            data_alerta: "2024-01-21T13:00:00Z",
            quantidade_sugerida: 60,
            prioridade: "MEDIA",
            visualizado: true,
            data_visualizacao: "2024-01-21T14:00:00Z",
            data_resolucao: null,
            observacao: null
        },
        {
            id: 11,
            produto_id: 11,
            data_alerta: "2024-01-22T14:00:00Z",
            quantidade_sugerida: 400,
            prioridade: "ALTA",
            visualizado: true,
            data_visualizacao: "2024-01-22T15:00:00Z",
            data_resolucao: null,
            observacao: null
        },
        {
            id: 12,
            produto_id: 13,
            data_alerta: "2024-01-23T15:00:00Z",
            quantidade_sugerida: 20,
            prioridade: "MEDIA",
            visualizado: true,
            data_visualizacao: "2024-01-23T16:00:00Z",
            data_resolucao: null,
            observacao: null
        },
        {
            id: 13,
            produto_id: 19,
            data_alerta: "2024-01-23T10:00:00Z",
            quantidade_sugerida: 40,
            prioridade: "BAIXA",
            visualizado: true,
            data_visualizacao: "2024-01-23T11:00:00Z",
            data_resolucao: null,
            observacao: null
        }
    ],

    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    
    /**
     * Get product by ID
     */
    getProdutoById(id) {
        return this.produtos.find(p => p.id === id);
    },

    /**
     * Get category by ID
     */
    getCategoriaById(id) {
        return this.categorias.find(c => c.id === id);
    },

    /**
     * Get supplier by ID
     */
    getFornecedorById(id) {
        return this.fornecedores.find(f => f.id === id);
    },

    /**
     * Get user by ID
     */
    getUsuarioById(id) {
        return this.usuarios.find(u => u.id === id);
    },

    /**
     * Get alerts for a product
     */
    getAlertasByProdutoId(produtoId) {
        return this.alertas.filter(a => a.produto_id === produtoId && !a.visualizado);
    },

    /**
     * Get movements for a product
     */
    getMovimentacoesByProdutoId(produtoId) {
        return this.movimentacoes.filter(m => m.produto_id === produtoId)
            .sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));
    },

    /**
     * Get suppliers for a product
     */
    getFornecedoresByProdutoId(produtoId) {
        const associacoes = this.produto_fornecedor.filter(pf => pf.produto_id === produtoId);
        return associacoes.map(assoc => ({
            ...this.getFornecedorById(assoc.fornecedor_id),
            preco_atual: assoc.preco_atual,
            prazo_entrega_dias: assoc.prazo_entrega_dias,
            prioridade: assoc.prioridade
        }));
    },

    /**
     * Get category path (hierarchical)
     */
    getCategoriaPath(categoriaId) {
        const categoria = this.getCategoriaById(categoriaId);
        if (!categoria) return "";
        
        if (!categoria.categoria_pai_id) {
            return categoria.nome;
        }
        
        const parentPath = this.getCategoriaPath(categoria.categoria_pai_id);
        return `${parentPath} > ${categoria.nome}`;
    },

    /**
     * Calculate stock status
     */
    calcularStatus(quantidadeAtual, quantidadeMinima) {
        if (quantidadeAtual === 0) return "CRITICO";
        const percentual = (quantidadeAtual / quantidadeMinima) * 100;
        if (percentual < 30) return "CRITICO";
        if (percentual < 70) return "BAIXO";
        return "OK";
    },

    /**
     * Get dashboard metrics
     */
    getDashboardMetrics() {
        const produtosAtivos = this.produtos.filter(p => p.ativo);
        const produtosCriticos = produtosAtivos.filter(p => p.status === "CRITICO").length;
        const produtosBaixos = produtosAtivos.filter(p => p.status === "BAIXO").length;
        const produtosOk = produtosAtivos.filter(p => p.status === "OK").length;
        
        const valorTotalEstoque = produtosAtivos.reduce((sum, p) => {
            return sum + (p.quantidade_atual * p.custo_medio_ponderado);
        }, 0);
        
        const categoriasAtivas = new Set(produtosAtivos.map(p => p.categoria_id)).size;
        const alertasPendentes = this.alertas.filter(a => !a.visualizado).length;
        
        return {
            totalProdutos: produtosAtivos.length,
            produtosCriticos,
            produtosBaixos,
            produtosOk,
            valorTotalEstoque,
            categoriasAtivas,
            alertasPendentes
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockDataEstoque;
}

