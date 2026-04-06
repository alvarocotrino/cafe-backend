const mongoose = require('mongoose');
const CarritoSchema = new mongoose.Schema({
    // Relación: ¿De quién es este carrito?
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    // Arreglo de productos seleccionados
    productos: [{ // <-- CAMBIADO DE 'items' A 'productos'
        productoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto',
            required: true
        },
        nombre: String,          // ej: "Filtro de Papel"
        presentacion: String,    // ej: "Pack 100 unidades"
        molienda: { 
            type: String, 
            default: 'N/A'       // Para accesorios no aplica
        },
        cantidad: { 
            type: Number, 
            required: true, 
            min: [1, 'Mínimo 1 unidad'],
            default: 1 
        },
        precio_unitario: { type: Number, required: true }, // El sistema elige cuál de los 4 precios usar
        subtotal: { type: Number, required: true }         // Cantidad * Precio
    }],
    // Sumatoria de todos los subtotales
    total_carrito: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    fecha_actualizacion: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Carrito', CarritoSchema);