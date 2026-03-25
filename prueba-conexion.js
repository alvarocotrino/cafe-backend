const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_MONGO;

console.log('--- Iniciando prueba de conexión ---');

if (!uri) {
    console.log('❌ Error: No se encontró la variable DB_MONGO en el .env');
    process.exit(1);
}

mongoose.connect(uri)
    .then(() => {
        console.log('✅ ¡CONECTADO EXITOSAMENTE A MONGODB ATLAS!');
        process.exit(0);
    })
    .catch(err => {
        console.log('❌ Error de red detectado:');
        console.error(err.message);
        process.exit(1);
    });