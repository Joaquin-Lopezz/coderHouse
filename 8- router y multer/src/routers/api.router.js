import { Router } from 'express';
import { productsRounter } from './products.router.js';
import { cartsRounter } from './carts.router.js';

export const apiRounter = Router();

apiRounter.use('/products', productsRounter);
apiRounter.use('/carts', cartsRounter);
