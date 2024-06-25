import { Router } from 'express';
import { addProductCart, postCartsController } from '../../controllers/carritos.controllers.js';

export const carritoRouter = Router();

carritoRouter.post('/:userId',  postCartsController )

carritoRouter.post('/addProduct/:cid', addProductCart);

