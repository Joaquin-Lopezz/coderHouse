import { Router } from 'express';
import { productosManager } from '../models/mongodb.js';
import mongoose from 'mongoose';

export const productosRouter = Router();

productosRouter.post('/', async (req, res) => {
    //agregar un producto
    try {
        const nuevoProducto = await productosManager.create(req.body);
        res.send(nuevoProducto);
    } catch (error) {
        if (error.code === 11000) {
            console.error(
                'Error al insertar el producto: ya existe un producto con el mismo código.'
            );
            res.status(400).send('Ya existe un producto con el mismo código.');
        } else {
            res.status(500).send('error del sistema');
        }
    }
});

productosRouter.get('/', async (req, res) => {
    //obtener todos los productos
    const productos = await productosManager.find().lean();
    res.json(productos);
});

productosRouter.get('/:pid', async (req, res) => {
    //buscar un producto por id
    const idString = req.params.pid;
    const productosId = await productosManager.findById(idString).lean();
    if (productosId) {
        res.send(productosId);
    } else {
        res.status(404).send(`no existe el producto onc Id: ${idString}
        `);
    }
});

productosRouter.put('/:pid', async (req, res) => {
    //actualizar datos de un producto por id
    const idString = req.params.pid;
    const nuevosValores = req.body;
    delete nuevosValores._id;

    if ('code' in nuevosValores) {
        return res
            .status(400)
            .send('No se permite modificar los campos id y code.');
    }

    try {
        const productoActualizado = await productosManager.updateOne(
            { _id: idString },
            nuevosValores
        );

        if (productoActualizado.matchedCount != 1) {
            return res.status(400).send('id de producto no existe');
        }

        res.send(`Se actualizo el producto con Id: ${idString}  `);
    } catch (error) {
        console.log(error);
        res.status(500).send('error en la carga de datos');
    }
});

productosRouter.delete('/:pid', async (req, res) => {
    //eliminar el producto que corresponda al Id ingresado
    try {
        const idString = req.params.pid;
        const productoEliminado = await productosManager.deleteOne({
            _id: idString,
        });

        if (productoEliminado.deletedCount > 0) {
            return res.send(`Se elimino el producto con Id: ${idString}  `);
        } else {
            return res
                .status(404)
                .send(`no se encontro ningun producto con Id: ${idString}`);
        }
    } catch (error) {
        res.status(500).send('error en la eliminacion de datos');
    }
});
