import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

import { MONGODB_CNX_STR, PORT } from './config.js';
import { apiRouter } from './routers/api/apirest.router.js';
import { webRouter } from './routers/web/web.router.js';
import { sesiones } from './middlewares/sesiones.js';
import {
    passportInitialize,
    passportSession,
} from './middlewares/autenticaciones.js';
import { errorHandler } from './middlewares/errorhandler.js';



// Conexión a la base de datos
await mongoose.connect(MONGODB_CNX_STR);
console.log(`Conectado a la base de datos en: "${MONGODB_CNX_STR}"`);

export const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración de handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


// Middleware y configuración de sesiones
app.use(sesiones);
app.use(passportInitialize, passportSession);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de rutas
app.use('/static', express.static('./static'));
app.use('/', webRouter);
app.use('/api', apiRouter);

// Configuración de socket.io
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado: ' + socket.id);

    socket.on('mensaje', (data) => {
        io.emit('mensaje', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado: ' + socket.id);
    });
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(path.resolve(), 'static')));



//manejador de errores 

app.use(errorHandler)
// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando peticiones en puerto: ${PORT}`);
});

