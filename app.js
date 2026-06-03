/**
 * SPREECOMMERCE FRAMEWORK - Versión Corregida
 * Framework para gestión de ecommerce multi-categoría
 */

(function() {
    'use strict';
    
    console.log('📦 Inicializando Framework SpreeEcommerce...');
    
    const SpreeEcommerce = {
        config: {
            apiUrl: 'https://demo.spreecommerce.org/api/v2/storefront',
            debug: true,
            version: '1.0.1'
        },

        // Función para obtener productos por tipo
        getProductsByType: async function(type) {
            console.log(`[Framework] getProductsByType llamado con: ${type}`);
            
            // Base de datos local de productos para demostración
            const productsDB = {
                computers: {
                    status: 'success',
                    products: [
                        { id: 101, name: '💾 Memoria RAM 16GB DDR4', price: 89990, stock: 15 },
                        { id: 102, name: '💽 SSD 1TB NVMe', price: 129990, stock: 8 },
                        { id: 103, name: '🖱️ Mouse Gaming RGB', price: 29990, stock: 25 },
                        { id: 104, name: '⌨️ Teclado Mecánico', price: 89990, stock: 12 },
                        { id: 105, name: '🖥️ Monitor 24" 144Hz', price: 249990, stock: 5 }
                    ]
                },
                music: {
                    status: 'success',
                    products: [
                        { id: 201, name: '🎸 Cuerdas Eléctricas', price: 15990, stock: 50 },
                        { id: 202, name: '🎤 Micrófono Condensador', price: 89990, stock: 12 },
                        { id: 203, name: '🎧 Audífonos Studio', price: 79990, stock: 20 },
                        { id: 204, name: '🎹 Interfaz de Audio', price: 149990, stock: 8 },
                        { id: 205, name: '🥁 Pedal de Batería', price: 129990, stock: 6 }
                    ]
                },
                cars: {
                    status: 'success',
                    products: [
                        { id: 301, name: '🚗 Toyota Corolla 2022', price: 18500000, stock: 1, usado: true },
                        { id: 302, name: '🚙 Honda Civic 2024', price: 27500000, stock: 3, usado: false },
                        { id: 303, name: '🏎️ Ford Mustang 2023', price: 45000000, stock: 2, usado: false },
                        { id: 304, name: '🚐 Chevrolet Onix 2021', price: 12500000, stock: 1, usado: true },
                        { id: 305, name: '🚘 Hyundai Tucson 2023', price: 22900000, stock: 4, usado: false }
                    ]
                }
            };
            
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const result = productsDB[type] || productsDB.computers;
            console.log(`[Framework] Retornando ${result.products.length} productos para ${type}`);
            return result;
        },

        // Función de Checkout
        processCheckout: async function(cartData, customerInfo) {
            console.log('[Framework] processCheckout llamado');
            console.log('Carrito:', cartData);
            console.log('Cliente:', customerInfo);
            
            // Validaciones
            if (!customerInfo || !customerInfo.email || !customerInfo.email.includes('@')) {
                throw new Error('Email inválido o faltante');
            }
            if (!customerInfo.address || customerInfo.address.trim() === '') {
                throw new Error('Dirección requerida');
            }
            if (!customerInfo.name || customerInfo.name.trim() === '') {
                throw new Error('Nombre requerido');
            }
            if (!cartData || !cartData.items || cartData.items.length === 0) {
                throw new Error('El carrito está vacío');
            }
            
            // Generar orden
            const orderNumber = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
            const orderDate = new Date().toISOString();
            
            // Guardar en localStorage para seguimiento
            const order = {
                id: orderNumber,
                date: orderDate,
                total: cartData.total,
                customer: customerInfo,
                items: cartData.items,
                status: 'confirmado'
            };
            
            const existingOrders = JSON.parse(localStorage.getItem('spree_orders') || '[]');
            existingOrders.push(order);
            localStorage.setItem('spree_orders', JSON.stringify(existingOrders));
            
            console.log(`[Framework] Orden creada: ${orderNumber}`);
            
            return {
                success: true,
                orderNumber: orderNumber,
                status: 'paid',
                date: orderDate,
                message: 'Compra exitosa'
            };
        },

        // Seguimiento de orden
        trackOrder: async function(orderId) {
            console.log(`[Framework] trackOrder llamado para: ${orderId}`);
            
            const orders = JSON.parse(localStorage.getItem('spree_orders') || '[]');
            const order = orders.find(o => o.id === orderId);
            
            if (order) {
                return {
                    found: true,
                    id: order.id,
                    status: order.status,
                    date: order.date,
                    total: order.total,
                    estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                };
            }
            
            // Simular orden no encontrada pero con datos de ejemplo
            return {
                found: true,
                id: orderId,
                status: 'procesando',
                date: new Date().toISOString(),
                total: 0,
                estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            };
        },
        
        // Mostrar notificación
        showNotification: function(message, type = 'info') {
            console.log(`[${type.toUpperCase()}] ${message}`);
            
            // Crear notificación visual si existe el DOM
            if (typeof document !== 'undefined') {
                const toast = document.createElement('div');
                toast.textContent = message;
                toast.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 12px 20px;
                    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
                    color: white;
                    border-radius: 5px;
                    z-index: 10000;
                    font-family: Arial, sans-serif;
                    animation: slideIn 0.3s ease;
                `;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            }
        }
    };
    
    // Asignar a window object
    window.SpreeEcommerce = SpreeEcommerce;
    
    console.log('✅ Framework SpreeEcommerce cargado exitosamente');
    console.log('📦 Versión:', SpreeEcommerce.config.version);
    console.log('🔧 Métodos disponibles:', Object.keys(SpreeEcommerce));
    
})();
