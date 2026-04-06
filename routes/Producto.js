const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// La ruta solo "llama" a las funciones del controlador que acabas de arreglar
router.get('/', productoController.obtenerProductos);
router.post('/', productoController.crearProducto);
router.get('/:id', productoController.obtenerProductoPorId);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;


