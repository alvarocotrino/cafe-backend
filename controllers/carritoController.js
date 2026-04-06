const Carrito = require('../models/Carrito');
const Producto = require('../models/Producto');
const agregarAlCarrito = async (req, res) => {// 1. AGREGAR O ACTUALIZAR PRODUCTO (Lógica de Precios Ventana al Quindío)
    try {
        const { usuarioId, productoId, cantidad, esMiembroClub } = req.body;
        // Validar el producto y calcular precio según peso
        const producto = await Producto.findById(productoId);
        if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
             let precioAplicado = 0;
        if (producto.categoria === 'Accesorio') {// Lógica de Precios Ventana al Quindío por Categoría
            precioAplicado = producto.precio_ocasional;// Los accesorios tienen un precio fijo estándar
        } else {
            const esEmpresarial = producto.presentacion.includes('5.8');// Lógica para Café Especial (Basada en peso y membresía)
            if (esEmpresarial) {
                precioAplicado = esMiembroClub ? producto.precio_club_empresarial : producto.precio_empresarial;
            } else {
                precioAplicado = esMiembroClub ? producto.precio_club_ocasional : producto.precio_ocasional;
            }
        }
          let carrito = await Carrito.findOne({ usuario: usuarioId });// Buscar o crear el carrito del usuario
        if (!carrito) {
            carrito = new Carrito({ usuario: usuarioId, productos: [] });
        }
            const existe = carrito.productos.findIndex(p => p.productoId.toString() === productoId);// Verificar si el café ya está en el carrito
        if (existe >= 0) {
            // Caso A: El producto ya está en el carrito, actualizamos
            carrito.productos[existe].cantidad += Number(cantidad);
            carrito.productos[existe].precio_unitario = precioAplicado;
            carrito.productos[existe].subtotal = carrito.productos[existe].cantidad * precioAplicado;
        } else {
            // Caso B: El producto es nuevo, lo agregamos con todas sus propiedades
            carrito.productos.push({
                productoId: productoId,
                cantidad: Number(cantidad),
                precio_unitario: precioAplicado,
                subtotal: Number(cantidad) * precioAplicado
            });
        }
        // Calculamos el total general del carrito sumando los subtotales
        carrito.total = carrito.productos.reduce((acc, item) => acc + item.subtotal, 0);
        await carrito.save();
        res.status(200).json({ msg: 'Carrito actualizado con éxito ☕', carrito });

    } catch (error) {
        res.status(500).json({ msg: 'Error al agregar', error: error.message });
    }
};
const obtenerCarrito = async (req, res) => { // 2. OBTENER EL CARRITO
    try {
        const { usuarioId } = req.params;
        const carrito = await Carrito.findOne({ usuario: usuarioId }).populate('productos.producto');
        if (!carrito) return res.status(200).json({ productos: [] });
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el carrito' });
    }
};
const eliminarDelCarrito = async (req, res) => {// 3. VACIAR CARRITO (Corregido: se eliminó la llave extra que causaba error)
    try {
        const { usuarioId } = req.body;
        await Carrito.findOneAndDelete({ usuario: usuarioId });
        res.status(200).json({ msg: 'Carrito vaciado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el carrito' });
    }
};
module.exports = { agregarAlCarrito, obtenerCarrito, eliminarDelCarrito };// EXPORTACIÓN UNIFICADA (Línea final fundamental)