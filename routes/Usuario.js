const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// OBTENER TODOS LOS USUARIOS
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
    }
});

// REGISTRAR UN NUEVO USUARIO (Aquí definimos si es ocasional o empresarial)
router.post('/', async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json({
            mensaje: 'Usuario registrado con éxito',
            usuario: nuevoUsuario
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }
});

module.exports = router;