const Producto = require('../models/Producto');
exports.obtenerProductos = async (req, res) => {//1. OBTENER TODOS LOS PRODUCTOS
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }};
exports.crearProducto = async (req, res) => {// 2. CREAR PRODUCTO (Con la lógica de café artesanal)
    try {
        let datos = req.body;
        if (datos?.presentacion) {
            if (datos.presentacion.includes('5.8kg')) {
                delete datos.precio_ocasional;
                delete datos.precio_club_ocasional;
            } else if (datos.presentacion.includes('450g')) {
                delete datos.precio_empresarial;
                delete datos.precio_club_empresarial;
            }                    }
 else if (datos.categoria === 'Accesorio') {
            // Limpieza para productos complementarios (Kit/Filtros)
            delete datos.precio_club_ocasional;
            delete datos.precio_empresarial;
            delete datos.precio_club_empresarial;
        }

        const nuevoProducto = new Producto(datos);// crear producto con los datos filtrados
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).send('Error al crear');
    }};
exports.obtenerProductoPorId = async (req, res) => {// 3. OBTENER UN SOLO PRODUCTO
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ msg: 'No existe' });
        res.json(producto);
    } catch (error) {
        res.status(500).send('Error de servidor');
    }};
exports.eliminarProducto = async (req, res) => {// 4. ELIMINAR PRODUCTO
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) return res.status(404).json({ msg: 'No existe' });
        res.json({ msg: 'Producto eliminado' });
    } catch (error) {
        res.status(500).send('Error al eliminar');
    }
};

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

        if (!productos || productos.length === 0) {
            return res.status(400).json({ mensaje: 'No hay productos en el pedido' });
        }

        let productosFinales = [];
        let precio_total = 0;

        for (const p of productos) {
            const productoBD = await Producto.findById(p.productoId);
            if (!productoBD) return res.status(404).json({ mensaje: `Producto ${p.productoId} no encontrado` });

            let precioReal = 0;
            const nombreProd = productoBD.nombre;

            // Lógica de precios de Ventana al Quindío
            if (nombreProd.includes('450g')) {
                precioReal = esMiembroClub ? 40000 : 65000;
            } else if (nombreProd.includes('5.8 Kg')) {
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
                molienda: esCafe ? (p.molienda || 'Grano') : 'No aplica'
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
        
        // Si viene de un carrito, lo limpiamos
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

// --- 3. ACTUALIZAR ESTADO (Opcional pero útil) ---
const actualizarEstadoPedido = async (req, res) => {
    try {
        const { estado } = req.body;
        const pedido = await Pedido.findByIdAndUpdate(req.params.id, { estado }, { new: true });
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar estado', error: error.message });
    }
};

// --- 4. ELIMINAR PEDIDO ---
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
    actualizarEstadoPedido,
    eliminarPedido 
};