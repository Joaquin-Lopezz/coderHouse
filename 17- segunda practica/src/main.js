import express from 'express';
import { PORT } from './config.js';
import { appRouter } from './routers/appRouter.js';
import { viewsProducts } from './routers/viewsProducts.js';
import { engine } from 'express-handlebars';
import { viewsCarts } from './routers/viewsCarts.js';

const app = express();
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
});

app.engine('handlebars', engine());

app.use('/api', appRouter);

app.use('/products', viewsProducts);
app.use('/carts', viewsCarts);
