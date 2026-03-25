const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Ruta: /api/pedido/crear
router.post('/crear', pedidoController.crearPedido);

// Ruta: /api/pedido/listar
router.get('/listar', pedidoController.obtenerPedidos);

module.exports = router;