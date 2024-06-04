import model from 'mongoose';
import { cartsSchema } from './mongoose/carritos.models.mongoose';
import { carritoDaoMongoose } from './mongoose/carritos.dao.mongoose';

let daoCarts;

const tiendasModel = model('carritos', cartsSchema);
daoCarts = new carritoDaoMongoose(tiendasModel);
console.log('perisistiendo carritos en :mongodb');

export function getDaoCarrito() {
    return daoCarts;
}

