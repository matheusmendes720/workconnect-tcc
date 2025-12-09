/**
 * Advanced Charts & Analytics for Stock Management
 * Interactive data visualizations with business insights
 * Storytelling with data for intelligent decision-making
 */

import { MockDataEstoque } from './mock-data-estoque.js';

export class ChartsAnalytics {
    constructor() {
        this.charts = {};
        this.insights = {};
    }

    /**
     * Calculate business insights from data
     */
    calculateInsights(data) {
        const produtos = data.produtos || [];
        const movimentacoes = data.movimentacoes || [];
        const fornecedores = data.fornecedores || [];
        
        // ABC Analysis (Pareto Principle)
        const abcAnalysis = this.calculateABCAnalysis(produtos);
        
        // Turnover Rate (Rotatividade)
        const turnoverRates = this.calculateTurnoverRates(produtos, movimentacoes);
        
        // Supplier Performance
        const supplierPerformance = this.calculateSupplierPerformance(fornecedores, movimentacoes);
        
        // Category Value Distribution
        const categoryDistribution = this.calculateCategoryDistribution(produtos);
        
        // Time-based Trends
        const trends = this.calculateTrends(movimentacoes);
        
        // Stock Projection (30 days ahead)
        const projection = this.calculateStockProjection(produtos, movimentacoes);
        
        // Weekly Activity Heatmap
        const weeklyHeatmap = this.calculateWeeklyHeatmap(movimentacoes);
        
        // Critical Products Analysis
        const criticalAnalysis = this.analyzeCriticalProducts(produtos);
        
        return {
            abcAnalysis,
            turnoverRates,
            supplierPerformance,
            categoryDistribution,
            trends,
            projection,
            weeklyHeatmap,
            criticalAnalysis
        };
    }

    /**
     * ABC Analysis - Pareto Principle (80/20 rule)
     * Classifies products by value contribution
     */
    calculateABCAnalysis(produtos) {
        const produtosComValor = produtos
            .filter(p => p.ativo)
            .map(p => ({
                ...p,
                valorTotal: p.quantidade_atual * p.custo_medio_ponderado
            }))
            .sort((a, b) => b.valorTotal - a.valorTotal);
        
        const valorTotal = produtosComValor.reduce((sum, p) => sum + p.valorTotal, 0);
        
        let acumulado = 0;
        const abc = {
            A: [], // Top 20% - 80% of value
            B: [], // Next 30% - 15% of value
            C: []  // Remaining 50% - 5% of value
        };
        
        produtosComValor.forEach(produto => {
            acumulado += produto.valorTotal;
            const percentual = (acumulado / valorTotal) * 100;
            
            if (percentual <= 80) {
                abc.A.push(produto);
            } else if (percentual <= 95) {
                abc.B.push(produto);
            } else {
                abc.C.push(produto);
            }
        });
        
        return {
            categories: {
                A: {
                    produtos: abc.A.length,
                    valor: abc.A.reduce((sum, p) => sum + p.valorTotal, 0),
                    percentual: (abc.A.reduce((sum, p) => sum + p.valorTotal, 0) / valorTotal) * 100
                },
                B: {
                    produtos: abc.B.length,
                    valor: abc.B.reduce((sum, p) => sum + p.valorTotal, 0),
                    percentual: (abc.B.reduce((sum, p) => sum + p.valorTotal, 0) / valorTotal) * 100
                },
                C: {
                    produtos: abc.C.length,
                    valor: abc.C.reduce((sum, p) => sum + p.valorTotal, 0),
                    percentual: (abc.C.reduce((sum, p) => sum + p.valorTotal, 0) / valorTotal) * 100
                }
            },
            produtos: produtosComValor
        };
    }

    /**
     * Calculate product turnover rates
     */
    calculateTurnoverRates(produtos, movimentacoes) {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        
        const movimentacoesRecentes = movimentacoes.filter(
            m => new Date(m.data_hora) >= last30Days
        );
        
        return produtos
            .filter(p => p.ativo)
            .map(produto => {
                const movimentacoesProduto = movimentacoesRecentes.filter(
                    m => m.produto_id === produto.id
                );
                
                const saidas = movimentacoesProduto
                    .filter(m => m.tipo.includes('SAIDA'))
                    .reduce((sum, m) => sum + m.quantidade, 0);
                
                const estoqueMedio = produto.quantidade_atual;
                const turnoverRate = estoqueMedio > 0 ? (saidas / estoqueMedio) * 100 : 0;
                
                return {
                    ...produto,
                    turnoverRate: turnoverRate.toFixed(2),
                    saidas30d: saidas,
                    rotatividade: turnoverRate > 50 ? 'ALTA' : turnoverRate > 20 ? 'MÉDIA' : 'BAIXA'
                };
            })
            .sort((a, b) => parseFloat(b.turnoverRate) - parseFloat(a.turnoverRate));
    }

