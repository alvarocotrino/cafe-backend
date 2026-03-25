const mongoose = require('mongoose');
const UsuarioSchema = new mongoose.Schema({
    nombre: {         type: String, 
        required: [true, 'El nombre es obligatorio'] 
    },
    cedula: {         type: String, 
        required: [true, 'El documento es obligatorio'], 
        unique: true 
    },
    email: {         type: String, 
        required: [true, 'El correo es obligatorio'], 
        unique: true 
    },
    telefono: {         type: String, 
        required: [true, 'El número de celular es necesario para el envío'] 
    },
    password: {         type: String, 
        required: [true, 'La contraseña es obligatoria'] 
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
        default: 'Armenia',
        required: [true, 'La ciudad es necesaria para el envío'] 
    },
    direccion: { 
        type: String, 
        required: [true, 'La dirección es necesaria para el envío'] 
    },
    
    tieneMembresiaClub: { 
        type: Boolean, 
        default: false 
    },
    fecha_registro: { 
        type: Date, 
        default: Date.now 
    }
});
module.exports = mongoose.model('Usuario', UsuarioSchema);