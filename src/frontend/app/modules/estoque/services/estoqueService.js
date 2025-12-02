// ============================================
// WorkConnect - Enhanced Stock Management
// ============================================

// Demo data storage
let products = [];
let stockMovements = [];
let categories = ['Eletrônicos', 'Roupas', 'Alimentos', 'Casa', 'Esportes', 'Livros'];

// Initialize stock management
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the stock tab or the content exists
    if (document.getElementById('estoqueContent') || document.getElementById('tab-estoque')) {
        loadDemoData();
        initStockManagement();
    }
});

// Load demo data from localStorage or create default
function loadDemoData() {
    const savedProducts = localStorage.getItem('workconnect_products');
    const savedMovements = localStorage.getItem('workconnect_stock_movements');
    
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        // Default demo products
        products = [
            { id: 1, name: 'Produto A', category: 'Eletrônicos', quantity: 3, minQuantity: 10, price: 150.00, sku: 'ELEC-001', status: 'critico' },
            { id: 2, name: 'Produto B', category: 'Roupas', quantity: 25, minQuantity: 10, price: 89.90, sku: 'ROUP-002', status: 'ok' },
            { id: 3, name: 'Produto C', category: 'Alimentos', quantity: 8, minQuantity: 10, price: 45.50, sku: 'ALIM-003', status: 'baixo' },
            { id: 4, name: 'Produto D', category: 'Casa', quantity: 40, minQuantity: 20, price: 199.99, sku: 'CASA-004', status: 'ok' },
            { id: 5, name: 'Produto E', category: 'Esportes', quantity: 2, minQuantity: 5, price: 299.00, sku: 'ESPT-005', status: 'critico' },
            { id: 6, name: 'Produto F', category: 'Livros', quantity: 15, minQuantity: 8, price: 35.00, sku: 'LIVR-006', status: 'ok' }
        ];
        saveProducts();
    }
    
    if (savedMovements) {
        stockMovements = JSON.parse(savedMovements);
    } else {
        // Default demo movements
        stockMovements = [
            { id: 1, productId: 1, type: 'entrada', quantity: 10, date: '2025-06-10', reason: 'Compra', user: 'Admin' },
            { id: 2, productId: 2, type: 'saida', quantity: 5, date: '2025-06-12', reason: 'Venda', user: 'Admin' },
            { id: 3, productId: 3, type: 'entrada', quantity: 20, date: '2025-06-08', reason: 'Compra', user: 'Admin' }
        ];
        saveMovements();
    }
}

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('workconnect_products', JSON.stringify(products));
}

// Save movements to localStorage
function saveMovements() {
    localStorage.setItem('workconnect_stock_movements', JSON.stringify(stockMovements));
}

// Initialize stock management UI
function initStockManagement() {
    const estoqueContent = document.getElementById('estoqueContent');
    if (!estoqueContent) return;
    
    renderStockDashboard();
}

