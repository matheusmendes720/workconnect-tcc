/**
 * Mock Data for Stock Management System
 * Comprehensive, realistic data for frontend-only demonstration
 * NO BACKEND - All data stored in memory
 * TypeScript version with full type safety
 */

import type {
  User,
  Category,
  Warehouse,
  Supplier,
  Product,
  ProductSupplier,
  Movement,
  Alert,
  MockDataEstoque as IMockDataEstoque,
  DashboardMetrics,
  WarehouseUtilization,
  SupplierPerformance,
} from '../../types/estoque';

// Import enums
import {
  UserProfile as UserProfileEnum,
  ProductStatus,
  MovementType,
  AlertPriority,
} from '../../types/estoque';

export const MockDataEstoque: IMockDataEstoque = {
    // ============================================
    // USUÁRIOS
    // ============================================
    usuarios: [
        { id: 1, nome: "João Silva", email: "joao@workconnect.com", perfil: UserProfileEnum.ADMINISTRADOR },
        { id: 2, nome: "Maria Santos", email: "maria@workconnect.com", perfil: UserProfileEnum.GERENTE },
        { id: 3, nome: "Pedro Oliveira", email: "pedro@workconnect.com", perfil: UserProfileEnum.OPERADOR },
        { id: 4, nome: "Ana Costa", email: "ana@workconnect.com", perfil: UserProfileEnum.OPERADOR },
        { id: 5, nome: "Carlos Ferreira", email: "carlos@workconnect.com", perfil: UserProfileEnum.CONSULTA }
    ] as User[],

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
    // ARMAZENS (Warehouses)
    // ============================================
    armazens: [
        {
            id: 1,
            nome: "Armazém Central",
            descricao: "Armazém principal da empresa",
            endereco: "Rua Principal, 100 - São Paulo, SP",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01234-567",
            capacidade: 10000,
            capacidade_atual: 7250,
            responsavel_id: 1,
            ativo: true,
            data_criacao: "2024-01-01T00:00:00Z"
        },
        {
            id: 2,
            nome: "Armazém Norte",
            descricao: "Armazém regional - Zona Norte",
            endereco: "Av. Norte, 500 - Guarulhos, SP",
            cidade: "Guarulhos",
            estado: "SP",
            cep: "07000-000",
            capacidade: 5000,
            capacidade_atual: 3200,
            responsavel_id: 2,
            ativo: true,
            data_criacao: "2024-01-02T00:00:00Z"
        },
        {
            id: 3,
            nome: "Armazém Sul",
            descricao: "Armazém regional - Zona Sul",
            endereco: "Rua Sul, 200 - Osasco, SP",
            cidade: "Osasco",
            estado: "SP",
            cep: "06000-000",
            capacidade: 3000,
            capacidade_atual: 1800,
            responsavel_id: 3,
            ativo: true,
            data_criacao: "2024-01-03T00:00:00Z"
        }
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
            avaliacao: 4.5,
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
            avaliacao: 4.8,
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
            avaliacao: 4.2,
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
            avaliacao: 3.9,
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
            avaliacao: 4.0,
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
            avaliacao: 4.7,
            ativo: true,
            data_cadastro: "2024-01-06T00:00:00Z"
        }
    ],

    // ============================================
    // PRODUTOS (22 itens)
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
            preco_venda: 0.75,
            custo_medio_ponderado: 0.48,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira A-01",
            armazem_id: 1,
            prazo_validade: null,
            status: ProductStatus.OK,
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
            preco_venda: 1.10,
            custo_medio_ponderado: 0.72,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira A-02",
            armazem_id: 1,
            prazo_validade: null,
            status: ProductStatus.CRITICO,
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
            preco_venda: 1.75,
            custo_medio_ponderado: 1.15,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira A-03",
            armazem_id: 1,
            prazo_validade: null,
            status: ProductStatus.BAIXO,
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
            preco_venda: 2.50,
            custo_medio_ponderado: 1.75,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira A-04",
            armazem_id: 1,
            prazo_validade: null,
            status: ProductStatus.OK,
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
            preco_venda: 0.15,
            custo_medio_ponderado: 0.09,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-01",
            armazem_id: 2,
            prazo_validade: null,
            status: ProductStatus.CRITICO,
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
            preco_venda: 0.15,
            custo_medio_ponderado: 0.09,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-02",
            armazem_id: 2,
            prazo_validade: null,
            status: ProductStatus.OK,
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
            preco_venda: 0.15,
            custo_medio_ponderado: 0.09,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-03",
            armazem_id: 2,
            prazo_validade: null,
            status: ProductStatus.CRITICO,
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
            preco_venda: 0.50,
            custo_medio_ponderado: 0.32,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-04",
            armazem_id: 2,
            prazo_validade: null,
            status: ProductStatus.OK,
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
            preco_venda: 0.80,
            custo_medio_ponderado: 0.52,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-05",
            armazem_id: 2,
            prazo_validade: null,
            status: ProductStatus.BAIXO,
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
            preco_venda: 0.22,
            custo_medio_ponderado: 0.14,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-06",
            armazem_id: 2,
            prazo_validade: null,
            status: ProductStatus.OK,
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
            preco_venda: 0.22,
            custo_medio_ponderado: 0.14,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-07",
            armazem_id: 2,
            prazo_validade: null,
            status: ProductStatus.BAIXO,
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
            preco_venda: 0.28,
            custo_medio_ponderado: 0.18,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta E-08",
            armazem_id: 2,
            prazo_validade: null,
            status: ProductStatus.CRITICO,
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
            preco_venda: 12.00,
            custo_medio_ponderado: 8.00,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta F-01",
            armazem_id: 1,
            prazo_validade: null,
            status: ProductStatus.BAIXO,
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
            preco_venda: 13.00,
            custo_medio_ponderado: 8.50,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta F-02",
            armazem_id: 1,
            prazo_validade: null,
            status: ProductStatus.CRITICO,
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
            preco_venda: 35.00,
            custo_medio_ponderado: 23.50,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira B-01",
            armazem_id: 1,
            prazo_validade: null,
            status: ProductStatus.OK,
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
            preco_venda: 25.00,
            custo_medio_ponderado: 17.00,
            unidade_medida: "RESMA",
            localizacao_fisica: "Prateleira C-01",
            armazem_id: 3,
            prazo_validade: null,
            status: ProductStatus.OK,
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
            preco_venda: 1.80,
            custo_medio_ponderado: 1.10,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta D-01",
            armazem_id: 3,
            prazo_validade: null,
            status: ProductStatus.OK,
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
            preco_venda: 1.80,
            custo_medio_ponderado: 1.10,
            unidade_medida: "UN",
            localizacao_fisica: "Gaveta D-02",
            armazem_id: 3,
            prazo_validade: null,
            status: ProductStatus.CRITICO,
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
            preco_venda: 5.00,
            custo_medio_ponderado: 3.20,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira L-01",
            armazem_id: 3,
            prazo_validade: "2025-12-31",
            status: ProductStatus.BAIXO,
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
            preco_venda: 18.00,
            custo_medio_ponderado: 11.50,
            unidade_medida: "L",
            localizacao_fisica: "Prateleira L-02",
            armazem_id: 3,
            prazo_validade: "2026-06-30",
            status: ProductStatus.CRITICO,
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
            preco_venda: 250.00,
            custo_medio_ponderado: 175.00,
            unidade_medida: "UN",
            localizacao_fisica: "Prateleira S-01",
            armazem_id: 1,
            prazo_validade: "2025-12-31",
            status: ProductStatus.OK,
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
            preco_venda: 60.00,
            custo_medio_ponderado: 42.00,
            unidade_medida: "CAIXA",
            localizacao_fisica: "Gaveta S-01",
            armazem_id: 1,
            prazo_validade: null,
            status: ProductStatus.CRITICO,
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
    // MOVIMENTAÇÕES (42+ itens)
    // ============================================
    movimentacoes: [
        // Entradas
        { id: 1, produto_id: 1, usuario_id: 1, tipo: MovementType.ENTRADA_COMPRA, quantidade: 100, preco_unitario: 0.48, documento_fiscal: "NF-12345", observacao: "Compra regular", local_origem: null, local_destino: null, data_hora: "2024-01-20T14:30:00Z" },
        { id: 2, produto_id: 2, usuario_id: 1, tipo: MovementType.ENTRADA_COMPRA, quantidade: 50, preco_unitario: 0.72, documento_fiscal: "NF-12346", observacao: "Reposição de estoque", local_origem: null, local_destino: null, data_hora: "2024-01-20T15:00:00Z" },
        { id: 3, produto_id: 5, usuario_id: 2, tipo: MovementType.ENTRADA_COMPRA, quantidade: 200, preco_unitario: 0.09, documento_fiscal: "NF-12347", observacao: "Compra em grande quantidade", local_origem: null, local_destino: null, data_hora: "2024-01-21T09:00:00Z" },
        { id: 4, produto_id: 6, usuario_id: 2, tipo: MovementType.ENTRADA_COMPRA, quantidade: 300, preco_unitario: 0.09, documento_fiscal: "NF-12348", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-21T09:30:00Z" },
        { id: 5, produto_id: 8, usuario_id: 1, tipo: MovementType.ENTRADA_COMPRA, quantidade: 150, preco_unitario: 0.32, documento_fiscal: "NF-12349", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-21T10:00:00Z" },
        { id: 6, produto_id: 10, usuario_id: 3, tipo: MovementType.ENTRADA_COMPRA, quantidade: 500, preco_unitario: 0.14, documento_fiscal: "NF-12350", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-22T11:00:00Z" },
        { id: 7, produto_id: 13, usuario_id: 1, tipo: MovementType.ENTRADA_COMPRA, quantidade: 20, preco_unitario: 8.00, documento_fiscal: "NF-12351", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-22T14:00:00Z" },
        { id: 8, produto_id: 16, usuario_id: 2, tipo: MovementType.ENTRADA_COMPRA, quantidade: 50, preco_unitario: 17.00, documento_fiscal: "NF-12352", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-23T08:00:00Z" },
        { id: 9, produto_id: 17, usuario_id: 3, tipo: MovementType.ENTRADA_COMPRA, quantidade: 200, preco_unitario: 1.10, documento_fiscal: "NF-12353", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-23T09:00:00Z" },
        { id: 10, produto_id: 21, usuario_id: 1, tipo: MovementType.ENTRADA_COMPRA, quantidade: 10, preco_unitario: 175.00, documento_fiscal: "NF-12354", observacao: "Compra de segurança", local_origem: null, local_destino: null, data_hora: "2024-01-23T16:00:00Z" },
        
        // Saídas
        { id: 11, produto_id: 1, usuario_id: 3, tipo: MovementType.SAIDA_VENDA, quantidade: 50, preco_unitario: null, documento_fiscal: null, observacao: "Venda para cliente", local_origem: null, local_destino: null, venda_id: 1, data_hora: "2024-01-21T10:30:00Z" },
        { id: 12, produto_id: 2, usuario_id: 3, tipo: MovementType.SAIDA_VENDA, quantidade: 45, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, venda_id: 1, data_hora: "2024-01-21T11:00:00Z" },
        { id: 13, produto_id: 5, usuario_id: 4, tipo: MovementType.SAIDA_VENDA, quantidade: 170, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, venda_id: 2, data_hora: "2024-01-22T13:00:00Z" },
        { id: 14, produto_id: 6, usuario_id: 4, tipo: MovementType.SAIDA_VENDA, quantidade: 50, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, venda_id: 2, data_hora: "2024-01-22T13:30:00Z" },
        { id: 15, produto_id: 10, usuario_id: 3, tipo: MovementType.SAIDA_VENDA, quantidade: 320, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, venda_id: 3, data_hora: "2024-01-23T10:00:00Z" },
        { id: 16, produto_id: 11, usuario_id: 3, tipo: MovementType.SAIDA_VENDA, quantidade: 20, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, venda_id: 3, data_hora: "2024-01-23T10:30:00Z" },
        { id: 17, produto_id: 13, usuario_id: 4, tipo: MovementType.SAIDA_VENDA, quantidade: 5, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, venda_id: 4, data_hora: "2024-01-23T15:00:00Z" },
        { id: 18, produto_id: 17, usuario_id: 3, tipo: MovementType.SAIDA_VENDA, quantidade: 20, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, venda_id: 5, data_hora: "2024-01-24T09:00:00Z" },
        { id: 19, produto_id: 18, usuario_id: 4, tipo: MovementType.SAIDA_VENDA, quantidade: 25, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, venda_id: 5, data_hora: "2024-01-24T09:30:00Z" },
        { id: 20, produto_id: 19, usuario_id: 3, tipo: MovementType.SAIDA_VENDA, quantidade: 6, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, venda_id: 6, data_hora: "2024-01-24T11:00:00Z" },
        
        // Perdas
        { id: 21, produto_id: 3, usuario_id: 1, tipo: MovementType.SAIDA_PERDA, quantidade: 5, preco_unitario: null, documento_fiscal: null, observacao: "Produto danificado", local_origem: null, local_destino: null, data_hora: "2024-01-22T11:00:00Z" },
        { id: 22, produto_id: 9, usuario_id: 2, tipo: MovementType.SAIDA_PERDA, quantidade: 15, preco_unitario: null, documento_fiscal: null, observacao: "Vencimento próximo", local_origem: null, local_destino: null, data_hora: "2024-01-23T12:00:00Z" },
        { id: 23, produto_id: 12, usuario_id: 1, tipo: MovementType.SAIDA_PERDA, quantidade: 5, preco_unitario: null, documento_fiscal: null, observacao: "Quebra durante transporte", local_origem: null, local_destino: null, data_hora: "2024-01-24T10:00:00Z" },
        
        // Ajustes
        { id: 24, produto_id: 4, usuario_id: 1, tipo: MovementType.AJUSTE_INVENTARIO, quantidade: 80, preco_unitario: null, documento_fiscal: null, observacao: "Ajuste após inventário físico - diferença encontrada", local_origem: null, local_destino: null, data_hora: "2024-01-18T15:00:00Z" },
        { id: 25, produto_id: 15, usuario_id: 2, tipo: MovementType.AJUSTE_INVENTARIO, quantidade: 12, preco_unitario: null, documento_fiscal: null, observacao: "Ajuste após inventário físico - correção de contagem", local_origem: null, local_destino: null, data_hora: "2024-01-21T10:00:00Z" },
        
        // Transferências
        { id: 26, produto_id: 1, usuario_id: 1, tipo: MovementType.TRANSFERENCIA, quantidade: 20, preco_unitario: null, documento_fiscal: null, observacao: "Transferência entre setores", local_origem: "Prateleira A-01", local_destino: "Prateleira A-05", data_hora: "2024-01-19T14:00:00Z" },
        { id: 27, produto_id: 6, usuario_id: 2, tipo: MovementType.TRANSFERENCIA, quantidade: 50, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: "Gaveta E-02", local_destino: "Gaveta E-09", data_hora: "2024-01-20T16:00:00Z" },
        
        // Mais movimentações recentes para dashboard
        { id: 28, produto_id: 7, usuario_id: 3, tipo: MovementType.ENTRADA_COMPRA, quantidade: 150, preco_unitario: 0.09, documento_fiscal: "NF-12355", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T08:00:00Z" },
        { id: 29, produto_id: 8, usuario_id: 4, tipo: MovementType.SAIDA_VENDA, quantidade: 30, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T10:00:00Z" },
        { id: 30, produto_id: 9, usuario_id: 1, tipo: MovementType.ENTRADA_COMPRA, quantidade: 50, preco_unitario: 0.52, documento_fiscal: "NF-12356", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T11:00:00Z" },
        { id: 31, produto_id: 11, usuario_id: 2, tipo: MovementType.SAIDA_VENDA, quantidade: 20, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T12:00:00Z" },
        { id: 32, produto_id: 14, usuario_id: 3, tipo: MovementType.SAIDA_VENDA, quantidade: 2, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T13:00:00Z" },
        { id: 33, produto_id: 20, usuario_id: 4, tipo: MovementType.SAIDA_VENDA, quantidade: 7, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T14:00:00Z" },
        { id: 34, produto_id: 22, usuario_id: 1, tipo: MovementType.SAIDA_VENDA, quantidade: 3, preco_unitario: null, documento_fiscal: null, observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-24T15:00:00Z" },
        { id: 35, produto_id: 1, usuario_id: 2, tipo: MovementType.ENTRADA_COMPRA, quantidade: 200, preco_unitario: 0.48, documento_fiscal: "NF-12357", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T08:00:00Z" },
        { id: 36, produto_id: 2, usuario_id: 3, tipo: MovementType.ENTRADA_COMPRA, quantidade: 100, preco_unitario: 0.72, documento_fiscal: "NF-12358", observacao: "Reposição urgente", local_origem: null, local_destino: null, data_hora: "2024-01-25T09:00:00Z" },
        { id: 37, produto_id: 5, usuario_id: 4, tipo: MovementType.ENTRADA_COMPRA, quantidade: 300, preco_unitario: 0.09, documento_fiscal: "NF-12359", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T10:00:00Z" },
        { id: 38, produto_id: 7, usuario_id: 1, tipo: MovementType.ENTRADA_COMPRA, quantidade: 200, preco_unitario: 0.09, documento_fiscal: "NF-12360", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T11:00:00Z" },
        { id: 39, produto_id: 12, usuario_id: 2, tipo: MovementType.ENTRADA_COMPRA, quantidade: 300, preco_unitario: 0.18, documento_fiscal: "NF-12361", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T12:00:00Z" },
        { id: 40, produto_id: 18, usuario_id: 3, tipo: MovementType.ENTRADA_COMPRA, quantidade: 150, preco_unitario: 1.10, documento_fiscal: "NF-12362", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T13:00:00Z" },
        { id: 41, produto_id: 20, usuario_id: 4, tipo: MovementType.ENTRADA_COMPRA, quantidade: 20, preco_unitario: 11.50, documento_fiscal: "NF-12363", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T14:00:00Z" },
        { id: 42, produto_id: 22, usuario_id: 1, tipo: MovementType.ENTRADA_COMPRA, quantidade: 10, preco_unitario: 42.00, documento_fiscal: "NF-12364", observacao: null, local_origem: null, local_destino: null, data_hora: "2024-01-25T15:00:00Z" }
    ],

    // ============================================
    // ALERTAS (13+ itens)
    // ============================================
    alertas: [
        {
            id: 1,
            produto_id: 2,
            data_alerta: "2024-01-25T08:00:00Z",
            quantidade_sugerida: 100,
            prioridade: AlertPriority.URGENTE,
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
            prioridade: AlertPriority.URGENTE,
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
            prioridade: AlertPriority.ALTA,
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
            prioridade: AlertPriority.URGENTE,
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
            prioridade: AlertPriority.URGENTE,
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
            prioridade: AlertPriority.URGENTE,
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
            prioridade: AlertPriority.URGENTE,
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
            prioridade: AlertPriority.URGENTE,
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
            prioridade: AlertPriority.ALTA,
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
            prioridade: AlertPriority.MEDIA,
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
            prioridade: AlertPriority.ALTA,
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
            prioridade: AlertPriority.MEDIA,
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
            prioridade: AlertPriority.BAIXA,
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
    getProdutoById(id: number): Product | undefined {
        return this.produtos.find(p => p.id === id);
    },

    /**
     * Get category by ID
     */
    getCategoriaById(id: number): Category | undefined {
        return this.categorias.find(c => c.id === id);
    },

    /**
     * Get supplier by ID
     */
    getFornecedorById(id: number): Supplier | undefined {
        return this.fornecedores.find(f => f.id === id);
    },

    /**
     * Get user by ID
     */
    getUsuarioById(id: number): User | undefined {
        return this.usuarios.find(u => u.id === id);
    },

    /**
     * Get alerts for a product
     */
    getAlertasByProdutoId(produtoId: number): Alert[] {
        return this.alertas.filter(a => a.produto_id === produtoId && !a.visualizado);
    },

    /**
     * Get movements for a product
     */
    getMovimentacoesByProdutoId(produtoId: number): Movement[] {
        return this.movimentacoes.filter(m => m.produto_id === produtoId)
            .sort((a, b) => new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime());
    },

    /**
     * Get suppliers for a product
     */
    getFornecedoresByProdutoId(produtoId: number): Array<Supplier & {
        preco_atual: number;
        prazo_entrega_dias: number;
        prioridade: number;
    }> {
        const associacoes = this.produto_fornecedor.filter(pf => pf.produto_id === produtoId);
        return associacoes.map(assoc => {
            const fornecedor = this.getFornecedorById(assoc.fornecedor_id);
            if (!fornecedor) {
                throw new Error(`Fornecedor ${assoc.fornecedor_id} não encontrado`);
            }
            return {
                ...fornecedor,
                preco_atual: assoc.preco_atual,
                prazo_entrega_dias: assoc.prazo_entrega_dias,
                prioridade: assoc.prioridade
            };
        });
    },

    /**
     * Get category path (hierarchical)
     */
    getCategoriaPath(categoriaId: number): string {
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
    calcularStatus(quantidadeAtual: number, quantidadeMinima: number): ProductStatus {
        if (quantidadeAtual === 0) return ProductStatus.CRITICO;
        const percentual = (quantidadeAtual / quantidadeMinima) * 100;
        if (percentual < 30) return ProductStatus.CRITICO;
        if (percentual < 70) return ProductStatus.BAIXO;
        return ProductStatus.OK;
    },

    /**
     * Get dashboard metrics
     */
    getDashboardMetrics(): DashboardMetrics {
        const produtosAtivos = this.produtos.filter(p => p.ativo);
        const produtosCriticos = produtosAtivos.filter(p => p.status === ProductStatus.CRITICO).length;
        const produtosBaixos = produtosAtivos.filter(p => p.status === ProductStatus.BAIXO).length;
        const produtosOk = produtosAtivos.filter(p => p.status === ProductStatus.OK).length;
        
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
    },

    /**
     * Get warehouse by ID
     */
    getArmazemById(id: number): Warehouse | undefined {
        return this.armazens.find(a => a.id === id);
    },

    /**
     * Get products by warehouse
     */
    getProdutosByArmazemId(armazemId: number): Product[] {
        return this.produtos.filter(p => p.armazem_id === armazemId && p.ativo);
    },

    /**
     * Get warehouse utilization
     */
    getArmazemUtilization(armazemId: number): WarehouseUtilization | null {
        const armazem = this.getArmazemById(armazemId);
        if (!armazem) return null;
        
        const produtos = this.getProdutosByArmazemId(armazemId);
        const quantidadeTotal = produtos.reduce((sum, p) => sum + p.quantidade_atual, 0);
        const valorTotal = produtos.reduce((sum, p) => sum + (p.quantidade_atual * p.custo_medio_ponderado), 0);
        
        return {
            armazem,
            quantidadeTotal,
            valorTotal,
            capacidadeUtilizada: armazem.capacidade_atual,
            capacidadeDisponivel: armazem.capacidade - armazem.capacidade_atual,
            percentualUtilizado: (armazem.capacidade_atual / armazem.capacidade) * 100
        };
    },

    /**
     * Get products expiring soon
     */
    getProdutosExpirando(dias: number = 30): Product[] {
        const hoje = new Date();
        const dataLimite = new Date();
        dataLimite.setDate(hoje.getDate() + dias);
        
        return this.produtos.filter(p => {
            if (!p.prazo_validade) return false;
            const dataValidade = new Date(p.prazo_validade);
            return dataValidade >= hoje && dataValidade <= dataLimite;
        }).sort((a, b) => {
            if (!a.prazo_validade || !b.prazo_validade) return 0;
            return new Date(a.prazo_validade).getTime() - new Date(b.prazo_validade).getTime();
        });
    },

    /**
     * Get supplier performance metrics
     */
    getSupplierPerformance(fornecedorId: number): SupplierPerformance | null {
        const fornecedor = this.getFornecedorById(fornecedorId);
        if (!fornecedor) return null;
        
        const associacoes = this.produto_fornecedor.filter(pf => pf.fornecedor_id === fornecedorId);
        const movimentacoes = this.movimentacoes.filter(m => {
            const produto = this.getProdutoById(m.produto_id);
            if (!produto) return false;
            return associacoes.some(a => a.produto_id === produto.id && m.tipo === MovementType.ENTRADA_COMPRA);
        });
        
        const totalCompras = movimentacoes.length;
        const valorTotal = movimentacoes.reduce((sum, m) => sum + (m.quantidade * (m.preco_unitario || 0)), 0);
        const prazoMedio = associacoes.length > 0 
            ? associacoes.reduce((sum, a) => sum + a.prazo_entrega_dias, 0) / associacoes.length 
            : 0;
        
        return {
            fornecedor,
            totalCompras,
            valorTotal,
            prazoMedioEntrega: prazoMedio,
            avaliacao: fornecedor.avaliacao,
            produtosFornecidos: associacoes.length
        };
    },

    getHighTurnoverProducts() {
        return [
            { name: 'Parafuso M6 x 30mm Aço Inox', value: '900%' },
            { name: 'Resistor 10k Ohm 1/4W', value: '566.67%' },
            { name: 'Luva de Nitrila Tamanho M', value: '150%' },
        ];
    },

    getImminentProjections() {
        return [
            { name: 'Parafuso M6 x 30mm Aço Inox', date: '14/12/2025', status: 'DECRESCENTE' },
            { name: 'Resistor 10k Ohm 1/4W', date: '16/12/2025', status: 'DECRESCENTE' },
            { name: 'Luva de Nitrila Tamanho M', date: '31/12/2025', status: 'ESTAVEL' },
        ];
    },

    getRecommendations() {
        return 'Foque em reposição e controle de qualidade dos produtos classe A.';
    }
};

