const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');

exports.crearPedido = async (req, res) => {
    try {
        // 1. Desestructuración: Recibimos el ID del usuario (cliente) y la lista de productos
        const { 
            usuario, 
            nombre, 
            cedula, 
            celular, 
            email, 
            ciudad, 
            departamento, 
            direccion, 
            productos 
        } = req.body;

        // 2. Lógica de Ingeniería: Inicializamos el acumulador para el total del cliente
        let totalGeneral = 0;

        // 3. Procesamiento en paralelo: Validamos cada producto contra MongoDB Atlas
        const productosCalculados = await Promise.all(productos.map(async (item) => {
            
            // Buscamos el producto real por su ID para asegurar integridad
            const productoDb = await Producto.findById(item.productoId); 
            
            if (!productoDb) {
                throw new Error(`El producto con ID ${item.productoId} no existe en el catálogo.`);
            }

            // FÓRMULA: Cantidad solicitada * Precio enviado desde el frontend
            const sub = Number(item.cantidad) * Number(item.precio_unitario);
            
            // Acumulamos en el total que pagará el cliente
            totalGeneral += sub;

            return { 
                producto: item.productoId, // Referencia al ID para el populate
                nombre: item.nombre, 
                presentacion: item.presentacion,
                cantidad: Number(item.cantidad),
                precio_unitario: Number(item.precio_unitario),
                subtotal: sub
            };
        }));

        // 4. Construcción del Objeto Pedido: Vinculamos la identidad del cliente (usuario)
        const nuevoPedido = new Pedido({
            usuario, // ID del cliente obtenido de Atlas
            nombre,
            cedula,
            celular,
            email,
            ciudad,
            departamento,
            direccion,
            productos: productosCalculados,
            precio_total: totalGeneral, // El resultado de la sumatoria de ingeniería
            estado: 'Pendiente'
        });

        // 5. Persistencia: Guardamos el pedido final en la nube
        await nuevoPedido.save();

        res.status(201).json({
            msg: "¡Pedido registrado con éxito!",
            detalles: {
                cliente: nombre,
                total_pagar: totalGeneral,
                items_procesados: productosCalculados.length
            },
            pedido: nuevoPedido
        });

    } catch (error) {
        console.error("Error en la lógica de pedidos:", error.message);
        res.status(500).json({ 
            mensaje: "Error al procesar el pedido", 
            error: error.message 
        });
    }
};