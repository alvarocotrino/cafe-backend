// routes/Pedido.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// 1. PRIMERO: La ruta raíz (GET global)
router.get('/', pedidoController.obtenerPedidosUsuario); 

// 2. SEGUNDO: La ruta de creación (POST)
router.post('/', pedidoController.crearPedido);

// 3. TERCERO: Rutas con parámetros específicos
router.get('/usuario/:usuarioId', pedidoController.obtenerPedidosUsuario);

// 4. AL FINAL: La ruta con ID dinámico (para que no atrape a las demás)
router.get('/:id', pedidoController.obtenerPedidoPorId);

module.exports = router;