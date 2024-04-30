import express from 'express';
import { PORT } from './config.js';
import { appRouter } from './routers/appRouter.js';

const app = express();
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
});

app.use('/api', appRouter);
