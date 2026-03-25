const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    presentacion: { type: String, required: true, trim: true }, // "450g" o "5.8kg"
    
    // Precios Ocasionales (Bolsa 450g)
    precio_ocasional: { type: Number },
    precio_club_ocasional: { type: Number },
    
    // Precios Empresariales (Bulto 5.8kg)
    precio_empresarial: { type: Number },
    precio_club_empresarial: { type: Number },

    imagen: { type: String, default: 'https://via.placeholder.com/300' },
    stock: { type: Number, default: 0 },
    categoria: { type: String, default: 'Café Especial' },
    disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Producto', ProductoSchema);