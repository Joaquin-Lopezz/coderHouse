import { carritoService } from '../../../services/carrito.service.js';
import { toPOJO } from '../../utils.js';

export class productoDaoMongoose {
    constructor(productosModel) {
        this.productosModel = productosModel;
    }
    async findproducts() {
        const productos = await this.productosModel.find();
        return toPOJO(productos);
    }
    async getProductById(id) {
        const producto = await this.productosModel.findById(id);
        return toPOJO(producto);
    }

    async createProduct(newProduct) {
        const producto = await this.productosModel.create(newProduct);
        return toPOJO(producto);
    }

    async deleteOne(id) {
        const productoEliminado = await this.productosModel.deleteOne(id);
        return productoEliminado;
    }

    async updateOne(id, datos) {
        const productosActualizados = await this.productosModel.updateOne(
            id,
            datos
        );

        return productosActualizados;
    }

    async compareStock(idCarrito, productosCarritos) {
        let amount = 0;
        for (const product of productosCarritos.arrayProductos) {
            const quantityBuyProduct = product.quantity;
            const id = product.idProduct;
            const productoStock = await this.getProductById(id);

            if (productoStock.stock >= quantityBuyProduct) {
                //compramos que esten los productos en el stock y los restamos de productos
                const restaStock = productoStock.stock - quantityBuyProduct;
                const idProduct = { _id: id };
                const nuevoStock = { stock: restaStock };
                await this.updateOne(idProduct, nuevoStock);
              
                amount += product.price * quantityBuyProduct;
                //eliminar producto del carrito
                await carritoService.buscarIndiceDelProducto(idCarrito, id);
            }
        }
      
        return amount;
    }
}
