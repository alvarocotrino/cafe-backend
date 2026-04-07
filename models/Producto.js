const mongoose = require('mongoose');
const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    presentacion: { 
    type: String, 
    required: [true, 'La presentación es obligatoria'], 
    trim: true,
    enum: {
      values: ['450g', '5.8kg', 'Unidad'],
      message: '{VALUE} no es una presentación válida (450g, 5.8kg, Unidad)'
    }
  },
    precio_ocasional: { type: Number, required: false },       // $65.000
    precio_club_ocasional: { type: Number, required: false },  // $40.000
    precio_empresarial: { type: Number, required: false },     // $640.000
    precio_club_empresarial: { type: Number, required: false }, // $600.000
    stock: { type: Number, default: 0 },
    
    categoria: { 
        type: String, 
        enum: ['Café Especial', 'Accesorio', 'Suscripción'], 
        default: 'Café Especial' 
    },  
        // Si es un accesorio (Filtros/Kit), este array se deja vacío []
    molienda: { 
        type: [String], 
        default: ['Grano', 'Molido'] 
    },
    disponible: { type: Boolean, default: true },
    imagen_url: { type: String } // Para conectar con las fotos de tu Frontend
}, { timestamps: true }); // Crea automáticamente createdAt y updatedAt
module.exports = mongoose.model('Producto', ProductoSchema);


