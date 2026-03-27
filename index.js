const express = require('express');
const cors = require('cors');
const app = express();

// Importamos la conexión (se ejecuta sola al arrancar)
require('./config/db'); 

// Middlewares obligatorios
app.use(cors());
app.use(express.json());

// Tus rutas de siempre
app.use('/api/productos', require('./routes/Producto'));
app.use('/api/usuarios', require('./routes/Usuario'));
app.use('/api/pedidos', require('./routes/Pedido'));
app.use('/api/carrito', require('./routes/Carrito'));

// Ruta de prueba
app.get('/', (req, res) => res.send('Ventana al Quindío MVP OK ☕'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en el puerto ${PORT}`);
});
