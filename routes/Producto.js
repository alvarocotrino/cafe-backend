const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

router.post('/', async (req, res) => {
    try {
        let datos = req.body;

        // Limpieza lógica según presentación
        if (datos.presentacion.includes('5.8')) {
            // Es bulto empresarial: eliminamos campos de 450g
            delete datos.precio_ocasional;
            delete datos.precio_club_ocasional;
        } else if (datos.presentacion.includes('450')) {
            // Es bolsa minorista: eliminamos campos de 5.8kg
            delete datos.precio_empresarial;
            delete datos.precio_club_empresarial;
        }

        const nuevoProducto = new Producto(datos);
        await nuevoProducto.save();
        
        res.status(201).json({
            mensaje: 'Producto optimizado registrado correctamente',
            producto: nuevoProducto
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar', error: error.message });
    }
});

// GET para ver la lista limpia
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;