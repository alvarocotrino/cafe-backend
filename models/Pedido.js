const mongoose = require('mongoose');
const PedidoSchema = new mongoose.Schema({
    // --- Datos de Identificación y Envío ---
    nombre: {         type: String, 
        required: [true, 'El nombre completo es obligatorio'] 
    },
    cedula: {         type: String, 
        required: [true, 'El documento de identidad es obligatorio para la factura'] 
    },
    celular: {         type: String, 
        required: [true, 'El celular es indispensable para la transportadora'] 
    },
    email: {         type: String, 
        required: [true, 'El correo electrónico es obligatorio'] 
    },
    ciudad: {         type: String, 
        required: [true, 'Debe indicar la ciudad de destino para calcular el envío'] 
    },
    departamento: {         type: String,
         required: [true, 'Debe indicar la ciudad de destino para calcular el envío'] 
    },

    direccion: {         type: String, 
        required: [true, 'Debe indicar la dirección exacta para la entrega'] 
    },
        productos: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        nombre: String, // nombre del producto
        presentacion: String, // ej: "Bolsa 450g" o "Pack 5.8kg"
        cantidad: { type: Number, required: true },
        precio_unitario: { type: Number, required: true }, 
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