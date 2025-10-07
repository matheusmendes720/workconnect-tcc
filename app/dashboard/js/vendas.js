// Gráfico de Vendas por Dia
const vendasBarCtx = document.getElementById('vendasBarChart').getContext('2d');
new Chart(vendasBarCtx, {
    type: 'bar',
    data: {
        labels: ['01/06', '05/06', '09/06', '13/06', '17/06', '21/06', '25/06', '29/06'],
        datasets: [{
            label: 'Vendas (R$)',
            data: [800, 1200, 950, 1500, 1800, 2100, 1700, 2200],
            backgroundColor: '#16a34a'
        }]
    },
    options: {
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: { ticks: { color: '#a3a3a3' }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#a3a3a3' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
    }
});

// Gráfico de Vendas por Canal
const vendasCanalPieCtx = document.getElementById('vendasCanalPieChart').getContext('2d');
new Chart(vendasCanalPieCtx, {
    type: 'pie',
    data: {
        labels: ['Loja Física', 'Online'],
        datasets: [{
            data: [60, 40],
            backgroundColor: [
                '#dc2626',
                '#16a34a'
            ]
        }]
    },
    options: {
        plugins: {
            legend: { labels: { color: '#f5f5f5', font: { weight: 'bold' } } }
        }
    }
});

// Exportar tabela para CSV
document.getElementById('exportBtn').addEventListener('click', function () {
    exportTableToCSV('vendasTable', 'ultimas-vendas.csv');
});

