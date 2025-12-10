/**
 * Stock Management System - Main JavaScript
 * Frontend-only implementation with mock data
 * NO BACKEND - All operations work with in-memory data
 */

console.log('Loading estoque-completo.js...');

import { MockDataEstoque } from './mock-data-estoque.js';
import { ChartsAnalytics } from './charts-analytics.js';

console.log('Imports loaded successfully');

// ============================================
// GLOBAL STATE & INITIALIZATION
// ============================================

let currentData = {
    produtos: [...MockDataEstoque.produtos],
    categorias: [...MockDataEstoque.categorias],
    fornecedores: [...MockDataEstoque.fornecedores],
    movimentacoes: [...MockDataEstoque.movimentacoes],
    alertas: [...MockDataEstoque.alertas],
    produto_fornecedor: [...MockDataEstoque.produto_fornecedor],
    armazens: [...MockDataEstoque.armazens]
};

let currentEditingId = null;
let statusChart = null;
let movementsChart = null;
let abcChart = null;
let categoryValueChart = null;
let turnoverChart = null;
let weeklyHeatmapChart = null;
let supplierChart = null;
let projectionChart = null;
let marginChart = null;
let costEvolutionChart = null;
let warehouseUtilizationChart = null;
let locationHeatmapChart = null;
let stockAgingChart = null;
let expirationTimelineChart = null;

// Initialize Analytics Engine
const analytics = new ChartsAnalytics();

// Initialize Toast Manager (from ux-enhancements.js)
let toast, loading;

// ============================================
// TAB NAVIGATION
// ============================================

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
            
            // Load tab content
            loadTabContent(targetTab);
        });
    });
}

function loadTabContent(tabName) {
    switch(tabName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'produtos':
            loadProducts();
            break;
        case 'categorias':
            loadCategories();
            break;
        case 'fornecedores':
            loadSuppliers();
            break;
        case 'movimentacoes':
            loadMovements();
            break;
        case 'alertas':
            loadAlerts();
            break;
        case 'armazens':
            loadWarehouses();
            break;
        case 'vencimentos':
            loadExpirations();
            break;
        case 'relatorios':
            loadReports();
            break;
    }
}

// ============================================
// DASHBOARD
// ============================================

function loadDashboard() {
    const metrics = MockDataEstoque.getDashboardMetrics();
    
    // Update metrics cards
    const metricsContainer = document.getElementById('dashboardMetrics');
    if (metricsContainer) {
        metricsContainer.innerHTML = `
            <div class="metric-card">
                <div class="metric-header">
                    <span class="metric-title">Total de Produtos</span>
                    <i class="fas fa-box metric-icon"></i>
                </div>
                <div class="metric-value">${metrics.totalProdutos}</div>
                <div class="metric-label">Produtos cadastrados</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-header">
                    <span class="metric-title">Itens em Estoque Baixo</span>
                    <i class="fas fa-exclamation-triangle metric-icon"></i>
                </div>
                <div class="metric-value">${metrics.produtosBaixos + metrics.produtosCriticos}</div>
                <div class="metric-label">${metrics.produtosCriticos} críticos, ${metrics.produtosBaixos} baixos</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-header">
                    <span class="metric-title">Valor Total do Estoque</span>
                    <i class="fas fa-dollar-sign metric-icon"></i>
                </div>
                <div class="metric-value">R$ ${formatCurrency(metrics.valorTotalEstoque)}</div>
                <div class="metric-label">Valor em estoque</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-header">
                    <span class="metric-title">Categorias Ativas</span>
                    <i class="fas fa-folder metric-icon"></i>
                </div>
                <div class="metric-value">${metrics.categoriasAtivas}</div>
                <div class="metric-label">Categorias diferentes</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-header">
                    <span class="metric-title">Alertas Pendentes</span>
                    <i class="fas fa-bell metric-icon"></i>
                </div>
                <div class="metric-value">${metrics.alertasPendentes}</div>
                <div class="metric-label">Requerem atenção</div>
            </div>
        `;
    }
    
    // Calculate and display business insights
    const insights = analytics.calculateInsights(currentData);
    loadBusinessInsights(insights);
    
    // Load all charts
    loadStatusChart();
    loadMovementsChart();
    loadABCChart(insights);
    loadCategoryValueChart(insights);
    loadTurnoverChart(insights);
    loadWeeklyHeatmapChart(insights);
    loadSupplierChart(insights);
    loadProjectionChart(insights);
    loadMarginChart(insights);
    loadCostEvolutionChart(insights);
    loadWarehouseUtilizationChart();
    loadLocationHeatmapChart();
    loadStockAgingChart(insights);
    loadExpirationTimelineChart();
    
    // Initialize date inputs for charts
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const ninetyDaysAgo = new Date(today);
    ninetyDaysAgo.setDate(today.getDate() - 90);
    
    const movementsDateFrom = document.getElementById('movementsDateFrom');
    const movementsDateTo = document.getElementById('movementsDateTo');
    if (movementsDateFrom && movementsDateTo) {
        movementsDateFrom.value = thirtyDaysAgo.toISOString().split('T')[0];
        movementsDateTo.value = today.toISOString().split('T')[0];
    }
    
    const costEvolutionDateFrom = document.getElementById('costEvolutionDateFrom');
    const costEvolutionDateTo = document.getElementById('costEvolutionDateTo');
    if (costEvolutionDateFrom && costEvolutionDateTo) {
        costEvolutionDateFrom.value = ninetyDaysAgo.toISOString().split('T')[0];
        costEvolutionDateTo.value = today.toISOString().split('T')[0];
    }
    
    // Load recent activities
    loadRecentActivities();
}

function loadStatusChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;
    
    const metrics = MockDataEstoque.getDashboardMetrics();
    
    if (statusChart) {
        statusChart.destroy();
    }
    
    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['OK', 'Baixo', 'Crítico'],
            datasets: [{
                data: [metrics.produtosOk, metrics.produtosBaixos, metrics.produtosCriticos],
                backgroundColor: [
                    'rgba(0, 230, 118, 0.8)',
                    'rgba(255, 213, 79, 0.8)',
                    'rgba(255, 82, 82, 0.8)'
                ],
                borderColor: [
                    '#00E676',
                    '#FFD54F',
                    '#FF5252'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#B0B0B0',
                        padding: 8,
                        font: {
                            family: 'Inter',
                            size: 10
                        }
                    }
                }
            }
        }
    });
}

function loadMovementsChart() {
    const ctx = document.getElementById('movementsChart');
    if (!ctx) return;
    
    // Generate last 14 days of data (including today)
    const today = new Date();
    const labels = [];
    const entradas = [];
    const saidas = [];
    
    // Generate realistic movement data for last 14 days
    for (let i = 13; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        labels.push(dateStr);
        
        // Generate realistic data with some variation
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const baseEntrada = isWeekend ? 20 : 50 + Math.random() * 80;
        const baseSaida = isWeekend ? 15 : 40 + Math.random() * 60;
        
        entradas.push(Math.round(baseEntrada));
        saidas.push(Math.round(baseSaida));
    }
    
    // Also use real data if available
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentMovements = currentData.movimentacoes
        .filter(m => new Date(m.data_hora) >= thirtyDaysAgo)
        .sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora));
    
    // Merge real data with generated data
    if (recentMovements.length > 0) {
        const movementsByDate = {};
        recentMovements.forEach(m => {
            const date = new Date(m.data_hora);
            const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            if (!movementsByDate[dateStr]) {
                movementsByDate[dateStr] = { entradas: 0, saidas: 0 };
            }
            if (m.tipo.includes('ENTRADA')) {
                movementsByDate[dateStr].entradas += m.quantidade;
            } else if (m.tipo.includes('SAIDA')) {
                movementsByDate[dateStr].saidas += m.quantidade;
            }
        });
        
        // Update with real data where available
        labels.forEach((label, index) => {
            if (movementsByDate[label]) {
                entradas[index] = movementsByDate[label].entradas;
                saidas[index] = movementsByDate[label].saidas;
            }
        });
    }
    
    if (movementsChart) {
        movementsChart.destroy();
    }
    
    const maxValue = Math.max(...entradas, ...saidas, 1);
    const yMax = Math.ceil(maxValue * 1.2);
    
    movementsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Entradas',
                    data: entradas,
                    borderColor: '#00E676',
                    backgroundColor: 'rgba(0, 230, 118, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#00E676',
                    pointBorderColor: '#0D0D0D',
                    pointBorderWidth: 2
                },
                {
                    label: 'Saídas',
                    data: saidas,
                    borderColor: '#FF5252',
                    backgroundColor: 'rgba(255, 82, 82, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#FF5252',
                    pointBorderColor: '#0D0D0D',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#B0B0B0',
                        padding: 12,
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(13, 13, 13, 0.95)',
                    titleColor: '#FFD54F',
                    bodyColor: '#FFFFFF',
                    borderColor: 'rgba(255, 213, 79, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} unidades`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#B0B0B0',
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                            size: 9
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: yMax,
                    ticks: {
                        color: '#B0B0B0',
                        font: {
                            size: 9
                        },
                        stepSize: Math.ceil(yMax / 5)
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                }
            }
        }
    });
}

// ============================================
// BUSINESS INSIGHTS
// ============================================

function loadBusinessInsights(insights) {
    const container = document.getElementById('businessInsights');
    if (!container) return;
    
    const insightTexts = analytics.generateInsightsText(insights);
    
    if (insightTexts.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = insightTexts.map(insight => `
        <div class="insight-card ${insight.type}">
            <div class="insight-header">
                <i class="fas ${insight.icon} insight-icon"></i>
                <span class="insight-title">${insight.title}</span>
            </div>
            <div class="insight-message">${insight.message}</div>
        </div>
    `).join('');
}

// ============================================
// ADVANCED CHARTS
// ============================================

function loadABCChart(insights) {
    const ctx = document.getElementById('abcChart');
    if (!ctx) return;
    
    if (abcChart) abcChart.destroy();
    
    const abc = insights.abcAnalysis;
    const categories = abc.categories;
    
    abcChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Classe A', 'Classe B', 'Classe C'],
            datasets: [{
                label: 'Valor (R$)',
                data: [
                    categories.A.valor,
                    categories.B.valor,
                    categories.C.valor
                ],
                backgroundColor: [
                    'rgba(255, 213, 79, 0.8)',
                    'rgba(255, 152, 0, 0.8)',
                    'rgba(156, 39, 176, 0.8)'
                ],
                borderColor: [
                    '#FFD54F',
                    '#FF9800',
                    '#9C27B0'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const percent = abc.categories[context.label.split(' ')[1]].percentual;
                            const produtos = abc.categories[context.label.split(' ')[1]].produtos;
                            return `R$ ${formatCurrency(value)} (${percent.toFixed(1)}%) - ${produtos} produtos`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#B0B0B0', font: { size: 10 } },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                y: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        callback: function(value) {
                            return 'R$ ' + formatCurrency(value);
                        }
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                }
            }
        }
    });
}

function loadCategoryValueChart(insights) {
    const ctx = document.getElementById('categoryValueChart');
    if (!ctx) return;
    
    if (categoryValueChart) categoryValueChart.destroy();
    
    const categories = insights.categoryDistribution.slice(0, 8);
    
    categoryValueChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories.map(c => c.categoria),
            datasets: [{
                data: categories.map(c => c.valorTotal),
                backgroundColor: [
                    'rgba(255, 213, 79, 0.8)',
                    'rgba(255, 152, 0, 0.8)',
                    'rgba(0, 230, 118, 0.8)',
                    'rgba(66, 165, 245, 0.8)',
                    'rgba(156, 39, 176, 0.8)',
                    'rgba(255, 82, 82, 0.8)',
                    'rgba(121, 85, 72, 0.8)',
                    'rgba(96, 125, 139, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#0D0D0D'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#B0B0B0',
                        padding: 8,
                        font: { size: 9 },
                        boxWidth: 12
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = categories.reduce((sum, c) => sum + c.valorTotal, 0);
                            const percent = (value / total * 100).toFixed(1);
                            return `${context.label}: R$ ${formatCurrency(value)} (${percent}%)`;
                        }
                    }
                }
            }
        }
    });
}

function loadTurnoverChart(insights) {
    const ctx = document.getElementById('turnoverChart');
    if (!ctx) return;
    
    if (turnoverChart) turnoverChart.destroy();
    
    let topTurnover = insights.turnoverRates.slice(0, 10);
    
    // If no data, generate sample data
    if (topTurnover.length === 0 || topTurnover.every(p => parseFloat(p.turnoverRate) === 0)) {
        topTurnover = currentData.produtos
            .filter(p => p.ativo)
            .slice(0, 10)
            .map((p, index) => ({
                ...p,
                turnoverRate: (30 + Math.random() * 70).toFixed(2),
                saidas30d: Math.round(10 + Math.random() * 50),
                rotatividade: index < 3 ? 'ALTA' : index < 6 ? 'MÉDIA' : 'BAIXA'
            }))
            .sort((a, b) => parseFloat(b.turnoverRate) - parseFloat(a.turnoverRate));
    }
    
    const maxValue = Math.max(...topTurnover.map(p => parseFloat(p.turnoverRate)), 1);
    
    turnoverChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topTurnover.map(p => p.nome.length > 25 ? p.nome.substring(0, 25) + '...' : p.nome),
            datasets: [{
                label: 'Taxa de Rotatividade (%)',
                data: topTurnover.map(p => parseFloat(p.turnoverRate)),
                backgroundColor: topTurnover.map(p => {
                    if (p.rotatividade === 'ALTA') return 'rgba(0, 230, 118, 0.8)';
                    if (p.rotatividade === 'MÉDIA') return 'rgba(255, 213, 79, 0.8)';
                    return 'rgba(255, 152, 0, 0.8)';
                }),
                borderColor: topTurnover.map(p => {
                    if (p.rotatividade === 'ALTA') return '#00E676';
                    if (p.rotatividade === 'MÉDIA') return '#FFD54F';
                    return '#FF9800';
                }),
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(13, 13, 13, 0.95)',
                    titleColor: '#FFD54F',
                    bodyColor: '#FFFFFF',
                    borderColor: 'rgba(255, 213, 79, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const produto = topTurnover[context.dataIndex];
                            return `Rotatividade: ${context.parsed.x.toFixed(1)}% | Saídas (30d): ${produto.saidas30d || 0}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: Math.ceil(maxValue * 1.1),
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        callback: function(value) {
                            return value.toFixed(0) + '%';
                        }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                y: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 }
                    },
                    grid: { display: false }
                }
            }
        }
    });
}

function loadWeeklyHeatmapChart(insights) {
    const ctx = document.getElementById('weeklyHeatmapChart');
    if (!ctx) return;
    
    if (weeklyHeatmapChart) weeklyHeatmapChart.destroy();
    
    const heatmap = insights.weeklyHeatmap;
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    let values = [
        heatmap.domingo,
        heatmap.segunda,
        heatmap.terca,
        heatmap.quarta,
        heatmap.quinta,
        heatmap.sexta,
        heatmap.sabado
    ];
    
    // Generate realistic data if all zeros
    if (values.every(v => v === 0)) {
        values = days.map((day, index) => {
            const isWeekend = index === 0 || index === 6;
            return Math.round(isWeekend ? 20 + Math.random() * 30 : 50 + Math.random() * 80);
        });
    }
    
    const maxValue = Math.max(...values, 1);
    
    weeklyHeatmapChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Movimentações',
                data: values,
                backgroundColor: values.map(v => {
                    const intensity = Math.min(v / maxValue, 1);
                    const alpha = 0.4 + (intensity * 0.6);
                    return `rgba(255, 213, 79, ${alpha})`;
                }),
                borderColor: '#FFD54F',
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(13, 13, 13, 0.95)',
                    titleColor: '#FFD54F',
                    bodyColor: '#FFFFFF',
                    borderColor: 'rgba(255, 213, 79, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
                            return `${dayNames[context.dataIndex]}: ${context.parsed.y} movimentações`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 10, weight: '600' }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: Math.ceil(maxValue * 1.2),
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        stepSize: Math.ceil(maxValue / 5)
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function loadSupplierChart(insights) {
    const ctx = document.getElementById('supplierChart');
    if (!ctx) return;
    
    if (supplierChart) supplierChart.destroy();
    
    let suppliers = insights.supplierPerformance.slice(0, 6);
    
    // Generate sample data if no real data
    if (suppliers.length === 0 || suppliers.every(s => s.valorTotal === 0)) {
        suppliers = currentData.fornecedores
            .filter(f => f.ativo)
            .slice(0, 6)
            .map((f, index) => ({
                ...f,
                valorTotal: (500 + Math.random() * 2000),
                totalCompras: Math.round(5 + Math.random() * 15)
            }))
            .sort((a, b) => b.valorTotal - a.valorTotal);
    }
    
    const maxValue = Math.max(...suppliers.map(s => s.valorTotal), 1);
    
    supplierChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: suppliers.map(s => s.nome_fantasia.length > 18 ? s.nome_fantasia.substring(0, 18) + '...' : s.nome_fantasia),
            datasets: [{
                label: 'Valor Total (R$)',
                data: suppliers.map(s => s.valorTotal),
                backgroundColor: suppliers.map((s, index) => {
                    const colors = [
                        'rgba(66, 165, 245, 0.8)',
                        'rgba(255, 213, 79, 0.8)',
                        'rgba(0, 230, 118, 0.8)',
                        'rgba(255, 152, 0, 0.8)',
                        'rgba(156, 39, 176, 0.8)',
                        'rgba(255, 82, 82, 0.8)'
                    ];
                    return colors[index % colors.length];
                }),
                borderColor: suppliers.map((s, index) => {
                    const colors = ['#42A5F5', '#FFD54F', '#00E676', '#FF9800', '#9C27B0', '#FF5252'];
                    return colors[index % colors.length];
                }),
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(13, 13, 13, 0.95)',
                    titleColor: '#FFD54F',
                    bodyColor: '#FFFFFF',
                    borderColor: 'rgba(255, 213, 79, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const supplier = suppliers[context.dataIndex];
                            return `R$ ${formatCurrency(context.parsed.y)} | ${supplier.totalCompras || 0} compras`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: Math.ceil(maxValue * 1.2),
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        callback: function(value) {
                            if (value >= 1000) {
                                return 'R$ ' + (value / 1000).toFixed(1) + 'k';
                            }
                            return 'R$ ' + formatCurrency(value);
                        }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function loadProjectionChart(insights) {
    const ctx = document.getElementById('projectionChart');
    if (!ctx) return;
    
    if (projectionChart) projectionChart.destroy();
    
    const critical = insights.projection
        .filter(p => p.risco === 'CRÍTICO' || p.risco === 'ALTO')
        .slice(0, 8);
    
    if (critical.length === 0) {
        ctx.parentElement.style.display = 'none';
        return;
    }
    
    ctx.parentElement.style.display = 'block';
    
    projectionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: critical.map(p => p.nome.length > 20 ? p.nome.substring(0, 20) + '...' : p.nome),
            datasets: [{
                label: 'Dias Restantes',
                data: critical.map(p => p.diasRestantes < 999 ? p.diasRestantes : 0),
                backgroundColor: critical.map(p => {
                    if (p.risco === 'CRÍTICO') return 'rgba(255, 82, 82, 0.8)';
                    return 'rgba(255, 213, 79, 0.8)';
                }),
                borderColor: critical.map(p => {
                    if (p.risco === 'CRÍTICO') return '#FF5252';
                    return '#FFD54F';
                }),
                borderWidth: 2
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const produto = critical[context.dataIndex];
                            return `${context.parsed.x} dias | Projeção: ${produto.dataProjecao}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        callback: function(value) {
                            return value + ' dias';
                        }
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                y: {
                    ticks: { color: '#B0B0B0', font: { size: 9 } },
                    grid: { display: false }
                }
            }
        }
    });
}

