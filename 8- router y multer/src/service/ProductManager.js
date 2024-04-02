import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.counterId = 1;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        //carga los datos a products formato JSON

        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path);
            this.products = JSON.parse(data);
            console.log('los datos fueron cargados.');
            const maxId = Math.max(
                ...this.products.map((productos) => productos.id)
            );
            this.counterId = maxId + 1;
        } else {
            this.counterId = 1;
        }
    }

    async addProducts(producto) {
        //verifica que el codigo no exista  y agrega el prodcuto a products y lo guarda con la funcion saveProducts
        const codeExists = this.products.some(
            (aux) => aux.code === producto.code
        );
        if (codeExists) {
            return false;
        }
        producto.id = this.counterId;
        this.products.push(producto);
        this.counterId++;
        await this.saveProducts();
        return true;
    }

    saveProducts() {
        //guarda los datos en el path en formato json
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
        //console.log('los datos fueron guardados.');
    }

    async getProducts(limit) {
        //returna los datos de products
        const productos = await [...this.products];
        if (limit) {
            return productos.slice(0, limit);
        }
        return productos;
    }

    getProductsId(id) {
        // recibe un Id y returna ese producto
        // no es un numero retorna false
        // valor del id encontrado , y no encontrado
        const productoId = this.products.find(
            (productos) => productos.id === id
        );
        return productoId;
    }

    updateProducts(id, datos) {
        // modifica los datos de un producto , verifica que no sean los datos del id ni del code

        if (datos.id || datos.code) {
            return false;
        }

        const indice = this.products.findIndex(
            (productos) => productos.id === id
        );
        if (indice !== -1) {
            this.products[indice] = { ...this.products[indice], ...datos };
            this.saveProducts();

            return true;
        }
        console.log(`no existe un producto con el ID: ${id}.`);
        return false;
    }

    deleteproductById(id) {
        //elimina un producto
        const index = this.products.findIndex((producto) => producto.id == id);

        if (index !== -1) {
            console.log(this.products);
            this.products.splice(index, 1);
            this.saveProducts();
            return true;
        }
        return false;
    }
}

export class Producto {
    constructor({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status,
    }) {
        this.title = this.notNull(title, 'tittle');
        this.description = this.notNull(description, 'description');
        this.price = this.validacionDeNumero(price, 'price');
        this.thumbnail = thumbnail;
        this.code = this.notNull(code, 'code');
        this.stock = this.validacionDeNumero(stock, 'stock');
        this.category = this.notNull(category, 'category');
        this.status = this.validacionDeBoolean(status);

        this.id = null;
    }

    validacionDeBoolean(bool) {
        console.log(typeof bool);
        if (typeof bool === 'boolean') {
            return bool;
        }
        throw new Error(`el valor: ${bool} no es un booleano.`);
    }

    notNull(valor, etiqueta) {
        //verifica que no reciva un null, undefined
        if (valor === null || valor === undefined || valor == '') {
            throw new Error(
                `el valor de ${etiqueta} no puede ser null o una cadena vacia.`
            );
        }
        return valor;
    }

    validacionDeNumero(valor, etiqueta) {
        //verifica que reciba un int
        if (valor === null || valor === undefined || valor == '') {
            throw new Error(
                `el valor de ${etiqueta} no puede ser null o una cadena vacia.`
            );
        }
        const TransformarNumero = parseFloat(valor);
        if (isNaN(TransformarNumero)) {
            throw new Error(`el valor de ${etiqueta} no es un numero.`);
        }
        return valor;
    }
}
export default ProductManager;
