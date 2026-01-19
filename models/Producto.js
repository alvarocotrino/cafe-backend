const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre del café es obligatorio'],
        trim: true 
    },
    precio_actual: { 
        type: Number, 
        required: [true, 'El precio es obligatorio'],
        min: 0
    },
    descripcion: { 
        type: String,
        trim: true 
    },
    // --- ESTO ES LO QUE ESTAMOS AGREGANDO ---
    imagen: {
        type: String,
        required: false,
        default: 'https://via.placeholder.com/300' // Imagen por defecto si no hay una
    },
    // ----------------------------------------
    stock: { 
        type: Number, 
        default: 0 
    },
    categoria: { 
        type: String, 
        default: 'Café Especial' 
    },
    disponible: { 
        type: Boolean, 
        default: true 
    }
});

module.exports = mongoose.model('Producto', ProductoSchema);