import { usuariosService } from '../services/usuarios.service.js';
import { hashear } from '../utils/criptografia.js';

export async function crearUsuario(req, res, next) {
    try {
        req.body.password = hashear(req.body.password);
        const usuario = await usuariosService.createUsuario(req.body);
        req.login(usuario, (error) => {
            if (error) {
                res.status(401).json({
                    status: 'error',
                    message: error.message,
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    payload: usuario,
                });
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export async function getUserLogeado(req, res, next) {
    try {

        const usuario = await usuariosService.findOneUser(
            { email: req['user'].email },
            { password: 0 }
        );
    
        res.json({ status: 'success', payload: usuario });
    } catch (error) {
        next(error);
    }
}

export async function editUser(req, res, next) {
    try {
        //if (req.body.password) {
            // si hay contraseñ la encripto
        //    req.body.password = hashear(req.body.password);
        //}

        const actualizado = await usuariosService.findOneAndUpdate(
           // { email: req.body.email },
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
        next(error);
    }
}
