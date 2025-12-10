/**
 * Formatting Utilities
 * TypeScript version
 */

/**
 * Format number as currency (Brazilian Real)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Format number with thousand separators
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format date to Brazilian format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR').format(d);
}

/**
 * Format date and time to Brazilian format
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(d);
}

/**
 * Format relative time (e.g., "2 horas atrás")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'agora';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'} atrás`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'} atrás`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'} atrás`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'mês' : 'meses'} atrás`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? 'ano' : 'anos'} atrás`;
}

/**
 * Format CNPJ (Brazilian company ID)
 */
export function formatCNPJ(cnpj: string): string {
  const clean = cnpj.replace(/[^\d]/g, '');
  if (clean.length !== 14) return cnpj;
  return clean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

/**
 * Format phone number (Brazilian format)
 */
export function formatPhone(phone: string): string {
  const clean = phone.replace(/[^\d]/g, '');
  if (clean.length === 10) {
    return clean.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  } else if (clean.length === 11) {
    return clean.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
  return phone;
}

/**
 * Format CEP (Brazilian postal code)
 */
export function formatCEP(cep: string): string {
  const clean = cep.replace(/[^\d]/g, '');
  if (clean.length !== 8) return cep;
  return clean.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

/**
 * Animate counter from start to target value
 */
export function animateCounter(
  element: HTMLElement,
  target: number,
  duration: number = 1000,
  formatter?: (value: number) => string
): void {
  const start = parseFloat(element.textContent?.replace(/[^\d.-]/g, '') || '0') || 0;
  const increment = (target - start) / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
      element.textContent = formatter ? formatter(target) : formatNumber(target);
      element.classList.add('updated');
      setTimeout(() => element.classList.remove('updated'), 600);
      clearInterval(timer);
    } else {
      element.textContent = formatter ? formatter(current) : formatNumber(current);
    }
  }, 16);
}

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(element: HTMLElement, offset: number = 0): void {
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

