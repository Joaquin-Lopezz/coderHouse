import express from 'express';
import { apiRounter } from './routers/api.router.js';

const app = express();

app.use(express.json());
app.use('/api', apiRounter);



app.listen(8080, () => {
    console.log('conectado');
});
