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