import { getDaoProductos } from '../dao/productos/productos.dao.js';

 const productosDao = getDaoProductos();

class ProductoService {
    async readProduct() {
        return await productosDao.findproducts();
    }

    async productById(id) {
        return await productosDao.getProductById(id);
    }

    async createProduct(newProduct) {
        return await productosDao.createProduct(newProduct);
    }

    async deleteOne(id) {
        return await productosDao.deleteOne(id);
    }

    async updateOne(id,datos) {

        return await productosDao.updateOne(datos);
    }
    async compareStock(idCarrito,productosCarritos){

        return await  productosDao.compareStock(idCarrito,productosCarritos)
    }
    
}

export const productoService = new ProductoService();
