import { Router } from 'express';
import ProductManager from '../service/ProductManager.js';
import { Producto } from '../service/ProductManager.js';

export const productsRounter = Router();

const productManager = new ProductManager(
    'C:/Users/Tap/Desktop/Coder Houser/proyectos coderhouse/6 - express/src/productos/productos.json'
);

productsRounter.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || undefined;
    const productoLimite = await productManager.getProducts(limit);
    res.send(productoLimite);
});

productsRounter.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);

    if (isNaN(id)) {
        res.status(400).send('ingrese un numero como ID.');
        return;
    }
    const productoId = await productManager.getProductsId(id);

    if (productoId) {
        res.send(productoId);
    } else {
        res.send(`no existe un producto con el ID:${id}`);
    }
});

productsRounter.post('/', async (req, res) => {
    console.log(req.body);
    const producto = new Producto(req.body);
    const newProducts = await productManager.addProducts(producto);
    if (newProducts) {
        res.send('El producto se agrego correctamente');
    } else {
        res.status(400).send('El codigo ya esta en uso');
    }
});

productsRounter.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const nuevosValores = req.body;
    const datosActualizados = await productManager.updateProducts(
        id,
        nuevosValores
    );
    if (datosActualizados) {
        res.send(`los datos del producto con el ID:${id} ,fueron modificados.`);
    } else {
        res.status(400).send('El Id y el Code no pueden ser modificados.');
    }
});

productsRounter.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    if (isNaN(id)) {
        res.status(400).send('ingrese un numero como ID.');
        return;
    }
    const productDelete = productManager.deleteproductById(id);

    if (productDelete) {
        res.send(`el producto con el Id: ${id}, fue eliminado`);
    } else {
        res.send(`no existe un producto con el Id: ${id}.`);
    }
});

export default productManager;
