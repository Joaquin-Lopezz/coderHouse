import { Router } from 'express';
import { createPaginationLink } from '../utils/funciones.js';
import { productosModelo  as productosManager} from '../dao/models/productosModels.js';



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
    try {
        let { limit = 10, page = 1, category, sort, query } = req.query;

        const querys = {
            limit: parseInt(limit),
            page: parseInt(page),
            lean: true,
            sort: sort && {
                price: sort === 'asc' ? 1 : sort === 'desc' ? -1 : undefined,
            },
        };

        const findQuery = query ? { tipo: query } : {};

        if (category) {
            req.category = category;
        }

        const resultados = await productosManager.paginate(findQuery, querys);

        const response = {
            status: 'success',
            payload: resultados.docs,
            totalPages: resultados.totalPages,
            prevPage: resultados.prevPage,
            nextPage: resultados.nextPage,
            page: resultados.page,
            hasPrevPage: resultados.hasPrevPage,
            hasNextPage: resultados.hasNextPage,
            prevLink: resultados.hasPrevPage
                ? createPaginationLink(req, resultados.prevPage)
                : null,
            nextLink: resultados.hasNextPage
                ? createPaginationLink(req, resultados.nextPage)
                : null,
        };
        res.send(response);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            payload: null,
            totalPages: 0,
            prevPage: null,
            nextPage: null,
            page: 0,
            hasPrevPage: false,
            hasNextPage: false,
            prevLink: null,
            nextLink: null,
        });
    }
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