function loadMarginChart(insights) {
    const ctx = document.getElementById('marginChart');
    if (!ctx) return;
    
    if (marginChart) marginChart.destroy();
    
    // Calculate margins by category
    const categories = MockDataEstoque.categorias.filter(c => c.ativo);
    const marginData = categories.map(categoria => {
        const produtos = currentData.produtos.filter(p => p.ativo && p.categoria_id === categoria.id && p.preco_venda);
        if (produtos.length === 0) return null;
        
        const totalCusto = produtos.reduce((sum, p) => sum + (p.quantidade_atual * p.custo_medio_ponderado), 0);
        const totalVenda = produtos.reduce((sum, p) => sum + (p.quantidade_atual * (p.preco_venda || 0)), 0);
        const margem = totalVenda > 0 ? ((totalVenda - totalCusto) / totalVenda) * 100 : 0;
        
        return {
            categoria: categoria.nome,
            margem: margem.toFixed(1),
            valorCusto: totalCusto,
            valorVenda: totalVenda
        };
    }).filter(c => c !== null && c.valorVenda > 0).sort((a, b) => parseFloat(b.margem) - parseFloat(a.margem)).slice(0, 8);
    
    if (marginData.length === 0) {
        displayNoDataMessage(ctx.parentElement, 'Dados de margem não disponíveis. Adicione preços de venda aos produtos.');
        return;
    }
    
    marginChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: marginData.map(c => c.categoria.length > 20 ? c.categoria.substring(0, 20) + '...' : c.categoria),
            datasets: [{
                label: 'Margem de Lucro (%)',
                data: marginData.map(c => parseFloat(c.margem)),
                backgroundColor: marginData.map(c => {
                    const margem = parseFloat(c.margem);
                    if (margem >= 40) return 'rgba(0, 230, 118, 0.8)';
                    if (margem >= 25) return 'rgba(255, 213, 79, 0.8)';
                    if (margem >= 10) return 'rgba(255, 152, 0, 0.8)';
                    return 'rgba(255, 82, 82, 0.8)';
                }),
                borderColor: marginData.map(c => {
                    const margem = parseFloat(c.margem);
                    if (margem >= 40) return '#00E676';
                    if (margem >= 25) return '#FFD54F';
                    if (margem >= 10) return '#FF9800';
                    return '#FF5252';
                }),
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const data = marginData[context.dataIndex];
                            return `Margem: ${context.parsed.y.toFixed(1)}% | Venda: ${formatCurrency(data.valorVenda)} | Custo: ${formatCurrency(data.valorCusto)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        callback: function(value) {
                            return value.toFixed(0) + '%';
                        }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function loadCostEvolutionChart(insights) {
    const ctx = document.getElementById('costEvolutionChart');
    if (!ctx) return;
    
    if (costEvolutionChart) costEvolutionChart.destroy();
    
    // Get cost evolution from movements (last 90 days)
    const last90Days = new Date();
    last90Days.setDate(last90Days.getDate() - 90);
    
    const entradas = currentData.movimentacoes
        .filter(m => m.tipo.includes('ENTRADA') && new Date(m.data_hora) >= last90Days && m.preco_unitario)
        .sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora));
    
    // Group by week
    const weeklyCosts = {};
    entradas.forEach(m => {
        const date = new Date(m.data_hora);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toISOString().split('T')[0];
        
        if (!weeklyCosts[weekKey]) {
            weeklyCosts[weekKey] = { total: 0, count: 0 };
        }
        weeklyCosts[weekKey].total += m.quantidade * m.preco_unitario;
        weeklyCosts[weekKey].count += 1;
    });
    
    const weeks = Object.keys(weeklyCosts).sort().slice(-12); // Last 12 weeks
    const costs = weeks.map(w => weeklyCosts[w].total);
    const labels = weeks.map(w => {
        const date = new Date(w);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    });
    
    if (costs.length === 0 || costs.every(c => c === 0)) {
        // Generate sample data
        const today = new Date();
        labels.length = 0;
        costs.length = 0;
        for (let i = 11; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - (i * 7));
            labels.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
            costs.push(5000 + Math.random() * 10000);
        }
    }
    
    costEvolutionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Custo Total (R$)',
                data: costs,
                borderColor: '#FFD54F',
                backgroundColor: 'rgba(255, 213, 79, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#FFD54F',
                pointBorderColor: '#0D0D0D',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Custo: ${formatCurrency(context.parsed.y)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        callback: function(value) {
                            if (value >= 1000) {
                                return 'R$ ' + (value / 1000).toFixed(1) + 'k';
                            }
                            return 'R$ ' + Math.round(value);
                        }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function displayNoDataMessage(container, message = 'Nenhum dado disponível') {
    if (!container) return;
    container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--color-text-muted);">
            <i class="fas fa-chart-line" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
            <p style="font-size: 0.9rem;">${message}</p>
        </div>
    `;
}

function loadWarehouseUtilizationChart() {
    const ctx = document.getElementById('warehouseUtilizationChart');
    if (!ctx) return;
    
    if (warehouseUtilizationChart) warehouseUtilizationChart.destroy();
    
    const armazens = currentData.armazens.filter(a => a.ativo);
    const utilizationData = armazens.map(armazem => {
        const utilization = MockDataEstoque.getArmazemUtilization(armazem.id);
        return {
            nome: armazem.nome,
            percentual: utilization ? utilization.percentualUtilizado : 0,
            capacidade: armazem.capacidade,
            utilizada: armazem.capacidade_atual
        };
    });
    
    if (utilizationData.length === 0) {
        displayNoDataMessage(ctx.parentElement, 'Nenhum armazém cadastrado');
        return;
    }
    
    warehouseUtilizationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: utilizationData.map(a => a.nome),
            datasets: [{
                label: 'Utilização (%)',
                data: utilizationData.map(a => a.percentual),
                backgroundColor: utilizationData.map(a => {
                    if (a.percentual > 90) return 'rgba(255, 82, 82, 0.8)';
                    if (a.percentual > 70) return 'rgba(255, 213, 79, 0.8)';
                    return 'rgba(0, 230, 118, 0.8)';
                }),
                borderColor: utilizationData.map(a => {
                    if (a.percentual > 90) return '#FF5252';
                    if (a.percentual > 70) return '#FFD54F';
                    return '#00E676';
                }),
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const data = utilizationData[context.dataIndex];
                            return `Utilização: ${context.parsed.y.toFixed(1)}% | ${data.utilizada} / ${data.capacidade}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        callback: function(value) {
                            return value.toFixed(0) + '%';
                        }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function loadLocationHeatmapChart() {
    const ctx = document.getElementById('locationHeatmapChart');
    if (!ctx) return;
    
    if (locationHeatmapChart) locationHeatmapChart.destroy();
    
    // Group products by location prefix (e.g., "Prateleira A", "Gaveta E")
    const locationGroups = {};
    currentData.produtos.filter(p => p.ativo && p.localizacao_fisica).forEach(produto => {
        const location = produto.localizacao_fisica;
        const prefix = location.split('-')[0].trim(); // Get prefix like "Prateleira A" or "Gaveta E"
        
        if (!locationGroups[prefix]) {
            locationGroups[prefix] = { count: 0, value: 0 };
        }
        locationGroups[prefix].count += 1;
        locationGroups[prefix].value += produto.quantidade_atual * produto.custo_medio_ponderado;
    });
    
    const locations = Object.keys(locationGroups).sort();
    const counts = locations.map(loc => locationGroups[loc].count);
    const values = locations.map(loc => locationGroups[loc].value);
    
    if (locations.length === 0) {
        displayNoDataMessage(ctx.parentElement, 'Nenhuma localização definida nos produtos');
        return;
    }
    
    const maxValue = Math.max(...values, 1);
    
    locationHeatmapChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: locations,
            datasets: [{
                label: 'Valor Total (R$)',
                data: values,
                backgroundColor: values.map(v => {
                    const intensity = Math.min(v / maxValue, 1);
                    const alpha = 0.4 + (intensity * 0.6);
                    return `rgba(255, 213, 79, ${alpha})`;
                }),
                borderColor: '#FFD54F',
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            return `Valor: ${formatCurrency(context.parsed.y)} | Produtos: ${counts[index]}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: { display: false }
                },
                y: {
                    beginAtZero: true,
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        callback: function(value) {
                            if (value >= 1000) {
                                return 'R$ ' + (value / 1000).toFixed(1) + 'k';
                            }
                            return 'R$ ' + Math.round(value);
                        }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                }
            }
        }
    });
}

