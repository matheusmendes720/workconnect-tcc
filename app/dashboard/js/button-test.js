// ============================================
// Button Behavior Test & Verification
// ============================================

// Test all buttons on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Testing button behavior and styles...');
    
    // Test button styles
    testButtonStyles();
    
    // Test button event handlers
    testButtonHandlers();
    
    // Test export buttons
    testExportButtons();
    
    // Test form buttons
    testFormButtons();
    
    console.log('✅ Button tests completed!');
});

// Test button styles
function testButtonStyles() {
    const buttonClasses = [
        'btn-gold',
        'btn-secondary',
        'export-btn',
        'todo-add-btn',
        'logout-btn'
    ];
    
    buttonClasses.forEach(className => {
        const buttons = document.querySelectorAll(`.${className}`);
        if (buttons.length > 0) {
            console.log(`✓ Found ${buttons.length} buttons with class "${className}"`);
            
            // Check if styles are applied
            buttons.forEach(button => {
                const styles = window.getComputedStyle(button);
                if (styles.display === 'none') {
                    console.warn(`⚠ Button with class "${className}" is hidden`);
                }
            });
        } else {
            console.log(`ℹ No buttons found with class "${className}"`);
        }
    });
}

// Test button event handlers
function testButtonHandlers() {
    // Test logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        if (logoutBtn.onclick || logoutBtn.getAttribute('onclick')) {
            console.log('✓ Logout button has click handler');
        } else {
            console.warn('⚠ Logout button missing click handler');
        }
    }
    
    // Test todo form button
    const todoForm = document.getElementById('todoForm');
    if (todoForm) {
        console.log('✓ Todo form found');
        const submitBtn = todoForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            console.log('✓ Todo submit button found');
        }
    }
}

// Test export buttons
function testExportButtons() {
    const exportButtons = [
        { id: 'exportBtnDashboard', table: 'transactionsTable', filename: 'transacoes-recentes.csv' },
        { id: 'exportBtnFinancas', table: 'lancamentosTable', filename: 'lancamentos.csv' },
        { id: 'exportBtnVendas', table: 'vendasTable', filename: 'vendas.csv' },
        { id: 'exportBtnRelatorios', table: 'transacoesTable', filename: 'relatorio.csv' },
        { id: 'exportBtn', table: 'transactionsTable', filename: 'export.csv' }
    ];
    
    exportButtons.forEach(btn => {
        const element = document.getElementById(btn.id);
        if (element) {
            console.log(`✓ Export button "${btn.id}" found`);
            
            // Check if table exists
            const table = document.getElementById(btn.table);
            if (table) {
                console.log(`  ✓ Target table "${btn.table}" found`);
            } else {
                console.warn(`  ⚠ Target table "${btn.table}" not found`);
            }
            
            // Check if event listener is attached
            if (element.onclick || element.getAttribute('onclick')) {
                console.log(`  ✓ Button has click handler`);
            } else {
                // Try to attach handler if missing
                if (typeof exportTableToCSV !== 'undefined') {
                    element.addEventListener('click', function() {
                        if (window.toast) {
                            window.toast.info('Exportando dados...');
                        }
                        exportTableToCSV(btn.table, btn.filename);
                        if (window.toast) {
                            setTimeout(() => window.toast.success('Dados exportados!'), 500);
                        }
                    });
                    console.log(`  ✓ Event handler attached`);
                } else {
                    console.warn(`  ⚠ exportTableToCSV function not available`);
                }
            }
        }
    });
}

// Test form buttons
function testFormButtons() {
    const forms = document.querySelectorAll('form');
    console.log(`✓ Found ${forms.length} forms`);
    
    forms.forEach((form, index) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            console.log(`  ✓ Form ${index + 1} has submit button`);
            
            // Check if form has submit handler
            if (form.onsubmit || form.getAttribute('onsubmit')) {
                console.log(`    ✓ Form has submit handler`);
            } else {
                console.log(`    ℹ Form submit handled by default behavior`);
            }
        } else {
            console.warn(`  ⚠ Form ${index + 1} missing submit button`);
        }
    });
}

// Verify CSS is loaded
function verifyStyles() {
    const requiredStyles = [
        'theme.css',
        'common.css',
        'enhancements.css',
        'dashboard-enhanced.css',
        'modern-acrylic.css',
        'ux-enhancements.css'
    ];
    
    const stylesheets = Array.from(document.styleSheets);
    const loaded = [];
    const missing = [];
    
    requiredStyles.forEach(style => {
        const found = stylesheets.some(sheet => {
            try {
                return sheet.href && sheet.href.includes(style);
            } catch(e) {
                return false;
            }
        });
        
        if (found) {
            loaded.push(style);
        } else {
            missing.push(style);
        }
    });
    
    console.log('📦 CSS Files Status:');
    loaded.forEach(style => console.log(`  ✓ ${style} loaded`));
    if (missing.length > 0) {
        missing.forEach(style => console.warn(`  ⚠ ${style} missing`));
    }
    
    return { loaded, missing };
}

// Run style verification
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verifyStyles);
} else {
    verifyStyles();
}

// Export test functions
window.ButtonTest = {
    testButtonStyles,
    testButtonHandlers,
    testExportButtons,
    testFormButtons,
    verifyStyles
};











