import { Router, json } from 'express';
import { cartsManager } from '../models/mongodb.js';
import { productosManager } from '../models/mongodb.js';
export const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
    //crear un carrito
    const carritoCreado = await cartsManager.create({ products: [] });
    res.send(carritoCreado);
});

cartsRouter.get('/:cid', async (req, res) => {
    //obtener los productos que tenga un carrito segun el id que ingrese
    const carritoId = req.params.cid;

    const productosCarrito = await cartsManager.findById(carritoId).lean();

    if (!productosCarrito) {
        return res
            .status(404)
            .send(`no existe el carrito con id: ${carritoId} `);
    }

    res.send(productosCarrito);
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    //agregar un producto al carrito
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

    // Verificar si el producto ya existe en el carrito
    const productoIndex = carrito.products.findIndex(
        (item) => item.producto === productoId
    );
    

    if (productoIndex !== -1) {
        // El producto ya existe en el carrito, incrementar la cantidad
        carrito.products[productoIndex].quantity += 1;
    } else {
        // El producto no existe en el carrito, agregarlo al array con cantidad 1
        carrito.products.push({ producto: product._id, quantity: 1 });
    }

    await carrito.save();

    res.send(
        `Se agregó el producto con el ID: ${productoId}
         al carrito con el ID: ${carritoId}

        ${carrito}`
    );
});
