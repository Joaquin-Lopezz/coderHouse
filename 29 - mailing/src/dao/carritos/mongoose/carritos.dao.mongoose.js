import { toPOJO } from '../../utils.js';

export class carritoDaoMongoose {
    constructor(cartsModel) {
        this.cartsModel = cartsModel;
    }

    async createCart(data) {
        //creamos un carrito
        const carrito = await this.cartsModel.create(data);
        return toPOJO(carrito);
    }

    async findCart(query) {
        // encontramos carrito que pertenesca al usuario
        const carrito = await this.cartsModel.findOne(query).lean();
        return toPOJO(carrito);
    }
    async deleteProduct(idCart, idProduct) {
        // eliminamos el producto del carrito
        const carrito = await this.cartsModel.findById(idCart);
        //bien
        if (!carrito) {
            throw new Error('Carrito no encontrado');
        }
        const productIndex = carrito.products.findIndex(product => product.idProduct === idProduct);
        console.log(idProduct)
        if (productIndex === -1) {
            throw new Error('Producto no encontrado en el carrito');
        }
        carrito.products.splice(productIndex, 1);
        await carrito.save();
        return toPOJO(carrito);
    }


    async findByIdCart(id) {
        // encontramos el carrito que corresponda al id
        const carrito = await this.cartsModel.findById(id);
        return carrito;
    }
}
