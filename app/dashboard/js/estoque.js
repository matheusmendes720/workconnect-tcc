// Gráfico de Evolução do Estoque
const estoqueCtx = document.getElementById('estoqueChart').getContext('2d');
new Chart(estoqueCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Itens em Estoque',
            data: [110, 115, 120, 118, 122, 120],
            borderColor: '#16a34a',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#16a34a'
        }]
    },
    options: {
        plugins: {
            legend: { labels: { color: '#f5f5f5', font: { weight: 'bold' } } }
        },
        scales: {
            x: { ticks: { color: '#a3a3a3' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#a3a3a3' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
    }
});

// Gráfico de Entradas/Saídas por Semana
const movimentacaoCtx = document.getElementById('movimentacaoChart').getContext('2d');
new Chart(movimentacaoCtx, {
    type: 'bar',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
            {
                label: 'Entradas',
                data: [20, 15, 25, 18],
                backgroundColor: '#16a34a'
            },
            {
                label: 'Saídas',
                data: [10, 12, 8, 15],
                backgroundColor: '#dc2626'
            }
        ]
    },
    options: {
        plugins: {
            legend: { labels: { color: '#f5f5f5', font: { weight: 'bold' } } }
        },
        scales: {
            x: { ticks: { color: '#a3a3a3' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#a3a3a3' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
    }
});

// Exportar tabela para CSV
document.getElementById('exportBtn').addEventListener('click', function () {
    exportTableToCSV('produtosTable', 'produtos-estoque.csv');
});

