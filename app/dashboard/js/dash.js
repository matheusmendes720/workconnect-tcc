// --- Chart.js: Fluxo de Caixa ---
const fluxoCaixaCtx = document.getElementById('fluxoCaixaChart').getContext('2d');
const fluxoCaixaChart = new Chart(fluxoCaixaCtx, {
    type: 'line',
    data: {
        labels: [
            '17/05', '19/05', '21/05', '23/05', '25/05', '27/05', '29/05',
            '31/05', '02/06', '04/06', '06/06', '08/06', '10/06', '12/06', '14/06'
        ],
        datasets: [{
            label: 'Entradas',
            data: [1200, 1500, 1800, 1600, 2000, 2200, 2100, 2500, 2300, 2400, 2600, 2700, 2900, 3100, 3300],
            borderColor: '#16a34a',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#16a34a'
        }, {
            label: 'Saídas',
            data: [800, 900, 1000, 950, 1100, 1200, 1150, 1300, 1250, 1400, 1350, 1500, 1450, 1600, 1550],
            borderColor: '#dc2626',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#dc2626'
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

// --- To-Do List Interatividade ---
const todoList = document.getElementById('todoList');
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
let todos = [
    { text: "Enviar relatório financeiro", done: false },
    { text: "Repor estoque de produto A", done: true },
    { text: "Agendar reunião com fornecedor", done: false },
    { text: "Verificar pagamentos pendentes", done: false }
];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <input type="checkbox" id="todo-${idx}" ${todo.done ? 'checked' : ''}>
            <label for="todo-${idx}">${todo.text}</label>
            <button class="todo-remove-btn" title="Remover" aria-label="Remover tarefa"><i class="fas fa-trash"></i></button>
        `;
        // Checkbox toggle
        li.querySelector('input').addEventListener('change', (e) => {
            todos[idx].done = e.target.checked;
            renderTodos();
        });
        // Remove button
        li.querySelector('.todo-remove-btn').addEventListener('click', () => {
            todos.splice(idx, 1);
            renderTodos();
        });
        todoList.appendChild(li);
    });
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = todoInput.value.trim();
    if (value) {
        todos.unshift({ text: value, done: false });
        todoInput.value = '';
        renderTodos();
    }
});

renderTodos();

// --- Exportar Tabela para CSV ---
document.getElementById('exportBtn').addEventListener('click', function () {
    exportTableToCSV('transactionsTable', 'transacoes-recentes.csv');
});

