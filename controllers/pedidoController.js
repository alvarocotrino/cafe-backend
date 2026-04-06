const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');
const crearPedido = async (req, res) => {
    try {
        const { 
            clienteId, productoId, cantidad, esMiembroClub, 
            nombre, cedula, celular, email, ciudad, 
            departamento, direccion, molienda,            
            rol, nit, razonSocial

        } = req.body;
        const producto = await Producto.findById(productoId);
        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

        // Lógica de Precios Ventana al Quindío
        let precioAplicado = 0;
        const esEmpresarial = producto.presentacion.includes('5.8');

        if (esEmpresarial) {
            precioAplicado = esMiembroClub ? producto.precio_club_empresarial : producto.precio_empresarial;
        } else {
            precioAplicado = esMiembroClub ? producto.precio_club_ocasional : producto.precio_ocasional;
        }

        const subtotalCalculado = precioAplicado * cantidad;

        // Creación del pedido EXACTAMENTE como pide tu SCHEMA
        const nuevoPedido = new Pedido({
            usuario: clienteId, // <-- AQUÍ: clienteId del body va al campo 'usuario' del modelo
            nombre,
            cedula,
            celular,
            email,
            ciudad,
            departamento,
            direccion,
            esMiembroClub, // <-- Ahora sí lo guardamos
            // --- GUARDAMOS LOS DATOS EMPRESARIALES EN EL PEDIDO ---
            rol: rol || 'ocasional',
            nit: nit || '',
            razonSocial: razonSocial || '',
            productos: [{
                productoId: productoId, // Coincide con tu Schema
                nombre: producto.nombre,
                presentacion: producto.presentacion,
                cantidad: cantidad,
                precio_unitario: precioAplicado,
                molienda: molienda || 'Grano', // Valor por defecto si no viene
                subtotal: subtotalCalculado
            }],
            precio_total: subtotalCalculado,
            estado: 'Pendiente'
            // La fecha se pone sola por el 'default: Date.now' del Schema
        });

        await nuevoPedido.save();
        
        res.status(201).json({
            mensaje: '¡Pedido registrado con éxito! ☕',
            pedido: nuevoPedido
        });

    } catch (error) {
        res.status(400).json({ mensaje: 'Error al procesar el pedido', error: error.message });
    }
};

// Obtener todos los pedidos
const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find().sort({ fecha: -1 });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la lista de pedidos' });
    }
};

// EXPORTACIÓN UNIFICADA
module.exports = { 
    crearPedido, 
    obtenerPedidosUsuario: obtenerPedidos, 
    obtenerPedidoPorId: async (req, res) => {
        try {
            const pedido = await Pedido.findById(req.params.id);
            if (!pedido) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
            res.json(pedido);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al buscar el pedido', error: error.message });
        }
    }
};