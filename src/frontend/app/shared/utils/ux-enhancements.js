// ============================================
// WorkConnect - UX Enhancement Utilities
// Toast Notifications, Loading States, etc.
// ============================================

// Toast Notification System
class ToastManager {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        const titles = {
            success: 'Sucesso',
            error: 'Erro',
            warning: 'Aviso',
            info: 'Informação'
        };

        toast.innerHTML = `
            <div class="toast-header">
                <div class="toast-title">
                    <i class="fas ${icons[type]}"></i>
                    <span>${titles[type]}</span>
                </div>
                <button class="toast-close" aria-label="Fechar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="toast-message">${message}</div>
        `;

        const closeBtn = toast.querySelector('.toast-close');
        const closeToast = () => {
            toast.style.animation = 'toastSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) reverse';
            setTimeout(() => toast.remove(), 400);
        };

        closeBtn.addEventListener('click', closeToast);
        this.container.appendChild(toast);

        if (duration > 0) {
            setTimeout(closeToast, duration);
        }

        return toast;
    }

    success(message, duration = 3000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 4000) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration = 3000) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration = 3000) {
        return this.show(message, 'info', duration);
    }
}

// Loading Overlay Manager
class LoadingManager {
    show(message = 'Carregando...') {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.id = 'loading-overlay';
        overlay.innerHTML = `
            <div style="text-align: center;">
                <div class="loading-spinner-large"></div>
                <p style="margin-top: 1.5rem; color: #FFFFFF; font-size: 1.1rem;">${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    hide() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => overlay.remove(), 300);
        }
    }
}

// Form Validation Enhancement
class FormValidator {
    static validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        const required = input.hasAttribute('required');
        
        // Remove previous validation classes
        input.classList.remove('valid', 'invalid');
        
        // Check if required and empty
        if (required && !value) {
            input.classList.add('invalid');
            return false;
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('invalid');
                return false;
            }
        }
        
        // Number validation
        if (type === 'number' && value) {
            if (isNaN(value)) {
                input.classList.add('invalid');
                return false;
            }
        }
        
        // If valid and has value
        if (value) {
            input.classList.add('valid');
        }
        
        return true;
    }

    static validateForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
}

// Smooth Scroll Utility
function smoothScrollTo(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Number Counter Animation
function animateCounter(element, target, duration = 1000) {
    const start = parseFloat(element.textContent.replace(/[^\d.-]/g, '')) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            element.textContent = formatNumber(target);
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 600);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(current);
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return 'R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return Math.round(num).toString();
}

// Initialize UX Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Toast Manager
    window.toast = new ToastManager();
    
    // Initialize Loading Manager
    window.loading = new LoadingManager();
    
    // Add form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!FormValidator.validateForm(form)) {
                e.preventDefault();
                window.toast.error('Por favor, preencha todos os campos corretamente.');
            }
        });
        
        // Real-time validation
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('blur', function() {
                FormValidator.validateInput(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    FormValidator.validateInput(this);
                }
            });
        });
    });
    
    // Add loading states to buttons
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && FormValidator.validateForm(this.form)) {
                this.classList.add('loading');
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="sr-only">Carregando...</span>';
                
                // Remove loading state after form submission (you may need to adjust this)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });
    
    // Enhanced card interactions
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn-gold, .export-btn, .todo-add-btn').forEach(button => {
        button.classList.add('ripple');
    });
    
    console.log('✨ UX Enhancements initialized!');
});

// Export utilities
window.UXUtils = {
    ToastManager,
    LoadingManager,
    FormValidator,
    smoothScrollTo,
    animateCounter
};



