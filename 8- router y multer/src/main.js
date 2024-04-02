import express, { Router } from 'express';
import { apiRounter } from './routers/api.router.js';

const app = express();

app.use(express.json());
app.use('/api', apiRounter);

/*la ruta raiz GET/ /products debera listar todos los productos de la base
la ruta GET /products/:pid debeta traer solo el producto con id Proporcionado*/

app.listen(8080, () => {
    console.log('conectado');
});
