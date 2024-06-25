import { productoService } from '../services/productos.service.js';

export async function getcontroller(req, res, next) {
    try {
        const productos = await productoService.readProduct();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
}

export async function postcontroller(req, res, next) {
    try {
        const newProduct = req.body;
        const productIdExists = await productoService.productById(
            newProduct['_id']
        );
        if (productIdExists) {
            return res.status(409).send('el producto ya existe');
        }
        const producto = await productoService.createProduct(newProduct);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(producto);
    } catch (error) {
        const detalleError = new Error('producto duplicado o falla en la carga de datos')
        next(detalleError);
    }
}

/*
const newProducto = req.body;
        const productIdExists = await productosManager.findById(
            newProducto['_id']
        );

        if (productIdExists) {
            return res.status(409).send( 'el producto ya existe' );
        } else {
            const productos = await productosManager.create(newProducto);
            res.send(productos);
        }
            */
