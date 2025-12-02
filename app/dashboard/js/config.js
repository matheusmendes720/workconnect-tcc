// ============================================
// WorkConnect - User Configuration System
// ============================================

// Initialize config management
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('configContent')) {
        initConfigManagement();
    }
});

// Initialize config UI
function initConfigManagement() {
    renderConfigDashboard();
}

// Render config dashboard
function renderConfigDashboard() {
    const configContent = document.getElementById('configContent');
    if (!configContent) return;
    
    const user = window.WorkConnectAuth?.getUser() || {
        name: 'João Empreendedor',
        email: 'joao@empresa.com',
        phone: '(11) 91234-5678',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    };
    
    const preferences = JSON.parse(localStorage.getItem('workconnect_preferences') || '{}');
    const users = JSON.parse(localStorage.getItem('workconnect_users') || '[]');
    
    configContent.innerHTML = `
        <!-- Perfil do Usuário -->
        <div class="card" style="grid-column: span 2;">
            <div class="card-header">
                <h3 class="card-title">Perfil do Usuário</h3>
                <button class="btn-gold" onclick="editProfile()">
                    <i class="fas fa-edit"></i> Editar Perfil
                </button>
            </div>
            <div class="perfil-header">
                <img src="${user.avatar}" alt="Foto de Perfil" class="perfil-foto" id="profileAvatar">
                <div class="perfil-info">
                    <div><b>Nome:</b> <span id="profileName">${user.name}</span></div>
                    <div><b>Email:</b> <span id="profileEmail">${user.email}</span></div>
                    <div><b>Telefone:</b> <span id="profilePhone">${user.phone || 'Não informado'}</span></div>
                </div>
            </div>
        </div>
        
        <!-- Preferências -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Preferências</h3>
                <i class="fas fa-sliders-h card-icon"></i>
            </div>
            <div style="margin-bottom: 1rem;">
                <label class="form-label">Idioma:</label>
                <select id="prefLanguage" class="form-select">
                    <option value="pt-BR" ${preferences.language === 'pt-BR' ? 'selected' : ''}>Português (Brasil)</option>
                    <option value="en-US" ${preferences.language === 'en-US' ? 'selected' : ''}>English (US)</option>
                    <option value="es-ES" ${preferences.language === 'es-ES' ? 'selected' : ''}>Español</option>
                </select>
            </div>
            <div style="margin-bottom: 1rem;">
                <label class="form-label">Tema:</label>
                <select id="prefTheme" class="form-select">
                    <option value="dark" ${preferences.theme === 'dark' ? 'selected' : ''}>Escuro</option>
                    <option value="light" ${preferences.theme === 'light' ? 'selected' : ''}>Claro</option>
                    <option value="auto" ${preferences.theme === 'auto' ? 'selected' : ''}>Automático</option>
                </select>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem;">
                <input type="checkbox" id="prefNotifications" ${preferences.notifications !== false ? 'checked' : ''}>
                <label for="prefNotifications" style="margin: 0; cursor: pointer;">Notificações ativadas</label>
            </div>
            <button class="btn-gold" style="width: 100%; margin-top: 1rem;" onclick="savePreferences()">
                <i class="fas fa-save"></i> Salvar Preferências
            </button>
        </div>
        
        <!-- Segurança -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Segurança</h3>
                <i class="fas fa-shield-alt card-icon"></i>
            </div>
            <div style="margin-bottom: 1rem;">
                <button class="btn-gold" style="width: 100%;" onclick="showChangePasswordModal()">
                    <i class="fas fa-key"></i> Alterar Senha
                </button>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: var(--radius-md);">
                <div>
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">Autenticação de Dois Fatores</div>
                    <div style="font-size: 0.85rem; color: var(--color-text-secondary);">Adicione uma camada extra de segurança</div>
                </div>
                <label class="switch">
                    <input type="checkbox" id="twoFactorAuth" ${preferences.twoFactorAuth ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </div>
        </div>
        
        <!-- Integrações -->
        <div class="card" style="grid-column: span 2;">
            <div class="card-header">
                <h3 class="card-title">Integrações</h3>
                <button class="btn-gold" onclick="showIntegrationModal()">
                    <i class="fas fa-plus"></i> Adicionar Integração
                </button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                <div style="padding: 1rem; background: rgba(255,255,255,0.05); border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-university" style="color: var(--color-primary); font-size: 1.5rem;"></i>
                        <div>
                            <div style="font-weight: 600;">Banco do Brasil</div>
                            <div style="font-size: 0.85rem; color: var(--color-text-secondary);">Conectado</div>
                        </div>
                    </div>
                    <button class="btn-action" style="width: 100%; margin-top: 0.5rem;">Gerenciar</button>
                </div>
                <div style="padding: 1rem; background: rgba(255,255,255,0.05); border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-credit-card" style="color: var(--color-primary); font-size: 1.5rem;"></i>
                        <div>
                            <div style="font-weight: 600;">Nubank</div>
                            <div style="font-size: 0.85rem; color: var(--color-text-secondary);">Conectado</div>
                        </div>
                    </div>
                    <button class="btn-action" style="width: 100%; margin-top: 0.5rem;">Gerenciar</button>
                </div>
                <div style="padding: 1rem; background: rgba(255,255,255,0.05); border-radius: var(--radius-md); border: 1px solid var(--glass-border);">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                        <i class="fas fa-shopping-cart" style="color: var(--color-primary); font-size: 1.5rem;"></i>
                        <div>
                            <div style="font-weight: 600;">Conta Azul</div>
                            <div style="font-size: 0.85rem; color: var(--color-text-secondary);">Conectado</div>
                        </div>
                    </div>
                    <button class="btn-action" style="width: 100%; margin-top: 0.5rem;">Gerenciar</button>
                </div>
            </div>
        </div>
        
        <!-- Permissões de Usuários -->
        <div class="card table-container" style="grid-column: span 2;">
            <div class="card-header" style="margin-bottom: 0.5rem;">
                <h3 class="card-title">Permissões de Usuários</h3>
                <button class="btn-gold" onclick="showAddUserModal()">
                    <i class="fas fa-user-plus"></i> Adicionar Usuário
                </button>
            </div>
            <div style="overflow-x:auto;">
                <table class="data-table" id="usersTable">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Nível de Acesso</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="usersTableBody">
                        ${renderUsersTable(users.length > 0 ? users : [
                            { id: 1, name: 'João Empreendedor', email: 'joao@empresa.com', role: 'admin', status: 'active' },
                            { id: 2, name: 'Maria Silva', email: 'maria@empresa.com', role: 'operador', status: 'active' },
                            { id: 3, name: 'Lucas Lima', email: 'lucas@empresa.com', role: 'visualizador', status: 'active' }
                        ])}
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Exportar Dados -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Exportar Dados</h3>
                <i class="fas fa-download card-icon"></i>
            </div>
            <p style="color: var(--color-text-secondary); margin-bottom: 1rem; font-size: 0.9rem;">
                Baixe uma cópia dos seus dados pessoais e configurações.
            </p>
            <button class="btn-gold" style="width: 100%;" onclick="exportUserData()">
                <i class="fas fa-file-download"></i> Exportar Dados
            </button>
        </div>
    `;
    
    attachConfigEventListeners();
}

