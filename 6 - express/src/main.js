import express from 'express';

import { productsRounter } from './routers/products.router.js';

const app = express();

app.use(express.json());
app.use('/products', productsRounter);

/*la ruta raiz GET/ /products debera listar todos los productos de la base
la ruta GET /products/:pid debeta traer solo el producto con id Proporcionado*/

app.listen(8080, () => {
    console.log('conectado');
});
