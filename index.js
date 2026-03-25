require('dotenv').config(); // <-- Esta línea es el motor que lee tu .env
const express = require('express');
//const conectarDB = require('./config/db');
const cors = require('cors');
const app = express();
//conectarDB();
app.use(cors());
app.use(express.json());
// 1. Importar las rutas (Solo estas dos por ahora para probar)
//const productoRoutes = require('./routes/Producto');
//const usuarioRoutes = require('./routes/Usuario');
//const pedidoRoutes = require('./routes/Pedido');
//const carritoRoutes = require('./routes/Carrito'); // <-- Añadir esta
// 2. Usar las rutas
app.use('/api/producto', productoRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/pedido', pedidoRoutes);
app.use('/api/carrito', carritoRoutes); // <-- Añadir esta

app.get('/', (req, res) => res.send('Ventana al Quindío OK ☕'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor en puerto ${PORT}`);
});