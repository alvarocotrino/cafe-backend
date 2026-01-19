const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Esto lee tu archivo .env

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la nube
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ ¡Conexión exitosa a MongoDB Atlas!'))
  .catch(err => console.error('❌ Error de conexión:', err));

const PORT = process.env.PORT || 3000;
// Middleware para leer datos en formato JSON


// Definir las rutas de la API
app.use('/api/productos', require('./routes/productos'));
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});