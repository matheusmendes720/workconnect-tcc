/**
 * Form Validation Utilities
 * TypeScript version
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class FormValidator {
  /**
   * Validate a single input element
   */
  static validateInput(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): boolean {
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
      if (isNaN(Number(value))) {
        input.classList.add('invalid');
        return false;
      }
    }

    // URL validation
    if (type === 'url' && value) {
      try {
        new URL(value);
      } catch {
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

  /**
   * Validate an entire form
   */
  static validateForm(form: HTMLFormElement): ValidationResult {
    const inputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input, select, textarea'
    );
    const errors: string[] = [];
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateInput(input)) {
        isValid = false;
        const label = form.querySelector(`label[for="${input.id}"]`);
        const fieldName = label?.textContent || input.name || 'Campo';
        errors.push(`${fieldName} é obrigatório ou inválido.`);
      }
    });

    return { isValid, errors };
  }

  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate CNPJ format (Brazilian company ID)
   */
  static validateCNPJ(cnpj: string): boolean {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    if (cleanCNPJ.length !== 14) return false;

    // CNPJ validation algorithm
    let size = cleanCNPJ.length - 2;
    let numbers = cleanCNPJ.substring(0, size);
    const digits = cleanCNPJ.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = cleanCNPJ.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  }

  /**
   * Validate phone number (Brazilian format)
   */
  static validatePhone(phone: string): boolean {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  }

  /**
   * Validate CEP (Brazilian postal code)
   */
  static validateCEP(cep: string): boolean {
    const cleanCEP = cep.replace(/[^\d]/g, '');
    return cleanCEP.length === 8;
  }
}

