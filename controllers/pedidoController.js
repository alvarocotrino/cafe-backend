const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');
const Carrito = require('../models/Carrito');

// --- 1. CREAR PEDIDO ---
const crearPedido = async (req, res) => {
    try {
        const { 
            usuarioId, carritoId, productos, esMiembroClub, nombre, 
            cedula, celular, email, ciudad, departamento, direccion, 
            metodoPago, notas, nit, razonSocial 
        } = req.body;

        let productosFinales = [];
        let precio_total = 0;

        for (const p of productos) {
            const productoBD = await Producto.findById(p.productoId);
            if (!productoBD) return res.status(404).json({ mensaje: 'Producto no encontrado' });

            let precioReal = 0;
            const nombreProd = productoBD.nombre;

            // Lógica de precios
            if (nombreProd.includes('450g')) {
                precioReal = esMiembroClub ? 40000 : 65000;
            } else if (nombreProd.includes('5.8Kg')) {
                precioReal = esMiembroClub ? 600000 : 640000;
            } else if (nombreProd.includes('Filtro')) {
                precioReal = 60000;
            } else if (nombreProd.includes('Kit')) {
                precioReal = 120000;
            } else {
                precioReal = productoBD.precio || 0;
            }

            const subtotal = precioReal * p.cantidad;
            precio_total += subtotal;

            const esCafe = nombreProd.toLowerCase().includes('café') || nombreProd.toLowerCase().includes('cafe');

            productosFinales.push({
                productoId: p.productoId,
                nombre: nombreProd,
                cantidad: p.cantidad,
                precio_unitario: precioReal,
                subtotal: subtotal,
                molienda: esCafe ? (p.molienda || 'Grano') : 'No aplica',
                presentacion: p.presentacion // <--- ASEGÚRATE DE QUE ESTA LÍNEA EXISTA
            });
        }

        const nuevoPedido = new Pedido({
            usuarioId, nombre, cedula, celular, email, ciudad, departamento, 
            direccion, esMiembroClub, metodoPago, notas, nit, razonSocial,
            precio_total,
            productos: productosFinales,
            rol: (precio_total >= 600000) ? 'empresarial' : 'ocasional',
            estado: 'Pendiente'
        });

        await nuevoPedido.save();
        if (carritoId) await Carrito.findByIdAndDelete(carritoId);

        res.status(201).json({ mensaje: '¡Pedido registrado con éxito! ☕', pedido: nuevoPedido });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear pedido', error: error.message });
    }
};

// --- 2. OBTENER PEDIDOS ---
const obtenerPedidos = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const query = usuarioId ? { usuarioId } : {};
        const pedidos = await Pedido.find(query).sort({ fecha: -1 });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener pedidos', error: error.message });
    }
};

// --- 3. ELIMINAR PEDIDO ---
const eliminarPedido = async (req, res) => {
    try {
        await Pedido.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};

// --- EXPORTACIÓN ---
module.exports = { 
    crearPedido, 
    obtenerPedidos, 
    eliminarPedido 
};