    /**
     * Calculate supplier performance metrics
     */
    calculateSupplierPerformance(fornecedores, movimentacoes) {
        const last90Days = new Date();
        last90Days.setDate(last90Days.getDate() - 90);
        
        const movimentacoesRecentes = movimentacoes.filter(
            m => new Date(m.data_hora) >= last90Days && m.tipo.includes('ENTRADA')
        );
        
        return fornecedores
            .filter(f => f.ativo)
            .map(fornecedor => {
                const movimentacoesFornecedor = movimentacoesRecentes.filter(
                    m => m.fornecedor_id === fornecedor.id
                );
                
                const totalCompras = movimentacoesFornecedor.length;
                const valorTotal = movimentacoesFornecedor.reduce(
                    (sum, m) => sum + (m.quantidade * (m.valor_unitario || 0)), 0
                );
                
                return {
                    ...fornecedor,
                    totalCompras,
                    valorTotal,
                    mediaCompras: totalCompras > 0 ? valorTotal / totalCompras : 0,
                    performance: totalCompras > 10 ? 'EXCELENTE' : totalCompras > 5 ? 'BOM' : 'REGULAR'
                };
            })
            .sort((a, b) => b.valorTotal - a.valorTotal);
    }

    /**
     * Calculate category value distribution
     */
    calculateCategoryDistribution(produtos) {
        const categorias = MockDataEstoque.categorias;
        
        return categorias
            .filter(c => c.ativo)
            .map(categoria => {
                const produtosCategoria = produtos.filter(
                    p => p.ativo && p.categoria_id === categoria.id
                );
                
                const valorTotal = produtosCategoria.reduce(
                    (sum, p) => sum + (p.quantidade_atual * p.custo_medio_ponderado), 0
                );
                
                const quantidadeTotal = produtosCategoria.reduce(
                    (sum, p) => sum + p.quantidade_atual, 0
                );
                
                return {
                    categoria: categoria.nome,
                    quantidade: produtosCategoria.length,
                    valorTotal,
                    quantidadeTotal,
                    valorMedio: produtosCategoria.length > 0 ? valorTotal / produtosCategoria.length : 0
                };
            })
            .filter(c => c.quantidade > 0)
            .sort((a, b) => b.valorTotal - a.valorTotal);
    }

    /**
     * Calculate time-based trends
     */
    calculateTrends(movimentacoes) {
        const last90Days = new Date();
        last90Days.setDate(last90Days.getDate() - 90);
        
        const movimentacoesRecentes = movimentacoes.filter(
            m => new Date(m.data_hora) >= last90Days
        );
        
        // Group by week
        const weeklyData = {};
        movimentacoesRecentes.forEach(m => {
            const date = new Date(m.data_hora);
            const week = this.getWeekNumber(date);
            const year = date.getFullYear();
            const key = `${year}-W${week}`;
            
            if (!weeklyData[key]) {
                weeklyData[key] = {
                    entradas: 0,
                    saidas: 0,
                    valorEntradas: 0,
                    valorSaidas: 0
                };
            }
            
            if (m.tipo.includes('ENTRADA')) {
                weeklyData[key].entradas += m.quantidade;
                weeklyData[key].valorEntradas += m.quantidade * (m.valor_unitario || 0);
            } else {
                weeklyData[key].saidas += m.quantidade;
                weeklyData[key].valorSaidas += m.quantidade * (m.valor_unitario || 0);
            }
        });
        
        return weeklyData;
    }

