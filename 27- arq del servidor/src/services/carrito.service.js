import { getDaoCarrito } from '../dao/carritos/carritos.dao.js';

const carritoDao = getDaoCarrito();

class CarritoService {
    async create(criterio) {
        return await carritoDao.createCart(criterio);
    }

    async findOne(criterio) {
        return await carritoDao.findCart(criterio);
    }

    async findByIdCart(id){
        return await carritoDao.findByIdCart(id)
    }

 
}

export const carritoService = new CarritoService();
