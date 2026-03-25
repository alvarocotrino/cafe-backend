const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
// 1. REGISTRAR USUARIO (POST)

router.post('/registro', async (req, res) => {
    try {
        const { 
            nombre, 
            cedula, 
            email, 
            telefono,
            password, 
            rol, 
            nit,           
            razonSocial,
            tieneMembresiaClub, 
            ciudad, 
            direccion 
        } = req.body;
        // Validar si ya existe el usuario (por email o cédula)
        let usuarioExiste = await Usuario.findOne({ $or: [{ email }, { cedula }] });
        if (usuarioExiste) {
            return res.status(400).json({ 
                msg: 'El correo o la cédula ya están registrados.' 
            });
        }

        // Crear el nuevo usuario incluyendo campos de empresa y teléfono
        const nuevoUsuario = new Usuario({
            nombre,
            cedula,
            email,
            telefono,
            password, 
            rol: rol || 'ocasional', 
            nit: nit || '',               
            razonSocial: razonSocial || '',
            tieneMembresiaClub: tieneMembresiaClub || false,
            ciudad,
            direccion
        });

        // Guardar en MongoDB Atlas
        await nuevoUsuario.save();

        res.status(201).json({ 
            msg: 'Usuario registrado con éxito en Ventana al Quindío', 
            usuario: nuevoUsuario 
        });

    } catch (error) {
        console.error("Error en Registro:", error);
        res.status(500).json({ 
            msg: 'Error al registrar el usuario', 
            error: error.message 
        });
    }
});

// -----------------------------------------------------------
// 2. LISTAR USUARIOS (GET)
// Endpoint: http://localhost:3000/api/usuarios/listar
// -----------------------------------------------------------
router.get('/listar', async (req, res) => {
    try {
        // Traemos todos menos el password por seguridad
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los usuarios' });
    }
});
// -----------------------------------------------------------
// 3. INICIAR SESIÓN / LOGIN (POST)
// Endpoint: http://localhost:3000/api/usuario/login
// -----------------------------------------------------------
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario por email
        const usuario = await Usuario.findOne({ email });

        // Validar si el usuario existe
        if (!usuario) {
            return res.status(400).json({ msg: 'El correo no está registrado.' });
        }

        // Validar si la contraseña coincide
        if (usuario.password !== password) {
            return res.status(400).json({ msg: 'Contraseña incorrecta.' });
        }

        // RESPUESTA CORREGIDA: Usamos el prefijo 'usuario.' para los datos de la BD
        res.json({
            nombre: usuario.nombre,
            rol: usuario.rol, 
            nit: usuario.nit,               // Sacado de la base de datos
            razonSocial: usuario.razonSocial, // Sacado de la base de datos
            email: usuario.email,
            telefono: usuario.telefono,      // Incluido para coordinar entregas
            ciudad: usuario.ciudad,
            direccion: usuario.direccion
        });

    } catch (error) {
        console.error("Error en Login:", error);
        res.status(500).json({ 
            msg: 'Error al iniciar sesión', 
            error: error.message 
        });
    }
});

module.exports = router;