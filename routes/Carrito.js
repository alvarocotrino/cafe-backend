const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// 1. Agregar o actualizar café en el carrito (POST)
router.post('/', carritoController.agregarAlCarrito);

// 2. Obtener el carrito por ID de usuario (GET)
// Nota: Usamos :usuarioId para que coincida con req.params en el controlador
router.get('/:usuarioId', carritoController.obtenerCarrito);

// 3. Vaciar el carrito (DELETE)
router.delete('/', carritoController.eliminarDelCarrito);

module.exports = router;
