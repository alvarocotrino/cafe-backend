const mongoose = require('mongoose');
const UsuarioSchema = new mongoose.Schema({
    nombre: {         type: String, 
        required: [true, 'El nombre es obligatorio'] 
    },
    cedula: { 
    type: String, 
    required: [true, 'La cédula es obligatoria para procesar el pedido'], 
    unique: true, // Evita que dos personas usen el mismo documento
    trim: true    // Limpia espacios accidentales al inicio o final

    },
    email: {         type: String, 
        required: [true, 'El correo es obligatorio'], 
        unique: true 
    },
     password: {         type: String, 
        required: [true, 'La contraseña es obligatoria'] 
    },
    telefono: {         type: String, 
        //required: [true, 'El número de celular es necesario para el envío'] 

    },
     rol: {         type: String, 
        enum: ['ocasional', 'empresarial', 'admin'], 
        default: 'ocasional' 
    },
    // Datos de Empresa (Solo se llenan si el rol es 'empresarial')
    nit: { type: String, default: '' },
    razonSocial: { type: String, default: '' },
        // Datos de Ubicación y Envío (Unificados)
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
        direccion: { 
        type: String, 
        required: [true, 'La dirección es necesaria para el envío'] 
    },
        esMiembroClub: { 
        type: Boolean, 
        default: false 
           },
    fecha_registro: { 
        type: Date, 
        default: Date.now 
    }
});
module.exports = mongoose.model('Usuario', UsuarioSchema);