    /**
     * Calculate stock projection (30 days ahead)
     */
    calculateStockProjection(produtos, movimentacoes) {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        
        const movimentacoesRecentes = movimentacoes.filter(
            m => new Date(m.data_hora) >= last30Days
        );
        
        return produtos
            .filter(p => p.ativo)
            .map(produto => {
                const movimentacoesProduto = movimentacoesRecentes.filter(
                    m => m.produto_id === produto.id
                );
                
                const mediaDiariaSaidas = movimentacoesProduto
                    .filter(m => m.tipo.includes('SAIDA'))
                    .reduce((sum, m) => sum + m.quantidade, 0) / 30;
                
                const diasRestantes = mediaDiariaSaidas > 0 
                    ? Math.floor(produto.quantidade_atual / mediaDiariaSaidas)
                    : 999;
                
                const dataProjecao = new Date();
                dataProjecao.setDate(dataProjecao.getDate() + diasRestantes);
                
                return {
                    ...produto,
                    mediaDiariaSaidas: mediaDiariaSaidas.toFixed(2),
                    diasRestantes,
                    dataProjecao: diasRestantes < 999 ? dataProjecao.toLocaleDateString('pt-BR') : 'N/A',
                    risco: diasRestantes < 7 ? 'CRÍTICO' : diasRestantes < 15 ? 'ALTO' : diasRestantes < 30 ? 'MÉDIO' : 'BAIXO'
                };
            })
            .sort((a, b) => a.diasRestantes - b.diasRestantes);
    }

    /**
     * Calculate weekly activity heatmap
     */
    calculateWeeklyHeatmap(movimentacoes) {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        
        const movimentacoesRecentes = movimentacoes.filter(
            m => new Date(m.data_hora) >= last30Days
        );
        
        const heatmap = {
            domingo: 0, segunda: 0, terca: 0, quarta: 0, quinta: 0, sexta: 0, sabado: 0
        };
        
        movimentacoesRecentes.forEach(m => {
            const date = new Date(m.data_hora);
            const dayOfWeek = date.getDay();
            const dayNames = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
            heatmap[dayNames[dayOfWeek]] += m.quantidade;
        });
        
        return heatmap;
    }

    /**
     * Analyze critical products
     */
    analyzeCriticalProducts(produtos) {
        return produtos
            .filter(p => p.ativo && (p.status === 'CRITICO' || p.status === 'BAIXO'))
            .map(produto => {
                const percentualEstoque = (produto.quantidade_atual / produto.quantidade_maxima) * 100;
                const diasParaReposicao = produto.tempo_reposicao_dias || 7;
                
                return {
                    ...produto,
                    percentualEstoque: percentualEstoque.toFixed(1),
                    diasParaReposicao,
                    urgencia: percentualEstoque < 20 ? 'URGENTE' : 'ATENÇÃO'
                };
            })
            .sort((a, b) => parseFloat(a.percentualEstoque) - parseFloat(b.percentualEstoque));
    }

    /**
     * Helper: Get week number
     */
    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    /**
     * Generate business insights text
     */
    generateInsightsText(insights) {
        const texts = [];
        
        // ABC Analysis Insight
        const abc = insights.abcAnalysis;
        if (abc.categories.A.produtos > 0) {
            texts.push({
                type: 'info',
                icon: 'fa-star',
                title: 'Análise ABC',
                message: `${abc.categories.A.produtos} produtos classe A representam ${abc.categories.A.percentual.toFixed(1)}% do valor do estoque. Foque em gestão rigorosa destes itens.`
            });
        }
        
        // Critical Products Insight
        const critical = insights.criticalAnalysis;
        if (critical.length > 0) {
            const urgentes = critical.filter(p => p.urgencia === 'URGENTE').length;
            if (urgentes > 0) {
                texts.push({
                    type: 'warning',
                    icon: 'fa-exclamation-triangle',
                    title: 'Produtos Críticos',
                    message: `${urgentes} produtos precisam de reposição urgente. Ação imediata recomendada.`
                });
            }
        }
        
        // Turnover Insight
        const turnover = insights.turnoverRates;
        const altaRotatividade = turnover.filter(t => t.rotatividade === 'ALTA').length;
        if (altaRotatividade > 0) {
            texts.push({
                type: 'success',
                icon: 'fa-chart-line',
                title: 'Rotatividade',
                message: `${altaRotatividade} produtos com alta rotatividade. Considere aumentar estoque de segurança.`
            });
        }
        
        // Supplier Performance Insight
        const suppliers = insights.supplierPerformance;
        const topSupplier = suppliers[0];
        if (topSupplier && topSupplier.totalCompras > 0) {
            texts.push({
                type: 'info',
                icon: 'fa-truck',
                title: 'Fornecedor Principal',
                message: `${topSupplier.nome_fantasia} é seu principal fornecedor com R$ ${topSupplier.valorTotal.toFixed(2)} em compras nos últimos 90 dias.`
            });
        }
        
        return texts;
    }
}

