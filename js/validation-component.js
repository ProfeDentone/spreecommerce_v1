/**
 * FORM VALIDATION LIST - Web Component
 */

(function() {
    'use strict';
    
    console.log('📦 Registrando Web Component: form-validation-list');
    
    class FormValidationList extends HTMLElement {
        constructor() {
            super();
            this.input = null;
            this.ruleItems = [];
        }

        connectedCallback() {
            const inputId = this.getAttribute('for');
            console.log(`[Validation] Buscando input #${inputId}`);
            
            if (inputId) {
                this.input = document.getElementById(inputId);
                if (this.input) {
                    this.setupValidation();
                    console.log(`[Validation] ✅ Validación configurada para #${inputId}`);
                } else {
                    console.warn(`[Validation] ❌ Input #${inputId} no encontrado`);
                    this.style.border = '1px solid red';
                    this.style.padding = '10px';
                    this.style.borderRadius = '5px';
                    this.style.backgroundColor = '#ffe6e6';
                    this.innerHTML = `<span style="color:red;">❌ Error: Input "${inputId}" no encontrado</span>`;
                }
            }
        }

        setupValidation() {
            const ruleList = this.querySelector('ul');
            if (ruleList) {
                this.ruleItems = Array.from(ruleList.querySelectorAll('[data-pattern]'));
            } else {
                this.ruleItems = Array.from(this.querySelectorAll('[data-pattern]'));
            }
            
            console.log(`[Validation] ${this.ruleItems.length} reglas encontradas`);
            
            if (this.input && this.ruleItems.length > 0) {
                this.input.addEventListener('input', () => this.validate());
                this.input.addEventListener('blur', () => this.validate());
                this.validate();
            }
        }

        validate() {
            const value = this.input.value || '';
            let allValid = true;
            let matchedCount = 0;

            this.ruleItems.forEach(item => {
                const pattern = item.getAttribute('data-pattern');
                if (pattern) {
                    try {
                        const regex = new RegExp(pattern);
                        const isValid = regex.test(value);
                        
                        if (isValid) {
                            item.classList.add('matched');
                            item.classList.remove('unmatched');
                            matchedCount++;
                        } else {
                            item.classList.add('unmatched');
                            item.classList.remove('matched');
                            allValid = false;
                        }
                    } catch (e) {
                        console.error('Error en regex:', pattern, e);
                    }
                }
            });

            if (this.input) {
                if (allValid && value.length > 0) {
                    this.input.setCustomValidity('');
                    this.input.classList.add('is-valid');
                    this.input.classList.remove('is-invalid');
                } else if (value.length > 0) {
                    this.input.setCustomValidity(`Faltan ${this.ruleItems.length - matchedCount} requisitos`);
                    this.input.classList.add('is-invalid');
                    this.input.classList.remove('is-valid');
                } else {
                    this.input.setCustomValidity('');
                    this.input.classList.remove('is-valid', 'is-invalid');
                }
            }

            return allValid;
        }
    }

    if (!customElements.get('form-validation-list')) {
        customElements.define('form-validation-list', FormValidationList);
        console.log('✅ Web Component "form-validation-list" registrado');
    }
    
})();
