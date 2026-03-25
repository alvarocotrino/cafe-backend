const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');

// CREAR UN NUEVO PEDIDO AUTOMATIZADO
router.post('/', async (req, res) => {
    try {
        const { productoId, cantidad, esMiembroClub } = req.body;

        // 1. Buscar el producto en la base de datos
        const producto = await Producto.findById(productoId);
        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

        // 2. Lógica de Ingeniería: Selección de precio por Presentación
        let precioAplicado = 0;
        
        // Comprobamos si es la presentación empresarial de 5.8kg
        const esEmpresarial = producto.presentacion.includes('5.8');

        if (esEmpresarial) {
            // Aplicar escala de 5.8kg (Empresarial)
            precioAplicado = esMiembroClub ? producto.precio_club_empresarial : producto.precio_empresarial;
        } else {
            // Aplicar escala de 450g (Ocasional)
            precioAplicado = esMiembroClub ? producto.precio_club_ocasional : producto.precio_ocasional;
        }

        // 3. Cálculo del subtotal
        const subtotal = precioAplicado * cantidad;

        // 4. Guardar el pedido
        const nuevoPedido = new Pedido({
            producto: productoId,
            cantidad,
            precio_unitario: precioAplicado,
            subtotal: subtotal,
            esMiembroClub
        });

        await nuevoPedido.save();
        
        res.status(201).json({
            mensaje: 'Pedido procesado con éxito',
            detalles: {
                presentacion: producto.presentacion,
                precio_unitario: precioAplicado,
                total: subtotal,
                ahorro_club: esMiembroClub ? 'Descuento aplicado ✅' : 'Sin descuento'
            }
        });

    } catch (error) {
        res.status(400).json({ mensaje: 'Error al procesar el pedido', error: error.message });
    }

  


});
// Este código va en la línea 65 (el espacio vacío que tienes)
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate('producto')
            .populate('usuario');
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener pedidos', error: error.message });
    }
});
module.exports = router;