const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Importamos la conexión (se ejecuta sola al arrancar)
require('./config/db'); 

// Middlewares obligatorios
app.use(cors());
app.use(express.json());

// Tus rutas de siempre
app.use('/api/productos', require('./routes/Producto'));
app.use('/api/usuarios', require('./routes/Usuario'));
app.use('/api/pedidos', require('./routes/Pedido')); // Con 's' en la ruta
app.use('/api/carritos', require('./routes/Carrito')); // Con 's' en la ruta
// Ruta de prueba
app.get('/', (req, res) => res.send('Ventana al Quindío '));

app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en el puerto ${PORT}`);
});
