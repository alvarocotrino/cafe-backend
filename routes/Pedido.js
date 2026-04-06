const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.crearPedido);
router.get('/usuario/:usuarioId', pedidoController.obtenerPedidosUsuario);
router.get('/:id', pedidoController.obtenerPedidoPorId);
module.exports = router;






