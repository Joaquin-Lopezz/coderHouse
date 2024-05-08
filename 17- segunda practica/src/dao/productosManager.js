import { productosModelo } from './models/productosModels.js';

export class productosMongoManager {
    async getAll() {
        return await productosModelo.find().lean();
    }

    async getAllPaginate(page = 1) {
        return await productosModelo.paginate(
            {},
            { limit: 2, page, lean: true }
        );
    }
}
