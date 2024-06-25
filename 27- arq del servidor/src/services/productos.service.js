import { getDaoProductos } from '../dao/productos/productos.dao.js';

const productosDao = getDaoProductos();

class ProductoService {
    async readProduct() {
        return await productosDao.findproducts();
    }

    async productById(id) {
        return await productosDao.getProductById(id);
    }

    async createProduct(newProduct){
        return await productosDao.createProduct(newProduct)
    }
}

export const productoService = new ProductoService();
