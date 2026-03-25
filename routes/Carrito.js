const express = require('express');
const router = express.Router();
const Carrito = require('../models/Carrito'); // Importamos el modelo de tu imagen

// RUTA PARA GUARDAR O ACTUALIZAR EL CARRITO
router.post('/', async (req, res) => {
    try {
        const { usuarioEmail, items, total_carrito } = req.body;

        // Buscamos si el usuario ya tiene un carrito guardado
        let carrito = await Carrito.findOne({ usuarioEmail });

        if (carrito) {
            // Si ya existe, actualizamos los productos y el total
            carrito.items = items;
            carrito.total_carrito = total_carrito;
            carrito.fecha_actualizacion = Date.now();
            await carrito.save();
            return res.status(200).json({ mensaje: "Carrito actualizado en Atlas", carrito });
        } else {
            // Si no existe, creamos uno nuevo
            const nuevoCarrito = new Carrito({
                usuarioEmail,
                items,
                total_carrito
            });
            await nuevoCarrito.save();
            return res.status(201).json({ mensaje: "Carrito creado en Atlas", nuevoCarrito });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al procesar el carrito en el servidor" });
    }
});

// RUTA PARA OBTENER EL CARRITO DE UN USUARIO (Cuando el usuario vuelve a entrar)
router.get('/:email', async (req, res) => {
    try {
        const carrito = await Carrito.findOne({ usuarioEmail: req.params.email });
        if (!carrito) return res.status(404).json({ mensaje: "No hay carrito para este usuario" });
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el carrito" });
    }
});

module.exports = router;