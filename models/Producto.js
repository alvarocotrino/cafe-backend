const mongoose = require('mongoose');
const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    presentacion: { type: String, trim: true }, // Ej: "Bolsa 500g"
    
    // --- PRECIOS FIJOS (Sin Club) ---
    precio_ocasional: { type: Number, default: 65000 },
    precio_empresarial: { type: Number, default: 640000 },

    // --- PRECIOS DESCUENTOS POR PERTENENCER AL CLUB) ---
    
    precio_club_ocasional: { type: Number, default: 40000 },
    precio_club_empresarial: { type: Number, default: 600000 },

    // --- TUS CAMPOS DE APOYO ---
    imagen: { type: String, default: 'https://via.placeholder.com/300' },
    stock: { type: Number, default: 0 },
    categoria: { type: String, default: 'Café Especial' },
    disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Producto', ProductoSchema);