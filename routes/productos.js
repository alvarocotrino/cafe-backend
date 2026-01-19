const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// RUTA PARA OBTENER TODOS LOS PRODUCTOS (GET)
// Esta la usará Angular para mostrar tu catálogo de café
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
});

// RUTA PARA CREAR UN NUEVO PRODUCTO (POST)
// Esta la usaremos para registrar nuevos cafés con su imagen y precio_actual
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar el producto', error });
    }
});

module.exports = router;