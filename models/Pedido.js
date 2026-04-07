const mongoose = require('mongoose');
const PedidoSchema = new mongoose.Schema({
    // --- DATOS DEL USUARIO ---
    usuarioId: { // Antes era 'usuario'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
    },
    
        nombre: { type: String, required: true }, // "Alvaro Garcia"
    cedula: { type: String, required: true },
       celular: {         type: String, 
        required: [false, 'El celular es indispensable para la transportadora'] 
    },
    email: {         type: String, 
        required: [false, 'El correo electrónico es obligatorio'] 
    },
     ciudad: { 
    type: String, 
    required: [true, 'La ciudad es necesaria para el envío'],
    trim: true 
  },
   departamento: { 
    type: String, 
    required: [true, 'El departamento es necesario para el envío'],
    trim: true 
    },
    direccion: {         type: String, 
        required: [false, 'Debe indicar la dirección exacta para la entrega'] 
    },
    // --- Datos de Perfil y Empresa en el Pedido ---
    rol: { 
        type: String, 
        enum: ['ocasional', 'empresarial', 'admin'], 
        default: 'ocasional' 
    },
    nit: { type: String, default: '' },
    razonSocial: { type: String, default: '' },
    esMiembroClub: { type: Boolean, default: false },
        productos: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        nombre: String, // nombre del producto
        presentacion: String, // ej: "Bolsa 450g" o "Paqute 5.8kg"
        cantidad: { type: Number, required: true },
        precio_unitario: { type: Number, required: true }, 
        molienda: {
            type: String,
            default: 'N/A'
        },
        subtotal: { type: Number, required: true } 
    }],
        precio_total: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    // --- Gestión del Estado ---
    estado: { 
        type: String, 
        enum: ['Pendiente', 'Pagado', 'Enviado', 'Entregado'], 
        default: 'Pendiente' 
    },
        fecha: { type: Date, default: Date.now }
});
     module.exports = mongoose.model('Pedido', PedidoSchema);
     