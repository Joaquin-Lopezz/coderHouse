import { Router } from 'express';
import { cartsManager } from '../../models/carts.js';

export const carritoRouter = Router();

carritoRouter.post('/:userId', async (req, res) => {
    //crear un carritob

    try {
        const userId = req.params.userId;

        //preguntamos si el usuario ya tiene un carrito
        const carrito = await cartsManager.findOne({ usuario: userId });

        if (!carrito) {
            //creamos el carrito
            carrito = await cartsManager.create({
                usuario: userId,
                products: [],
            });
        }

        res.send(carrito);
    } catch (error) {
        res.send(error);
    }
});

carritoRouter.post('/addProduct/:cid', async (req, res) => {
    //añadimos el producto al carritoId  si ya existe aumentamos el quenrity

    const carritoId = req.params.cid;

    const carrito = await cartsManager.findById(carritoId);
    const productoAdd = req.body;

    const productoExistente = carrito.products.find(
        (itemProducto) => itemProducto.idProduct == productoAdd.producto['_id']
    );

    if (productoExistente) {
        productoExistente.quantity += 1;
        await carrito.save();
    } else {
        const aux = {
            idProduct: productoAdd.producto['_id'],
            title: productoAdd.producto['title'],
            price: productoAdd.producto['price'],
            description: productoAdd.producto['description'],
        };

        carrito.products.push(aux);
        await carrito.save();
    }

    res.send('se agrego el producto al carrito');
});
