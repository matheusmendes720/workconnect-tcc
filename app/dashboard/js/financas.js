// Gráfico de Evolução do Saldo
const saldoCtx = document.getElementById('saldoChart').getContext('2d');
new Chart(saldoCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Saldo (R$)',
            data: [12000, 13500, 15000, 16800, 17900, 18450],
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

// Gráfico de Despesas por Categoria
const despesasPieCtx = document.getElementById('despesasPieChart').getContext('2d');
new Chart(despesasPieCtx, {
    type: 'pie',
    data: {
        labels: ['Fornecedores', 'Salários', 'Impostos', 'Outros'],
        datasets: [{
            data: [40, 30, 15, 15],
            backgroundColor: [
                '#dc2626',
                '#facc15',
                '#16a34a',
                '#a3a3a3'
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
    exportTableToCSV('lancamentosTable', 'lancamentos-recentes.csv');
});

