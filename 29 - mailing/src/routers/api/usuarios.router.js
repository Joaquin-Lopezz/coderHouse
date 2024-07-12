import { Router } from 'express';

import { soloLogueadosApi } from '../../middlewares/autorizaciones.js';
import { hashear } from '../../utils/criptografia.js';
import { crearUsuario, getUserLogeado } from '../../controllers/usuarios.controllers.js';

export const usuariosRouter = Router();

usuariosRouter.post('/', crearUsuario);



usuariosRouter.get('/current', soloLogueadosApi, getUserLogeado)


usuariosRouter.put('/', async function (req, res) {
    try {
        if (req.body.password) {
            // si hay contraseñ la encripto
            req.body.password = hashear(req.body.password);
        }

        const actualizado = await usuariosManager.findOneAndUpdate(
            { email: req.body.email },
            { $set: req.body },
            { new: true }
        );
        if (!actualizado) {
            return res
                .status(404)
                .json({ status: 'error', message: 'usuario no encontrado' });
        }

        res.json({ status: 'success', payload: actualizado });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});


