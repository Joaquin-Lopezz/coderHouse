import fs from 'fs';
import productManager from '../routers/products.router.js';

class CartsManager {
    constructor(path) {
        this.path = path;
        this.counterId = 1;
        this.carritos = [];
        this.loadCarritos();
    }

    loadCarritos() {
        //carga los datos a products formato JSON
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path);
            this.carritos = JSON.parse(data);
            console.log('los datos fueron cargados.');
            // esto esta de mas

            if (this.carritos.length == 0) {
                this.counterId = 1;
            } else {
                const maxId = Math.max(
                    ...this.carritos.map((carritos) => carritos.id)
                );
                this.counterId = maxId + 1;
                
            }
            // los mismo que en products esto esta de mas
        } else {
            this.counterId = 1;
        }
    }

    async newcarts() {
        const cart = new Carts(this.counterId);
        this.carritos.push(cart);
        this.counterId++;
        this.saveCarritos();
        return true;
    }

    saveCarritos() {
        //guarda los datos en el path en formato json
        const data = JSON.stringify(this.carritos, null, 2);
        fs.writeFileSync(this.path, data);
        console.log('los datos fueron guardados.');
    }

    getCartsProductsById(id) {
        const carritosId = this.carritos.find((carritos) => carritos.id === id);
        if (carritosId) {
            return carritosId.products;
        } else {
            return false;
        }
    }

    cartId(cid) {
        const carritoById = this.getCartsProductsById(cid);
        if (carritoById) {
            return carritoById;
        } else {
            return false;
        }
    }

    productoByid(pid) {
        const productoByid = productManager.getProductsId(pid);
        if (productoByid) {
            return { id: productoByid.id };
        } else return false;
    }

    addProductToCart(productArray, product) {
        const existingProducts = productArray.find(
            (item) => item.id === product.id
        );
        if (existingProducts) {
            existingProducts.quantity += 1;
        } else {
            productArray.push({ ...product, quantity: 1 });
        }

        this.saveCarritos();
    }
}

class Carts {
    constructor(id) {
        this.id = id;
        this.products = [];
    }
}

export default CartsManager;
