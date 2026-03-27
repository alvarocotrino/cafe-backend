const mongoose = require('mongoose');

// Definimos la dirección con la clave que me diste
const MONGO_URI = "mongodb+srv://adminCafe:Armenia2026@cluster0.wosy0ry.mongodb.net/TiendaCafe?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
    // Estas opciones ayudan a una conexión más estable
    tlsAllowInvalidCertificates: true 
})
.then(() => console.log('✅ ¡Conectado a TiendaCafe en Atlas!'))
.catch(err => console.error('❌ Error de conexión:', err.message));

module.exports = mongoose;