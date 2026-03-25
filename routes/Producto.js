const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error al obtener la lista de productos',
            error: error.message 
        });
    }
});
router.post('/', async (req, res) => {
    try {
        // Aquí req.body enviará: nombre, presentacion, 
        // precio_ocasional, precio_club_ocasional, 
        // precio_empresarial, precio_club_empresarial, stock, etc.
        const nuevoProducto = new Producto(req.body);
                await nuevoProducto.save();
        res.status(201).json({
            mensaje: 'Producto registrado exitosamente',
            producto: nuevoProducto
        });
    } catch (error) {
        res.status(400).json({ 
            mensaje: 'No se pudo guardar el producto. Revisa los 4 campos de precio.', 
            detalles: error.message 
        });
    }
});
module.exports = router;