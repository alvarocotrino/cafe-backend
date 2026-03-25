const Pedido = require('../models/Pedido');

exports.crearPedido = async (req, res) => {
    try {
        const { nombre, cedula, celular, email, ciudad, departamento, direccion, productos } = req.body;

        // 1. Cálculos de ingeniería
        let totalGeneral = 0;

const productosCalculados = productos.map(item => {
    const sub = Number(item.cantidad) * Number(item.precio_unitario);
    totalGeneral += sub;
        return { 
        productoId: item.productoId,
        nombre: item.nombre, 
        presentacion: item.presentacion,
        cantidad: Number(item.cantidad),
        precio_unitario: Number(item.precio_unitario),
        subtotal: sub
        };
});

        // 2. Crear el objeto con los datos procesados
        const nuevoPedido = new Pedido({
            nombre,
            cedula,
            celular,
            email,
            ciudad,
            departamento,
            direccion,
            productos: productosCalculados,
            precio_total: totalGeneral,
            estado: 'Pendiente'
        });

        // 3. Guardar en la base de datos
        await nuevoPedido.save();

        res.status(201).json({
            msg: "¡Pedido registrado con éxito!",
            pedido: nuevoPedido
        });

    } catch (error) {
        console.error("Error en el servidor:", error.message);
        res.status(500).json({ error: error.message });
    }
};