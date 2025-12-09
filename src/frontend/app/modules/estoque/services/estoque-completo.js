/**
 * Stock Management System - Main JavaScript
 * Frontend-only implementation with mock data
 * NO BACKEND - All operations work with in-memory data
 */

import { MockDataEstoque } from './mock-data-estoque.js';
import { ChartsAnalytics } from './charts-analytics.js';

// ============================================
// GLOBAL STATE & INITIALIZATION
// ============================================

let currentData = {
    produtos: [...MockDataEstoque.produtos],
    categorias: [...MockDataEstoque.categorias],
    fornecedores: [...MockDataEstoque.fornecedores],
    movimentacoes: [...MockDataEstoque.movimentacoes],
    alertas: [...MockDataEstoque.alertas],
    produto_fornecedor: [...MockDataEstoque.produto_fornecedor]
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

function renderProductsTable(produtos) {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    
    if (produtos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state">Nenhum produto encontrado</td></tr>';
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
        
        return `
            <tr>
                <td><strong>${produto.codigo}</strong></td>
                <td>${produto.nome}</td>
                <td>${categoria?.nome || 'N/A'}</td>
                <td>${produto.quantidade_atual} ${produto.unidade_medida}</td>
                <td>${produto.quantidade_minima} ${produto.unidade_medida}</td>
                <td><span class="status-badge status-${statusClass}">${statusLabel}</span></td>
                <td>
                    <div class="action-buttons">
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
}

function populateCategoryFilter() {
    const select = document.getElementById('categoryFilter');
    if (!select) return;
    
    const options = currentData.categorias
        .filter(c => c.ativo)
        .map(c => `<option value="${c.id}">${MockDataEstoque.getCategoriaPath(c.id)}</option>`)
        .join('');
    
    select.innerHTML = '<option value="">Todas as categorias</option>' + options;
}

function filterProducts() {
    const search = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const categoryId = document.getElementById('categoryFilter')?.value || '';
    const status = document.getElementById('statusFilter')?.value || '';
    
    let filtered = currentData.produtos.filter(p => {
        const matchSearch = !search || 
            p.codigo.toLowerCase().includes(search) || 
            p.nome.toLowerCase().includes(search);
        const matchCategory = !categoryId || p.categoria_id == categoryId;
        const matchStatus = !status || p.status === status;
        
        return matchSearch && matchCategory && matchStatus;
    });
    
    renderProductsTable(filtered);
}

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
                        <label class="form-label">Unidade de Medida</label>
                        <select class="form-select" id="prodUnidade">
                            <option value="UN" ${produto?.unidade_medida === 'UN' ? 'selected' : ''}>UN - Unidade</option>
                            <option value="KG" ${produto?.unidade_medida === 'KG' ? 'selected' : ''}>KG - Quilograma</option>
                            <option value="L" ${produto?.unidade_medida === 'L' ? 'selected' : ''}>L - Litro</option>
                            <option value="M" ${produto?.unidade_medida === 'M' ? 'selected' : ''}>M - Metro</option>
                            <option value="CX" ${produto?.unidade_medida === 'CX' ? 'selected' : ''}>CX - Caixa</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Localização Física</label>
                    <input type="text" class="form-input" id="prodLocalizacao" value="${produto?.localizacao_fisica || ''}">
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
        custo_medio_ponderado: currentEditingId ? currentData.produtos.find(p => p.id === currentEditingId)?.custo_medio_ponderado || 0 : 0,
        unidade_medida: document.getElementById('prodUnidade').value,
        localizacao_fisica: document.getElementById('prodLocalizacao').value,
        prazo_validade: null,
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
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Nenhum fornecedor encontrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = fornecedores.map(fornecedor => {
        const produtosCount = currentData.produto_fornecedor.filter(pf => pf.fornecedor_id === fornecedor.id).length;
        
        return `
            <tr>
                <td><strong>${fornecedor.razao_social}</strong><br><small style="color: var(--color-text-muted);">${fornecedor.nome_fantasia || ''}</small></td>
                <td>${fornecedor.cnpj}</td>
                <td>${fornecedor.telefone || 'N/A'}</td>
                <td>${fornecedor.email || 'N/A'}</td>
                <td>${produtosCount} produto(s)</td>
                <td>
                    <div class="action-buttons">
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

function loadReports() {
    // Reports will be generated on demand
}

function generateReport() {
    const type = document.getElementById('reportType')?.value;
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
                html = generateStockReport();
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
        }
        
        container.innerHTML = html;
        loading.hide();
        toast.success('Relatório gerado com sucesso!');
    }, 500);
}

function generateStockReport() {
    const produtos = currentData.produtos.filter(p => p.ativo);
    
    return `
        <div class="table-container">
            <h3 style="margin-bottom: 1rem;">Relatório de Estoque Geral</h3>
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
    return `
        <div class="table-container">
            <h3 style="margin-bottom: 1rem;">Relatório de Fornecedores</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Razão Social</th>
                        <th>CNPJ</th>
                        <th>Produtos Fornecidos</th>
                        <th>Tempo Médio Entrega</th>
                    </tr>
                </thead>
                <tbody>
                    ${currentData.fornecedores.filter(f => f.ativo).map(f => {
                        const produtosCount = currentData.produto_fornecedor.filter(pf => pf.fornecedor_id === f.id).length;
                        return `
                            <tr>
                                <td>${f.razao_social}</td>
                                <td>${f.cnpj}</td>
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
window.generateReport = generateReport;

// ============================================
// INITIALIZATION
// ============================================

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
    
    initTabs();
    loadTabContent('dashboard');
    
    // Load toast container if not exists
    if (!document.getElementById('toastContainer')) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
});

export default estoqueApp;

