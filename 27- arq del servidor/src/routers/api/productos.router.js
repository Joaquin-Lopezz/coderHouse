import { Router } from 'express';
import { getcontroller, postcontroller } from '../../controllers/productos.controllers.js';


export const productosRouter = Router();


productosRouter.get('/',getcontroller )


productosRouter.post('/', postcontroller)

