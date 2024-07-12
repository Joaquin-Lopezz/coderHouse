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
        const detalleError = new Error(
            'producto duplicado o falla en la carga de datos'
        );
        next(detalleError);
    }
}

export async function deletecontroller(req, res, next) {
    try {
        const id = req.params.pid;

        const productoDelete = await productoService.deleteOne({
            _id: id,
        });
        console.log(productoDelete);
        if (productoDelete.deletedCount > 0) {
            return res.send(`Se elimino el producto con Id: ${id}  `);
        } else {
            return res
                .status(404)
                .send(`no se encontro ningun producto con Id: ${id}`);
        }
    } catch (error) {}
}

export async function putcontroller(req, res, next) {
    const idProduct = req.params.pid;

    const nuevosDatos = req.body;
    delete nuevosDatos._id;
    console.log(nuevosDatos)


    if ('code' in nuevosDatos) {
        return res
            .status(400)
            .send('No se permite modificar los campos id y code.');
    }
    
    try {
        const productoActualizado = await productoService.updateOne(
            { _id: idProduct },
            nuevosDatos
        );

        if (productoActualizado.matchedCount != 1) {
            return res.status(400).send('id de producto no existe');
        }
        return res.send('el producto se actualizo');
    } catch (error) {}
}
