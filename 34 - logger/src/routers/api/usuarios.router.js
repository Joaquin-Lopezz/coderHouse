import { Router } from 'express';

import { soloLogueadosApi } from '../../middlewares/autorizaciones.js';
import { hashear } from '../../utils/criptografia.js';
import { crearUsuario, editUser, getUserLogeado } from '../../controllers/usuarios.controllers.js';

export const usuariosRouter = Router();

usuariosRouter.post('/', crearUsuario);



usuariosRouter.get('/current', soloLogueadosApi, getUserLogeado)


usuariosRouter.put('/', editUser);


