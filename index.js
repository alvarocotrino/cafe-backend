require('dotenv').config(); // Carga las variables del archivo .env
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db'); // Importa la configuración de MongoDB

const app = express();

// Conectar a la Base de Datos
conectarDB(); 

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite que el servidor entienda formato JSON

// 1. Importar las rutas (Verificadas según tus archivos en la barra lateral)
const productoRoutes = require('./routes/Producto');
const usuarioRoutes = require('./routes/Usuario');
const pedidoRoutes = require('./routes/Pedido');
const carritoRoutes = require('./routes/Carrito');

// 2. Definir los puntos de entrada (Endpoints)
app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/carrito', carritoRoutes);
// Importar la ruta


// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('Ventana al Quindío OK ☕');
});

// Configuración del Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
    console.log('Ventana al Quindío funcionando correctamente');
});