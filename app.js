const SpreeEcommerce = {
    getProductsByType: async (type) => {
        console.log("Framework: getProductsByType llamado con", type);
        return {
            status: 'success',
            products: [
                { id: 1, name: 'Producto Ejemplo', price: 29.99, sku: `ECOMM-${type.toUpperCase()}` }
            ]
        };
    },
    processCheckout: async (cartData, customerInfo) => {
        if (!customerInfo.email || !customerInfo.address) throw new Error('Faltan datos');
        return { orderNumber: 'ORD-' + Math.floor(Math.random() * 10000), status: 'paid' };
    },
    trackOrder: async (orderId) => {
        return { id: orderId, status: 'shipped', estimated_delivery: '2024-05-20' };
    }
};
window.SpreeEcommerce = SpreeEcommerce;
console.log("✅ Framework SpreeEcommerce cargado desde GitHub");
