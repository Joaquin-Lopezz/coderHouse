import { Router } from 'express';

export const productosRouter = Router();

productosRouter.get('/productos', (req, res) => {
    res.render('productos.handlebars', {
        pageTitle: 'Productos',
    });
});
