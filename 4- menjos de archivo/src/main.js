import { error } from 'console';
import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        //carga los datos a products formato JSON

        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path);
            let parsedData;
            if (data.length == 0) {
                parsedData = [];
            } else {
                parsedData = JSON.parse(data);
            }
            this.products = parsedData;
            console.log('los datos fueron cargados');
        }
    }

    addProducts(producto) {
        //verifica que el codigo no exista  y agrega el prodcuto a products y lo guarda con la funcion saveProducts
        const codeExists = this.products.some(
            (aux) => aux.code === producto.code
        );
        if (codeExists) {
            throw new Error(`el codigo: "${producto.code}"  ya esta en uso
            `);
        }
        //buscamos el mayor id
        const maxId = Math.max(
            ...this.products.map((productos) => productos.id)
        );

        if (maxId === Number.NEGATIVE_INFINITY) {
            producto.id = 1;
        } else {
            producto.id = maxId + 1;
        }

        this.products.push(producto);

        this.saveProducts();
        return true;
    }

    saveProducts() {
        //guarda los datos en el path en formato json
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
        console.log('los datos fueron guardados');
    }

    getProducts() {
        //returna los datos de products
        return [...this.products];
    }

    getProductsId(id) {
        // recibe un Id y returna ese producto
        return this.products.find((productos) => productos.id === id);
    }

    updateProducts(id, datos) {
        // modifica los datos de un producto , verifica que no sean los datos del id ni del code

        if (datos.id || datos.code) {
            throw new Error('El Id y el Code no pueden ser modificados');
        }

        const indice = this.products.findIndex(
            (productos) => productos.id === id
        );
        if (indice !== -1) {
            this.products[indice] = { ...this.products[indice], ...datos };
            this.saveProducts();
            console.log(
                `los datos del producto con el ID: ${id},fueron modificados`
            );
            return true;
        }
        console.log(`no existe un producto con el ID: ${id}`);
        return false;
    }

    deleteproductById(id) {
        //elimina un producto
        const index = this.products.findIndex((producto) => producto.id == id);

        if (index !== -1) {
            console.log(this.products);
            this.products.splice(index, 1);
            this.saveProducts();
            console.log('los datos fueron eliminados');
            return true;
        }
        return false;
    }
}

class Producto {
    constructor({ title, description, price, thumbnail, code, stock }) {
        this.title = this.notNull(title, 'tittle');
        this.description = this.notNull(description, 'description');
        this.price = this.validacionDeNumero(price, 'price');
        this.thumbnail = this.notNull(thumbnail, 'thumbnail');
        this.code = this.notNull(code, 'code');
        this.stock = this.validacionDeNumero(stock, 'stock');
        this.id = null;
    }
    notNull(valor, etiqueta) {
        //verifica que no reciva un null, undefined
        if (valor === null || valor === undefined || valor == '') {
            throw new Error(
                `el valor de ${etiqueta} no puede ser null o una cadena vacia`
            );
        }
        return valor;
    }

    validacionDeNumero(valor, etiqueta) {
        //verifica que reciba un int
        if (valor === null || valor === undefined || valor == '') {
            throw new Error(
                `el valor de ${etiqueta} no puede ser null o una cadena vacia`
            );
        }
        const TransformarNumero = parseFloat(valor);
        if (isNaN(TransformarNumero)) {
            throw new Error(`el valor de ${etiqueta} no es un numero`);
        }
        return valor;
    }
}

//Se creará una instancia de la clase “ProductManager”
const manejadorDeProducto = new ProductManager(
    'C:/Users/Tap/Desktop/Coder Houser/proyectos coderhouse/4- menjos de archivo/src/archivo/productos.json'
);
const Producto1 = new Producto({
    title: 'Producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'sin imagen',
    code: 'dafdaassasdassds',
    stock: 25,
});

// Debe tener un método addProduct el cual debe recibir un objeto con el formato previamente especificado,
// asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
manejadorDeProducto.addProducts(Producto1);

// Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en
// formato de arreglo.
const productos = manejadorDeProducto.getProducts();
console.log(productos);

// Debe tener un método getProductById, el cual debe recibir un id, y tras leer el archivo,
//  debe buscar el producto con el id especificado y devolverlo en formato objeto

const ProductoPorId = manejadorDeProducto.getProductsId(3);
console.log(ProductoPorId);

// Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar,
// así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar
// el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID
const datosParaModificar = {
    stock: 200,
};

const datosModificados = manejadorDeProducto.updateProducts(
    3,
    datosParaModificar
);

// Debe tener un método deleteProduct, el cual debe recibir un id y debe el
// iminar el producto que tenga ese id en el archivo.

manejadorDeProducto.deleteproductById(3);
