// ============================================
// WorkConnect - Advanced Logistics Management
// ============================================

// Demo data storage
let warehouses = [];
let orders = [];
let shipments = [];
let routes = [];
let suppliers = [];

// Initialize logistics management
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('logisticaContent')) {
        loadLogisticsData();
        initLogisticsManagement();
    }
});

// Load demo data
function loadLogisticsData() {
    const savedWarehouses = localStorage.getItem('workconnect_warehouses');
    const savedOrders = localStorage.getItem('workconnect_orders');
    const savedShipments = localStorage.getItem('workconnect_shipments');
    const savedRoutes = localStorage.getItem('workconnect_routes');
    const savedSuppliers = localStorage.getItem('workconnect_suppliers');
    
    if (savedWarehouses) {
        warehouses = JSON.parse(savedWarehouses);
    } else {
        warehouses = [
            { id: 1, name: 'Armazém Central', location: 'São Paulo, SP', capacity: 1000, currentStock: 650 },
            { id: 2, name: 'Armazém Norte', location: 'Brasília, DF', capacity: 500, currentStock: 320 },
            { id: 3, name: 'Armazém Sul', location: 'Curitiba, PR', capacity: 800, currentStock: 480 }
        ];
        saveWarehouses();
    }
    
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    } else {
        orders = [
            { id: 1, customer: 'Maria Silva', items: [{ product: 'Produto A', qty: 2 }], status: 'pending', date: '2025-06-15', warehouse: 1 },
            { id: 2, customer: 'João Souza', items: [{ product: 'Produto B', qty: 1 }], status: 'picking', date: '2025-06-14', warehouse: 1 },
            { id: 3, customer: 'Empresa XYZ', items: [{ product: 'Produto C', qty: 5 }], status: 'packing', date: '2025-06-13', warehouse: 2 },
            { id: 4, customer: 'Lucas Lima', items: [{ product: 'Produto D', qty: 3 }], status: 'shipped', date: '2025-06-12', warehouse: 1 }
        ];
        saveOrders();
    }
    
    if (savedShipments) {
        shipments = JSON.parse(savedShipments);
    } else {
        shipments = [
            { id: 1, orderId: 4, carrier: 'Correios', tracking: 'BR123456789BR', status: 'in_transit', estimatedDelivery: '2025-06-18' },
            { id: 2, orderId: 3, carrier: 'Transportadora ABC', tracking: 'ABC987654321', status: 'delivered', estimatedDelivery: '2025-06-15' }
        ];
        saveShipments();
    }
    
    if (savedRoutes) {
        routes = JSON.parse(savedRoutes);
    } else {
        routes = [
            { id: 1, name: 'Rota Centro', driver: 'Carlos Santos', stops: 8, date: '2025-06-16', status: 'scheduled' },
            { id: 2, name: 'Rota Norte', driver: 'Ana Costa', stops: 5, date: '2025-06-16', status: 'in_progress' }
        ];
        saveRoutes();
    }
    
    if (savedSuppliers) {
        suppliers = JSON.parse(savedSuppliers);
    } else {
        suppliers = [
            { id: 1, name: 'Fornecedor Alpha', contact: 'contato@alpha.com', phone: '(11) 3456-7890', leadTime: 7, rating: 4.5 },
            { id: 2, name: 'Fornecedor Beta', contact: 'contato@beta.com', phone: '(11) 3456-7891', leadTime: 5, rating: 4.8 },
            { id: 3, name: 'Fornecedor Gamma', contact: 'contato@gamma.com', phone: '(11) 3456-7892', leadTime: 10, rating: 4.2 }
        ];
        saveSuppliers();
    }
}

// Save functions
function saveWarehouses() { localStorage.setItem('workconnect_warehouses', JSON.stringify(warehouses)); }
function saveOrders() { localStorage.setItem('workconnect_orders', JSON.stringify(orders)); }
function saveShipments() { localStorage.setItem('workconnect_shipments', JSON.stringify(shipments)); }
function saveRoutes() { localStorage.setItem('workconnect_routes', JSON.stringify(routes)); }
function saveSuppliers() { localStorage.setItem('workconnect_suppliers', JSON.stringify(suppliers)); }

// Initialize logistics UI
function initLogisticsManagement() {
    renderLogisticsDashboard();
}

