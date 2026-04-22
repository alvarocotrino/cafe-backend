const Producto = require('../models/Producto');

// 1. OBTENER PRODUCTOS
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).send('Hubo un error al obtener los productos');
    }
};

// 2. CREAR PRODUCTO (Con tu lógica de filtrado de precios)
const crearProducto = async (req, res) => {
    try {
        let datos = req.body;

        // Lógica basada en tu modelo: 450g vs 5.8kg
        if (datos?.presentacion) {
            if (datos.presentacion === '5.8kg') {
                // Si es bulto, eliminamos precios de venta al detal
                delete datos.precio_ocasional;
                delete datos.precio_club_ocasional;
            } else if (datos.presentacion === '450g') {
                // Si es bolsa, eliminamos precios de venta empresarial
                delete datos.precio_empresarial;
                delete datos.precio_club_empresarial;
            }
        } else if (datos.categoria === 'Accesorio') {
            // Limpieza para Kits o Filtros
            delete datos.precio_club_ocasional;
            delete datos.precio_empresarial;
            delete datos.precio_club_empresarial;
        }

        const nuevoProducto = new Producto(datos);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.log(error);
        res.status(400).send('Error al crear el producto: ' + error.message);
    }
};

// 3. OBTENER POR ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).send('Error de servidor');
    }
};

// 4. ELIMINAR
const eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) return res.status(404).json({ msg: 'El producto no existe' });
        res.json({ msg: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).send('Error al eliminar');
    }
};

module.exports = { 
    crearProducto, 
    obtenerProductos,
    obtenerProductoPorId,
    eliminarProducto
};