function loadStockAgingChart(insights) {
    const ctx = document.getElementById('stockAgingChart');
    if (!ctx) return;
    
    if (stockAgingChart) stockAgingChart.destroy();
    
    // Calculate stock aging (how long products have been in stock)
    const hoje = new Date();
    const agingData = currentData.produtos
        .filter(p => p.ativo)
        .map(produto => {
            // Get first entry movement
            const firstEntry = currentData.movimentacoes
                .filter(m => m.produto_id === produto.id && m.tipo.includes('ENTRADA'))
                .sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora))[0];
            
            if (!firstEntry) {
                return { ...produto, diasEmEstoque: 0 };
            }
            
            const dataEntrada = new Date(firstEntry.data_hora);
            const diasEmEstoque = Math.floor((hoje - dataEntrada) / (1000 * 60 * 60 * 24));
            
            return {
                ...produto,
                diasEmEstoque,
                categoria: MockDataEstoque.getCategoriaById(produto.categoria_id)?.nome || 'N/A'
            };
        })
        .filter(p => p.diasEmEstoque > 0)
        .sort((a, b) => b.diasEmEstoque - a.diasEmEstoque)
        .slice(0, 10);
    
    if (agingData.length === 0) {
        displayNoDataMessage(ctx.parentElement, 'Dados de envelhecimento não disponíveis');
        return;
    }
    
    stockAgingChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: agingData.map(p => p.nome.length > 25 ? p.nome.substring(0, 25) + '...' : p.nome),
            datasets: [{
                label: 'Dias em Estoque',
                data: agingData.map(p => p.diasEmEstoque),
                backgroundColor: agingData.map(p => {
                    if (p.diasEmEstoque > 180) return 'rgba(255, 82, 82, 0.8)';
                    if (p.diasEmEstoque > 90) return 'rgba(255, 152, 0, 0.8)';
                    return 'rgba(255, 213, 79, 0.8)';
                }),
                borderColor: agingData.map(p => {
                    if (p.diasEmEstoque > 180) return '#FF5252';
                    if (p.diasEmEstoque > 90) return '#FF9800';
                    return '#FFD54F';
                }),
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const produto = agingData[context.dataIndex];
                            return `${context.parsed.x} dias em estoque | ${produto.quantidade_atual} ${produto.unidade_medida}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        callback: function(value) {
                            return value + ' dias';
                        }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                y: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 }
                    },
                    grid: { display: false }
                }
            }
        }
    });
}

function loadExpirationTimelineChart() {
    const ctx = document.getElementById('expirationTimelineChart');
    if (!ctx) return;
    
    if (expirationTimelineChart) expirationTimelineChart.destroy();
    
    const produtosExpirando = MockDataEstoque.getProdutosExpirando(90);
    const hoje = new Date();
    
    // Group by weeks
    const weeklyExpirations = {};
    produtosExpirando.forEach(produto => {
        const dataValidade = new Date(produto.prazo_validade);
        const diasRestantes = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
        
        if (diasRestantes < 0 || diasRestantes > 90) return;
        
        const week = Math.floor(diasRestantes / 7);
        const weekKey = `${week * 7}-${(week + 1) * 7}`;
        
        if (!weeklyExpirations[weekKey]) {
            weeklyExpirations[weekKey] = { count: 0, quantidade: 0 };
        }
        weeklyExpirations[weekKey].count += 1;
        weeklyExpirations[weekKey].quantidade += produto.quantidade_atual;
    });
    
    const weeks = Object.keys(weeklyExpirations).sort((a, b) => {
        const aStart = parseInt(a.split('-')[0]);
        const bStart = parseInt(b.split('-')[0]);
        return aStart - bStart;
    });
    
    const labels = weeks.map(w => `Semana ${w}`);
    const counts = weeks.map(w => weeklyExpirations[w].count);
    const quantidades = weeks.map(w => weeklyExpirations[w].quantidade);
    
    if (weeks.length === 0) {
        displayNoDataMessage(ctx.parentElement, 'Nenhum produto vencendo nos próximos 90 dias');
        return;
    }
    
    expirationTimelineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Quantidade de Produtos',
                    data: counts,
                    borderColor: '#FF5252',
                    backgroundColor: 'rgba(255, 82, 82, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Quantidade Total',
                    data: quantidades,
                    borderColor: '#FF9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#B0B0B0',
                        font: { size: 10 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.datasetIndex === 0) {
                                return `Produtos: ${context.parsed.y}`;
                            }
                            return `Quantidade: ${context.parsed.y} unidades`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    beginAtZero: true,
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 }
                    },
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 }
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

function loadRecentActivities() {
    const tbody = document.getElementById('recentActivities');
    if (!tbody) return;
    
    const recent = currentData.movimentacoes
        .sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora))
        .slice(0, 10);
    
    tbody.innerHTML = recent.map(m => {
        const produto = MockDataEstoque.getProdutoById(m.produto_id);
        const usuario = MockDataEstoque.getUsuarioById(m.usuario_id);
        const tipoLabel = getMovementTypeLabel(m.tipo);
        const date = new Date(m.data_hora).toLocaleString('pt-BR');
        
        return `
            <tr>
                <td>${date}</td>
                <td>${produto?.nome || 'N/A'}</td>
                <td>${tipoLabel}</td>
                <td>${m.quantidade} ${produto?.unidade_medida || ''}</td>
                <td>${usuario?.nome || 'N/A'}</td>
            </tr>
        `;
    }).join('');
}

// ============================================
// PRODUCTS
// ============================================

function loadProducts() {
    renderProductsTable(currentData.produtos);
    populateCategoryFilter();
}

let selectedProducts = new Set();

function renderProductsTable(produtos) {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    
    if (produtos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty-state">Nenhum produto encontrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = produtos.map(produto => {
        const categoria = MockDataEstoque.getCategoriaById(produto.categoria_id);
        const statusClass = produto.status.toLowerCase();
        const statusLabel = {
            'ok': 'OK',
            'baixo': 'BAIXO',
            'critico': 'CRÍTICO'
        }[statusClass] || produto.status;
        const isSelected = selectedProducts.has(produto.id);
        
        return `
            <tr>
                <td>
                    <input type="checkbox" class="product-checkbox" value="${produto.id}" 
                           ${isSelected ? 'checked' : ''} 
                           onchange="window.estoqueApp.toggleProductSelection(${produto.id})">
                </td>
                <td><strong>${produto.codigo}</strong></td>
                <td>${produto.nome}</td>
                <td>${categoria?.nome || 'N/A'}</td>
                <td>${produto.quantidade_atual} ${produto.unidade_medida}</td>
                <td>${produto.quantidade_minima} ${produto.unidade_medida}</td>
                <td><span class="status-badge status-${statusClass}">${statusLabel}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="window.estoqueApp.viewProductDetails(${produto.id})" title="Ver Detalhes">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" onclick="window.estoqueApp.editProduct(${produto.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon danger" onclick="window.estoqueApp.deleteProduct(${produto.id})" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    updateBulkActionsBar();
}

function populateCategoryFilter() {
    const select = document.getElementById('categoryFilter');
    if (!select) return;
    
    const options = currentData.categorias
        .filter(c => c.ativo)
        .map(c => `<option value="${c.id}">${MockDataEstoque.getCategoriaPath(c.id)}</option>`)
        .join('');
    
    select.innerHTML = '<option value="">Todas as categorias</option>' + options;
    
    // Populate warehouse filter
    const warehouseSelect = document.getElementById('warehouseFilter');
    if (warehouseSelect) {
        const warehouseOptions = currentData.armazens
            .filter(a => a.ativo)
            .map(a => `<option value="${a.id}">${a.nome}</option>`)
            .join('');
        warehouseSelect.innerHTML = '<option value="">Todos os armazéns</option>' + warehouseOptions;
    }
}

function toggleAdvancedFilters() {
    const filters = document.getElementById('advancedFilters');
    if (filters) {
        filters.style.display = filters.style.display === 'none' ? 'block' : 'none';
    }
}

// ============================================
// ADVANCED SEARCH FUNCTIONALITY
// ============================================

// Search history and saved searches storage
let searchHistory = JSON.parse(localStorage.getItem('estoque_search_history') || '[]');
let savedSearches = JSON.parse(localStorage.getItem('estoque_saved_searches') || '[]');

// Full-text search function
function fullTextSearch(query, products) {
    if (!query) return products;
    
    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    const scores = new Map();
    
    products.forEach(product => {
        let score = 0;
        const searchableText = [
            product.codigo,
            product.nome,
            product.descricao || '',
            MockDataEstoque.getCategoriaById(product.categoria_id)?.nome || '',
            product.localizacao_fisica || ''
        ].join(' ').toLowerCase();
        
        searchTerms.forEach(term => {
            // Exact match in code (highest priority)
            if (product.codigo.toLowerCase() === term) {
                score += 100;
            } else if (product.codigo.toLowerCase().includes(term)) {
                score += 50;
            }
            
            // Exact match in name
            if (product.nome.toLowerCase() === term) {
                score += 80;
            } else if (product.nome.toLowerCase().includes(term)) {
                score += 40;
            }
            
            // Match in description
            if (product.descricao && product.descricao.toLowerCase().includes(term)) {
                score += 20;
            }
            
            // Match in category
            const categoria = MockDataEstoque.getCategoriaById(product.categoria_id);
            if (categoria && categoria.nome.toLowerCase().includes(term)) {
                score += 30;
            }
            
            // Match in location
            if (product.localizacao_fisica && product.localizacao_fisica.toLowerCase().includes(term)) {
                score += 15;
            }
            
            // Word boundary matches (more precise)
            const wordBoundaryRegex = new RegExp(`\\b${term}`, 'i');
            if (wordBoundaryRegex.test(searchableText)) {
                score += 10;
            }
        });
        
        if (score > 0) {
            scores.set(product.id, score);
        }
    });
    
    // Sort by score and return
    return products
        .filter(p => scores.has(p.id))
        .sort((a, b) => (scores.get(b.id) || 0) - (scores.get(a.id) || 0));
}

// Handle product search with autocomplete
let searchTimeout = null;
let suggestionsVisible = false;

function handleProductSearch(event) {
    const input = event.target;
    const query = input.value.trim();
    
    // Show/hide clear button
    const clearBtn = document.getElementById('clearSearchBtn');
    if (clearBtn) {
        clearBtn.style.display = query ? 'block' : 'none';
    }
    
    // Clear previous timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    // Show suggestions if there's text
    if (query.length > 0) {
        searchTimeout = setTimeout(() => {
            showAutocompleteSuggestions(query);
        }, 200);
    } else {
        hideSearchSuggestions();
    }
    
    // Perform search on Enter or after delay
    if (event.key === 'Enter') {
        performProductSearch(query);
    } else if (query.length >= 2) {
        searchTimeout = setTimeout(() => {
            filterProducts();
        }, 500);
    } else if (query.length === 0) {
        filterProducts();
    }
}

// Show autocomplete suggestions
function showAutocompleteSuggestions(query) {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (!suggestionsContainer) return;
    
    // Hide other panels
    hideSearchHistory();
    hideSavedSearches();
    
    // Perform full-text search
    const matches = fullTextSearch(query, currentData.produtos.filter(p => p.ativo));
    const topMatches = matches.slice(0, 8);
    
    if (topMatches.length === 0) {
        suggestionsContainer.innerHTML = `
            <div class="empty-suggestions">
                <i class="fas fa-search"></i> Nenhum produto encontrado
            </div>
        `;
    } else {
        suggestionsContainer.innerHTML = topMatches.map(product => {
            const categoria = MockDataEstoque.getCategoriaById(product.categoria_id);
            const statusClass = product.status.toLowerCase();
            return `
                <div class="suggestion-item" onclick="selectSuggestion('${product.codigo}')">
                    <div class="suggestion-info">
                        <div class="suggestion-name">${highlightMatch(product.nome, query)}</div>
                        <div class="suggestion-meta">
                            <span class="suggestion-code">${product.codigo}</span>
                            ${categoria ? ` • ${categoria.nome}` : ''}
                            ${product.quantidade_atual ? ` • ${product.quantidade_atual} ${product.unidade_medida}` : ''}
                        </div>
                    </div>
                    <span class="status-badge status-${statusClass}">${product.status}</span>
                </div>
            `;
        }).join('');
    }
    
    suggestionsContainer.style.display = 'block';
    suggestionsVisible = true;
}

// Highlight matching text
function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: rgba(255, 213, 79, 0.3); color: var(--color-primary);">$1</mark>');
}

// Select suggestion
function selectSuggestion(code) {
    const input = document.getElementById('productSearch');
    if (input) {
        input.value = code;
        performProductSearch(code);
        hideSearchSuggestions();
    }
}

// Hide suggestions
function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
    suggestionsVisible = false;
}

// Show search suggestions on focus
function showSearchSuggestions() {
    const input = document.getElementById('productSearch');
    if (input && input.value.trim().length > 0) {
        showAutocompleteSuggestions(input.value.trim());
    }
}

// Perform product search and save to history
function performProductSearch(query) {
    if (!query) {
        filterProducts();
        return;
    }
    
    // Add to search history
    addToSearchHistory(query);
    
    // Perform search
    filterProducts();
    hideSearchSuggestions();
}

// Add to search history
function addToSearchHistory(query) {
    if (!query || query.trim().length === 0) return;
    
    const trimmedQuery = query.trim();
    
    // Remove if already exists
    searchHistory = searchHistory.filter(h => h.query !== trimmedQuery);
    
    // Add to beginning
    searchHistory.unshift({
        query: trimmedQuery,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 20
    searchHistory = searchHistory.slice(0, 20);
    
    // Save to localStorage
    localStorage.setItem('estoque_search_history', JSON.stringify(searchHistory));
}

// Toggle search history
function toggleSearchHistory() {
    const historyContainer = document.getElementById('searchHistory');
    if (!historyContainer) return;
    
    if (historyContainer.style.display === 'none' || !historyContainer.style.display) {
        showSearchHistory();
    } else {
        hideSearchHistory();
    }
}

// Show search history
function showSearchHistory() {
    const historyContainer = document.getElementById('searchHistory');
    if (!historyContainer) return;
    
    // Hide other panels
    hideSearchSuggestions();
    hideSavedSearches();
    
    if (searchHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-suggestions">
                <i class="fas fa-history"></i> Nenhum histórico de busca
            </div>
        `;
    } else {
        historyContainer.innerHTML = `
            <div class="search-history-header">
                <h4><i class="fas fa-history"></i> Histórico de Buscas</h4>
                <button onclick="clearSearchHistory()" title="Limpar histórico">
                    <i class="fas fa-trash"></i> Limpar
                </button>
            </div>
            ${searchHistory.map(item => `
                <div class="history-item">
                    <span class="history-text" onclick="useSearchHistory('${item.query.replace(/'/g, "\\'")}')">
                        ${item.query}
                    </span>
                    <div class="history-actions">
                        <button class="history-action-btn" onclick="saveSearch('${item.query.replace(/'/g, "\\'")}')" title="Salvar busca">
                            <i class="fas fa-bookmark"></i>
                        </button>
                        <button class="history-action-btn" onclick="removeFromHistory('${item.query.replace(/'/g, "\\'")}')" title="Remover">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        `;
    }
    
    historyContainer.style.display = 'block';
}

// Hide search history
function hideSearchHistory() {
    const historyContainer = document.getElementById('searchHistory');
    if (historyContainer) {
        historyContainer.style.display = 'none';
    }
}

// Use search from history
function useSearchHistory(query) {
    const input = document.getElementById('productSearch');
    if (input) {
        input.value = query;
        performProductSearch(query);
        hideSearchHistory();
    }
}

// Remove from history
function removeFromHistory(query) {
    searchHistory = searchHistory.filter(h => h.query !== query);
    localStorage.setItem('estoque_search_history', JSON.stringify(searchHistory));
    showSearchHistory();
}

// Clear search history
function clearSearchHistory() {
    if (confirm('Tem certeza que deseja limpar o histórico de buscas?')) {
        searchHistory = [];
        localStorage.setItem('estoque_search_history', JSON.stringify(searchHistory));
        hideSearchHistory();
        toast.success('Histórico de buscas limpo');
    }
}

// Toggle saved searches
function toggleSavedSearches() {
    const savedContainer = document.getElementById('savedSearches');
    if (!savedContainer) return;
    
    if (savedContainer.style.display === 'none' || !savedContainer.style.display) {
        showSavedSearches();
    } else {
        hideSavedSearches();
    }
}

// Show saved searches
function showSavedSearches() {
    const savedContainer = document.getElementById('savedSearches');
    if (!savedContainer) return;
    
    // Hide other panels
    hideSearchSuggestions();
    hideSearchHistory();
    
    if (savedSearches.length === 0) {
        savedContainer.innerHTML = `
            <div class="empty-suggestions">
                <i class="fas fa-bookmark"></i> Nenhuma busca salva
            </div>
        `;
    } else {
        savedContainer.innerHTML = `
            <div class="saved-searches-header">
                <h4><i class="fas fa-bookmark"></i> Buscas Salvas</h4>
            </div>
            ${savedSearches.map((item, index) => `
                <div class="saved-search-item">
                    <span class="saved-search-text" onclick="useSavedSearch('${item.query.replace(/'/g, "\\'")}')">
                        ${item.name || item.query}
                    </span>
                    <div class="saved-search-actions">
                        <button class="saved-search-action-btn" onclick="editSavedSearch(${index})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="saved-search-action-btn" onclick="removeSavedSearch(${index})" title="Remover">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        `;
    }
    
    savedContainer.style.display = 'block';
}

// Hide saved searches
function hideSavedSearches() {
    const savedContainer = document.getElementById('savedSearches');
    if (savedContainer) {
        savedContainer.style.display = 'none';
    }
}

// Save current search
function saveSearch(query) {
    const name = prompt('Nome para esta busca salva:', query);
    if (!name) return;
    
    // Check if already exists
    if (savedSearches.some(s => s.query === query)) {
        toast.warning('Esta busca já está salva');
        return;
    }
    
    savedSearches.push({
        name: name.trim(),
        query: query,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('estoque_saved_searches', JSON.stringify(savedSearches));
    toast.success('Busca salva com sucesso');
    showSavedSearches();
}

// Use saved search
function useSavedSearch(query) {
    const input = document.getElementById('productSearch');
    if (input) {
        input.value = query;
        performProductSearch(query);
        hideSavedSearches();
    }
}

// Remove saved search
function removeSavedSearch(index) {
    if (confirm('Tem certeza que deseja remover esta busca salva?')) {
        savedSearches.splice(index, 1);
        localStorage.setItem('estoque_saved_searches', JSON.stringify(savedSearches));
        showSavedSearches();
        toast.success('Busca removida');
    }
}

// Edit saved search
function editSavedSearch(index) {
    const item = savedSearches[index];
    const newName = prompt('Novo nome para esta busca:', item.name);
    if (newName && newName.trim()) {
        savedSearches[index].name = newName.trim();
        localStorage.setItem('estoque_saved_searches', JSON.stringify(savedSearches));
        showSavedSearches();
        toast.success('Busca atualizada');
    }
}

// Clear product search
function clearProductSearch() {
    const input = document.getElementById('productSearch');
    if (input) {
        input.value = '';
        filterProducts();
        hideSearchSuggestions();
        const clearBtn = document.getElementById('clearSearchBtn');
        if (clearBtn) clearBtn.style.display = 'none';
    }
}

// Hide all search panels when clicking outside
document.addEventListener('click', (event) => {
    const searchWrapper = document.querySelector('.search-wrapper');
    if (searchWrapper && !searchWrapper.contains(event.target)) {
        hideSearchSuggestions();
        hideSearchHistory();
        hideSavedSearches();
    }
});

function filterProducts() {
    const search = document.getElementById('productSearch')?.value.trim() || '';
    const categoryId = document.getElementById('categoryFilter')?.value || '';
    const status = document.getElementById('statusFilter')?.value || '';
    const armazemId = document.getElementById('warehouseFilter')?.value || '';
    const locationSearch = document.getElementById('locationFilter')?.value.toLowerCase() || '';
    const minCost = parseFloat(document.getElementById('minCostFilter')?.value) || 0;
    const maxCost = parseFloat(document.getElementById('maxCostFilter')?.value) || Infinity;
    const hasExpiration = document.getElementById('expirationFilter')?.value || '';
    
    // Use full-text search if there's a search query
    let filtered = search ? fullTextSearch(search, currentData.produtos) : currentData.produtos;
    
    // Apply other filters
    filtered = filtered.filter(p => {
        const matchCategory = !categoryId || p.categoria_id == categoryId;
        const matchStatus = !status || p.status === status;
        const matchArmazem = !armazemId || p.armazem_id == armazemId;
        const matchLocation = !locationSearch || (p.localizacao_fisica && p.localizacao_fisica.toLowerCase().includes(locationSearch));
        const matchCost = p.custo_medio_ponderado >= minCost && p.custo_medio_ponderado <= maxCost;
        const matchExpiration = !hasExpiration || 
            (hasExpiration === 'with' && p.prazo_validade) ||
            (hasExpiration === 'without' && !p.prazo_validade);
        
        return matchCategory && matchStatus && matchArmazem && matchLocation && matchCost && matchExpiration;
    });
    
    renderProductsTable(filtered);
}

// Export functions
window.handleProductSearch = handleProductSearch;
window.selectSuggestion = selectSuggestion;
window.showSearchSuggestions = showSearchSuggestions;
window.hideSearchSuggestions = hideSearchSuggestions;
window.toggleSearchHistory = toggleSearchHistory;
window.toggleSavedSearches = toggleSavedSearches;
window.useSearchHistory = useSearchHistory;
window.useSavedSearch = useSavedSearch;
window.saveSearch = saveSearch;
window.removeFromHistory = removeFromHistory;
window.clearSearchHistory = clearSearchHistory;
window.removeSavedSearch = removeSavedSearch;
window.editSavedSearch = editSavedSearch;
window.clearProductSearch = clearProductSearch;

function openProductModal(productId = null) {
    currentEditingId = productId;
    const produto = productId ? currentData.produtos.find(p => p.id === productId) : null;
    
    const modal = createModal({
        title: productId ? 'Editar Produto' : 'Adicionar Produto',
        body: `
            <form id="productForm" onsubmit="window.estoqueApp.saveProduct(event)">
                <div class="form-group">
                    <label class="form-label">Código *</label>
                    <input type="text" class="form-input" id="prodCodigo" value="${produto?.codigo || ''}" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Nome *</label>
                    <input type="text" class="form-input" id="prodNome" value="${produto?.nome || ''}" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Descrição</label>
                    <textarea class="form-textarea" id="prodDescricao" rows="3">${produto?.descricao || ''}</textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Categoria *</label>
                    <select class="form-select" id="prodCategoria" required>
                        <option value="">Selecione...</option>
                        ${currentData.categorias.filter(c => c.ativo).map(c => 
                            `<option value="${c.id}" ${produto?.categoria_id == c.id ? 'selected' : ''}>${MockDataEstoque.getCategoriaPath(c.id)}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Estoque Mínimo *</label>
                        <input type="number" class="form-input" id="prodMin" value="${produto?.quantidade_minima || ''}" min="1" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Estoque Máximo *</label>
                        <input type="number" class="form-input" id="prodMax" value="${produto?.quantidade_maxima || ''}" min="1" required>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Preço de Aquisição *</label>
                        <input type="number" class="form-input" id="prodPreco" value="${produto?.preco_aquisicao || ''}" step="0.01" min="0" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Preço de Venda</label>
                        <input type="number" class="form-input" id="prodPrecoVenda" value="${produto?.preco_venda || ''}" step="0.01" min="0">
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Unidade de Medida</label>
                        <select class="form-select" id="prodUnidade">
                            <option value="UN" ${produto?.unidade_medida === 'UN' ? 'selected' : ''}>UN - Unidade</option>
                            <option value="KG" ${produto?.unidade_medida === 'KG' ? 'selected' : ''}>KG - Quilograma</option>
                            <option value="L" ${produto?.unidade_medida === 'L' ? 'selected' : ''}>L - Litro</option>
                            <option value="M" ${produto?.unidade_medida === 'M' ? 'selected' : ''}>M - Metro</option>
                            <option value="CX" ${produto?.unidade_medida === 'CX' ? 'selected' : ''}>CX - Caixa</option>
                            <option value="RESMA" ${produto?.unidade_medida === 'RESMA' ? 'selected' : ''}>RESMA - Resma</option>
                            <option value="CAIXA" ${produto?.unidade_medida === 'CAIXA' ? 'selected' : ''}>CAIXA - Caixa</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Armazém</label>
                        <select class="form-select" id="prodArmazem">
                            <option value="">Selecione...</option>
                            ${currentData.armazens.filter(a => a.ativo).map(a => `
                                <option value="${a.id}" ${produto?.armazem_id === a.id ? 'selected' : ''}>${a.nome}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Localização Física</label>
                        <input type="text" class="form-input" id="prodLocalizacao" value="${produto?.localizacao_fisica || ''}" placeholder="Ex: Prateleira A-01">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Prazo de Validade</label>
                        <input type="date" class="form-input" id="prodPrazoValidade" value="${produto?.prazo_validade ? produto.prazo_validade.split('T')[0] : ''}">
                    </div>
                </div>
            </form>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Cancelar</button>
            <button class="btn-gold" onclick="document.getElementById('productForm').requestSubmit()">
                <i class="fas fa-save"></i> Salvar
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function saveProduct(event) {
    event.preventDefault();
    
    const produto = {
        id: currentEditingId || (Math.max(...currentData.produtos.map(p => p.id)) + 1),
        codigo: document.getElementById('prodCodigo').value,
        nome: document.getElementById('prodNome').value,
        descricao: document.getElementById('prodDescricao').value,
        categoria_id: parseInt(document.getElementById('prodCategoria').value),
        quantidade_atual: currentEditingId ? currentData.produtos.find(p => p.id === currentEditingId)?.quantidade_atual || 0 : 0,
        quantidade_minima: parseInt(document.getElementById('prodMin').value),
        quantidade_maxima: parseInt(document.getElementById('prodMax').value),
        preco_aquisicao: parseFloat(document.getElementById('prodPreco').value),
        preco_venda: document.getElementById('prodPrecoVenda').value ? parseFloat(document.getElementById('prodPrecoVenda').value) : null,
        custo_medio_ponderado: currentEditingId ? currentData.produtos.find(p => p.id === currentEditingId)?.custo_medio_ponderado || parseFloat(document.getElementById('prodPreco').value) : parseFloat(document.getElementById('prodPreco').value),
        unidade_medida: document.getElementById('prodUnidade').value,
        localizacao_fisica: document.getElementById('prodLocalizacao').value,
        armazem_id: document.getElementById('prodArmazem').value ? parseInt(document.getElementById('prodArmazem').value) : null,
        prazo_validade: document.getElementById('prodPrazoValidade').value || null,
        status: 'OK',
        ativo: true,
        data_cadastro: currentEditingId ? currentData.produtos.find(p => p.id === currentEditingId)?.data_cadastro : new Date().toISOString(),
        data_atualizacao: new Date().toISOString()
    };
    
    // Validate
    if (produto.quantidade_maxima <= produto.quantidade_minima) {
        toast.error('Estoque máximo deve ser maior que o mínimo');
        return;
    }
    
    // Check unique code
    const existing = currentData.produtos.find(p => p.codigo === produto.codigo && p.id !== produto.id);
    if (existing) {
        toast.error('Código já existe');
        return;
    }
    
    // Calculate status
    produto.status = MockDataEstoque.calcularStatus(produto.quantidade_atual, produto.quantidade_minima);
    
    if (currentEditingId) {
        const index = currentData.produtos.findIndex(p => p.id === currentEditingId);
        currentData.produtos[index] = produto;
        toast.success('Produto atualizado com sucesso!');
    } else {
        currentData.produtos.push(produto);
        toast.success('Produto adicionado com sucesso!');
    }
    
    closeModal();
    loadProducts();
    if (document.getElementById('dashboard-tab')?.classList.contains('active')) {
        loadDashboard();
    }
}

function editProduct(id) {
    openProductModal(id);
}

function viewProductDetails(productId) {
    const produto = currentData.produtos.find(p => p.id === productId);
    if (!produto) {
        toast.error('Produto não encontrado');
        return;
    }
    
    const categoria = MockDataEstoque.getCategoriaById(produto.categoria_id);
    const armazem = produto.armazem_id ? MockDataEstoque.getArmazemById(produto.armazem_id) : null;
    const fornecedores = MockDataEstoque.getFornecedoresByProdutoId(productId);
    const movimentacoes = MockDataEstoque.getMovimentacoesByProdutoId(productId);
    const alertas = MockDataEstoque.getAlertasByProdutoId(productId);
    
    // Calculate margins
    const margem = produto.preco_venda && produto.custo_medio_ponderado 
        ? ((produto.preco_venda - produto.custo_medio_ponderado) / produto.preco_venda * 100).toFixed(1)
        : null;
    
    // Cost evolution (last 6 months)
    const last6Months = new Date();
    last6Months.setMonth(last6Months.getMonth() - 6);
    const costHistory = movimentacoes
        .filter(m => m.tipo.includes('ENTRADA') && m.preco_unitario && new Date(m.data_hora) >= last6Months)
        .map(m => ({
            data: new Date(m.data_hora),
            custo: m.preco_unitario,
            quantidade: m.quantidade
        }))
        .sort((a, b) => a.data - b.data);
    
    // Expiration info
    const expiracaoInfo = produto.prazo_validade ? (() => {
        const hoje = new Date();
        const dataValidade = new Date(produto.prazo_validade);
        const diasRestantes = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
        const status = diasRestantes < 0 ? 'Vencido' : diasRestantes <= 30 ? 'Urgente' : diasRestantes <= 60 ? 'Atenção' : 'Normal';
        const cor = diasRestantes < 0 ? '#FF5252' : diasRestantes <= 30 ? '#FF9800' : diasRestantes <= 60 ? '#FFD54F' : '#00E676';
        return { diasRestantes, status, cor, dataValidade };
    })() : null;
    
    const modal = createModal({
        title: `Detalhes - ${produto.nome}`,
        body: `
            <div style="display: grid; gap: 1.5rem;">
                <!-- Basic Info -->
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">Informações Básicas</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Código</div>
                            <div style="font-weight: 600; color: var(--color-text-primary);">${produto.codigo}</div>
                        </div>
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Categoria</div>
                            <div style="font-weight: 600; color: var(--color-text-primary);">${categoria?.nome || 'N/A'}</div>
                        </div>
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Quantidade Atual</div>
                            <div style="font-weight: 600; color: var(--color-text-primary); font-size: 1.2rem;">${produto.quantidade_atual} ${produto.unidade_medida}</div>
                        </div>
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Status</div>
                            <span class="status-badge status-${produto.status.toLowerCase()}">${produto.status}</span>
                        </div>
                        ${armazem ? `
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Armazém</div>
                            <div style="font-weight: 600; color: var(--color-text-primary);">${armazem.nome}</div>
                        </div>
                        ` : ''}
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Localização</div>
                            <div style="font-weight: 600; color: var(--color-text-primary);">${produto.localizacao_fisica || 'N/A'}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Pricing & Costs -->
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">Preços e Custos</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Preço de Aquisição</div>
                            <div style="font-weight: 700; color: var(--color-text-primary); font-size: 1.1rem;">${formatCurrency(produto.preco_aquisicao)}</div>
                        </div>
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Custo Médio Ponderado</div>
                            <div style="font-weight: 700; color: var(--color-text-primary); font-size: 1.1rem;">${formatCurrency(produto.custo_medio_ponderado)}</div>
                        </div>
                        ${produto.preco_venda ? `
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Preço de Venda</div>
                            <div style="font-weight: 700; color: var(--color-primary); font-size: 1.1rem;">${formatCurrency(produto.preco_venda)}</div>
                        </div>
                        ${margem ? `
                        <div style="grid-column: span 3;">
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Margem de Lucro</div>
                            <div style="font-weight: 700; color: ${parseFloat(margem) >= 30 ? '#00E676' : parseFloat(margem) >= 15 ? '#FFD54F' : '#FF9800'}; font-size: 1.2rem;">${margem}%</div>
                        </div>
                        ` : ''}
                        ` : '<div style="grid-column: span 2; color: var(--color-text-muted);">Preço de venda não definido</div>'}
                    </div>
                </div>
                
                ${expiracaoInfo ? `
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">Validade</h4>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Data de Vencimento</div>
                            <div style="font-weight: 600; color: var(--color-text-primary);">${expiracaoInfo.dataValidade.toLocaleDateString('pt-BR')}</div>
                        </div>
                        <div>
                            <div style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 0.25rem;">Dias Restantes</div>
                            <div style="font-weight: 700; color: ${expiracaoInfo.cor}; font-size: 1.2rem;">
                                ${expiracaoInfo.diasRestantes < 0 ? Math.abs(expiracaoInfo.diasRestantes) + ' dias atrás' : expiracaoInfo.diasRestantes + ' dias'}
                            </div>
                        </div>
                        <div>
                            <span class="status-badge" style="background: ${expiracaoInfo.cor}20; color: ${expiracaoInfo.cor};">
                                ${expiracaoInfo.status}
                            </span>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <!-- Suppliers -->
                ${fornecedores.length > 0 ? `
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">Fornecedores</h4>
                    <div style="display: grid; gap: 0.75rem;">
                        ${fornecedores.map(f => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: rgba(255, 255, 255, 0.03); border-radius: 8px;">
                                <div>
                                    <div style="font-weight: 600; color: var(--color-text-primary);">${f.nome_fantasia || f.razao_social}</div>
                                    <div style="font-size: 0.85rem; color: var(--color-text-secondary);">
                                        Prazo: ${f.prazo_entrega_dias} dias | 
                                        ${f.avaliacao ? `Avaliação: ${'★'.repeat(Math.floor(f.avaliacao))}${'☆'.repeat(5 - Math.floor(f.avaliacao))} ${f.avaliacao.toFixed(1)}` : ''}
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="font-size: 0.85rem; color: var(--color-text-secondary);">Preço Atual</div>
                                    <div style="font-weight: 700; color: var(--color-primary);">${formatCurrency(f.preco_atual || 0)}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Recent Movements -->
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">Movimentações Recentes</h4>
                    <div style="max-height: 300px; overflow-y: auto;">
                        ${movimentacoes.slice(0, 10).length > 0 ? `
                            <table style="width: 100%; font-size: 0.85rem;">
                                <thead>
                                    <tr style="border-bottom: 1px solid var(--glass-border);">
                                        <th style="padding: 0.5rem; text-align: left; color: var(--color-text-secondary);">Data</th>
                                        <th style="padding: 0.5rem; text-align: left; color: var(--color-text-secondary);">Tipo</th>
                                        <th style="padding: 0.5rem; text-align: right; color: var(--color-text-secondary);">Quantidade</th>
                                        <th style="padding: 0.5rem; text-align: right; color: var(--color-text-secondary);">Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${movimentacoes.slice(0, 10).map(m => {
                                        const tipoLabel = getMovementTypeLabel(m.tipo);
                                        const date = new Date(m.data_hora).toLocaleDateString('pt-BR');
                                        const valor = m.preco_unitario ? (m.quantidade * m.preco_unitario) : null;
                                        return `
                                            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                                <td style="padding: 0.5rem; color: var(--color-text-primary);">${date}</td>
                                                <td style="padding: 0.5rem; color: var(--color-text-primary);">${tipoLabel}</td>
                                                <td style="padding: 0.5rem; text-align: right; color: var(--color-text-primary);">${m.quantidade}</td>
                                                <td style="padding: 0.5rem; text-align: right; color: var(--color-text-primary);">${valor ? formatCurrency(valor) : 'N/A'}</td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        ` : '<div style="color: var(--color-text-muted); text-align: center; padding: 2rem;">Nenhuma movimentação registrada</div>'}
                    </div>
                </div>
                
                ${alertas.length > 0 ? `
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">Alertas Ativos</h4>
                    <div style="display: grid; gap: 0.75rem;">
                        ${alertas.map(a => `
                            <div style="padding: 0.75rem; background: rgba(255, 82, 82, 0.1); border-left: 3px solid #FF5252; border-radius: 8px;">
                                <div style="font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">
                                    ${a.prioridade} - Quantidade sugerida: ${a.quantidade_sugerida}
                                </div>
                                <div style="font-size: 0.85rem; color: var(--color-text-secondary);">
                                    ${new Date(a.data_alerta).toLocaleDateString('pt-BR')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Fechar</button>
            <button class="btn-gold" onclick="window.estoqueApp.editProduct(${productId}); window.estoqueApp.closeModal();">
                <i class="fas fa-edit"></i> Editar Produto
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function deleteProduct(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    
    const index = currentData.produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        currentData.produtos.splice(index, 1);
        toast.success('Produto excluído com sucesso!');
        loadProducts();
        if (document.getElementById('dashboard-tab')?.classList.contains('active')) {
            loadDashboard();
        }
    }
}

// ============================================
// CATEGORIES
// ============================================

function loadCategories() {
    renderCategoriesTree();
}

function renderCategoriesTree() {
    const container = document.getElementById('categoriesTree');
    if (!container) return;
    
    const rootCategories = currentData.categorias.filter(c => !c.categoria_pai_id && c.ativo);
    
    container.innerHTML = rootCategories.map(cat => renderCategoryNode(cat, 0)).join('');
}

function renderCategoryNode(categoria, level) {
    const children = currentData.categorias.filter(c => c.categoria_pai_id === categoria.id && c.ativo);
    const indent = level * 2;
    
    let html = `
        <div class="card" style="margin-left: ${indent}rem; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">${categoria.nome}</h4>
                    ${categoria.descricao ? `<p style="color: var(--color-text-secondary); font-size: 0.9rem;">${categoria.descricao}</p>` : ''}
                </div>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="window.estoqueApp.editCategory(${categoria.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="window.estoqueApp.addSubCategory(${categoria.id})" title="Adicionar Subcategoria">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="btn-icon danger" onclick="window.estoqueApp.deleteCategory(${categoria.id})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    children.forEach(child => {
        html += renderCategoryNode(child, level + 1);
    });
    
    return html;
}

function openCategoryModal(categoryId = null, parentId = null) {
    currentEditingId = categoryId;
    const categoria = categoryId ? currentData.categorias.find(c => c.id === categoryId) : null;
    
    const modal = createModal({
        title: categoryId ? 'Editar Categoria' : (parentId ? 'Adicionar Subcategoria' : 'Adicionar Categoria'),
        body: `
            <form id="categoryForm" onsubmit="window.estoqueApp.saveCategory(event)">
                <div class="form-group">
                    <label class="form-label">Nome *</label>
                    <input type="text" class="form-input" id="catNome" value="${categoria?.nome || ''}" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Descrição</label>
                    <textarea class="form-textarea" id="catDescricao" rows="3">${categoria?.descricao || ''}</textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Categoria Pai</label>
                    <select class="form-select" id="catPai">
                        <option value="">Nenhuma (Categoria Raiz)</option>
                        ${currentData.categorias
                            .filter(c => c.ativo && c.id !== categoryId)
                            .map(c => `<option value="${c.id}" ${(categoria?.categoria_pai_id == c.id || parentId == c.id) ? 'selected' : ''}>${MockDataEstoque.getCategoriaPath(c.id)}</option>`)
                            .join('')}
                    </select>
                </div>
            </form>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Cancelar</button>
            <button class="btn-gold" onclick="document.getElementById('categoryForm').requestSubmit()">
                <i class="fas fa-save"></i> Salvar
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function saveCategory(event) {
    event.preventDefault();
    
    const categoria = {
        id: currentEditingId || (Math.max(...currentData.categorias.map(c => c.id)) + 1),
        nome: document.getElementById('catNome').value,
        descricao: document.getElementById('catDescricao').value,
        categoria_pai_id: document.getElementById('catPai').value ? parseInt(document.getElementById('catPai').value) : null,
        ativo: true,
        data_criacao: currentEditingId ? currentData.categorias.find(c => c.id === currentEditingId)?.data_criacao : new Date().toISOString()
    };
    
    if (currentEditingId) {
        const index = currentData.categorias.findIndex(c => c.id === currentEditingId);
        currentData.categorias[index] = categoria;
        toast.success('Categoria atualizada com sucesso!');
    } else {
        currentData.categorias.push(categoria);
        toast.success('Categoria adicionada com sucesso!');
    }
    
    closeModal();
    loadCategories();
}

function editCategory(id) {
    openCategoryModal(id);
}

function addSubCategory(parentId) {
    openCategoryModal(null, parentId);
}

function deleteCategory(id) {
    // Check if category has products
    const hasProducts = currentData.produtos.some(p => p.categoria_id === id);
    if (hasProducts) {
        toast.error('Não é possível excluir categoria com produtos associados');
        return;
    }
    
    // Check if category has children
    const hasChildren = currentData.categorias.some(c => c.categoria_pai_id === id);
    if (hasChildren) {
        toast.error('Não é possível excluir categoria com subcategorias');
        return;
    }
    
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;
    
    const index = currentData.categorias.findIndex(c => c.id === id);
    if (index !== -1) {
        currentData.categorias.splice(index, 1);
        toast.success('Categoria excluída com sucesso!');
        loadCategories();
    }
}

// ============================================
// SUPPLIERS
// ============================================

function loadSuppliers() {
    renderSuppliersTable(currentData.fornecedores);
}

function renderSuppliersTable(fornecedores) {
    const tbody = document.getElementById('suppliersTableBody');
    if (!tbody) return;
    
    if (fornecedores.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty-state">Nenhum fornecedor encontrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = fornecedores.map(fornecedor => {
        const produtosCount = currentData.produto_fornecedor.filter(pf => pf.fornecedor_id === fornecedor.id).length;
        const performance = MockDataEstoque.getSupplierPerformance(fornecedor.id);
        const avaliacao = fornecedor.avaliacao || 0;
        const stars = '★'.repeat(Math.floor(avaliacao)) + '☆'.repeat(5 - Math.floor(avaliacao));
        const avaliacaoColor = avaliacao >= 4.5 ? '#00E676' : avaliacao >= 4.0 ? '#FFD54F' : avaliacao >= 3.5 ? '#FF9800' : '#FF5252';
        
        return `
            <tr>
                <td>
                    <strong>${fornecedor.razao_social}</strong><br>
                    <small style="color: var(--color-text-muted);">${fornecedor.nome_fantasia || ''}</small>
                </td>
                <td>${fornecedor.cnpj}</td>
                <td>${fornecedor.telefone || 'N/A'}</td>
                <td>${fornecedor.email || 'N/A'}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="color: ${avaliacaoColor}; font-size: 1.1rem;">${stars}</span>
                        <span style="color: var(--color-text-secondary); font-size: 0.85rem;">${avaliacao.toFixed(1)}</span>
                    </div>
                </td>
                <td>
                    ${performance ? `
                        <div style="font-size: 0.85rem;">
                            <div>${performance.totalCompras} compras</div>
                            <div style="color: var(--color-text-muted);">${formatCurrency(performance.valorTotal || 0)}</div>
                        </div>
                    ` : '<span style="color: var(--color-text-muted);">N/A</span>'}
                </td>
                <td>
                    <div style="font-size: 0.85rem;">
                        <div>${produtosCount} produto(s)</div>
                        <div style="color: var(--color-text-muted);">${performance?.prazoMedioEntrega || fornecedor.tempo_medio_entrega_dias || 0} dias</div>
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="window.estoqueApp.viewSupplierPerformance(${fornecedor.id})" title="Ver Performance">
                            <i class="fas fa-chart-line"></i>
                        </button>
                        <button class="btn-icon" onclick="window.estoqueApp.editSupplier(${fornecedor.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon danger" onclick="window.estoqueApp.deleteSupplier(${fornecedor.id})" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filterSuppliers() {
    const search = document.getElementById('supplierSearch')?.value.toLowerCase() || '';
    
    const filtered = currentData.fornecedores.filter(f => {
        return !search || 
            f.razao_social.toLowerCase().includes(search) ||
            f.nome_fantasia?.toLowerCase().includes(search) ||
            f.cnpj.includes(search);
    });
    
    renderSuppliersTable(filtered);
}

function openSupplierModal(supplierId = null) {
    currentEditingId = supplierId;
    const fornecedor = supplierId ? currentData.fornecedores.find(f => f.id === supplierId) : null;
    
    const modal = createModal({
        title: supplierId ? 'Editar Fornecedor' : 'Adicionar Fornecedor',
        body: `
            <form id="supplierForm" onsubmit="window.estoqueApp.saveSupplier(event)">
                <div class="form-group">
                    <label class="form-label">Razão Social *</label>
                    <input type="text" class="form-input" id="fornRazaoSocial" value="${fornecedor?.razao_social || ''}" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Nome Fantasia</label>
                    <input type="text" class="form-input" id="fornNomeFantasia" value="${fornecedor?.nome_fantasia || ''}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">CNPJ *</label>
                    <input type="text" class="form-input" id="fornCNPJ" value="${fornecedor?.cnpj || ''}" 
                           pattern="\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}" 
                           placeholder="00.000.000/0000-00" required>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Telefone</label>
                        <input type="text" class="form-input" id="fornTelefone" value="${fornecedor?.telefone || ''}" 
                               placeholder="(11) 98765-4321">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" id="fornEmail" value="${fornecedor?.email || ''}">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Endereço</label>
                    <textarea class="form-textarea" id="fornEndereco" rows="2">${fornecedor?.endereco || ''}</textarea>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Tempo Médio de Entrega (dias)</label>
                        <input type="number" class="form-input" id="fornTempoEntrega" value="${fornecedor?.tempo_medio_entrega_dias || 7}" min="1">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Condições de Pagamento</label>
                    <textarea class="form-textarea" id="fornCondicoes" rows="2">${fornecedor?.condicoes_pagamento || ''}</textarea>
                </div>
            </form>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Cancelar</button>
            <button class="btn-gold" onclick="document.getElementById('supplierForm').requestSubmit()">
                <i class="fas fa-save"></i> Salvar
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function saveSupplier(event) {
    event.preventDefault();
    
    const fornecedor = {
        id: currentEditingId || (Math.max(...currentData.fornecedores.map(f => f.id)) + 1),
        razao_social: document.getElementById('fornRazaoSocial').value,
        nome_fantasia: document.getElementById('fornNomeFantasia').value || null,
        cnpj: document.getElementById('fornCNPJ').value,
        telefone: document.getElementById('fornTelefone').value || null,
        email: document.getElementById('fornEmail').value || null,
        endereco: document.getElementById('fornEndereco').value || null,
        tempo_medio_entrega_dias: parseInt(document.getElementById('fornTempoEntrega').value) || 7,
        condicoes_pagamento: document.getElementById('fornCondicoes').value || null,
        ativo: true,
        data_cadastro: currentEditingId ? currentData.fornecedores.find(f => f.id === currentEditingId)?.data_cadastro : new Date().toISOString()
    };
    
    // Check unique CNPJ
    const existing = currentData.fornecedores.find(f => f.cnpj === fornecedor.cnpj && f.id !== fornecedor.id);
    if (existing) {
        toast.error('CNPJ já cadastrado');
        return;
    }
    
    if (currentEditingId) {
        const index = currentData.fornecedores.findIndex(f => f.id === currentEditingId);
        currentData.fornecedores[index] = fornecedor;
        toast.success('Fornecedor atualizado com sucesso!');
    } else {
        currentData.fornecedores.push(fornecedor);
        toast.success('Fornecedor adicionado com sucesso!');
    }
    
    closeModal();
    loadSuppliers();
}

function editSupplier(id) {
    openSupplierModal(id);
}

function deleteSupplier(id) {
    // Check if supplier has products
    const hasProducts = currentData.produto_fornecedor.some(pf => pf.fornecedor_id === id);
    if (hasProducts) {
        toast.error('Não é possível excluir fornecedor com produtos associados');
        return;
    }
    
    if (!confirm('Tem certeza que deseja excluir este fornecedor?')) return;
    
    const index = currentData.fornecedores.findIndex(f => f.id === id);
    if (index !== -1) {
        currentData.fornecedores.splice(index, 1);
        toast.success('Fornecedor excluído com sucesso!');
        loadSuppliers();
    }
}

function viewSupplierPerformance(fornecedorId) {
    const fornecedor = MockDataEstoque.getFornecedorById(fornecedorId);
    const performance = MockDataEstoque.getSupplierPerformance(fornecedorId);
    
    if (!fornecedor) {
        toast.error('Fornecedor não encontrado');
        return;
    }
    
    const avaliacao = fornecedor.avaliacao || 0;
    const stars = '★'.repeat(Math.floor(avaliacao)) + '☆'.repeat(5 - Math.floor(avaliacao));
    
    const modal = createModal({
        title: `Performance - ${fornecedor.nome_fantasia || fornecedor.razao_social}`,
        body: `
            <div style="display: grid; gap: 1.5rem;">
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Avaliação</h4>
                    <div style="font-size: 2rem; color: ${avaliacao >= 4.5 ? '#00E676' : avaliacao >= 4.0 ? '#FFD54F' : '#FF9800'};">
                        ${stars}
                    </div>
                    <div style="color: var(--color-text-secondary); margin-top: 0.5rem;">
                        ${avaliacao.toFixed(1)} / 5.0
                    </div>
                </div>
                
                ${performance ? `
                    <div>
                        <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Métricas de Compra</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <div style="color: var(--color-text-secondary); font-size: 0.85rem;">Total de Compras</div>
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">${performance.totalCompras}</div>
                            </div>
                            <div>
                                <div style="color: var(--color-text-secondary); font-size: 0.85rem;">Valor Total</div>
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">${formatCurrency(performance.valorTotal || 0)}</div>
                            </div>
                            <div>
                                <div style="color: var(--color-text-secondary); font-size: 0.85rem;">Prazo Médio</div>
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">${performance.prazoMedioEntrega || 0} dias</div>
                            </div>
                            <div>
                                <div style="color: var(--color-text-secondary); font-size: 0.85rem;">Produtos Fornecidos</div>
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">${performance.produtosFornecidos || 0}</div>
                            </div>
                        </div>
                    </div>
                ` : '<div style="color: var(--color-text-muted);">Nenhuma métrica disponível</div>'}
                
                <div>
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Informações de Contato</h4>
                    <div style="display: grid; gap: 0.5rem; color: var(--color-text-secondary);">
                        <div><strong>Telefone:</strong> ${fornecedor.telefone || 'N/A'}</div>
                        <div><strong>Email:</strong> ${fornecedor.email || 'N/A'}</div>
                        <div><strong>Endereço:</strong> ${fornecedor.endereco || 'N/A'}</div>
                        <div><strong>Condições de Pagamento:</strong> ${fornecedor.condicoes_pagamento || 'N/A'}</div>
                    </div>
                </div>
            </div>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Fechar</button>
            <button class="btn-gold" onclick="window.estoqueApp.editSupplier(${fornecedorId}); window.estoqueApp.closeModal();">
                <i class="fas fa-edit"></i> Editar Fornecedor
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

// ============================================
// MOVEMENTS
// ============================================

function loadMovements() {
    renderMovementsTable(currentData.movimentacoes);
}

function renderMovementsTable(movimentacoes) {
    const tbody = document.getElementById('movementsTableBody');
    if (!tbody) return;
    
    if (movimentacoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty-state">Nenhuma movimentação encontrada</td></tr>';
        return;
    }
    
    tbody.innerHTML = movimentacoes
        .sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora))
        .map(mov => {
            const produto = MockDataEstoque.getProdutoById(mov.produto_id);
            const usuario = MockDataEstoque.getUsuarioById(mov.usuario_id);
            const tipoLabel = getMovementTypeLabel(mov.tipo);
            const date = new Date(mov.data_hora).toLocaleString('pt-BR');
            const valorTotal = mov.preco_unitario ? (mov.quantidade * mov.preco_unitario) : null;
            
            return `
                <tr>
                    <td>${date}</td>
                    <td>${produto?.nome || 'N/A'}</td>
                    <td>${tipoLabel}</td>
                    <td>${mov.quantidade} ${produto?.unidade_medida || ''}</td>
                    <td>${mov.preco_unitario ? formatCurrency(mov.preco_unitario) : 'N/A'}</td>
                    <td>${valorTotal ? formatCurrency(valorTotal) : 'N/A'}</td>
                    <td>${usuario?.nome || 'N/A'}</td>
                    <td>${mov.documento_fiscal || 'N/A'}</td>
                </tr>
            `;
        }).join('');
}

function getMovementTypeLabel(tipo) {
    const labels = {
        'ENTRADA_COMPRA': 'Entrada - Compra',
        'ENTRADA_DEVOLUCAO': 'Entrada - Devolução',
        'SAIDA_VENDA': 'Saída - Venda',
        'SAIDA_PERDA': 'Saída - Perda',
        'TRANSFERENCIA': 'Transferência',
        'AJUSTE_INVENTARIO': 'Ajuste de Inventário'
    };
    return labels[tipo] || tipo;
}

function filterMovements() {
    const type = document.getElementById('movementTypeFilter')?.value || '';
    const dateFrom = document.getElementById('movementDateFrom')?.value || '';
    const dateTo = document.getElementById('movementDateTo')?.value || '';
    
    let filtered = currentData.movimentacoes.filter(m => {
        const matchType = !type || m.tipo === type;
        const matchDateFrom = !dateFrom || new Date(m.data_hora) >= new Date(dateFrom);
        const matchDateTo = !dateTo || new Date(m.data_hora) <= new Date(dateTo + 'T23:59:59');
        
        return matchType && matchDateFrom && matchDateTo;
    });
    
    renderMovementsTable(filtered);
}

function openMovementModal() {
    const modal = createModal({
        title: 'Nova Movimentação',
        body: `
            <form id="movementForm" onsubmit="window.estoqueApp.saveMovement(event)">
                <div class="form-group">
                    <label class="form-label">Tipo de Movimentação *</label>
                    <select class="form-select" id="movTipo" required onchange="window.estoqueApp.updateMovementForm()">
                        <option value="">Selecione...</option>
                        <option value="ENTRADA_COMPRA">Entrada - Compra</option>
                        <option value="ENTRADA_DEVOLUCAO">Entrada - Devolução</option>
                        <option value="SAIDA_VENDA">Saída - Venda</option>
                        <option value="SAIDA_PERDA">Saída - Perda</option>
                        <option value="TRANSFERENCIA">Transferência</option>
                        <option value="AJUSTE_INVENTARIO">Ajuste de Inventário</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Produto *</label>
                    <select class="form-select" id="movProduto" required>
                        <option value="">Selecione...</option>
                        ${currentData.produtos.filter(p => p.ativo).map(p => 
                            `<option value="${p.id}">${p.codigo} - ${p.nome}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Quantidade *</label>
                    <input type="number" class="form-input" id="movQuantidade" min="1" required>
                </div>
                
                <div class="form-group" id="movPrecoGroup">
                    <label class="form-label">Preço Unitário</label>
                    <input type="number" class="form-input" id="movPreco" step="0.01" min="0">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Documento Fiscal</label>
                    <input type="text" class="form-input" id="movDocumento">
                </div>
                
                <div class="form-group" id="movObsGroup">
                    <label class="form-label">Observação</label>
                    <textarea class="form-textarea" id="movObservacao" rows="3"></textarea>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;" id="movLocationsGroup" style="display: none;">
                    <div class="form-group">
                        <label class="form-label">Local Origem</label>
                        <input type="text" class="form-input" id="movLocalOrigem">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Local Destino</label>
                        <input type="text" class="form-input" id="movLocalDestino">
                    </div>
                </div>
            </form>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Cancelar</button>
            <button class="btn-gold" onclick="document.getElementById('movementForm').requestSubmit()">
                <i class="fas fa-save"></i> Salvar
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function updateMovementForm() {
    const tipo = document.getElementById('movTipo')?.value;
    const precoGroup = document.getElementById('movPrecoGroup');
    const obsGroup = document.getElementById('movObsGroup');
    const locationsGroup = document.getElementById('movLocationsGroup');
    const obsLabel = obsGroup?.querySelector('label');
    const obsInput = document.getElementById('movObservacao');
    
    if (!tipo) return;
    
    // Show/hide price field
    if (tipo === 'ENTRADA_COMPRA') {
        precoGroup.style.display = 'block';
        precoGroup.querySelector('label').innerHTML = 'Preço Unitário *';
        precoGroup.querySelector('input').required = true;
    } else {
        precoGroup.style.display = 'block';
        precoGroup.querySelector('label').innerHTML = 'Preço Unitário';
        precoGroup.querySelector('input').required = false;
    }
    
    // Show/hide locations for transfers
    if (tipo === 'TRANSFERENCIA') {
        locationsGroup.style.display = 'grid';
    } else {
        locationsGroup.style.display = 'none';
    }
    
    // Make observation required for adjustments
    if (tipo === 'AJUSTE_INVENTARIO') {
        obsLabel.innerHTML = 'Observação *';
        obsInput.required = true;
    } else {
        obsLabel.innerHTML = 'Observação';
        obsInput.required = false;
    }
}

function saveMovement(event) {
    event.preventDefault();
    
    const tipo = document.getElementById('movTipo').value;
    const produtoId = parseInt(document.getElementById('movProduto').value);
    const quantidade = parseInt(document.getElementById('movQuantidade').value);
    const precoUnitario = document.getElementById('movPreco').value ? parseFloat(document.getElementById('movPreco').value) : null;
    const documento = document.getElementById('movDocumento').value || null;
    const observacao = document.getElementById('movObservacao').value || null;
    const localOrigem = document.getElementById('movLocalOrigem')?.value || null;
    const localDestino = document.getElementById('movLocalDestino')?.value || null;
    
    // Validate adjustment observation
    if (tipo === 'AJUSTE_INVENTARIO' && (!observacao || observacao.length < 10)) {
        toast.error('Observação obrigatória para ajustes (mínimo 10 caracteres)');
        return;
    }
    
    // Get current product
    const produto = currentData.produtos.find(p => p.id === produtoId);
    if (!produto) {
        toast.error('Produto não encontrado');
        return;
    }
    
    // Calculate new quantity
    let novaQuantidade = produto.quantidade_atual;
    if (tipo.includes('ENTRADA')) {
        novaQuantidade += quantidade;
    } else if (tipo.includes('SAIDA')) {
        novaQuantidade -= quantidade;
        if (novaQuantidade < 0) {
            toast.error('Quantidade insuficiente em estoque');
            return;
        }
    } else if (tipo === 'AJUSTE_INVENTARIO') {
        novaQuantidade = quantidade;
    }
    
    // Create movement
    const movimentacao = {
        id: Math.max(...currentData.movimentacoes.map(m => m.id)) + 1,
        produto_id: produtoId,
        usuario_id: 1, // Current user (mock)
        tipo: tipo,
        quantidade: quantidade,
        preco_unitario: precoUnitario,
        documento_fiscal: documento,
        observacao: observacao,
        local_origem: localOrigem,
        local_destino: localDestino,
        data_hora: new Date().toISOString()
    };
    
    // Update product quantity and status
    produto.quantidade_atual = novaQuantidade;
    produto.status = MockDataEstoque.calcularStatus(novaQuantidade, produto.quantidade_minima);
    produto.data_atualizacao = new Date().toISOString();
    
    // Calculate cost if it's a purchase
    if (tipo === 'ENTRADA_COMPRA' && precoUnitario) {
        const estoqueAnterior = produto.quantidade_atual - quantidade;
        const custoAnterior = produto.custo_medio_ponderado || 0;
        produto.custo_medio_ponderado = ((estoqueAnterior * custoAnterior) + (quantidade * precoUnitario)) / novaQuantidade;
    }
    
    // Add movement
    currentData.movimentacoes.push(movimentacao);
    
    // Check for alerts
    if (novaQuantidade < produto.quantidade_minima) {
        const existingAlert = currentData.alertas.find(a => a.produto_id === produtoId && !a.visualizado);
        if (!existingAlert) {
            const prioridade = novaQuantidade === 0 ? 'URGENTE' : 
                             (novaQuantidade / produto.quantidade_minima) < 0.3 ? 'ALTA' :
                             (novaQuantidade / produto.quantidade_minima) < 0.7 ? 'MEDIA' : 'BAIXA';
            
            currentData.alertas.push({
                id: Math.max(...currentData.alertas.map(a => a.id)) + 1,
                produto_id: produtoId,
                data_alerta: new Date().toISOString(),
                quantidade_sugerida: produto.quantidade_minima * 2,
                prioridade: prioridade,
                visualizado: false,
                data_visualizacao: null,
                data_resolucao: null,
                observacao: null
            });
        }
    }
    
    toast.success('Movimentação registrada com sucesso!');
    closeModal();
    loadMovements();
    if (document.getElementById('dashboard-tab')?.classList.contains('active')) {
        loadDashboard();
    }
    if (document.getElementById('alertas-tab')?.classList.contains('active')) {
        loadAlerts();
    }
}

// ============================================
// ALERTS
// ============================================

function loadAlerts() {
    renderAlerts(currentData.alertas);
}

function renderAlerts(alertas) {
    const container = document.getElementById('alertsGrid');
    if (!container) return;
    
    if (alertas.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon"><i class="fas fa-check-circle"></i></div><div class="empty-state-title">Nenhum alerta pendente</div></div>';
        return;
    }
    
    container.innerHTML = alertas
        .sort((a, b) => {
            const priorityOrder = { 'URGENTE': 1, 'ALTA': 2, 'MEDIA': 3, 'BAIXA': 4 };
            return priorityOrder[a.prioridade] - priorityOrder[b.prioridade];
        })
        .map(alerta => {
            const produto = MockDataEstoque.getProdutoById(alerta.produto_id);
            if (!produto) return '';
            
            const date = new Date(alerta.data_alerta).toLocaleString('pt-BR');
            const prioridadeClass = alerta.prioridade.toLowerCase();
            
            return `
                <div class="alert-card priority-${prioridadeClass}">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <h4 style="color: var(--color-text-primary); margin-bottom: 0.5rem;">${produto.nome}</h4>
                            <p style="color: var(--color-text-secondary); font-size: 0.9rem;">${produto.codigo}</p>
                        </div>
                        <span class="status-badge status-${prioridadeClass}">${alerta.prioridade}</span>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="color: var(--color-text-secondary);">Estoque Atual:</span>
                            <strong style="color: var(--color-error);">${produto.quantidade_atual} ${produto.unidade_medida}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="color: var(--color-text-secondary);">Estoque Mínimo:</span>
                            <strong>${produto.quantidade_minima} ${produto.unidade_medida}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: var(--color-text-secondary);">Quantidade Sugerida:</span>
                            <strong style="color: var(--color-primary);">${alerta.quantidade_sugerida} ${produto.unidade_medida}</strong>
                        </div>
                    </div>
                    
                    <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem;">
                        <i class="fas fa-clock"></i> ${date}
                    </div>
                    
                    <div class="action-buttons">
                        ${!alerta.visualizado ? `
                            <button class="btn-gold" style="flex: 1;" onclick="window.estoqueApp.markAlertAsViewed(${alerta.id})">
                                <i class="fas fa-check"></i> Marcar como Visualizado
                            </button>
                        ` : `
                            <button class="btn-secondary" style="flex: 1;" disabled>
                                <i class="fas fa-check-circle"></i> Visualizado
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');
}

function filterAlerts() {
    const priority = document.getElementById('alertPriorityFilter')?.value || '';
    const viewed = document.getElementById('alertViewedFilter')?.value || '';
    
    let filtered = currentData.alertas.filter(a => {
        const matchPriority = !priority || a.prioridade === priority;
        const matchViewed = viewed === '' || a.visualizado.toString() === viewed;
        
        return matchPriority && matchViewed;
    });
    
    renderAlerts(filtered);
}

function markAlertAsViewed(id) {
    const alerta = currentData.alertas.find(a => a.id === id);
    if (alerta) {
        alerta.visualizado = true;
        alerta.data_visualizacao = new Date().toISOString();
        toast.success('Alerta marcado como visualizado');
        loadAlerts();
    }
}

// ============================================
// REPORTS
// ============================================

let currentReportType = 'estoque_geral';

function loadReports() {
    // Initialize default dates
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    const dateFrom = document.getElementById('reportDateFrom');
    const dateTo = document.getElementById('reportDateTo');
    if (dateFrom) dateFrom.value = thirtyDaysAgo.toISOString().split('T')[0];
    if (dateTo) dateTo.value = today.toISOString().split('T')[0];
    
    // Load default report type
    selectReportType('estoque_geral');
}

function selectReportType(type) {
    currentReportType = type;
    
    // Update active state
    document.querySelectorAll('.report-type-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-report-type="${type}"]`)?.classList.add('active');
    
    // Update report builder title
    const title = document.getElementById('reportBuilderTitle');
    if (title) {
        const typeNames = {
            'estoque_geral': 'Visão Geral de Estoque',
            'movimentacoes': 'Histórico de Movimentações',
            'produtos_criticos': 'Produtos Críticos',
            'fornecedores': 'Análise de Fornecedores',
            'armazens': 'Utilização de Armazéns',
            'vencimentos': 'Relatório de Vencimentos',
            'custos': 'Análise de Custos',
            'rotatividade': 'Rotatividade de Produtos',
            'abc': 'Análise ABC'
        };
        title.textContent = `Configurar: ${typeNames[type] || type}`;
    }
    
    // Load report-specific filters and columns
    loadReportFilters(type);
    loadReportColumns(type);
    
    // Hide report content
    const reportContent = document.getElementById('reportContent');
    if (reportContent) reportContent.style.display = 'none';
}

function loadReportFilters(type) {
    const container = document.getElementById('reportFilters');
    if (!container) return;
    
    let html = '';
    
    switch(type) {
        case 'movimentacoes':
            html = `
                <div class="form-group">
                    <label class="form-label">Tipo de Movimentação</label>
                    <select class="form-select" id="reportMovementType" multiple style="min-height: 100px;">
                        <option value="ENTRADA">Entrada</option>
                        <option value="SAIDA">Saída</option>
                        <option value="TRANSFERENCIA">Transferência</option>
                        <option value="AJUSTE">Ajuste</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Produto</label>
                    <select class="form-select" id="reportProductFilter">
                        <option value="">Todos os produtos</option>
                        ${currentData.produtos.filter(p => p.ativo).map(p => 
                            `<option value="${p.id}">${p.codigo} - ${p.nome}</option>`
                        ).join('')}
                    </select>
                </div>
            `;
            break;
        case 'produtos_criticos':
            html = `
                <div class="form-group">
                    <label class="form-label">Nível de Criticidade</label>
                    <select class="form-select" id="reportCriticalityLevel">
                        <option value="all">Todos os níveis</option>
                        <option value="CRITICO">Crítico</option>
                        <option value="BAIXO">Baixo</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Categoria</label>
                    <select class="form-select" id="reportCategoryFilter">
                        <option value="">Todas as categorias</option>
                        ${currentData.categorias.filter(c => c.ativo).map(c => 
                            `<option value="${c.id}">${MockDataEstoque.getCategoriaPath(c.id)}</option>`
                        ).join('')}
                    </select>
                </div>
            `;
            break;
        case 'fornecedores':
            html = `
                <div class="form-group">
                    <label class="form-label">Fornecedor</label>
                    <select class="form-select" id="reportSupplierFilter">
                        <option value="">Todos os fornecedores</option>
                        ${currentData.fornecedores.filter(f => f.ativo).map(f => 
                            `<option value="${f.id}">${f.nome}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Avaliação Mínima</label>
                    <select class="form-select" id="reportRatingFilter">
                        <option value="">Todas as avaliações</option>
                        <option value="5">5 estrelas</option>
                        <option value="4">4+ estrelas</option>
                        <option value="3">3+ estrelas</option>
                    </select>
                </div>
            `;
            break;
        case 'vencimentos':
            html = `
                <div class="form-group">
                    <label class="form-label">Dias até Vencimento</label>
                    <input type="number" class="form-input" id="reportExpirationDays" value="30" min="1" max="365">
                </div>
                <div class="form-group">
                    <label class="form-label">Incluir Vencidos</label>
                    <label class="checkbox-label">
                        <input type="checkbox" id="reportIncludeExpired" checked>
                        <span>Sim</span>
                    </label>
                </div>
            `;
            break;
        default:
            html = '<p style="color: var(--color-text-secondary); font-size: 0.875rem;">Nenhum filtro adicional disponível para este tipo de relatório.</p>';
    }
    
    container.innerHTML = html;
}

function loadReportColumns(type) {
    const container = document.getElementById('reportColumns');
    if (!container) return;
    
    const columnOptions = {
        'estoque_geral': [
            { id: 'codigo', label: 'Código', default: true },
            { id: 'nome', label: 'Nome', default: true },
            { id: 'categoria', label: 'Categoria', default: true },
            { id: 'quantidade_atual', label: 'Estoque Atual', default: true },
            { id: 'quantidade_minima', label: 'Estoque Mínimo', default: true },
            { id: 'status', label: 'Status', default: true },
            { id: 'valor_total', label: 'Valor Total', default: true },
            { id: 'localizacao', label: 'Localização', default: false },
            { id: 'armazem', label: 'Armazém', default: false }
        ],
        'movimentacoes': [
            { id: 'data', label: 'Data/Hora', default: true },
            { id: 'produto', label: 'Produto', default: true },
            { id: 'tipo', label: 'Tipo', default: true },
            { id: 'quantidade', label: 'Quantidade', default: true },
            { id: 'usuario', label: 'Usuário', default: true },
            { id: 'valor', label: 'Valor', default: false },
            { id: 'observacoes', label: 'Observações', default: false }
        ],
        'produtos_criticos': [
            { id: 'codigo', label: 'Código', default: true },
            { id: 'nome', label: 'Nome', default: true },
            { id: 'categoria', label: 'Categoria', default: true },
            { id: 'quantidade_atual', label: 'Estoque Atual', default: true },
            { id: 'quantidade_minima', label: 'Estoque Mínimo', default: true },
            { id: 'diferenca', label: 'Diferença', default: true },
            { id: 'percentual', label: '% do Mínimo', default: true }
        ],
        'fornecedores': [
            { id: 'nome', label: 'Nome', default: true },
            { id: 'contato', label: 'Contato', default: true },
            { id: 'avaliacao', label: 'Avaliação', default: true },
            { id: 'total_compras', label: 'Total de Compras', default: true },
            { id: 'tempo_medio', label: 'Tempo Médio Entrega', default: true },
            { id: 'produtos_fornecidos', label: 'Produtos Fornecidos', default: false }
        ],
        'armazens': [
            { id: 'nome', label: 'Nome', default: true },
            { id: 'capacidade', label: 'Capacidade', default: true },
            { id: 'utilizado', label: 'Utilizado', default: true },
            { id: 'percentual', label: '% Utilizado', default: true },
            { id: 'produtos', label: 'Nº Produtos', default: true },
            { id: 'valor_total', label: 'Valor Total', default: false }
        ],
        'vencimentos': [
            { id: 'codigo', label: 'Código', default: true },
            { id: 'nome', label: 'Nome', default: true },
            { id: 'quantidade', label: 'Quantidade', default: true },
            { id: 'data_vencimento', label: 'Data Vencimento', default: true },
            { id: 'dias_restantes', label: 'Dias Restantes', default: true },
            { id: 'status', label: 'Status', default: true }
        ],
        'custos': [
            { id: 'categoria', label: 'Categoria', default: true },
            { id: 'custo_total', label: 'Custo Total', default: true },
            { id: 'margem_media', label: 'Margem Média', default: true },
            { id: 'produtos', label: 'Nº Produtos', default: true },
            { id: 'valor_venda', label: 'Valor de Venda', default: false }
        ],
        'rotatividade': [
            { id: 'codigo', label: 'Código', default: true },
            { id: 'nome', label: 'Nome', default: true },
            { id: 'quantidade_vendida', label: 'Quantidade Vendida', default: true },
            { id: 'valor_total', label: 'Valor Total', default: true },
            { id: 'rotatividade', label: 'Taxa Rotatividade', default: true },
            { id: 'categoria', label: 'Categoria', default: false }
        ],
        'abc': [
            { id: 'codigo', label: 'Código', default: true },
            { id: 'nome', label: 'Nome', default: true },
            { id: 'valor_total', label: 'Valor Total', default: true },
            { id: 'percentual', label: '% do Total', default: true },
            { id: 'classificacao', label: 'Classificação', default: true },
            { id: 'acumulado', label: '% Acumulado', default: false }
        ]
    };
    
    const columns = columnOptions[type] || [];
    
    container.innerHTML = columns.map(col => `
        <label class="checkbox-label">
            <input type="checkbox" data-column="${col.id}" ${col.default ? 'checked' : ''}>
            <span>${col.label}</span>
        </label>
    `).join('');
}

function previewReport() {
    generateReport(true);
}

function generateReport(isPreview = false) {
    const type = currentReportType;
    const dateFrom = document.getElementById('reportDateFrom')?.value;
    const dateTo = document.getElementById('reportDateTo')?.value;
    
    if (!type) {
        toast.error('Selecione um tipo de relatório');
        return;
    }
    
    const container = document.getElementById('reportContent');
    if (!container) return;
    
    loading.show('Gerando relatório...');
    
    setTimeout(() => {
        let html = '';
        
        switch(type) {
            case 'estoque_geral':
                html = generateStockReport(dateFrom, dateTo);
                break;
            case 'movimentacoes':
                html = generateMovementsReport(dateFrom, dateTo);
                break;
            case 'produtos_criticos':
                html = generateCriticalProductsReport();
                break;
            case 'fornecedores':
                html = generateSuppliersReport();
                break;
            case 'armazens':
                html = generateWarehousesReport();
                break;
            case 'vencimentos':
                html = generateExpirationsReport();
                break;
            case 'custos':
                html = generateCostsReport();
                break;
            case 'rotatividade':
                html = generateTurnoverReport(dateFrom, dateTo);
                break;
            case 'abc':
                html = generateABCReport();
                break;
        }
        
        // Add export buttons
        html += `
            <div class="report-export-actions">
                <button class="btn-secondary" onclick="exportReportToCSV('${type}')">
                    <i class="fas fa-file-csv"></i> Exportar CSV
                </button>
                <button class="btn-secondary" onclick="exportReportToJSON('${type}')">
                    <i class="fas fa-file-code"></i> Exportar JSON
                </button>
                <button class="btn-secondary" onclick="exportReportToExcel('${type}')">
                    <i class="fas fa-file-excel"></i> Exportar Excel
                </button>
                <button class="btn-secondary" onclick="exportReportToPDF('${type}')">
                    <i class="fas fa-file-pdf"></i> Exportar PDF
                </button>
                <button class="btn-gold" onclick="printReport()">
                    <i class="fas fa-print"></i> Imprimir
                </button>
            </div>
        `;
        
        container.innerHTML = html;
        container.style.display = 'block';
        loading.hide();
        
        if (isPreview) {
            toast.success('Visualização gerada com sucesso!');
        } else {
            toast.success('Relatório gerado com sucesso!');
        }
        
        // Scroll to report
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

function generateStockReport(dateFrom, dateTo) {
    const produtos = currentData.produtos.filter(p => p.ativo);
    const totalValue = produtos.reduce((sum, p) => sum + (p.quantidade_atual * p.custo_medio_ponderado), 0);
    const totalProducts = produtos.length;
    
    return `
        <div class="report-header">
            <h2>Relatório de Estoque Geral</h2>
            <div class="report-meta">
                <span><i class="fas fa-calendar"></i> Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
                <span><i class="fas fa-box"></i> Total de Produtos: ${totalProducts}</span>
                <span><i class="fas fa-dollar-sign"></i> Valor Total: ${formatCurrency(totalValue)}</span>
            </div>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Estoque Atual</th>
                        <th>Estoque Mín.</th>
                        <th>Status</th>
                        <th>Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${produtos.map(p => {
                        const categoria = MockDataEstoque.getCategoriaById(p.categoria_id);
                        const valorTotal = p.quantidade_atual * p.custo_medio_ponderado;
                        return `
                            <tr>
                                <td>${p.codigo}</td>
                                <td>${p.nome}</td>
                                <td>${categoria?.nome || 'N/A'}</td>
                                <td>${p.quantidade_atual} ${p.unidade_medida}</td>
                                <td>${p.quantidade_minima} ${p.unidade_medida}</td>
                                <td><span class="status-badge status-${p.status.toLowerCase()}">${p.status}</span></td>
                                <td>${formatCurrency(valorTotal)}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateMovementsReport(dateFrom, dateTo) {
    let movimentacoes = [...currentData.movimentacoes];
    
    if (dateFrom) {
        movimentacoes = movimentacoes.filter(m => new Date(m.data_hora) >= new Date(dateFrom));
    }
    if (dateTo) {
        movimentacoes = movimentacoes.filter(m => new Date(m.data_hora) <= new Date(dateTo + 'T23:59:59'));
    }
    
    movimentacoes.sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));
    
    return `
        <div class="table-container">
            <h3 style="margin-bottom: 1rem;">Relatório de Movimentações</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Data/Hora</th>
                        <th>Produto</th>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                        <th>Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${movimentacoes.map(m => {
                        const produto = MockDataEstoque.getProdutoById(m.produto_id);
                        const valorTotal = m.preco_unitario ? (m.quantidade * m.preco_unitario) : 0;
                        return `
                            <tr>
                                <td>${new Date(m.data_hora).toLocaleString('pt-BR')}</td>
                                <td>${produto?.nome || 'N/A'}</td>
                                <td>${getMovementTypeLabel(m.tipo)}</td>
                                <td>${m.quantidade} ${produto?.unidade_medida || ''}</td>
                                <td>${valorTotal ? formatCurrency(valorTotal) : 'N/A'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateCriticalProductsReport() {
    const criticos = currentData.produtos.filter(p => p.ativo && (p.status === 'CRITICO' || p.status === 'BAIXO'));
    
    return `
        <div class="table-container">
            <h3 style="margin-bottom: 1rem;">Relatório de Produtos Críticos</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Estoque Atual</th>
                        <th>Estoque Mín.</th>
                        <th>Status</th>
                        <th>Quantidade a Comprar</th>
                    </tr>
                </thead>
                <tbody>
                    ${criticos.map(p => {
                        const quantidadeComprar = p.quantidade_minima * 2;
                        return `
                            <tr>
                                <td>${p.codigo}</td>
                                <td>${p.nome}</td>
                                <td>${p.quantidade_atual} ${p.unidade_medida}</td>
                                <td>${p.quantidade_minima} ${p.unidade_medida}</td>
                                <td><span class="status-badge status-${p.status.toLowerCase()}">${p.status}</span></td>
                                <td><strong style="color: var(--color-primary);">${quantidadeComprar} ${p.unidade_medida}</strong></td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateSuppliersReport() {
    const fornecedores = currentData.fornecedores.filter(f => f.ativo);
    
    return `
        <div class="report-header">
            <h2>Relatório de Fornecedores</h2>
            <div class="report-meta">
                <span><i class="fas fa-calendar"></i> Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
                <span><i class="fas fa-truck"></i> Total de Fornecedores: ${fornecedores.length}</span>
            </div>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Razão Social</th>
                        <th>CNPJ</th>
                        <th>Avaliação</th>
                        <th>Produtos Fornecidos</th>
                        <th>Tempo Médio Entrega</th>
                    </tr>
                </thead>
                <tbody>
                    ${fornecedores.map(f => {
                        const produtosCount = currentData.produto_fornecedor.filter(pf => pf.fornecedor_id === f.id).length;
                        const stars = '★'.repeat(f.avaliacao || 0) + '☆'.repeat(5 - (f.avaliacao || 0));
                        return `
                            <tr>
                                <td>${f.razao_social}</td>
                                <td>${f.cnpj}</td>
                                <td>${stars}</td>
                                <td>${produtosCount} produto(s)</td>
                                <td>${f.tempo_medio_entrega_dias} dias</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateWarehousesReport() {
    const armazens = currentData.armazens.filter(a => a.ativo);
    
    return `
        <div class="report-header">
            <h2>Relatório de Utilização de Armazéns</h2>
            <div class="report-meta">
                <span><i class="fas fa-calendar"></i> Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
                <span><i class="fas fa-warehouse"></i> Total de Armazéns: ${armazens.length}</span>
            </div>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Capacidade</th>
                        <th>Utilizado</th>
                        <th>Disponível</th>
                        <th>% Utilizado</th>
                        <th>Nº Produtos</th>
                    </tr>
                </thead>
                <tbody>
                    ${armazens.map(a => {
                        const produtos = currentData.produtos.filter(p => p.armazem_id === a.id && p.ativo);
                        const utilizacao = MockDataEstoque.getArmazemUtilization(a.id);
                        return `
                            <tr>
                                <td>${a.nome}</td>
                                <td>${a.capacidade}</td>
                                <td>${a.capacidade_atual}</td>
                                <td>${a.capacidade - a.capacidade_atual}</td>
                                <td>${utilizacao ? utilizacao.percentualUtilizado.toFixed(1) : 0}%</td>
                                <td>${produtos.length}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateExpirationsReport() {
    const dias = parseInt(document.getElementById('reportExpirationDays')?.value || 30);
    const includeExpired = document.getElementById('reportIncludeExpired')?.checked !== false;
    const produtosExpirando = MockDataEstoque.getProdutosExpirando(dias);
    const hoje = new Date();
    
    let produtos = produtosExpirando;
    if (!includeExpired) {
        produtos = produtos.filter(p => {
            const dataValidade = new Date(p.prazo_validade);
            return dataValidade >= hoje;
        });
    }
    
    return `
        <div class="report-header">
            <h2>Relatório de Vencimentos</h2>
            <div class="report-meta">
                <span><i class="fas fa-calendar"></i> Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
                <span><i class="fas fa-box"></i> Produtos vencendo: ${produtos.length}</span>
                <span><i class="fas fa-clock"></i> Próximos ${dias} dias</span>
            </div>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Data Vencimento</th>
                        <th>Dias Restantes</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${produtos.map(p => {
                        const dataValidade = new Date(p.prazo_validade);
                        const diasRestantes = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
                        const status = diasRestantes < 0 ? 'Vencido' : diasRestantes <= 7 ? 'Crítico' : diasRestantes <= 15 ? 'Atenção' : 'Normal';
                        const statusClass = diasRestantes < 0 ? 'critico' : diasRestantes <= 7 ? 'critico' : diasRestantes <= 15 ? 'baixo' : 'ok';
                        return `
                            <tr>
                                <td>${p.codigo}</td>
                                <td>${p.nome}</td>
                                <td>${p.quantidade_atual} ${p.unidade_medida}</td>
                                <td>${dataValidade.toLocaleDateString('pt-BR')}</td>
                                <td>${diasRestantes < 0 ? `${Math.abs(diasRestantes)} dias atrás` : `${diasRestantes} dias`}</td>
                                <td><span class="status-badge status-${statusClass}">${status}</span></td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateCostsReport() {
    const insights = analytics.calculateMarginAnalysis(currentData.produtos, currentData.categorias);
    
    return `
        <div class="report-header">
            <h2>Relatório de Análise de Custos</h2>
            <div class="report-meta">
                <span><i class="fas fa-calendar"></i> Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
                <span><i class="fas fa-dollar-sign"></i> Custo Total: ${formatCurrency(insights.totalCusto)}</span>
            </div>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Custo Total</th>
                        <th>Margem Média</th>
                        <th>Nº Produtos</th>
                        <th>Valor de Venda</th>
                    </tr>
                </thead>
                <tbody>
                    ${insights.categories.map(cat => `
                        <tr>
                            <td>${cat.categoria}</td>
                            <td>${formatCurrency(cat.valorCusto)}</td>
                            <td>${cat.margem}%</td>
                            <td>${cat.produtos}</td>
                            <td>${formatCurrency(cat.valorVenda || 0)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateTurnoverReport(dateFrom, dateTo) {
    const days = dateFrom && dateTo ? 
        Math.ceil((new Date(dateTo) - new Date(dateFrom)) / (1000 * 60 * 60 * 24)) : 30;
    const insights = analytics.calculateProductTurnover(currentData.produtos, currentData.movimentacoes, days);
    
    return `
        <div class="report-header">
            <h2>Relatório de Rotatividade de Produtos</h2>
            <div class="report-meta">
                <span><i class="fas fa-calendar"></i> Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
                <span><i class="fas fa-clock"></i> Período: ${days} dias</span>
            </div>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Quantidade Vendida</th>
                        <th>Valor Total</th>
                        <th>Taxa Rotatividade</th>
                    </tr>
                </thead>
                <tbody>
                    ${insights.topProducts.map(p => `
                        <tr>
                            <td>${p.codigo}</td>
                            <td>${p.nome}</td>
                            <td>${p.quantidadeVendida} ${p.unidade}</td>
                            <td>${formatCurrency(p.valorTotal)}</td>
                            <td>${p.taxaRotatividade.toFixed(2)}%</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function generateABCReport() {
    const insights = analytics.calculateABCAnalysis(currentData.produtos);
    
    return `
        <div class="report-header">
            <h2>Relatório de Análise ABC</h2>
            <div class="report-meta">
                <span><i class="fas fa-calendar"></i> Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
                <span><i class="fas fa-star"></i> Classificação por valor</span>
            </div>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Classificação</th>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Valor Total</th>
                        <th>% do Total</th>
                        <th>% Acumulado</th>
                    </tr>
                </thead>
                <tbody>
                    ${insights.classification.map(item => `
                        <tr>
                            <td><span class="status-badge status-${item.classificacao.toLowerCase()}">${item.classificacao}</span></td>
                            <td>${item.codigo}</td>
                            <td>${item.nome}</td>
                            <td>${formatCurrency(item.valorTotal)}</td>
                            <td>${item.percentual.toFixed(2)}%</td>
                            <td>${item.percentualAcumulado.toFixed(2)}%</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function openCustomReportBuilder() {
    const modal = createModal({
        title: 'Criar Relatório Customizado',
        body: `
            <form id="customReportForm" onsubmit="window.estoqueApp.saveCustomReport(event)">
                <div class="form-group">
                    <label class="form-label">Nome do Relatório *</label>
                    <input type="text" class="form-input" id="customReportName" required placeholder="Ex: Relatório Mensal de Vendas">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Tipo Base</label>
                    <select class="form-select" id="customReportBaseType">
                        <option value="estoque_geral">Estoque Geral</option>
                        <option value="movimentacoes">Movimentações</option>
                        <option value="fornecedores">Fornecedores</option>
                        <option value="custos">Custos</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Descrição</label>
                    <textarea class="form-textarea" id="customReportDescription" rows="3" placeholder="Descreva o propósito deste relatório..."></textarea>
                </div>
                
                <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-top: 0.5rem;">
                    <i class="fas fa-info-circle"></i> Você poderá configurar filtros e colunas após criar o relatório.
                </p>
            </form>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Cancelar</button>
            <button class="btn-gold" onclick="document.getElementById('customReportForm').requestSubmit()">
                <i class="fas fa-save"></i> Criar Relatório
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function saveCustomReport(event) {
    event.preventDefault();
    const name = document.getElementById('customReportName').value;
    const baseType = document.getElementById('customReportBaseType').value;
    const description = document.getElementById('customReportDescription').value;
    
    // Save custom report (in a real app, this would be saved to backend)
    const customReports = JSON.parse(localStorage.getItem('estoque_custom_reports') || '[]');
    customReports.push({
        id: Date.now(),
        name,
        baseType,
        description,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('estoque_custom_reports', JSON.stringify(customReports));
    
    closeModal();
    toast.success('Relatório customizado criado com sucesso!');
    // Reload reports to show new custom report
    loadReports();
}

// ============================================
// EXPORT FUNCTIONALITY
// ============================================

function exportReportToCSV(reportType) {
    const container = document.getElementById('reportContent');
    if (!container) {
        toast.error('Nenhum relatório gerado para exportar');
        return;
    }
    
    const table = container.querySelector('table');
    if (!table) {
        toast.error('Nenhuma tabela encontrada no relatório');
        return;
    }
    
    const rows = Array.from(table.querySelectorAll('tr'));
    const csvData = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => {
            // Remove HTML tags and clean text
            let text = cell.textContent.trim();
            // Escape quotes and wrap in quotes if contains comma
            if (text.includes(',') || text.includes('"') || text.includes('\n')) {
                text = '"' + text.replace(/"/g, '""') + '"';
            }
            return text;
        }).join(',');
    }).join('\n');
    
    // Create download
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `relatorio_${reportType}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Relatório exportado para CSV com sucesso!');
}

function exportReportToJSON(reportType) {
    const container = document.getElementById('reportContent');
    if (!container) {
        toast.error('Nenhum relatório gerado para exportar');
        return;
    }
    
    const table = container.querySelector('table');
    if (!table) {
        toast.error('Nenhuma tabela encontrada no relatório');
        return;
    }
    
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    
    const jsonData = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = cells[index] ? cells[index].textContent.trim() : '';
        });
        return obj;
    });
    
    const jsonString = JSON.stringify({
        reportType,
        generatedAt: new Date().toISOString(),
        data: jsonData
    }, null, 2);
    
    // Create download
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `relatorio_${reportType}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Relatório exportado para JSON com sucesso!');
}

function exportReportToExcel(reportType) {
    const container = document.getElementById('reportContent');
    if (!container) {
        toast.error('Nenhum relatório gerado para exportar');
        return;
    }
    
    const table = container.querySelector('table');
    if (!table) {
        toast.error('Nenhuma tabela encontrada no relatório');
        return;
    }
    
    // Create HTML table for Excel
    const tableClone = table.cloneNode(true);
    
    // Create Excel HTML
    const excelHTML = `
        <html>
            <head>
                <meta charset="utf-8">
                <style>
                    table { border-collapse: collapse; width: 100%; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; font-weight: bold; }
                </style>
            </head>
            <body>
                <h2>${document.querySelector('.report-header h2')?.textContent || 'Relatório'}</h2>
                <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
                ${tableClone.outerHTML}
            </body>
        </html>
    `;
    
    // Create download
    const blob = new Blob(['\ufeff' + excelHTML], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `relatorio_${reportType}_${new Date().toISOString().split('T')[0]}.xls`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('Relatório exportado para Excel com sucesso!');
}

function exportReportToPDF(reportType) {
    const container = document.getElementById('reportContent');
    if (!container) {
        toast.error('Nenhum relatório gerado para exportar');
        return;
    }
    
    // Create print-friendly version
    const printWindow = window.open('', '_blank');
    const reportHeader = container.querySelector('.report-header');
    const table = container.querySelector('table');
    
    if (!table) {
        toast.error('Nenhuma tabela encontrada no relatório');
        return;
    }
    
    const printHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Relatório - ${reportType}</title>
                <style>
                    @media print {
                        @page { margin: 1cm; }
                        body { margin: 0; }
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        color: #333;
                    }
                    h2 {
                        color: #FFD54F;
                        border-bottom: 2px solid #FFD54F;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .report-meta {
                        margin-bottom: 20px;
                        padding: 10px;
                        background: #f5f5f5;
                        border-radius: 5px;
                    }
                    .report-meta span {
                        margin-right: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: left;
                    }
                    th {
                        background-color: #FFD54F;
                        color: #1a1a1a;
                        font-weight: bold;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    .status-badge {
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 0.85em;
                        font-weight: bold;
                    }
                    .status-ok { background-color: #4CAF50; color: white; }
                    .status-baixo { background-color: #FF9800; color: white; }
                    .status-critico { background-color: #F44336; color: white; }
                </style>
            </head>
            <body>
                ${reportHeader ? reportHeader.outerHTML : `<h2>Relatório - ${reportType}</h2>`}
                ${table.outerHTML}
                <div style="margin-top: 30px; text-align: center; color: #666; font-size: 0.9em;">
                    <p>Gerado em ${new Date().toLocaleString('pt-BR')} pelo Sistema de Gestão de Estoque</p>
                </div>
            </body>
        </html>
    `;
    
    printWindow.document.write(printHTML);
    printWindow.document.close();
    
    // Wait for content to load, then print
    setTimeout(() => {
        printWindow.print();
        toast.success('Relatório preparado para impressão/PDF!');
    }, 250);
}

function printReport() {
    const container = document.getElementById('reportContent');
    if (!container) {
        toast.error('Nenhum relatório gerado para imprimir');
        return;
    }
    
    // Create print-friendly version
    const printWindow = window.open('', '_blank');
    const reportHeader = container.querySelector('.report-header');
    const table = container.querySelector('table');
    
    if (!table) {
        toast.error('Nenhuma tabela encontrada no relatório');
        return;
    }
    
    const printHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Relatório</title>
                <style>
                    @media print {
                        @page { margin: 1cm; }
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        color: #333;
                    }
                    h2 {
                        color: #FFD54F;
                        border-bottom: 2px solid #FFD54F;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .report-meta {
                        margin-bottom: 20px;
                        padding: 10px;
                        background: #f5f5f5;
                        border-radius: 5px;
                    }
                    .report-meta span {
                        margin-right: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: left;
                    }
                    th {
                        background-color: #FFD54F;
                        color: #1a1a1a;
                        font-weight: bold;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    .status-badge {
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 0.85em;
                        font-weight: bold;
                    }
                    .status-ok { background-color: #4CAF50; color: white; }
                    .status-baixo { background-color: #FF9800; color: white; }
                    .status-critico { background-color: #F44336; color: white; }
                </style>
            </head>
            <body>
                ${reportHeader ? reportHeader.outerHTML : '<h2>Relatório</h2>'}
                ${table.outerHTML}
                <div style="margin-top: 30px; text-align: center; color: #666; font-size: 0.9em;">
                    <p>Gerado em ${new Date().toLocaleString('pt-BR')} pelo Sistema de Gestão de Estoque</p>
                </div>
            </body>
        </html>
    `;
    
    printWindow.document.write(printHTML);
    printWindow.document.close();
    
    // Wait for content to load, then print
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

// Export functions
window.selectReportType = selectReportType;
window.previewReport = previewReport;
window.openCustomReportBuilder = openCustomReportBuilder;
window.exportReportToCSV = exportReportToCSV;
window.exportReportToJSON = exportReportToJSON;
window.exportReportToExcel = exportReportToExcel;
window.exportReportToPDF = exportReportToPDF;
window.printReport = printReport;

// ============================================
// MODAL UTILITIES
// ============================================

function createModal({ title, body, footer }) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.id = 'currentModal';
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    };
    
    overlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">${title}</h2>
                <button class="modal-close" onclick="window.estoqueApp.closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${body}
            </div>
            ${footer ? `
                <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.15);">
                    ${footer}
                </div>
            ` : ''}
        </div>
    `;
    
    // Close on ESC
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    return overlay;
}

function closeModal() {
    const modal = document.getElementById('currentModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
    currentEditingId = null;
}

// ============================================
// WAREHOUSE MANAGEMENT
// ============================================

function loadWarehouses() {
    const grid = document.getElementById('warehousesGrid');
    if (!grid) return;
    
    const warehouses = currentData.armazens.filter(a => a.ativo);
    
    if (warehouses.length === 0) {
        grid.innerHTML = '<div class="empty-state">Nenhum armazém cadastrado</div>';
        return;
    }
    
    grid.innerHTML = warehouses.map(armazem => {
        const utilization = MockDataEstoque.getArmazemUtilization(armazem.id);
        const produtos = MockDataEstoque.getProdutosByArmazemId(armazem.id);
        const responsavel = MockDataEstoque.getUsuarioById(armazem.responsavel_id);
        const percentual = utilization ? utilization.percentualUtilizado : 0;
        const statusClass = percentual > 90 ? 'critical' : percentual > 70 ? 'warning' : 'ok';
        
        return `
            <div class="warehouse-card">
                <div class="warehouse-header">
                    <div>
                        <h4 class="warehouse-name">${armazem.nome}</h4>
                        <p class="warehouse-location">${armazem.cidade}, ${armazem.estado}</p>
                    </div>
                    <div class="warehouse-actions">
                        <button class="btn-icon" onclick="window.estoqueApp.editWarehouse(${armazem.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="window.estoqueApp.openTransferModal(${armazem.id})" title="Transferir">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                    </div>
                </div>
                
                <div class="warehouse-info">
                    <div class="warehouse-info-item">
                        <span class="info-label">Responsável:</span>
                        <span class="info-value">${responsavel?.nome || 'N/A'}</span>
                    </div>
                    <div class="warehouse-info-item">
                        <span class="info-label">Produtos:</span>
                        <span class="info-value">${produtos.length}</span>
                    </div>
                </div>
                
                <div class="warehouse-capacity">
                    <div class="capacity-header">
                        <span>Capacidade</span>
                        <span class="capacity-percent ${statusClass}">${percentual.toFixed(1)}%</span>
                    </div>
                    <div class="capacity-bar">
                        <div class="capacity-fill ${statusClass}" style="width: ${Math.min(percentual, 100)}%"></div>
                    </div>
                    <div class="capacity-details">
                        <span>${utilization?.capacidadeUtilizada || 0} / ${armazem.capacidade}</span>
                        <span>Disponível: ${utilization?.capacidadeDisponivel || 0}</span>
                    </div>
                </div>
                
                <div class="warehouse-value">
                    <span class="value-label">Valor Total:</span>
                    <span class="value-amount">${formatCurrency(utilization?.valorTotal || 0)}</span>
                </div>
            </div>
        `;
    }).join('');
}

function openWarehouseModal(warehouseId = null) {
    const armazem = warehouseId ? currentData.armazens.find(a => a.id === warehouseId) : null;
    
    const modal = createModal({
        title: armazem ? 'Editar Armazém' : 'Novo Armazém',
        body: `
            <form id="warehouseForm" onsubmit="window.estoqueApp.saveWarehouse(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Nome *</label>
                        <input type="text" class="form-input" id="warehouseNome" value="${armazem?.nome || ''}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Capacidade *</label>
                        <input type="number" class="form-input" id="warehouseCapacidade" value="${armazem?.capacidade || ''}" min="1" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Descrição</label>
                    <textarea class="form-textarea" id="warehouseDescricao" rows="2">${armazem?.descricao || ''}</textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Endereço</label>
                        <input type="text" class="form-input" id="warehouseEndereco" value="${armazem?.endereco || ''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Cidade</label>
                        <input type="text" class="form-input" id="warehouseCidade" value="${armazem?.cidade || ''}">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Estado</label>
                        <input type="text" class="form-input" id="warehouseEstado" value="${armazem?.estado || ''}" maxlength="2">
                    </div>
                    <div class="form-group">
                        <label class="form-label">CEP</label>
                        <input type="text" class="form-input" id="warehouseCEP" value="${armazem?.cep || ''}">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Responsável</label>
                    <select class="form-select" id="warehouseResponsavel">
                        <option value="">Selecione...</option>
                        ${currentData.usuarios.map(u => `
                            <option value="${u.id}" ${armazem?.responsavel_id === u.id ? 'selected' : ''}>${u.nome}</option>
                        `).join('')}
                    </select>
                </div>
            </form>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Cancelar</button>
            <button class="btn-gold" onclick="document.getElementById('warehouseForm').requestSubmit()">
                <i class="fas fa-save"></i> Salvar
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function saveWarehouse(event) {
    event.preventDefault();
    
    const armazem = {
        id: currentEditingId || (Math.max(...currentData.armazens.map(a => a.id), 0) + 1),
        nome: document.getElementById('warehouseNome').value,
        descricao: document.getElementById('warehouseDescricao').value,
        endereco: document.getElementById('warehouseEndereco').value,
        cidade: document.getElementById('warehouseCidade').value,
        estado: document.getElementById('warehouseEstado').value,
        cep: document.getElementById('warehouseCEP').value,
        capacidade: parseInt(document.getElementById('warehouseCapacidade').value),
        capacidade_atual: currentEditingId ? currentData.armazens.find(a => a.id === currentEditingId)?.capacidade_atual || 0 : 0,
        responsavel_id: document.getElementById('warehouseResponsavel').value ? parseInt(document.getElementById('warehouseResponsavel').value) : null,
        ativo: true,
        data_criacao: currentEditingId ? currentData.armazens.find(a => a.id === currentEditingId)?.data_criacao : new Date().toISOString()
    };
    
    if (currentEditingId) {
        const index = currentData.armazens.findIndex(a => a.id === currentEditingId);
        if (index !== -1) {
            currentData.armazens[index] = { ...currentData.armazens[index], ...armazem };
            toast.success('Armazém atualizado com sucesso!');
        }
    } else {
        currentData.armazens.push(armazem);
        toast.success('Armazém adicionado com sucesso!');
    }
    
    closeModal();
    loadWarehouses();
}

function editWarehouse(id) {
    currentEditingId = id;
    openWarehouseModal(id);
}

function openTransferModal(armazemOrigemId) {
    const armazemOrigem = MockDataEstoque.getArmazemById(armazemOrigemId);
    const produtos = MockDataEstoque.getProdutosByArmazemId(armazemOrigemId);
    const outrosArmazens = currentData.armazens.filter(a => a.id !== armazemOrigemId && a.ativo);
    
    const modal = createModal({
        title: `Transferir Produtos - ${armazemOrigem?.nome}`,
        body: `
            <form id="transferForm" onsubmit="window.estoqueApp.saveTransfer(event)">
                <input type="hidden" id="transferOrigem" value="${armazemOrigemId}">
                
                <div class="form-group">
                    <label class="form-label">Armazém Destino *</label>
                    <select class="form-select" id="transferDestino" required>
                        <option value="">Selecione...</option>
                        ${outrosArmazens.map(a => `
                            <option value="${a.id}">${a.nome} - ${a.cidade}, ${a.estado}</option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Produto *</label>
                    <select class="form-select" id="transferProduto" required onchange="window.estoqueApp.updateTransferMax()">
                        <option value="">Selecione...</option>
                        ${produtos.map(p => `
                            <option value="${p.id}" data-quantidade="${p.quantidade_atual}">${p.nome} (${p.quantidade_atual} ${p.unidade_medida})</option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Quantidade *</label>
                    <input type="number" class="form-input" id="transferQuantidade" min="1" required>
                    <small class="form-hint" id="transferMaxHint">Quantidade disponível: 0</small>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Observação</label>
                    <textarea class="form-textarea" id="transferObservacao" rows="2" placeholder="Motivo da transferência..."></textarea>
                </div>
            </form>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Cancelar</button>
            <button class="btn-gold" onclick="document.getElementById('transferForm').requestSubmit()">
                <i class="fas fa-exchange-alt"></i> Transferir
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function updateTransferMax() {
    const select = document.getElementById('transferProduto');
    const quantidade = select.options[select.selectedIndex]?.dataset.quantidade || 0;
    const input = document.getElementById('transferQuantidade');
    const hint = document.getElementById('transferMaxHint');
    
    input.max = quantidade;
    hint.textContent = `Quantidade disponível: ${quantidade}`;
}

function saveTransfer(event) {
    event.preventDefault();
    
    const produtoId = parseInt(document.getElementById('transferProduto').value);
    const quantidade = parseInt(document.getElementById('transferQuantidade').value);
    const armazemOrigemId = parseInt(document.getElementById('transferOrigem').value);
    const armazemDestinoId = parseInt(document.getElementById('transferDestino').value);
    const observacao = document.getElementById('transferObservacao').value;
    
    const produto = currentData.produtos.find(p => p.id === produtoId);
    if (!produto) {
        toast.error('Produto não encontrado');
        return;
    }
    
    if (produto.quantidade_atual < quantidade) {
        toast.error('Quantidade insuficiente no armazém de origem');
        return;
    }
    
    // Update product warehouse
    produto.armazem_id = armazemDestinoId;
    produto.quantidade_atual -= quantidade;
    
    // Create destination product entry or update if exists
    const produtoDestino = currentData.produtos.find(p => p.id === produtoId && p.armazem_id === armazemDestinoId);
    if (produtoDestino && produtoDestino.id !== produtoId) {
        produtoDestino.quantidade_atual += quantidade;
    } else {
        // Create movement record
        const movimento = {
            id: Math.max(...currentData.movimentacoes.map(m => m.id), 0) + 1,
            produto_id: produtoId,
            usuario_id: 1, // Current user
            tipo: "TRANSFERENCIA",
            quantidade: quantidade,
            preco_unitario: null,
            documento_fiscal: null,
            observacao: `Transferência entre armazéns: ${observacao || 'Sem observação'}`,
            local_origem: MockDataEstoque.getArmazemById(armazemOrigemId)?.nome || '',
            local_destino: MockDataEstoque.getArmazemById(armazemDestinoId)?.nome || '',
            data_hora: new Date().toISOString()
        };
        currentData.movimentacoes.push(movimento);
    }
    
    toast.success('Transferência realizada com sucesso!');
    closeModal();
    loadWarehouses();
    if (document.getElementById('produtos-tab')?.classList.contains('active')) {
        loadProducts();
    }
}

// ============================================
// EXPIRATION TRACKING
// ============================================

function loadExpirations() {
    const tbody = document.getElementById('expirationTableBody');
    const timeline = document.getElementById('expirationTimeline');
    if (!tbody || !timeline) return;
    
    const produtosExpirando = MockDataEstoque.getProdutosExpirando(90);
    
    // Render timeline
    const hoje = new Date();
    const grupos = {
        vencidos: [],
        '30': [],
        '60': [],
        '90': []
    };
    
    produtosExpirando.forEach(produto => {
        const dataValidade = new Date(produto.prazo_validade);
        const diasRestantes = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
        
        if (diasRestantes < 0) {
            grupos.vencidos.push({ produto, diasRestantes });
        } else if (diasRestantes <= 30) {
            grupos['30'].push({ produto, diasRestantes });
        } else if (diasRestantes <= 60) {
            grupos['60'].push({ produto, diasRestantes });
        } else {
            grupos['90'].push({ produto, diasRestantes });
        }
    });
    
    timeline.innerHTML = `
        <div class="timeline-container">
            <div class="timeline-item critical">
                <div class="timeline-badge">${grupos.vencidos.length}</div>
                <div class="timeline-label">Vencidos</div>
            </div>
            <div class="timeline-item urgent">
                <div class="timeline-badge">${grupos['30'].length}</div>
                <div class="timeline-label">0-30 dias</div>
            </div>
            <div class="timeline-item warning">
                <div class="timeline-badge">${grupos['60'].length}</div>
                <div class="timeline-label">31-60 dias</div>
            </div>
            <div class="timeline-item info">
                <div class="timeline-badge">${grupos['90'].length}</div>
                <div class="timeline-label">61-90 dias</div>
            </div>
        </div>
    `;
    
    // Render table
    if (produtosExpirando.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Nenhum produto com vencimento próximo</td></tr>';
        return;
    }
    
    tbody.innerHTML = produtosExpirando.map(produto => {
        const dataValidade = new Date(produto.prazo_validade);
        const hoje = new Date();
        const diasRestantes = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
        const statusClass = diasRestantes < 0 ? 'critical' : diasRestantes <= 30 ? 'urgent' : diasRestantes <= 60 ? 'warning' : 'info';
        const statusLabel = diasRestantes < 0 ? 'Vencido' : diasRestantes <= 30 ? 'Urgente' : diasRestantes <= 60 ? 'Atenção' : 'Normal';
        
        return `
            <tr class="expiration-row ${statusClass}">
                <td><strong>${produto.codigo}</strong> - ${produto.nome}</td>
                <td>${produto.quantidade_atual} ${produto.unidade_medida}</td>
                <td>${dataValidade.toLocaleDateString('pt-BR')}</td>
                <td><span class="days-badge ${statusClass}">${diasRestantes < 0 ? Math.abs(diasRestantes) + ' dias atrás' : diasRestantes + ' dias'}</span></td>
                <td><span class="status-badge status-${statusClass}">${statusLabel}</span></td>
                <td>
                    <button class="btn-icon" onclick="window.estoqueApp.openProductModal(${produto.id})" title="Ver Detalhes">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function filterExpirations() {
    const filter = document.getElementById('expirationFilter')?.value || 'all';
    const rows = document.querySelectorAll('#expirationTableBody tr');
    
    rows.forEach(row => {
        if (row.classList.contains('empty-state')) return;
        
        const daysBadge = row.querySelector('.days-badge');
        if (!daysBadge) return;
        
        const daysText = daysBadge.textContent;
        const days = parseInt(daysText) || 0;
        const isExpired = daysText.includes('atrás');
        
        let show = true;
        if (filter === '30' && (days > 30 || isExpired)) show = false;
        if (filter === '60' && (days > 60 || isExpired)) show = false;
        if (filter === '90' && (days > 90 || isExpired)) show = false;
        if (filter === 'expired' && !isExpired) show = false;
        
        row.style.display = show ? '' : 'none';
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
}

// ============================================
// EXPORT APP OBJECT
// ============================================

const estoqueApp = {
    // Tab functions
    initTabs,
    loadTabContent,
    
    // Dashboard
    loadDashboard,
    
    // Products
    loadProducts,
    openProductModal,
    saveProduct,
    editProduct,
    deleteProduct,
    filterProducts,
    viewProductDetails,
    
    // Bulk Operations
    toggleProductSelection,
    toggleSelectAllProducts,
    clearBulkSelection,
    bulkUpdateStatus,
    bulkTransfer,
    bulkAssignCategory,
    bulkExport,
    confirmBulkStatusUpdate,
    confirmBulkTransfer,
    confirmBulkCategoryAssign,
    
    // Categories
    loadCategories,
    openCategoryModal,
    saveCategory,
    editCategory,
    addSubCategory,
    deleteCategory,
    
    // Suppliers
    loadSuppliers,
    openSupplierModal,
    saveSupplier,
    editSupplier,
    deleteSupplier,
    filterSuppliers,
    viewSupplierPerformance,
    
    // Movements
    loadMovements,
    openMovementModal,
    saveMovement,
    updateMovementForm,
    filterMovements,
    
    // Alerts
    loadAlerts,
    filterAlerts,
    markAlertAsViewed,
    
    // Warehouses
    loadWarehouses,
    openWarehouseModal,
    saveWarehouse,
    editWarehouse,
    openTransferModal,
    updateTransferMax,
    saveTransfer,
    
    // Expirations
    loadExpirations,
    filterExpirations,
    
    // Reports
    loadReports,
    generateReport,
    
    // Modals
    createModal,
    closeModal,
    
    // Utils
    formatCurrency,
    formatNumber
};

// Make functions available globally for onclick handlers
window.estoqueApp = estoqueApp;
window.openProductModal = openProductModal;
window.openCategoryModal = openCategoryModal;
window.openSupplierModal = openSupplierModal;
window.openMovementModal = openMovementModal;
window.filterProducts = filterProducts;
window.filterSuppliers = filterSuppliers;
window.filterMovements = filterMovements;
window.filterAlerts = filterAlerts;
window.filterExpirations = filterExpirations;
window.generateReport = generateReport;
window.openWarehouseModal = openWarehouseModal;
window.updateTransferMax = updateTransferMax;
window.viewSupplierPerformance = viewSupplierPerformance;
window.toggleAdvancedFilters = toggleAdvancedFilters;

// ============================================
// BULK OPERATIONS
// ============================================

function toggleProductSelection(productId) {
    if (selectedProducts.has(productId)) {
        selectedProducts.delete(productId);
    } else {
        selectedProducts.add(productId);
    }
    updateBulkActionsBar();
    updateSelectAllCheckbox();
}

function toggleSelectAllProducts() {
    const checkbox = document.getElementById('selectAllProducts');
    if (!checkbox) return;
    
    const checkboxes = document.querySelectorAll('.product-checkbox');
    if (checkbox.checked) {
        checkboxes.forEach(cb => {
            const productId = parseInt(cb.value);
            selectedProducts.add(productId);
            cb.checked = true;
        });
    } else {
        checkboxes.forEach(cb => {
            const productId = parseInt(cb.value);
            selectedProducts.delete(productId);
            cb.checked = false;
        });
    }
    updateBulkActionsBar();
}

function updateSelectAllCheckbox() {
    const checkbox = document.getElementById('selectAllProducts');
    if (!checkbox) return;
    
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const checkedCount = document.querySelectorAll('.product-checkbox:checked').length;
    checkbox.checked = checkboxes.length > 0 && checkedCount === checkboxes.length;
    checkbox.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
}

function updateBulkActionsBar() {
    const bar = document.getElementById('bulkActionsBar');
    const countSpan = document.getElementById('selectedCount');
    
    if (!bar || !countSpan) return;
    
    const count = selectedProducts.size;
    if (count > 0) {
        bar.style.display = 'block';
        countSpan.textContent = count;
    } else {
        bar.style.display = 'none';
    }
}

function clearBulkSelection() {
    selectedProducts.clear();
    const checkboxes = document.querySelectorAll('.product-checkbox');
    checkboxes.forEach(cb => cb.checked = false);
    const selectAll = document.getElementById('selectAllProducts');
    if (selectAll) selectAll.checked = false;
    updateBulkActionsBar();
}

function bulkUpdateStatus() {
    if (selectedProducts.size === 0) {
        toast.warning('Selecione pelo menos um produto');
        return;
    }
    
    const modal = createModal({
        title: 'Alterar Status em Lote',
        body: `
            <form id="bulkStatusForm" onsubmit="window.estoqueApp.confirmBulkStatusUpdate(event)">
                <div class="form-group">
                    <label class="form-label">Novo Status *</label>
                    <select class="form-select" id="bulkStatus" required>
                        <option value="">Selecione...</option>
                        <option value="OK">OK</option>
                        <option value="BAIXO">BAIXO</option>
                        <option value="CRITICO">CRÍTICO</option>
                    </select>
                </div>
                <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-top: 0.5rem;">
                    <i class="fas fa-info-circle"></i> Esta ação afetará <strong>${selectedProducts.size}</strong> produto(s) selecionado(s).
                </p>
            </form>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Cancelar</button>
            <button class="btn-gold" onclick="document.getElementById('bulkStatusForm').requestSubmit()">
                <i class="fas fa-save"></i> Confirmar
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function confirmBulkStatusUpdate(event) {
    event.preventDefault();
    const status = document.getElementById('bulkStatus').value;
    
    if (!status) {
        toast.error('Selecione um status');
        return;
    }
    
    let updated = 0;
    selectedProducts.forEach(productId => {
        const produto = currentData.produtos.find(p => p.id === productId);
        if (produto) {
            produto.status = status.toUpperCase();
            updated++;
        }
    });
    
    closeModal();
    clearBulkSelection();
    renderProductsTable(currentData.produtos);
    toast.success(`${updated} produto(s) atualizado(s) com sucesso`);
}

function bulkTransfer() {
    if (selectedProducts.size === 0) {
        toast.warning('Selecione pelo menos um produto');
        return;
    }
    
    const armazens = currentData.armazens.filter(a => a.ativo);
    if (armazens.length < 2) {
        toast.warning('É necessário ter pelo menos 2 armazéns para realizar transferências');
        return;
    }
    
    const modal = createModal({
        title: 'Transferir Produtos em Lote',
        body: `
            <form id="bulkTransferForm" onsubmit="window.estoqueApp.confirmBulkTransfer(event)">
                <div class="form-group">
                    <label class="form-label">Armazém de Destino *</label>
                    <select class="form-select" id="bulkTransferDestino" required>
                        <option value="">Selecione...</option>
                        ${armazens.map(a => `<option value="${a.id}">${a.nome}</option>`).join('')}
                    </select>
                </div>
                <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-top: 0.5rem;">
                    <i class="fas fa-info-circle"></i> Esta ação transferirá <strong>${selectedProducts.size}</strong> produto(s) selecionado(s) para o armazém de destino.
                </p>
            </form>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Cancelar</button>
            <button class="btn-gold" onclick="document.getElementById('bulkTransferForm').requestSubmit()">
                <i class="fas fa-exchange-alt"></i> Transferir
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function confirmBulkTransfer(event) {
    event.preventDefault();
    const destinoId = parseInt(document.getElementById('bulkTransferDestino').value);
    
    if (!destinoId) {
        toast.error('Selecione um armazém de destino');
        return;
    }
    
    const destino = currentData.armazens.find(a => a.id === destinoId);
    if (!destino) {
        toast.error('Armazém de destino não encontrado');
        return;
    }
    
    let transferred = 0;
    const hoje = new Date().toISOString();
    
    selectedProducts.forEach(productId => {
        const produto = currentData.produtos.find(p => p.id === productId);
        if (produto && produto.armazem_id !== destinoId) {
            const origemId = produto.armazem_id;
            produto.armazem_id = destinoId;
            
            // Create transfer movement
            const movimento = {
                id: currentData.movimentacoes.length + 1,
                produto_id: produto.id,
                tipo: 'TRANSFERENCIA',
                quantidade: produto.quantidade_atual,
                preco_unitario: produto.custo_medio_ponderado,
                data_hora: hoje,
                usuario_id: 1, // Mock user
                origem_armazem_id: origemId,
                destino_armazem_id: destinoId,
                observacoes: `Transferência em lote`
            };
            
            currentData.movimentacoes.push(movimento);
            transferred++;
        }
    });
    
    closeModal();
    clearBulkSelection();
    renderProductsTable(currentData.produtos);
    toast.success(`${transferred} produto(s) transferido(s) com sucesso`);
}

function bulkAssignCategory() {
    if (selectedProducts.size === 0) {
        toast.warning('Selecione pelo menos um produto');
        return;
    }
    
    const categorias = currentData.categorias.filter(c => c.ativo);
    
    const modal = createModal({
        title: 'Atribuir Categoria em Lote',
        body: `
            <form id="bulkCategoryForm" onsubmit="window.estoqueApp.confirmBulkCategoryAssign(event)">
                <div class="form-group">
                    <label class="form-label">Nova Categoria *</label>
                    <select class="form-select" id="bulkCategory" required>
                        <option value="">Selecione...</option>
                        ${categorias.map(c => 
                            `<option value="${c.id}">${MockDataEstoque.getCategoriaPath(c.id)}</option>`
                        ).join('')}
                    </select>
                </div>
                <p style="color: var(--color-text-muted); font-size: 0.875rem; margin-top: 0.5rem;">
                    <i class="fas fa-info-circle"></i> Esta ação atribuirá a categoria selecionada a <strong>${selectedProducts.size}</strong> produto(s).
                </p>
            </form>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Cancelar</button>
            <button class="btn-gold" onclick="document.getElementById('bulkCategoryForm').requestSubmit()">
                <i class="fas fa-folder"></i> Atribuir
            </button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

function confirmBulkCategoryAssign(event) {
    event.preventDefault();
    const categoriaId = parseInt(document.getElementById('bulkCategory').value);
    
    if (!categoriaId) {
        toast.error('Selecione uma categoria');
        return;
    }
    
    let updated = 0;
    selectedProducts.forEach(productId => {
        const produto = currentData.produtos.find(p => p.id === productId);
        if (produto) {
            produto.categoria_id = categoriaId;
            updated++;
        }
    });
    
    closeModal();
    clearBulkSelection();
    renderProductsTable(currentData.produtos);
    toast.success(`${updated} produto(s) atualizado(s) com sucesso`);
}

function bulkExport() {
    if (selectedProducts.size === 0) {
        toast.warning('Selecione pelo menos um produto');
        return;
    }
    
    const produtos = Array.from(selectedProducts)
        .map(id => currentData.produtos.find(p => p.id === id))
        .filter(p => p);
    
    // Create CSV content
    const headers = ['Código', 'Nome', 'Categoria', 'Estoque Atual', 'Estoque Mínimo', 'Status', 'Preço Aquisição', 'Preço Venda', 'Armazém'];
    const rows = produtos.map(p => {
        const categoria = MockDataEstoque.getCategoriaById(p.categoria_id);
        const armazem = p.armazem_id ? MockDataEstoque.getArmazemById(p.armazem_id) : null;
        return [
            p.codigo,
            p.nome,
            categoria?.nome || 'N/A',
            p.quantidade_atual,
            p.quantidade_minima,
            p.status,
            p.preco_aquisicao?.toFixed(2) || '0.00',
            p.preco_venda?.toFixed(2) || 'N/A',
            armazem?.nome || 'N/A'
        ];
    });
    
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `produtos_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${produtos.length} produto(s) exportado(s) com sucesso`);
}

// Export bulk operation functions
window.toggleProductSelection = toggleProductSelection;
window.toggleSelectAllProducts = toggleSelectAllProducts;
window.clearBulkSelection = clearBulkSelection;
window.bulkUpdateStatus = bulkUpdateStatus;
window.bulkTransfer = bulkTransfer;
window.bulkAssignCategory = bulkAssignCategory;
window.bulkExport = bulkExport;
window.confirmBulkStatusUpdate = confirmBulkStatusUpdate;
window.confirmBulkTransfer = confirmBulkTransfer;
window.confirmBulkCategoryAssign = confirmBulkCategoryAssign;

// ============================================
// INTERACTIVE CHART FEATURES
// ============================================

// Chart export functionality
function exportChart(chartId) {
    const canvas = document.getElementById(chartId);
    if (!canvas) {
        toast.error('Gráfico não encontrado');
        return;
    }
    
    const chart = getChartInstance(chartId);
    if (!chart) {
        toast.error('Instância do gráfico não encontrada');
        return;
    }
    
    // Create download link
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${chartId}_${new Date().toISOString().split('T')[0]}.png`;
    link.href = url;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Gráfico exportado com sucesso');
}

// Get chart instance by ID
function getChartInstance(chartId) {
    const chartMap = {
        'statusChart': statusChart,
        'movementsChart': movementsChart,
        'abcChart': abcChart,
        'categoryValueChart': categoryValueChart,
        'turnoverChart': turnoverChart,
        'weeklyHeatmapChart': weeklyHeatmapChart,
        'supplierChart': supplierChart,
        'projectionChart': projectionChart,
        'marginChart': marginChart,
        'costEvolutionChart': costEvolutionChart,
        'warehouseUtilizationChart': warehouseUtilizationChart,
        'locationHeatmapChart': locationHeatmapChart,
        'stockAgingChart': stockAgingChart,
        'expirationTimelineChart': expirationTimelineChart
    };
    return chartMap[chartId] || null;
}

// Update movements chart with date range
function updateMovementsChart() {
    const dateFrom = document.getElementById('movementsDateFrom')?.value;
    const dateTo = document.getElementById('movementsDateTo')?.value;
    
    if (!dateFrom || !dateTo) {
        // Set default dates if not set
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        
        if (!dateFrom) {
            document.getElementById('movementsDateFrom').value = thirtyDaysAgo.toISOString().split('T')[0];
        }
        if (!dateTo) {
            document.getElementById('movementsDateTo').value = today.toISOString().split('T')[0];
        }
        
        // Reload with defaults
        setTimeout(() => updateMovementsChart(), 100);
        return;
    }
    
    loadMovementsChart(dateFrom, dateTo);
}

// Load movements chart with date filter
function loadMovementsChart(dateFrom, dateTo) {
    const ctx = document.getElementById('movementsChart');
    if (!ctx) return;
    
    if (movementsChart) {
        movementsChart.destroy();
    }
    
    const filteredMovements = currentData.movimentacoes.filter(m => {
        const movementDate = new Date(m.data_hora).toISOString().split('T')[0];
        return movementDate >= dateFrom && movementDate <= dateTo;
    });
    
    // Group by date
    const grouped = {};
    filteredMovements.forEach(m => {
        const date = new Date(m.data_hora).toISOString().split('T')[0];
        if (!grouped[date]) {
            grouped[date] = { entrada: 0, saida: 0, transferencia: 0 };
        }
        if (m.tipo.includes('ENTRADA')) grouped[date].entrada += m.quantidade;
        else if (m.tipo.includes('SAIDA')) grouped[date].saida += m.quantidade;
        else if (m.tipo.includes('TRANSFERENCIA')) grouped[date].transferencia += m.quantidade;
    });
    
    const dates = Object.keys(grouped).sort();
    const entradaData = dates.map(d => grouped[d].entrada);
    const saidaData = dates.map(d => grouped[d].saida);
    const transferenciaData = dates.map(d => grouped[d].transferencia);
    
    movementsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.map(d => new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })),
            datasets: [
                {
                    label: 'Entradas',
                    data: entradaData,
                    borderColor: '#00E676',
                    backgroundColor: 'rgba(0, 230, 118, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Saídas',
                    data: saidaData,
                    borderColor: '#FF5252',
                    backgroundColor: 'rgba(255, 82, 82, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Transferências',
                    data: transferenciaData,
                    borderColor: '#FFD54F',
                    backgroundColor: 'rgba(255, 213, 79, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#B0B0B0', font: { size: 10 } }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    ticks: { color: '#B0B0B0', font: { size: 9 } },
                    grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: '#B0B0B0', font: { size: 9 } },
                    grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const element = elements[0];
                    const date = dates[element.index];
                    drillDownMovements(date);
                }
            }
        }
    });
}

// Drill-down for movements chart
function drillDownMovements(date) {
    const movements = currentData.movimentacoes.filter(m => {
        const movementDate = new Date(m.data_hora).toISOString().split('T')[0];
        return movementDate === date;
    });
    
    const modal = createModal({
        title: `Movimentações - ${new Date(date).toLocaleDateString('pt-BR')}`,
        body: `
            <div style="max-height: 400px; overflow-y: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Produto</th>
                            <th>Tipo</th>
                            <th>Quantidade</th>
                            <th>Usuário</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${movements.map(m => {
                            const produto = MockDataEstoque.getProdutoById(m.produto_id);
                            const usuario = MockDataEstoque.getUsuarioById(m.usuario_id);
                            const hora = new Date(m.data_hora).toLocaleTimeString('pt-BR');
                            return `
                                <tr>
                                    <td>${hora}</td>
                                    <td>${produto?.nome || 'N/A'}</td>
                                    <td>${getMovementTypeLabel(m.tipo)}</td>
                                    <td>${m.quantidade} ${produto?.unidade_medida || ''}</td>
                                    <td>${usuario?.nome || 'N/A'}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `,
        footer: `
            <button class="btn-secondary" onclick="window.estoqueApp.closeModal()">Fechar</button>
        `
    });
    
    document.getElementById('modalContainer').appendChild(modal);
}

// Update turnover chart with days filter
function updateTurnoverChart() {
    const days = parseInt(document.getElementById('turnoverDays')?.value || 30);
    const insights = analytics.calculateProductTurnover(currentData.produtos, currentData.movimentacoes, days);
    loadTurnoverChart(insights);
}

// Update supplier chart with days filter
function updateSupplierChart() {
    const days = parseInt(document.getElementById('supplierDays')?.value || 90);
    const insights = analytics.calculateSupplierPerformance(currentData.fornecedores, currentData.movimentacoes, days);
    loadSupplierChart(insights);
}

// Update projection chart with days filter
function updateProjectionChart() {
    const days = parseInt(document.getElementById('projectionDays')?.value || 30);
    const insights = analytics.calculateStockProjection(currentData.produtos, currentData.movimentacoes, days);
    loadProjectionChart(insights);
}

// Update cost evolution chart with date range
function updateCostEvolutionChart() {
    const dateFrom = document.getElementById('costEvolutionDateFrom')?.value;
    const dateTo = document.getElementById('costEvolutionDateTo')?.value;
    
    if (!dateFrom || !dateTo) {
        const today = new Date();
        const ninetyDaysAgo = new Date(today);
        ninetyDaysAgo.setDate(today.getDate() - 90);
        
        if (!dateFrom) {
            document.getElementById('costEvolutionDateFrom').value = ninetyDaysAgo.toISOString().split('T')[0];
        }
        if (!dateTo) {
            document.getElementById('costEvolutionDateTo').value = today.toISOString().split('T')[0];
        }
        
        setTimeout(() => updateCostEvolutionChart(), 100);
        return;
    }
    
    const insights = analytics.calculateCostEvolution(currentData.produtos, currentData.movimentacoes, dateFrom, dateTo);
    loadCostEvolutionChart(insights);
}

// Update weekly heatmap chart
function updateWeeklyHeatmapChart() {
    const week = document.getElementById('weeklyHeatmapWeek')?.value;
    if (!week) return;
    
    const insights = analytics.calculateWeeklyActivity(currentData.movimentacoes, week);
    loadWeeklyHeatmapChart(insights);
}

// Toggle comparison mode for charts
let comparisonMode = {};

function toggleComparisonMode(chartId) {
    if (!comparisonMode[chartId]) {
        comparisonMode[chartId] = false;
    }
    
    comparisonMode[chartId] = !comparisonMode[chartId];
    const btn = event.target.closest('.chart-btn');
    if (btn) {
        btn.classList.toggle('active', comparisonMode[chartId]);
    }
    
    // For supplier chart, show comparison view
    if (chartId === 'supplierChart' && comparisonMode[chartId]) {
        showSupplierComparison();
    } else if (chartId === 'supplierChart') {
        const insights = analytics.calculateSupplierPerformance(currentData.fornecedores, currentData.movimentacoes, 90);
        loadSupplierChart(insights);
    }
    
    toast.info(comparisonMode[chartId] ? 'Modo comparação ativado' : 'Modo comparação desativado');
}

// Show supplier comparison view
function showSupplierComparison() {
    const insights = analytics.calculateSupplierPerformance(currentData.fornecedores, currentData.movimentacoes, 90);
    const ctx = document.getElementById('supplierChart');
    if (!ctx) return;
    
    if (supplierChart) supplierChart.destroy();
    
    // Sort by performance score
    const sorted = insights.suppliers.sort((a, b) => b.score - a.score);
    const topSuppliers = sorted.slice(0, 5);
    
    supplierChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topSuppliers.map(s => s.nome),
            datasets: [
                {
                    label: 'Volume (R$)',
                    data: topSuppliers.map(s => s.valor_total),
                    backgroundColor: 'rgba(255, 213, 79, 0.8)',
                    borderColor: '#FFD54F',
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Score',
                    data: topSuppliers.map(s => s.score),
                    type: 'line',
                    borderColor: '#00E676',
                    backgroundColor: 'rgba(0, 230, 118, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 2,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#B0B0B0', font: { size: 10 } }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.datasetIndex === 0) {
                                return `Volume: ${formatCurrency(context.parsed.y)}`;
                            }
                            return `Score: ${context.parsed.y.toFixed(1)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#B0B0B0', font: { size: 9 } },
                    grid: { display: false }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    ticks: { 
                        color: '#B0B0B0', 
                        font: { size: 9 },
                        callback: function(value) {
                            if (value >= 1000) return 'R$ ' + (value / 1000).toFixed(1) + 'k';
                            return 'R$ ' + Math.round(value);
                        }
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    ticks: { color: '#B0B0B0', font: { size: 9 } },
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
}

// Export functions to window
window.exportChart = exportChart;
window.updateMovementsChart = updateMovementsChart;
window.updateTurnoverChart = updateTurnoverChart;
window.updateSupplierChart = updateSupplierChart;
window.updateProjectionChart = updateProjectionChart;
window.updateCostEvolutionChart = updateCostEvolutionChart;
window.updateWeeklyHeatmapChart = updateWeeklyHeatmapChart;
window.toggleComparisonMode = toggleComparisonMode;

// ============================================
// QUICK ACTIONS PANEL & KEYBOARD SHORTCUTS
// ============================================

let quickActionsOpen = false;

function toggleQuickActions() {
    const panel = document.getElementById('quickActionsPanel');
    if (!panel) return;
    
    quickActionsOpen = !quickActionsOpen;
    
    if (quickActionsOpen) {
        panel.style.display = 'block';
        createQuickActionsOverlay();
        // Focus first button for keyboard navigation
        setTimeout(() => {
            const firstBtn = panel.querySelector('.quick-action-btn');
            if (firstBtn) firstBtn.focus();
        }, 100);
    } else {
        panel.style.display = 'none';
        removeQuickActionsOverlay();
    }
}

function createQuickActionsOverlay() {
    if (document.getElementById('quickActionsOverlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'quickActionsOverlay';
    overlay.className = 'quick-actions-overlay';
    overlay.onclick = toggleQuickActions;
    document.body.appendChild(overlay);
}

function removeQuickActionsOverlay() {
    const overlay = document.getElementById('quickActionsOverlay');
    if (overlay) overlay.remove();
}

// Keyboard shortcuts handler
function handleKeyboardShortcuts(event) {
    // Don't trigger shortcuts when typing in inputs
    if (event.target.tagName === 'INPUT' || 
        event.target.tagName === 'TEXTAREA' || 
        event.target.isContentEditable) {
        // Allow Ctrl+K for search
        if (event.ctrlKey && event.key === 'k') {
            event.preventDefault();
            triggerQuickSearch();
        }
        return;
    }
    
    // Toggle quick actions panel with "?"
    if (event.key === '?' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
        event.preventDefault();
        toggleQuickActions();
        return;
    }
    
    // Close modals with Escape
    if (event.key === 'Escape') {
        if (quickActionsOpen) {
            toggleQuickActions();
            return;
        }
        const modal = document.querySelector('.modal.active');
        if (modal) {
            closeModal();
            return;
        }
    }
    
    // Only process shortcuts when quick actions panel is closed (unless it's Escape)
    if (quickActionsOpen && event.key !== 'Escape') {
        return;
    }
    
    // Quick actions shortcuts
    switch(event.key.toLowerCase()) {
        case 'n':
            if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
                event.preventDefault();
                openProductModal();
            }
            break;
        case 'p':
            if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
                event.preventDefault();
                loadTabContent('produtos');
            }
            break;
        case 'f':
            if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
                event.preventDefault();
                loadTabContent('produtos');
                setTimeout(() => {
                    const searchInput = document.getElementById('productSearch');
                    if (searchInput) {
                        searchInput.focus();
                        searchInput.select();
                    }
                }, 100);
            }
            break;
        case 'm':
            if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
                event.preventDefault();
                openMovementModal();
            }
            break;
        case 'v':
            if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
                event.preventDefault();
                loadTabContent('movimentacoes');
            }
            break;
        case 'd':
            if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
                event.preventDefault();
                loadTabContent('dashboard');
            }
            break;
        case 'a':
            if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
                event.preventDefault();
                loadTabContent('alertas');
            }
            break;
        case 'r':
            if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
                event.preventDefault();
                loadTabContent('relatorios');
            }
            break;
    }
    
    // Ctrl+K for quick search
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        triggerQuickSearch();
    }
}

// Quick search function
function triggerQuickSearch() {
    // Find the active tab and focus its search input
    const activeTab = document.querySelector('.tab-panel.active');
    if (!activeTab) return;
    
    let searchInput = null;
    
    // Try to find search input in active tab
    if (activeTab.id === 'produtos-tab') {
        searchInput = document.getElementById('productSearch');
    } else if (activeTab.id === 'fornecedores-tab') {
        searchInput = document.getElementById('supplierSearch');
    } else if (activeTab.id === 'movimentacoes-tab') {
        searchInput = document.getElementById('movementSearch');
    } else if (activeTab.id === 'alertas-tab') {
        searchInput = document.getElementById('alertSearch');
    }
    
    if (searchInput) {
        searchInput.focus();
        searchInput.select();
        toast.info('Digite para buscar...');
    } else {
        // If no search input, switch to products tab
        loadTabContent('produtos');
        setTimeout(() => {
            const productSearch = document.getElementById('productSearch');
            if (productSearch) {
                productSearch.focus();
                productSearch.select();
            }
        }, 100);
    }
}

// Keyboard navigation in quick actions panel
function handleQuickActionsNavigation(event) {
    if (!quickActionsOpen) return;
    
    const panel = document.getElementById('quickActionsPanel');
    if (!panel) return;
    
    const buttons = Array.from(panel.querySelectorAll('.quick-action-btn'));
    const currentIndex = buttons.findIndex(btn => btn === document.activeElement);
    
    switch(event.key) {
        case 'ArrowDown':
            event.preventDefault();
            const nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
            buttons[nextIndex]?.focus();
            break;
        case 'ArrowUp':
            event.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
            buttons[prevIndex]?.focus();
            break;
        case 'Enter':
        case ' ':
            if (document.activeElement.classList.contains('quick-action-btn')) {
                event.preventDefault();
                document.activeElement.click();
            }
            break;
    }
}

// Export functions
window.toggleQuickActions = toggleQuickActions;

// ============================================
// INITIALIZATION
// ============================================

// ============================================
// REAL-TIME UPDATES & NOTIFICATIONS SYSTEM
// ============================================

let realTimeUpdateInterval = null;
let lastUpdateTimestamp = Date.now();
let notificationCenter = [];
let isRealTimeEnabled = true;

// Notification Center
function createNotificationCenter() {
    if (document.getElementById('notificationCenter')) return;
    
    const center = document.createElement('div');
    center.id = 'notificationCenter';
    center.className = 'notification-center';
    center.innerHTML = `
        <div class="notification-center-header">
            <h3><i class="fas fa-bell"></i> Notificações</h3>
            <div class="notification-center-actions">
                <button class="notification-action-btn" onclick="markAllNotificationsAsRead()" title="Marcar todas como lidas">
                    <i class="fas fa-check-double"></i>
                </button>
                <button class="notification-action-btn" onclick="clearAllNotifications()" title="Limpar todas">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="notification-action-btn" onclick="toggleNotificationCenter()" title="Fechar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <div class="notification-center-content" id="notificationCenterContent">
            <div class="empty-notifications">
                <i class="fas fa-bell-slash"></i>
                <p>Nenhuma notificação</p>
            </div>
        </div>
    `;
    center.style.display = 'none';
    document.body.appendChild(center);
}

function toggleNotificationCenter() {
    const center = document.getElementById('notificationCenter');
    if (!center) {
        createNotificationCenter();
        return;
    }
    
    center.style.display = center.style.display === 'none' ? 'block' : 'none';
    if (center.style.display === 'block') {
        renderNotifications();
    }
}

function addNotification(type, title, message, data = {}) {
    const notification = {
        id: Date.now(),
        type, // 'info', 'success', 'warning', 'error', 'alert'
        title,
        message,
        data,
        timestamp: new Date().toISOString(),
        read: false
    };
    
    notificationCenter.unshift(notification);
    
    // Keep only last 50 notifications
    if (notificationCenter.length > 50) {
        notificationCenter = notificationCenter.slice(0, 50);
    }
    
    // Save to localStorage
    localStorage.setItem('estoque_notifications', JSON.stringify(notificationCenter));
    
    // Render notification center if open
    if (document.getElementById('notificationCenter')?.style.display === 'block') {
        renderNotifications();
    }
    
    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
        showBrowserNotification(title, message, type);
    }
    
    // Update notification badge
    updateNotificationBadge();
    
    // Show toast
    if (toast && toast[type]) {
        toast[type](message);
    }
}

function renderNotifications() {
    const content = document.getElementById('notificationCenterContent');
    if (!content) return;
    
    if (notificationCenter.length === 0) {
        content.innerHTML = `
            <div class="empty-notifications">
                <i class="fas fa-bell-slash"></i>
                <p>Nenhuma notificação</p>
            </div>
        `;
        return;
    }
    
    content.innerHTML = notificationCenter.map(notif => `
        <div class="notification-item ${notif.read ? 'read' : ''}" onclick="openNotification(${notif.id})">
            <div class="notification-icon ${notif.type}">
                <i class="fas fa-${getNotificationIcon(notif.type)}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">${formatNotificationTime(notif.timestamp)}</div>
            </div>
            <div class="notification-actions">
                ${!notif.read ? `<button class="notification-mark-read" onclick="event.stopPropagation(); markNotificationAsRead(${notif.id})" title="Marcar como lida">
                    <i class="fas fa-circle"></i>
                </button>` : ''}
                <button class="notification-delete" onclick="event.stopPropagation(); deleteNotification(${notif.id})" title="Remover">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function getNotificationIcon(type) {
    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'times-circle',
        'alert': 'exclamation-circle'
    };
    return icons[type] || 'bell';
}

function formatNotificationTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    
    if (diff < 60) return 'Agora';
    if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} h atrás`;
    return time.toLocaleDateString('pt-BR');
}

function markNotificationAsRead(id) {
    const notif = notificationCenter.find(n => n.id === id);
    if (notif) {
        notif.read = true;
        localStorage.setItem('estoque_notifications', JSON.stringify(notificationCenter));
        renderNotifications();
        updateNotificationBadge();
    }
}

function markAllNotificationsAsRead() {
    notificationCenter.forEach(n => n.read = true);
    localStorage.setItem('estoque_notifications', JSON.stringify(notificationCenter));
    renderNotifications();
    updateNotificationBadge();
    toast.success('Todas as notificações marcadas como lidas');
}

function deleteNotification(id) {
    notificationCenter = notificationCenter.filter(n => n.id !== id);
    localStorage.setItem('estoque_notifications', JSON.stringify(notificationCenter));
    renderNotifications();
    updateNotificationBadge();
}

function clearAllNotifications() {
    if (confirm('Tem certeza que deseja limpar todas as notificações?')) {
        notificationCenter = [];
        localStorage.setItem('estoque_notifications', JSON.stringify(notificationCenter));
        renderNotifications();
        updateNotificationBadge();
        toast.success('Todas as notificações foram removidas');
    }
}

function openNotification(id) {
    const notif = notificationCenter.find(n => n.id === id);
    if (!notif) return;
    
    markNotificationAsRead(id);
    
    // Handle notification actions based on type/data
    if (notif.data.action) {
        switch(notif.data.action) {
            case 'view_product':
                if (notif.data.productId) {
                    viewProductDetails(notif.data.productId);
                }
                break;
            case 'view_alert':
                loadTabContent('alertas');
                break;
            case 'view_movement':
                loadTabContent('movimentacoes');
                break;
        }
    }
    
    toggleNotificationCenter();
}

function updateNotificationBadge() {
    const unreadCount = notificationCenter.filter(n => !n.read).length;
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        badge.textContent = unreadCount > 0 ? (unreadCount > 99 ? '99+' : unreadCount) : '';
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

function showBrowserNotification(title, message, type = 'info') {
    if (Notification.permission !== 'granted') return;
    
    const icon = type === 'error' ? '⚠️' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    
    new Notification(title, {
        body: message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'estoque-notification',
        requireInteraction: false
    });
}

function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                toast.success('Notificações do navegador ativadas');
            }
        });
    }
}

// Real-time updates
function startRealTimeUpdates() {
    if (realTimeUpdateInterval) return;
    
    // Update every 30 seconds
    realTimeUpdateInterval = setInterval(() => {
        if (!isRealTimeEnabled) return;
        
        checkForUpdates();
    }, 30000);
    
    // Initial check after 5 seconds
    setTimeout(checkForUpdates, 5000);
}

function stopRealTimeUpdates() {
    if (realTimeUpdateInterval) {
        clearInterval(realTimeUpdateInterval);
        realTimeUpdateInterval = null;
    }
}

function checkForUpdates() {
    const now = Date.now();
    
    // Simulate checking for new data (in real app, this would be an API call)
    // For now, we'll simulate some updates occasionally
    
    // Check for new alerts
    const newAlerts = currentData.alertas.filter(a => 
        !a.visto && new Date(a.data_criacao) > new Date(lastUpdateTimestamp)
    );
    
    if (newAlerts.length > 0) {
        newAlerts.forEach(alert => {
            addNotification('alert', 'Novo Alerta', alert.mensagem, {
                action: 'view_alert',
                alertId: alert.id
            });
        });
    }
    
    // Check for critical stock levels
    const criticalProducts = currentData.produtos.filter(p => 
        p.ativo && p.status === 'CRITICO' && 
        p.quantidade_atual <= p.quantidade_minima * 0.5
    );
    
    if (criticalProducts.length > 0 && Math.random() > 0.7) {
        const product = criticalProducts[Math.floor(Math.random() * criticalProducts.length)];
        addNotification('warning', 'Estoque Crítico', 
            `${product.nome} está com estoque crítico (${product.quantidade_atual} ${product.unidade_medida})`, {
            action: 'view_product',
            productId: product.id
        });
    }
    
    // Check for expiring products
    const expiringProducts = MockDataEstoque.getProdutosExpirando(7);
    if (expiringProducts.length > 0 && Math.random() > 0.8) {
        const product = expiringProducts[Math.floor(Math.random() * expiringProducts.length)];
        const daysLeft = Math.ceil((new Date(product.prazo_validade) - new Date()) / (1000 * 60 * 60 * 24));
        addNotification('warning', 'Produto Vencendo', 
            `${product.nome} vence em ${daysLeft} dia(s)`, {
            action: 'view_product',
            productId: product.id
        });
    }
    
    // Update last timestamp
    lastUpdateTimestamp = now;
    
    // Refresh current view if on dashboard
    const activeTab = document.querySelector('.tab-panel.active');
    if (activeTab && activeTab.id === 'dashboard-tab') {
        // Soft refresh - only update metrics and charts, not full reload
        refreshDashboardMetrics();
    }
}

function refreshDashboardMetrics() {
    // Only refresh if dashboard is visible
    const dashboardTab = document.getElementById('dashboard-tab');
    if (!dashboardTab || !dashboardTab.classList.contains('active')) return;
    
    // Refresh metrics
    const metrics = MockDataEstoque.getDashboardMetrics();
    const metricsContainer = document.getElementById('dashboardMetrics');
    if (metricsContainer) {
        // Update metrics without full reload
        const metricCards = metricsContainer.querySelectorAll('.metric-card');
        // Metrics will be updated on next full dashboard load
    }
    
    // Refresh recent activities
    loadRecentActivities();
}

// Create notification button in header
function createNotificationButton() {
    // Check if button already exists
    if (document.getElementById('notificationButton')) return;
    
    // Find header or create notification area
    const header = document.querySelector('.page-header');
    if (!header) return;
    
    const button = document.createElement('button');
    button.id = 'notificationButton';
    button.className = 'notification-button';
    button.innerHTML = `
        <i class="fas fa-bell"></i>
        <span id="notificationBadge" class="notification-badge"></span>
    `;
    button.onclick = toggleNotificationCenter;
    button.title = 'Notificações';
    
    // Insert after header title
    header.appendChild(button);
}

// Load notifications from localStorage
function loadNotifications() {
    const saved = localStorage.getItem('estoque_notifications');
    if (saved) {
        try {
            notificationCenter = JSON.parse(saved);
            updateNotificationBadge();
        } catch (e) {
            console.error('Error loading notifications:', e);
            notificationCenter = [];
        }
    }
}

// Export functions
window.toggleNotificationCenter = toggleNotificationCenter;
window.markNotificationAsRead = markNotificationAsRead;
window.markAllNotificationsAsRead = markAllNotificationsAsRead;
window.deleteNotification = deleteNotification;
window.clearAllNotifications = clearAllNotifications;
window.openNotification = openNotification;

document.addEventListener('DOMContentLoaded', function() {
    // Wait for ToastManager and LoadingManager to be available
    if (typeof ToastManager !== 'undefined') {
        toast = new ToastManager();
    } else {
        // Fallback if ToastManager not loaded yet
        toast = {
            success: (msg) => console.log('Success:', msg),
            error: (msg) => console.error('Error:', msg),
            warning: (msg) => console.warn('Warning:', msg),
            info: (msg) => console.info('Info:', msg)
        };
    }
    
    if (typeof LoadingManager !== 'undefined') {
        loading = new LoadingManager();
    } else {
        loading = {
            show: (msg) => console.log('Loading:', msg),
            hide: () => console.log('Loading hidden')
        };
    }
    
    // Hide loading indicator
    const loadingIndicator = document.getElementById('appLoading');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    initTabs();
    loadTabContent('dashboard');
    
    // Load toast container if not exists
    if (!document.getElementById('toastContainer')) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Initialize notifications system
    loadNotifications();
    createNotificationCenter();
    createNotificationButton();
    requestNotificationPermission();
    
    // Start real-time updates
    startRealTimeUpdates();
    
    // Initialize keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    document.addEventListener('keydown', handleQuickActionsNavigation);
    
    // Show hint about keyboard shortcuts on first load
    const hasSeenHint = localStorage.getItem('estoque_quick_actions_hint');
    if (!hasSeenHint) {
        setTimeout(() => {
            toast.info('Pressione <kbd>?</kbd> para ver ações rápidas e atalhos de teclado', 5000);
            localStorage.setItem('estoque_quick_actions_hint', 'true');
        }, 2000);
    }
    
    // Stop updates when page is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopRealTimeUpdates();
        } else {
            startRealTimeUpdates();
            checkForUpdates();
        }
    });
});

export default estoqueApp;