// Render logistics dashboard
function renderLogisticsDashboard() {
    const logisticaContent = document.getElementById('logisticaContent');
    if (!logisticaContent) return;
    
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const activeShipments = shipments.filter(s => s.status === 'in_transit').length;
    const activeRoutes = routes.filter(r => r.status === 'in_progress').length;
    
    logisticaContent.innerHTML = `
        <!-- Overview Cards -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Pedidos Pendentes</h3>
                <i class="fas fa-clipboard-list card-icon"></i>
            </div>
            <div>
                <span class="metric-value">${pendingOrders}</span>
            </div>
            <div class="metric-label">Aguardando processamento</div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Envios em Trânsito</h3>
                <i class="fas fa-truck card-icon"></i>
            </div>
            <div>
                <span class="metric-value">${activeShipments}</span>
            </div>
            <div class="metric-label">Em transporte</div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Rotas Ativas</h3>
                <i class="fas fa-route card-icon"></i>
            </div>
            <div>
                <span class="metric-value">${activeRoutes}</span>
            </div>
            <div class="metric-label">Em execução</div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Armazéns</h3>
                <i class="fas fa-warehouse card-icon"></i>
            </div>
            <div>
                <span class="metric-value">${warehouses.length}</span>
            </div>
            <div class="metric-label">Locais cadastrados</div>
        </div>
        
        <!-- Warehouse Management -->
        <div class="card" style="grid-column: span 2;">
            <div class="card-header">
                <h3 class="card-title">Gerenciamento de Armazéns</h3>
                <button class="btn-gold" onclick="showWarehouseModal()">
                    <i class="fas fa-plus"></i> Adicionar Armazém
                </button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
                ${warehouses.map(w => `
                    <div style="padding: 1rem; background: rgba(255,255,255,0.05); border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                            <div>
                                <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.25rem;">${w.name}</div>
                                <div style="font-size: 0.85rem; color: var(--color-text-secondary);">
                                    <i class="fas fa-map-marker-alt"></i> ${w.location}
                                </div>
                            </div>
                            <button class="btn-action" onclick="editWarehouse(${w.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                        <div style="margin-top: 1rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="color: var(--color-text-secondary);">Capacidade:</span>
                                <span style="font-weight: 600;">${w.currentStock} / ${w.capacity}</span>
                            </div>
                            <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); height: 8px; overflow: hidden;">
                                <div style="background: var(--gradient-gold); height: 100%; width: ${(w.currentStock / w.capacity) * 100}%;"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Order Fulfillment -->
        <div class="card table-container" style="grid-column: span 2;">
            <div class="card-header" style="margin-bottom: 0.5rem;">
                <h3 class="card-title">Fila de Pedidos</h3>
                <button class="btn-gold" onclick="showOrderModal()">
                    <i class="fas fa-plus"></i> Novo Pedido
                </button>
            </div>
            <div style="overflow-x: auto;">
                <table class="data-table" id="ordersTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Itens</th>
                            <th>Armazém</th>
                            <th>Status</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderOrdersTable()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Shipping & Tracking -->
        <div class="card table-container" style="grid-column: span 2;">
            <div class="card-header" style="margin-bottom: 0.5rem;">
                <h3 class="card-title">Rastreamento de Envios</h3>
                <button class="btn-gold" onclick="showShipmentModal()">
                    <i class="fas fa-plus"></i> Novo Envio
                </button>
            </div>
            <div style="overflow-x: auto;">
                <table class="data-table" id="shipmentsTable">
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Transportadora</th>
                            <th>Código de Rastreamento</th>
                            <th>Status</th>
                            <th>Previsão de Entrega</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderShipmentsTable()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Delivery Routes -->
        <div class="card table-container" style="grid-column: span 2;">
            <div class="card-header" style="margin-bottom: 0.5rem;">
                <h3 class="card-title">Rotas de Entrega</h3>
                <button class="btn-gold" onclick="showRouteModal()">
                    <i class="fas fa-plus"></i> Nova Rota
                </button>
            </div>
            <div style="overflow-x: auto;">
                <table class="data-table" id="routesTable">
                    <thead>
                        <tr>
                            <th>Nome da Rota</th>
                            <th>Motorista</th>
                            <th>Paradas</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderRoutesTable()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Supplier Management -->
        <div class="card table-container" style="grid-column: span 2;">
            <div class="card-header" style="margin-bottom: 0.5rem;">
                <h3 class="card-title">Fornecedores</h3>
                <button class="btn-gold" onclick="showSupplierModal()">
                    <i class="fas fa-plus"></i> Adicionar Fornecedor
                </button>
            </div>
            <div style="overflow-x: auto;">
                <table class="data-table" id="suppliersTable">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Contato</th>
                            <th>Telefone</th>
                            <th>Prazo (dias)</th>
                            <th>Avaliação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderSuppliersTable()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    attachLogisticsEventListeners();
}

