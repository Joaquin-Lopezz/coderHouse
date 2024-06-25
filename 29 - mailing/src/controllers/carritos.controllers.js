import { carritoService } from '../services/carrito.service.js';

export async function postCartsController(req, res, next) {
    try {
        const userId = req.params.userId;
        let carrito = await carritoService.findOne({ usuario: userId });

        if (!carrito) {
            carrito = await carritoService.create({
                usuario: userId,
                products: [],
            });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ carrito });
    } catch (error) {
        next(error);
    }
}

export async function addProductCart(req, res, next) {
    try {
        const carritoId = req.params.cid;

        const carrito = await carritoService.findByIdCart(carritoId);

        const productoAdd = req.body;

        const productoExistente = carrito.products.find(
            (itemProducto) =>
                itemProducto.idProduct == productoAdd.producto['_id']
        );

        if (productoExistente) {
            productoExistente.quantity += 1;
        } else {
            const aux = {
                idProduct: productoAdd.producto['_id'],
                title: productoAdd.producto['title'],
                price: productoAdd.producto['price'],
                description: productoAdd.producto['description'],
            };
            carrito.products.push(aux);
        }
        await carrito.save();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ carrito });
    } catch (error) {
        next(error);
    }
}

export async function compraCarrito(req, res, next) {
    const carritoId = req.params.cid;
    const productos = req.body;
    
  
    const amount = await  carritoService.getQuantityStock(carritoId,productos);
    res.status(200).json({
        status: 'success',
        payload: {
            carritoId: carritoId,
            amount: amount,
            mensaje: 'Compra realizada con éxito'
        }
    });
}

export async function deleteProduct(req, res, next) {
    const carritoId = req.params.cid;
    const idProduct = req.params.pid;

    const response = carritoService.deleteProduct(carritoId, idProduct);
    
    res.send(response);
}
/*
async (req, res) => {
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
*/
