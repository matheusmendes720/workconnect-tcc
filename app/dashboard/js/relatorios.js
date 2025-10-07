// Gráfico Receita x Despesa por Mês
const receitaDespesaCtx = document.getElementById('receitaDespesaChart').getContext('2d');
new Chart(receitaDespesaCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
            {
                label: 'Receita',
                data: [12000, 13500, 15000, 16800, 17900, 18450],
                borderColor: '#16a34a',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#16a34a'
            },
            {
                label: 'Despesa',
                data: [8000, 9000, 9500, 11000, 12000, 12000],
                borderColor: '#dc2626',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#dc2626'
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
    exportTableToCSV('transacoesTable', 'transacoes-periodo.csv');
});

