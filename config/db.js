const mongoose = require('mongoose');
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            // Aquí van tus opciones de configuración si las usas
        });
        console.log('✅ Base de Datos Conectada');
    } catch (error) {
        console.log('❌ Error de conexión:');
        console.log(error);
        
        // --- APLICAR AQUÍ ---
        process.exit(1); // Detiene la aplicación por error crítico
    }
}
module.exports = conectarDB;