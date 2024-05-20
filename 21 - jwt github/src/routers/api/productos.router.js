import { Router } from 'express';
import { productosManager } from '../../models/productos.js';

export const productosRouter = Router();

productosRouter.get('/', async (req, res) => {
    //obtiene todos los productos
    try {
        const productos = await productosManager.find();
        res.send(productos);
    } catch (error) {
        res.status(500);
    }
});

productosRouter.post('/', async (req, res) => {
    //añadir producto
    try {
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
    } catch (error) {
        res.status(400).send('error en el igreso de datos');
    }
});
