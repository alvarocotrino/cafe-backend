const mongoose = require('mongoose');
const CarritoSchema = new mongoose.Schema({
    usuarioEmail: { 
        type: String, 
        required: true 
    },
    items: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        nombre: String,
        cantidad: { type: Number, default: 1 },
        precio_unitario: Number, // Aquí guardaremos el precio final ($40k, $65k, $600k o $640k)
        presentacion: String
    }],
    total_carrito: { type: Number, default: 0 },
    fecha_actualizacion: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Carrito', CarritoSchema);