// Render functions
function renderOrdersTable() {
    return orders.map(o => {
        const statusClass = o.status === 'pending' ? 'status-pendente' : o.status === 'picking' ? 'status-warning' : o.status === 'packing' ? 'status-info' : 'status-success';
        const statusText = o.status === 'pending' ? 'Pendente' : o.status === 'picking' ? 'Separando' : o.status === 'packing' ? 'Empacotando' : 'Enviado';
        const warehouse = warehouses.find(w => w.id === o.warehouse);
        
        return `
            <tr>
                <td>#${o.id}</td>
                <td>${o.customer}</td>
                <td>${o.items.map(i => `${i.qty}x ${i.product}`).join(', ')}</td>
                <td>${warehouse ? warehouse.name : 'N/A'}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${new Date(o.date).toLocaleDateString('pt-BR')}</td>
                <td>
                    <button class="btn-action" onclick="updateOrderStatus(${o.id})" title="Atualizar Status">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function renderShipmentsTable() {
    return shipments.map(s => {
        const order = orders.find(o => o.id === s.orderId);
        const statusClass = s.status === 'pending' ? 'status-pendente' : s.status === 'in_transit' ? 'status-info' : 'status-success';
        const statusText = s.status === 'pending' ? 'Pendente' : s.status === 'in_transit' ? 'Em Trânsito' : 'Entregue';
        
        return `
            <tr>
                <td>#${s.orderId} - ${order ? order.customer : 'N/A'}</td>
                <td>${s.carrier}</td>
                <td><code style="background: rgba(255,255,255,0.1); padding: 0.25rem 0.5rem; border-radius: 4px;">${s.tracking}</code></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${new Date(s.estimatedDelivery).toLocaleDateString('pt-BR')}</td>
                <td>
                    <button class="btn-action" onclick="trackShipment('${s.tracking}')" title="Rastrear">
                        <i class="fas fa-search"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function renderRoutesTable() {
    return routes.map(r => {
        const statusClass = r.status === 'scheduled' ? 'status-pendente' : r.status === 'in_progress' ? 'status-info' : 'status-success';
        const statusText = r.status === 'scheduled' ? 'Agendada' : r.status === 'in_progress' ? 'Em Andamento' : 'Concluída';
        
        return `
            <tr>
                <td>${r.name}</td>
                <td>${r.driver}</td>
                <td>${r.stops} paradas</td>
                <td>${new Date(r.date).toLocaleDateString('pt-BR')}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn-action" onclick="viewRoute(${r.id})" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function renderSuppliersTable() {
    return suppliers.map(s => {
        const stars = '★'.repeat(Math.floor(s.rating)) + '☆'.repeat(5 - Math.floor(s.rating));
        
        return `
            <tr>
                <td><strong>${s.name}</strong></td>
                <td>${s.contact}</td>
                <td>${s.phone}</td>
                <td>${s.leadTime} dias</td>
                <td><span style="color: var(--color-primary);">${stars}</span> ${s.rating}</td>
                <td>
                    <button class="btn-action" onclick="editSupplier(${s.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" onclick="createPurchaseOrder(${s.id})" title="Criar Pedido">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Event listeners
function attachLogisticsEventListeners() {
    // Add event listeners here if needed
}

// Modal functions
window.showWarehouseModal = function() {
    alert('Funcionalidade de adicionar armazém em desenvolvimento.');
};

window.editWarehouse = function(id) {
    alert('Funcionalidade de editar armazém em desenvolvimento.');
};

window.showOrderModal = function() {
    alert('Funcionalidade de criar pedido em desenvolvimento.');
};

window.updateOrderStatus = function(id) {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    
    const statuses = ['pending', 'picking', 'packing', 'shipped'];
    const currentIndex = statuses.indexOf(order.status);
    if (currentIndex < statuses.length - 1) {
        order.status = statuses[currentIndex + 1];
        saveOrders();
        renderLogisticsDashboard();
    }
};

window.showShipmentModal = function() {
    alert('Funcionalidade de criar envio em desenvolvimento.');
};

window.trackShipment = function(tracking) {
    alert(`Rastreamento: ${tracking}\n\nStatus: Em trânsito\nLocalização: Centro de Distribuição - São Paulo`);
};

window.showRouteModal = function() {
    alert('Funcionalidade de criar rota em desenvolvimento.');
};

window.viewRoute = function(id) {
    const route = routes.find(r => r.id === id);
    if (route) {
        alert(`Rota: ${route.name}\nMotorista: ${route.driver}\nParadas: ${route.stops}\nStatus: ${route.status}`);
    }
};

window.showSupplierModal = function() {
    alert('Funcionalidade de adicionar fornecedor em desenvolvimento.');
};

window.editSupplier = function(id) {
    alert('Funcionalidade de editar fornecedor em desenvolvimento.');
};

window.createPurchaseOrder = function(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
        alert(`Criar pedido de compra para: ${supplier.name}\nPrazo de entrega estimado: ${supplier.leadTime} dias`);
    }
};

// Re-render when logistics tab is activated
if (window.WorkConnectSPA) {
    const originalSwitchTab = window.WorkConnectSPA.switchTab;
    window.WorkConnectSPA.switchTab = function(tabId) {
        originalSwitchTab(tabId);
        if (tabId === 'logistica' && document.getElementById('logisticaContent')) {
            renderLogisticsDashboard();
        }
    };
}








