/**
 * Advanced Charts & Analytics for Stock Management
 * Interactive data visualizations with business insights
 * Storytelling with data for intelligent decision-making
 * TypeScript version with full type safety
 */

import { MockDataEstoque } from './mock-data';
import type {
  Product,
  Movement,
  Supplier,
  StockData,
  BusinessInsights,
  ABCAnalysis,
  ABCAnalysisItem,
  TurnoverRate,
  SupplierPerformanceData,
  CategoryDistribution,
  StockProjection,
  WeeklyActivityData,
  Alert,
} from '../../types/estoque';
import { AlertPriority } from '../../types/estoque';
import { MovementType } from '../../types/estoque';

export class ChartsAnalytics {
    private charts: Record<string, any>;
    private insights: Partial<BusinessInsights>;

    constructor() {
        this.charts = {};
        this.insights = {};
    }

    /**
     * Calculate business insights from data
     */
    calculateInsights(data: StockData): BusinessInsights {
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
    calculateABCAnalysis(produtos: Product[]): ABCAnalysis {
        const produtosComValor = produtos
            .filter(p => p.ativo)
            .map(p => ({
                ...p,
                valorTotal: p.quantidade_atual * p.custo_medio_ponderado
            }))
            .sort((a, b) => b.valorTotal - a.valorTotal);
        
        const valorTotal = produtosComValor.reduce((sum, p) => sum + p.valorTotal, 0);
        
        let acumulado = 0;
        const abc: {
            A: Array<Product & { valorTotal: number; percentual: number; classificacao: 'A' }>;
            B: Array<Product & { valorTotal: number; percentual: number; classificacao: 'B' }>;
            C: Array<Product & { valorTotal: number; percentual: number; classificacao: 'C' }>;
        } = {
            A: [], // Top 20% - 80% of value
            B: [], // Next 30% - 15% of value
            C: []  // Remaining 50% - 5% of value
        };
        
        produtosComValor.forEach(produto => {
            acumulado += produto.valorTotal;
            const percentual = (acumulado / valorTotal) * 100;
            
            const produtoComClassificacao = {
                ...produto,
                percentual,
                classificacao: percentual <= 80 ? 'A' as const : percentual <= 95 ? 'B' as const : 'C' as const
            };
            
            if (percentual <= 80) {
                abc.A.push(produtoComClassificacao as Product & { valorTotal: number; percentual: number; classificacao: 'A' });
            } else if (percentual <= 95) {
                abc.B.push(produtoComClassificacao as Product & { valorTotal: number; percentual: number; classificacao: 'B' });
            } else {
                abc.C.push(produtoComClassificacao as Product & { valorTotal: number; percentual: number; classificacao: 'C' });
            }
        });
        
        const items: ABCAnalysisItem[] = [
            ...abc.A,
            ...abc.B,
            ...abc.C
        ].map(p => ({
            produto: p,
            valorTotal: p.valorTotal,
            percentual: p.percentual,
            classificacao: p.classificacao
        }));
        
        return {
            items,
            totalValue: valorTotal,
            categoryA: abc.A.map(p => ({
                produto: p,
                valorTotal: p.valorTotal,
                percentual: p.percentual,
                classificacao: p.classificacao
            })),
            categoryB: abc.B.map(p => ({
                produto: p,
                valorTotal: p.valorTotal,
                percentual: p.percentual,
                classificacao: p.classificacao
            })),
            categoryC: abc.C.map(p => ({
                produto: p,
                valorTotal: p.valorTotal,
                percentual: p.percentual,
                classificacao: p.classificacao
            }))
        };
    }

    /**
     * Calculate product turnover rates
     */
    calculateTurnoverRates(produtos: Product[], movimentacoes: Movement[]): TurnoverRate[] {
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
                    .filter(m => m.tipo === MovementType.SAIDA_VENDA || m.tipo === MovementType.SAIDA_PERDA)
                    .reduce((sum, m) => sum + m.quantidade, 0);
                
                const estoqueMedio = produto.quantidade_atual;
                const turnoverRate = estoqueMedio > 0 ? (saidas / estoqueMedio) * 100 : 0;
                
                return {
                    produto,
                    taxaRotatividade: parseFloat(turnoverRate.toFixed(2)),
                    diasRotatividade: estoqueMedio > 0 ? Math.floor((estoqueMedio / saidas) * 30) : 0
                };
            })
            .sort((a, b) => b.taxaRotatividade - a.taxaRotatividade);
    }

    /**
     * Calculate supplier performance metrics
     */
    calculateSupplierPerformance(fornecedores: Supplier[], movimentacoes: Movement[]): SupplierPerformanceData[] {
        const last90Days = new Date();
        last90Days.setDate(last90Days.getDate() - 90);
        
        const movimentacoesRecentes = movimentacoes.filter(
            m => new Date(m.data_hora).getTime() >= last90Days.getTime() && m.tipo === MovementType.ENTRADA_COMPRA
        );
        
        // Get produto_fornecedor associations
        const produtoFornecedor = MockDataEstoque.produto_fornecedor || [];
        
        return fornecedores
            .filter(f => f.ativo)
            .map(fornecedor => {
                // Find products supplied by this supplier
                const produtosFornecedor = produtoFornecedor
                    .filter(pf => pf.fornecedor_id === fornecedor.id)
                    .map(pf => pf.produto_id);
                
                // Find movements for these products
                const movimentacoesFornecedor = movimentacoesRecentes.filter(
                    m => produtosFornecedor.includes(m.produto_id)
                );
                
                const totalCompras = movimentacoesFornecedor.length;
                const valorTotal = movimentacoesFornecedor.reduce(
                    (sum, m) => sum + (m.quantidade * (m.preco_unitario || 0)), 0
                );
                
                // Calculate average delivery time
                const prazos = produtoFornecedor
                    .filter(pf => pf.fornecedor_id === fornecedor.id)
                    .map(pf => pf.prazo_entrega_dias);
                const prazoMedio = prazos.length > 0 
                    ? prazos.reduce((sum, p) => sum + p, 0) / prazos.length 
                    : fornecedor.tempo_medio_entrega_dias || 7;
                
                return {
                    fornecedor,
                    totalCompras,
                    valorTotal,
                    prazoMedioEntrega: prazoMedio,
                    avaliacao: fornecedor.avaliacao
                };
            })
            .sort((a, b) => b.valorTotal - a.valorTotal);
    }

    /**
     * Calculate category value distribution
     */
    calculateCategoryDistribution(produtos: Product[]): CategoryDistribution[] {
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
                
                const valorTotalGeral = produtos.reduce((sum, p) => sum + (p.quantidade_atual * p.custo_medio_ponderado), 0);
                
                return {
                    categoria,
                    valorTotal,
                    quantidadeProdutos: produtosCategoria.length,
                    percentual: valorTotalGeral > 0 ? (valorTotal / valorTotalGeral) * 100 : 0
                };
            })
            .filter(c => c.quantidadeProdutos > 0)
            .sort((a, b) => b.valorTotal - a.valorTotal);
    }

    /**
     * Calculate time-based trends
     */
    calculateTrends(movimentacoes: Movement[]): { entradas: number[]; saidas: number[]; labels: string[] } {
        const last90Days = new Date();
        last90Days.setDate(last90Days.getDate() - 90);
        
        const movimentacoesRecentes = movimentacoes.filter(
            m => new Date(m.data_hora).getTime() >= last90Days.getTime()
        );
        
        // Group by week
        const weeklyData: Record<string, { entradas: number; saidas: number }> = {};
        movimentacoesRecentes.forEach(m => {
            const date = new Date(m.data_hora);
            const week = this.getWeekNumber(date);
            const year = date.getFullYear();
            const key = `${year}-W${week}`;
            
            if (!weeklyData[key]) {
                weeklyData[key] = {
                    entradas: 0,
                    saidas: 0
                };
            }
            
            if (m.tipo === MovementType.ENTRADA_COMPRA) {
                weeklyData[key].entradas += m.quantidade;
            } else if (m.tipo === MovementType.SAIDA_VENDA || m.tipo === MovementType.SAIDA_PERDA) {
                weeklyData[key].saidas += m.quantidade;
            }
        });
        
        const labels = Object.keys(weeklyData).sort();
        const entradas = labels.map(key => weeklyData[key].entradas);
        const saidas = labels.map(key => weeklyData[key].saidas);
        
        return { entradas, saidas, labels };
    }

    /**
     * Calculate stock projection (30 days ahead)
     */
    calculateStockProjection(produtos: Product[], movimentacoes: Movement[]): StockProjection[] {
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
                    .filter(m => m.tipo === MovementType.SAIDA_VENDA || m.tipo === MovementType.SAIDA_PERDA)
                    .reduce((sum, m) => sum + m.quantidade, 0) / 30;
                
                const diasRestantes = mediaDiariaSaidas > 0 
                    ? Math.floor(produto.quantidade_atual / mediaDiariaSaidas)
                    : 999;
                
                const dataProjecao = new Date();
                dataProjecao.setDate(dataProjecao.getDate() + diasRestantes);
                
                const tendencia: 'CRESCENTE' | 'DECRESCENTE' | 'ESTAVEL' = 
                    diasRestantes < 7 ? 'DECRESCENTE' : diasRestantes < 30 ? 'ESTAVEL' : 'CRESCENTE';
                
                return {
                    produto,
                    data: dataProjecao.toISOString(),
                    quantidadeProjetada: Math.max(0, produto.quantidade_atual - (mediaDiariaSaidas * 30)),
                    tendencia
                };
            })
            .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    }

    /**
     * Calculate weekly activity heatmap
     */
    calculateWeeklyHeatmap(movimentacoes: Movement[]): WeeklyActivityData[] {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        
        const movimentacoesRecentes = movimentacoes.filter(
            m => new Date(m.data_hora).getTime() >= last30Days.getTime()
        );
        
        const heatmapData: WeeklyActivityData[] = [];
        const dayNames = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
        
        movimentacoesRecentes.forEach(m => {
            const date = new Date(m.data_hora);
            const dayOfWeek = date.getDay();
            const hour = date.getHours();
            const day = dayNames[dayOfWeek];
            
            heatmapData.push({
                day,
                hour,
                count: m.quantidade,
                type: m.tipo
            });
        });
        
        return heatmapData;
    }

    /**
     * Analyze critical products
     */
    analyzeCriticalProducts(produtos: Product[]): { produtosCriticos: Product[]; alertasUrgentes: Alert[] } {
        const produtosCriticos = produtos
            .filter(p => p.ativo && (p.status === 'CRITICO' || p.status === 'BAIXO'))
            .sort((a, b) => {
                const percentualA = (a.quantidade_atual / a.quantidade_maxima) * 100;
                const percentualB = (b.quantidade_atual / b.quantidade_maxima) * 100;
                return percentualA - percentualB;
            });
        
        const alertasUrgentes: Alert[] = produtosCriticos
            .filter(p => p.status === 'CRITICO')
            .map((p, index) => ({
                id: index + 1,
                produto_id: p.id,
                data_alerta: new Date().toISOString(),
                quantidade_sugerida: p.quantidade_maxima - p.quantidade_atual,
                prioridade: AlertPriority.URGENTE,
                visualizado: false,
                data_visualizacao: null,
                data_resolucao: null,
                observacao: `Estoque crítico: ${p.quantidade_atual} unidades restantes`
            }));
        
        return {
            produtosCriticos,
            alertasUrgentes
        };
    }

    /**
     * Helper: Get week number
     */
    private getWeekNumber(date: Date): number {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    }

    /**
     * Generate business insights text
     */
    generateInsightsText(insights: BusinessInsights): Array<{ type: string; icon: string; title: string; message: string }> {
        const texts = [];
        
        // ABC Analysis Insight
        const abc = insights.abcAnalysis;
        if (abc.categoryA.length > 0) {
            const valorA = abc.categoryA.reduce((sum, p) => sum + p.valorTotal, 0);
            const percentualA = (valorA / abc.totalValue) * 100;
            texts.push({
                type: 'info',
                icon: 'fa-star',
                title: 'Análise ABC',
                message: `${abc.categoryA.length} produtos classe A representam ${percentualA.toFixed(1)}% do valor do estoque. Foque em gestão rigorosa destes itens.`
            });
        }
        
        // Critical Products Insight
        const critical = insights.criticalAnalysis.produtosCriticos;
        if (critical.length > 0) {
            texts.push({
                type: 'warning',
                icon: 'fa-exclamation-triangle',
                title: 'Produtos Críticos',
                message: `${critical.length} produtos precisam de reposição urgente. Ação imediata recomendada.`
            });
        }
        
        // Turnover Insight
        const turnover = insights.turnoverRates;
        const altaRotatividade = turnover.filter(t => t.taxaRotatividade > 50).length;
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
                message: `${topSupplier.fornecedor.nome_fantasia} é seu principal fornecedor com R$ ${topSupplier.valorTotal.toFixed(2)} em compras nos últimos 90 dias.`
            });
        }
        
        return texts;
    }
}


