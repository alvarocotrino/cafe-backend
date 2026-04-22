const mongoose = require('mongoose');
const PedidoSchema = new mongoose.Schema(
{       carritoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrito' },
        nombre: { type: String, required: true }, 
        cedula: { type: String, required: false },
        celular: { type: String, required: [false, 'El celular es indispensable para la transportadora']  },
        email: { type: String, required: [true, 'El correo electrónico es obligatorio']    },
        ciudad: { type: String,required: [false, 'La ciudad es necesaria para el envío'],    trim: true  },
        departamento: { type: String,  required: [true, 'El departamento es necesario para el envío'],    trim: true     },
        direccion: {  type: String,  required: [true, 'Debe indicar la dirección exacta para la entrega']  },
        rol: { type: String, enum: ['ocasional', 'empresarial', 'admin'], default: 'ocasional'     },
        nit: { type: String, default: '' },
        razonSocial: { type: String, default: '' },
        esMiembroClub: { type: Boolean, default: false },
        productos: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto',   required: true 
},      nombre: String,
        presentacion: { 
                type: String, 
                required: [true, 'La presentación es obligatoria'], 
                trim: true            
        

},      cantidad:        { type: Number, required: true },
        precio_unitario: { type: Number, required: true }, 
        molienda:        { type: String, default: 'N/A'},
        subtotal:        { type: Number, required: true }  }],
        precio_total:    { type: Number, required: true,  default: 0   },// --- Gestión del Estado ---
        metodoPago:      { type: String, enum: ['Transferencia', 'Efectivo', 'Punto de Venta'],  default: 'Transferencia' },
        notas:           { type: String, default: 'Sin observaciones' },
        estado:          { type: String, enum: ['Pendiente', 'Pagado', 'Enviado', 'Entregado'],  default: 'Pendiente'  },
        fecha:           { type: Date, default: Date.now } });
        module.exports = mongoose.model('Pedido', PedidoSchema);
     