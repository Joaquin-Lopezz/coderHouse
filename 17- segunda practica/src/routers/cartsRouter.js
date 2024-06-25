 import { Router, json } from 'express';
import { cartsManager } from '../dao/models/mongodb.js';
import { productosModelo as productosManager } from '../dao/models/productosModels.js';

export const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
    //crear un carrito
    const carritoCreado = await cartsManager.create({ products: [] });
    res.send(carritoCreado);
});

cartsRouter.get('/:cid', async (req, res) => {
    //obtener los productos que tenga un carrito segun el id que ingrese
    const carritoId = req.params.cid;
    try {
        const carritoPoblado = await cartsManager
            .findById(carritoId)
            .populate({ path: 'products.producto', model: productosManager });

        if (!carritoPoblado) {
            return res
                .status(404)
                .send(`no existe el carrito con id: ${carritoId} `);
        }

        res.send(carritoPoblado);
    } catch (error) {
        res.send(error);
    }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
        //agregamos un producto a un carrito
    try {
        const carritoId = req.params.cid;
        const productoId = req.params.pid;

        const carrito = await cartsManager.findById(carritoId);
        if (!carrito) {
            return res
                .status(404)
                .send(`no existe un carrito con el Id: ${carritoId}`);
        }

        const product = await productosManager.findById(productoId);

        if (!product) {
            return res
                .status(404)
                .send(`no existe un producto con el Id: ${productoId}`);
        }

        const productoIndex = carrito.products.findIndex(
            (item) => item.producto === productoId
        );

        if (productoIndex !== -1) {
            carrito.products[productoIndex].quantity += 1;
        } else {
            carrito.products.push({ producto: productoId, quantity: 1 });
        }

        await carrito.save();

        res.send(
            `Se agregó el producto con el ID: ${productoId}
         al carrito con el ID: ${carritoId}`
        );
    } catch (error) {
        res.send(error);
    }
});

cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    //Eliminamos un producto de un carrito
    let carritoId = req.params.cid;
    let productoId = req.params.pid;
    try {
        const carrito = await cartsManager.findById(carritoId);
        if (!carrito) {
            res.status(404).send(
                `carrito con el Id:${carritoId} no encontrado`
            );
        }

        const index = carrito.products.findIndex(
            (products) => products.producto === productoId
        );

        if (index === -1) {
            return res
                .status(404)
                .send(`producto con el Id no encontrado ${productoId}`);
        }

        carrito.products.splice(index, 1);

        await carrito.save();

        res.send(
            `se elimino el producto con el id ${productoId} , en el carrito: ${carritoId}  `
        );
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
});

cartsRouter.put('/:cid', async (req, res) => {
    //actualizamos el carrito con un arreglo de productos
    const carritoId = req.params.cid;
    const nuevosProductos = req.body;
    try {
        const carrito = await cartsManager.findById(carritoId);
        if (!carrito) {
            return res
                .status(404)
                .send(`carrito con el Id:${carritoId} no encontrado`);
        }

        const productosIds = nuevosProductos.map(
            (producto) => producto.producto
        );
        const productosExistentes = await productosManager.find({
            _id: { $in: productosIds },
        });

        if (productosExistentes.length !== productosIds.length) {
            return res
                .status(400)
                .send(
                    'Uno o más productos no existen en la colección de productos.'
                );
        }

        carrito.products = nuevosProductos;
        await carrito.save();

        res.status(200).json(carrito);
    } catch (error) {
        console.error('Error al actualizar el carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
});

cartsRouter.put('/:cid/products/:pid', async (req, res) => {
    let carritoId = req.params.cid;
    let productoId = req.params.pid;
    let cantidad = req.body.quantity;

    if (isNaN(cantidad)) {
        return res.status(400).send('error en el ingreso de datos quantity');
    }
    try {
        const carrito = await cartsManager.findById(carritoId);
        if (!carrito) {
            return res
                .status(404)
                .send(`carrito con el Id:${carritoId} no encontrado`);
        }
        const index = carrito.products.findIndex(
            (producto) => producto.producto === productoId
        );

        if (index === -1) {
            return res
                .status(404)
                .send(
                    `Producto con el ID: ${productoId} no encontrado en el carrito`
                );
        }

        carrito.products[index].quantity = cantidad;

        await carrito.save();

        res.status(200).json(carrito);
    } catch (error) {
        console.error('Error al actualizar el quantity del carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
});

cartsRouter.delete('/:cid', async (req, res) => {
    let carritoId = req.params.cid;

    try {
        const carrito = await cartsManager.findById(carritoId);
        if (!carrito) {
            return res
                .status(404)
                .send(`carrito con el Id:${carritoId} no encontrado`);
        }

        carrito.products = [];
        await carrito.save();
        res.status(200).send(
            `los productos del carrito con Id: ${carritoId}. Fueron eliminados`
        );
    } catch (error) {
        console.error('Error al eliminar los productos del carrito', error);
        res.status(500).send('Error interno del servidor');
    }
});