// Render stock dashboard
function renderStockDashboard() {
    const estoqueContent = document.getElementById('estoqueContent');
    if (!estoqueContent) return;
    
    const criticalProducts = products.filter(p => p.status === 'critico');
    const lowProducts = products.filter(p => p.status === 'baixo');
    const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
    
    estoqueContent.innerHTML = `
        <!-- Indicadores -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Itens em Estoque</h3>
                <i class="fas fa-box card-icon"></i>
            </div>
            <div>
                <span class="metric-value">${products.length}</span>
            </div>
            <div class="metric-label">Produtos cadastrados</div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Itens Críticos</h3>
                <i class="fas fa-exclamation-triangle card-icon"></i>
            </div>
            <div>
                <span class="metric-value" style="color: var(--color-error);">${criticalProducts.length}</span>
            </div>
            <div class="metric-label">Abaixo do mínimo</div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Valor Total em Estoque</h3>
                <i class="fas fa-money-bill-wave card-icon"></i>
            </div>
            <div>
                <span class="metric-value">R$ ${totalValue.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="metric-label">Estimado</div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Itens com Estoque Baixo</h3>
                <i class="fas fa-exclamation-circle card-icon"></i>
            </div>
            <div>
                <span class="metric-value" style="color: var(--color-warning);">${lowProducts.length}</span>
            </div>
            <div class="metric-label">Atenção necessária</div>
        </div>
        
        <!-- Gráficos -->
        <div class="card" style="grid-column: span 2;">
            <div class="card-header">
                <h3 class="card-title">Evolução do Estoque (6 meses)</h3>
                <i class="fas fa-chart-line card-icon"></i>
            </div>
            <canvas id="estoqueChart" height="80"></canvas>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Entradas/Saídas por Semana</h3>
                <i class="fas fa-exchange-alt card-icon"></i>
            </div>
            <canvas id="movimentacaoChart" height="120"></canvas>
        </div>
        
        <!-- Alertas -->
        <div class="card" style="grid-column: span 2;">
            <div class="card-header">
                <h3 class="card-title">Alertas de Estoque</h3>
                <i class="fas fa-bell card-icon"></i>
            </div>
            <div id="stockAlerts">
                ${renderAlerts()}
            </div>
        </div>
        
        <!-- Filtros e Ações -->
        <div class="card" style="grid-column: span 2;">
            <div class="card-header">
                <h3 class="card-title">Gerenciar Produtos</h3>
                <button class="btn-gold" id="addProductBtn">
                    <i class="fas fa-plus"></i> Adicionar Produto
                </button>
            </div>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <input type="text" id="searchProduct" class="input-gold" placeholder="Buscar produto..." style="flex: 1; min-width: 200px;">
                <select id="filterCategory" class="input-gold" style="min-width: 150px;">
                    <option value="">Todas as categorias</option>
                    ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                </select>
                <select id="filterStatus" class="input-gold" style="min-width: 150px;">
                    <option value="">Todos os status</option>
                    <option value="ok">OK</option>
                    <option value="baixo">Baixo</option>
                    <option value="critico">Crítico</option>
                </select>
                <button class="btn-gold" id="exportProductsBtn">
                    <i class="fas fa-file-export"></i> Exportar
                </button>
            </div>
            <div style="overflow-x: auto;">
                <table class="data-table" id="produtosTable">
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Produto</th>
                            <th>Categoria</th>
                            <th>Quantidade</th>
                            <th>Mínimo</th>
                            <th>Preço Unit.</th>
                            <th>Valor Total</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="productsTableBody">
                        ${renderProductsTable()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Histórico de Movimentações -->
        <div class="card" style="grid-column: span 2;">
            <div class="card-header">
                <h3 class="card-title">Histórico de Movimentações</h3>
                <button class="btn-gold" id="addMovementBtn">
                    <i class="fas fa-plus"></i> Nova Movimentação
                </button>
            </div>
            <div style="overflow-x: auto;">
                <table class="data-table" id="movementsTable">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Produto</th>
                            <th>Tipo</th>
                            <th>Quantidade</th>
                            <th>Motivo</th>
                            <th>Usuário</th>
                        </tr>
                    </thead>
                    <tbody id="movementsTableBody">
                        ${renderMovementsTable()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    // Initialize charts
    initStockCharts();
    
    // Attach event listeners
    attachStockEventListeners();
}

// Render alerts
function renderAlerts() {
    const critical = products.filter(p => p.status === 'critico');
    const low = products.filter(p => p.status === 'baixo');
    
    let html = '';
    
    critical.forEach(p => {
        html += `
            <div class="alerta-estoque" style="background: rgba(255, 82, 82, 0.15); color: var(--color-error);">
                <i class="fas fa-exclamation-circle"></i> 
                <strong>${p.name}</strong>: Estoque crítico! Apenas ${p.quantity} unidades (mínimo: ${p.minQuantity})
            </div>
        `;
    });
    
    low.forEach(p => {
        html += `
            <div class="alerta-estoque" style="background: rgba(255, 213, 79, 0.15); color: var(--color-warning);">
                <i class="fas fa-exclamation-circle"></i> 
                <strong>${p.name}</strong>: Estoque baixo. ${p.quantity} unidades (mínimo: ${p.minQuantity})
            </div>
        `;
    });
    
    if (html === '') {
        html = '<div style="color: var(--color-text-secondary); padding: 1rem; text-align: center;">Nenhum alerta no momento.</div>';
    }
    
    return html;
}

// Render products table
function renderProductsTable(filteredProducts = null) {
    const prods = filteredProducts || products;
    
    return prods.map(p => {
        const statusClass = p.status === 'ok' ? 'status-ok' : p.status === 'baixo' ? 'status-baixo' : 'status-critico';
        const statusText = p.status === 'ok' ? 'OK' : p.status === 'baixo' ? 'Baixo' : 'Crítico';
        const totalValue = (p.quantity * p.price).toFixed(2).replace('.', ',');
        
        return `
            <tr>
                <td>${p.sku}</td>
                <td><strong>${p.name}</strong></td>
                <td>${p.category}</td>
                <td>${p.quantity}</td>
                <td>${p.minQuantity}</td>
                <td>R$ ${p.price.toFixed(2).replace('.', ',')}</td>
                <td>R$ ${totalValue}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn-action" onclick="editProduct(${p.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" onclick="deleteProduct(${p.id})" title="Excluir" style="color: var(--color-error);">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Render movements table
function renderMovementsTable() {
    const recentMovements = stockMovements.slice(-10).reverse();
    
    return recentMovements.map(m => {
        const product = products.find(p => p.id === m.productId);
        const typeClass = m.type === 'entrada' ? 'status-success' : 'status-error';
        const typeText = m.type === 'entrada' ? 'Entrada' : 'Saída';
        const date = new Date(m.date).toLocaleDateString('pt-BR');
        
        return `
            <tr>
                <td>${date}</td>
                <td>${product ? product.name : 'Produto removido'}</td>
                <td><span class="status-badge ${typeClass}">${typeText}</span></td>
                <td>${m.quantity}</td>
                <td>${m.reason}</td>
                <td>${m.user}</td>
            </tr>
        `;
    }).join('');
}

// Initialize stock charts
function initStockCharts() {
    // Evolution chart
    const estoqueCtx = document.getElementById('estoqueChart');
    if (estoqueCtx) {
        new Chart(estoqueCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Itens em Estoque',
                    data: [110, 115, 120, 118, 122, products.length * 20],
                    borderColor: '#FFD54F',
                    backgroundColor: 'rgba(255, 213, 79, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#FFD54F'
                }]
            },
            options: {
                plugins: {
                    legend: { labels: { color: '#B0B0B0', font: { weight: 'bold' } } }
                },
                scales: {
                    x: { ticks: { color: '#B0B0B0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#B0B0B0' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });
    }
    
    // Movements chart
    const movimentacaoCtx = document.getElementById('movimentacaoChart');
    if (movimentacaoCtx) {
        new Chart(movimentacaoCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                datasets: [
                    {
                        label: 'Entradas',
                        data: [20, 15, 25, 18],
                        backgroundColor: '#00E676'
                    },
                    {
                        label: 'Saídas',
                        data: [10, 12, 8, 15],
                        backgroundColor: '#FF5252'
                    }
                ]
            },
            options: {
                plugins: {
                    legend: { labels: { color: '#B0B0B0', font: { weight: 'bold' } } }
                },
                scales: {
                    x: { ticks: { color: '#B0B0B0' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#B0B0B0' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });
    }
}

// Attach event listeners
function attachStockEventListeners() {
    // Add product button
    const addBtn = document.getElementById('addProductBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => showProductModal());
    }
    
    // Search and filters
    const searchInput = document.getElementById('searchProduct');
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    const categoryFilter = document.getElementById('filterCategory');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    const statusFilter = document.getElementById('filterStatus');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterProducts);
    }
    
    // Export button
    const exportBtn = document.getElementById('exportProductsBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => exportTableToCSV('produtosTable', 'produtos-estoque.csv'));
    }
    
    // Add movement button
    const addMovementBtn = document.getElementById('addMovementBtn');
    if (addMovementBtn) {
        addMovementBtn.addEventListener('click', () => showMovementModal());
    }
}

// Filter products
function filterProducts() {
    const search = document.getElementById('searchProduct')?.value.toLowerCase() || '';
    const category = document.getElementById('filterCategory')?.value || '';
    const status = document.getElementById('filterStatus')?.value || '';
    
    let filtered = products.filter(p => {
        const matchSearch = !search || p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search);
        const matchCategory = !category || p.category === category;
        const matchStatus = !status || p.status === status;
        return matchSearch && matchCategory && matchStatus;
    });
    
    const tbody = document.getElementById('productsTableBody');
    if (tbody) {
        tbody.innerHTML = renderProductsTable(filtered);
    }
}

// Show product modal
function showProductModal(product = null) {
    const isEdit = product !== null;
    const modal = createModal(
        isEdit ? 'Editar Produto' : 'Adicionar Produto',
        `
            <form id="productForm">
                <div class="form-group">
                    <label class="form-label">Nome do Produto *</label>
                    <input type="text" id="productName" class="form-input" value="${product?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">SKU *</label>
                    <input type="text" id="productSku" class="form-input" value="${product?.sku || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Categoria *</label>
                    <select id="productCategory" class="form-select" required>
                        <option value="">Selecione...</option>
                        ${categories.map(cat => `<option value="${cat}" ${product?.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                    </select>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Quantidade Atual *</label>
                        <input type="number" id="productQuantity" class="form-input" value="${product?.quantity || 0}" min="0" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Quantidade Mínima *</label>
                        <input type="number" id="productMinQuantity" class="form-input" value="${product?.minQuantity || 0}" min="0" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Preço Unitário (R$) *</label>
                    <input type="number" id="productPrice" class="form-input" value="${product?.price || 0}" step="0.01" min="0" required>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn-gold">${isEdit ? 'Salvar' : 'Adicionar'}</button>
                </div>
            </form>
        `
    );
    
    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveProduct(product?.id);
    });
}

// Save product
function saveProduct(productId = null) {
    const name = document.getElementById('productName').value;
    const sku = document.getElementById('productSku').value;
    const category = document.getElementById('productCategory').value;
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const minQuantity = parseInt(document.getElementById('productMinQuantity').value);
    const price = parseFloat(document.getElementById('productPrice').value);
    
    // Determine status
    let status = 'ok';
    if (quantity < minQuantity * 0.5) {
        status = 'critico';
    } else if (quantity < minQuantity) {
        status = 'baixo';
    }
    
    if (productId) {
        // Update existing
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], name, sku, category, quantity, minQuantity, price, status };
        }
    } else {
        // Add new
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, name, sku, category, quantity, minQuantity, price, status });
    }
    
    saveProducts();
    closeModal();
    renderStockDashboard();
}

// Edit product
window.editProduct = function(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        showProductModal(product);
    }
};

// Delete product
window.deleteProduct = function(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderStockDashboard();
    }
};

// Show movement modal
function showMovementModal() {
    const modal = createModal(
        'Nova Movimentação',
        `
            <form id="movementForm">
                <div class="form-group">
                    <label class="form-label">Produto *</label>
                    <select id="movementProduct" class="form-select" required>
                        <option value="">Selecione...</option>
                        ${products.map(p => `<option value="${p.id}">${p.name} (${p.quantity} em estoque)</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Tipo *</label>
                    <select id="movementType" class="form-select" required>
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Quantidade *</label>
                    <input type="number" id="movementQuantity" class="form-input" min="1" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Motivo *</label>
                    <input type="text" id="movementReason" class="form-input" placeholder="Ex: Compra, Venda, Ajuste..." required>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn-gold">Registrar</button>
                </div>
            </form>
        `
    );
    
    document.getElementById('movementForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveMovement();
    });
}

// Save movement
function saveMovement() {
    const productId = parseInt(document.getElementById('movementProduct').value);
    const type = document.getElementById('movementType').value;
    const quantity = parseInt(document.getElementById('movementQuantity').value);
    const reason = document.getElementById('movementReason').value;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if it's a saída and if there's enough stock
    if (type === 'saida' && product.quantity < quantity) {
        alert('Quantidade insuficiente em estoque!');
        return;
    }
    
    // Update product quantity
    if (type === 'entrada') {
        product.quantity += quantity;
    } else {
        product.quantity -= quantity;
    }
    
    // Update product status
    if (product.quantity < product.minQuantity * 0.5) {
        product.status = 'critico';
    } else if (product.quantity < product.minQuantity) {
        product.status = 'baixo';
    } else {
        product.status = 'ok';
    }
    
    // Add movement record
    const newId = stockMovements.length > 0 ? Math.max(...stockMovements.map(m => m.id)) + 1 : 1;
    stockMovements.push({
        id: newId,
        productId,
        type,
        quantity,
        date: new Date().toISOString().split('T')[0],
        reason,
        user: 'Admin'
    });
    
    saveProducts();
    saveMovements();
    closeModal();
    renderStockDashboard();
}

// Modal functions are now in common.js

// Re-render when stock tab is activated
if (window.WorkConnectSPA) {
    const originalSwitchTab = window.WorkConnectSPA.switchTab;
    window.WorkConnectSPA.switchTab = function(tabId) {
        originalSwitchTab(tabId);
        if (tabId === 'estoque' && document.getElementById('estoqueContent')) {
            renderStockDashboard();
        }
    };
}
