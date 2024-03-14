import { notNull } from './utils/metodos.js';

class ProductManager {
    constructor() {
        this.counter = 0;
        this.producto = [];
    }
    addProduct(newProduct) {
        if (
            this.producto.some(
                (productoElemento) => productoElemento.code == newProduct.code
            )
        ) {
            return console.log(`el codigo: ${newProduct.code}. Ya existe`);
        }

        newProduct.id = ++this.counter;
        this.producto.push(newProduct);
    }

    getProducts() {
        return this.producto;
    }

    getProductsById(id) {
        for (let i = 0; i < this.producto.length; i++) {
            if (this.producto[i].id == id) {
                return this.producto[i];
            }
        }
        return 'Not found';
    }
}

class Producto {
    constructor({ title, description, price, thumbnail, code, stock }) {
        this.title = notNull(title, 'title');
        this.description = notNull(description, 'description');
        this.price = notNull(price, 'price');
        this.thumbnail = notNull(thumbnail, 'thumbnail');
        this.code = notNull(code, 'code');
        this.stock = notNull(stock, 'stock');
        this.id = null;
    }
}

//  TESTING

//1-  Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager();

//2- Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productManager.getProducts());

//3-  Se llamará al método “addProduct” con los campos:
//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

const producto1 = new Producto({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
});
productManager.addProduct(producto1);

//-4 Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productManager.getProducts());

//-5 Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
productManager.addProduct(producto1);

//6 Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

console.log(productManager.getProductsById(2));