// Render users table
function renderUsersTable(users) {
    return users.map(u => {
        const roleClass = u.role === 'admin' ? 'status-admin' : u.role === 'operador' ? 'status-operador' : 'status-visualizador';
        const roleText = u.role === 'admin' ? 'Admin' : u.role === 'operador' ? 'Operador' : 'Visualizador';
        const statusClass = u.status === 'active' ? 'status-success' : 'status-error';
        const statusText = u.status === 'active' ? 'Ativo' : 'Inativo';
        
        return `
            <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td><span class="status-badge ${roleClass}">${roleText}</span></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn-action" onclick="editUser(${u.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" onclick="deleteUser(${u.id})" title="Excluir" style="color: var(--color-error);">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Attach event listeners
function attachConfigEventListeners() {
    // Two-factor auth toggle
    const twoFactor = document.getElementById('twoFactorAuth');
    if (twoFactor) {
        twoFactor.addEventListener('change', function() {
            const preferences = JSON.parse(localStorage.getItem('workconnect_preferences') || '{}');
            preferences.twoFactorAuth = this.checked;
            localStorage.setItem('workconnect_preferences', JSON.stringify(preferences));
        });
    }
}

// Edit profile
window.editProfile = function() {
    const user = window.WorkConnectAuth?.getUser() || {};
    const modal = createModal(
        'Editar Perfil',
        `
            <form id="profileForm">
                <div class="form-group">
                    <label class="form-label">Nome Completo *</label>
                    <input type="text" id="editName" class="form-input" value="${user.name || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Email *</label>
                    <input type="email" id="editEmail" class="form-input" value="${user.email || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Telefone</label>
                    <input type="tel" id="editPhone" class="form-input" value="${user.phone || ''}" placeholder="(11) 91234-5678">
                </div>
                <div class="form-group">
                    <label class="form-label">URL da Foto de Perfil</label>
                    <input type="url" id="editAvatar" class="form-input" value="${user.avatar || ''}" placeholder="https://...">
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn-gold">Salvar</button>
                </div>
            </form>
        `
    );
    
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = {
            name: document.getElementById('editName').value,
            email: document.getElementById('editEmail').value,
            phone: document.getElementById('editPhone').value,
            avatar: document.getElementById('editAvatar').value || user.avatar
        };
        localStorage.setItem('workconnect_user', JSON.stringify(userData));
        closeModal();
        renderConfigDashboard();
        
        // Update header
        const userNameEl = document.getElementById('userName');
        const userAvatarEl = document.getElementById('userAvatar');
        if (userNameEl) userNameEl.textContent = userData.name;
        if (userAvatarEl && userData.avatar) userAvatarEl.src = userData.avatar;
    });
};

// Save preferences
window.savePreferences = function() {
    const preferences = {
        language: document.getElementById('prefLanguage').value,
        theme: document.getElementById('prefTheme').value,
        notifications: document.getElementById('prefNotifications').checked
    };
    localStorage.setItem('workconnect_preferences', JSON.stringify(preferences));
    alert('Preferências salvas com sucesso!');
};

// Show change password modal
window.showChangePasswordModal = function() {
    const modal = createModal(
        'Alterar Senha',
        `
            <form id="passwordForm">
                <div class="form-group">
                    <label class="form-label">Senha Atual *</label>
                    <input type="password" id="currentPassword" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Nova Senha *</label>
                    <input type="password" id="newPassword" class="form-input" required minlength="6">
                </div>
                <div class="form-group">
                    <label class="form-label">Confirmar Nova Senha *</label>
                    <input type="password" id="confirmPassword" class="form-input" required minlength="6">
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn-gold">Alterar Senha</button>
                </div>
            </form>
        `
    );
    
    document.getElementById('passwordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;
        
        if (newPass !== confirmPass) {
            alert('As senhas não coincidem!');
            return;
        }
        
        alert('Senha alterada com sucesso!');
        closeModal();
    });
};

// Show integration modal
window.showIntegrationModal = function() {
    alert('Funcionalidade de integração em desenvolvimento.');
};

// Show add user modal
window.showAddUserModal = function() {
    alert('Funcionalidade de adicionar usuário em desenvolvimento.');
};

// Edit user
window.editUser = function(id) {
    alert('Funcionalidade de editar usuário em desenvolvimento.');
};

// Delete user
window.deleteUser = function(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        alert('Usuário excluído com sucesso!');
        renderConfigDashboard();
    }
};

// Export user data
window.exportUserData = function() {
    const user = window.WorkConnectAuth?.getUser() || {};
    const preferences = JSON.parse(localStorage.getItem('workconnect_preferences') || '{}');
    
    const data = {
        user,
        preferences,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workconnect-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

// Re-render when config tab is activated
if (window.WorkConnectSPA) {
    const originalSwitchTab = window.WorkConnectSPA.switchTab;
    window.WorkConnectSPA.switchTab = function(tabId) {
        originalSwitchTab(tabId);
        if (tabId === 'configuracoes' && document.getElementById('configContent')) {
            renderConfigDashboard();
        }
    };
}

// Add switch toggle styles
const style = document.createElement('style');
style.textContent = `
    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
    }
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.2);
        transition: 0.3s;
        border-radius: 24px;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
    }
    input:checked + .slider {
        background: var(--gradient-gold);
    }
    input:checked + .slider:before {
        transform: translateX(26px);
    }
`;
document.head.appendChild(style);











