import { getDaoCarrito } from '../dao/carritos/carritos.dao.js';
import { productoService } from './productos.service.js';


const carritoDao = getDaoCarrito();


class CarritoService {
    async create(criterio) {
        return await carritoDao.createCart(criterio);
    }

    async findOne(criterio) {
        return await carritoDao.findCart(criterio);
    }

    async findByIdCart(id) {
        return await carritoDao.findByIdCart(id);
    }

    async getQuantityStock(idCarrito ,productosCarritos) {
        //trae los productos
        const compararStockCompra = await productoService.compareStock(idCarrito,productosCarritos);
        return compararStockCompra;
    }

    async deleteProduct(idCart, idProduct) {
        // Llamamos al método deleteProduct en carritoDao
        try {
            const updatedCart = await carritoDao.deleteProduct(idCart, idProduct);
            return updatedCart;
        } catch (error) {
            throw new Error(`Error eliminando el producto: ${error.message}`);
        }
    }

    async buscarIndiceDelProducto(Idcarrito, productoId) {
        const carrito =  await this.findByIdCart(Idcarrito)
       
        const productoIndex = carrito.products.findIndex(
            (item) => item.idProduct === productoId
        );

        if (productoIndex === -1) {
            return 'producto no encontrado';
        }
        carrito.products.splice(productoIndex, 1);
        await carrito.save();
    }
}

export const carritoService = new CarritoService();
