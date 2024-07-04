import { model } from 'mongoose';
import { productoSchema } from './mongoose/productos.models.mongoose.js';
import { productoDaoMongoose } from './mongoose/productos.dao.mongoose.js';

const productosModel = model('productos', productoSchema);
const daoProducts = new productoDaoMongoose(productosModel);

console.log('persistiendo productos en: mongodb');

export function getDaoProductos() {
    return daoProducts;
}