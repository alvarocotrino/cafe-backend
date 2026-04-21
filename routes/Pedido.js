const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
// 1. Crear un pedido (POST)
router.post('/', pedidoController.crearPedido);

// 2. Obtener pedidos (General o por Usuario)
router.get('/', pedidoController.obtenerPedidos);
router.get('/usuario/:usuarioId', pedidoController.obtenerPedidos);

// 3. Eliminar un pedido (AÑADE ESTA LÍNEA)
router.delete('/:id', pedidoController.eliminarPedido);

module.exports = router;
