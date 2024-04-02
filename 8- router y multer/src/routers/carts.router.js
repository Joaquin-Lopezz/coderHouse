import { Router } from 'express';
import CartsManager from '../service/CartsManager.js';

export const cartsRounter = Router();

const cartsManager = new CartsManager(
    'C:/Users/Tap/Desktop/Coder Houser/proyectos coderhouse/8- router y multer/src/carritos/carritos.json'
);

cartsRounter.post('/', (req, res) => {
    const newcarts = cartsManager.newcarts();
    res.status(201).send(newcarts);
});

cartsRounter.get('/:cid', (req, res) => {
    const id = parseInt(req.params.cid);
    if (isNaN(id)) {
        res.status(400).send('ingrese un numero como ID.');
        return;
    }
    const productoById = cartsManager.getCartsProductsById(id);
    if (productoById) {
        res.send(productoById);
    } else {
        res.send(`no existe un producto con el ID:${id}`);
    }
});

cartsRounter.post('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    if (isNaN(cid)) {
        res.status(400).send('ingrese un numero como ID.');
        return;
    }
    const pid = parseInt(req.params.pid);
    if (isNaN(pid)) {
        res.status(400).send('ingrese un numero como ID.');
        return;
    }
    const cartsId = cartsManager.cartId(cid);
    if (cartsId) {
        const prodcutoId = cartsManager.productoByid(pid);
        if (prodcutoId) {
            cartsManager.addProductToCart(cartsId, prodcutoId);
            res.send(cartsId);
        } else {
            res.status(404).send(`no se encontro el producto con id: ${pid}`);
        }
    } else {
        res.status(404).send(`no se encontro en carrito con id: ${cid}`);
    }
});
