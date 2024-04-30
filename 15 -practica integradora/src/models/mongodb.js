import mongoose from 'mongoose';
import { MONGODB_CNX_STR } from '../config.js';

await mongoose.connect(MONGODB_CNX_STR);
console.log('base de datos conectada');
export { productosManager } from './productos.js';
export { cartsManager } from './carts.js';
