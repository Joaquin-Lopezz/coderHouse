import { Router, json } from 'express';
import { productosRouter } from './productosrouter.js';
import { cartsRouter } from './cartsRouter.js';

export const appRouter = Router();

appRouter.use(json());

appRouter.use('/productos', productosRouter);
appRouter.use('/carts', cartsRouter);
