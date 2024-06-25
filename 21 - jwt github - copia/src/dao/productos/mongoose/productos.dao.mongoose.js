import { toPOJO } from '../../utils.js';

export class productoDaoMongoose {
    constructor(productosModel) {
        this.productosModel = productosModel;
    }
    async findproducts() {
        const productos = await this.productosModel.find();
        return toPOJO(productos);
    }
    async getProductById (id){
        const producto = await this.productosModel.findById(id)
        return toPOJO(producto)
    }

    async createProduct (newProduct){
        const producto = await this.productosModel.create(newProduct)
        return toPOJO(producto)
    }
}
