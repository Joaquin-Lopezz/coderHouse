import { Router } from 'express';
import { productosMongoManager as ProductosManager } from '../dao/productosManager.js';

export const viewsProducts = Router();

const productosManager = new ProductosManager();

viewsProducts.get('/', async (req, res) => {
    let {pagina} = req.query
    if(!pagina) pagina=1

    let {
        docs: productos,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
    } = await productosManager.getAllPaginate(pagina);
   

    
    res.setHeader('Content-type', 'text/html');
    res.status(200).render('productos.handlebars', {
        productos,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
    });
});


