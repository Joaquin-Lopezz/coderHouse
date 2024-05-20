import { Router } from 'express';
import { usuariosManager } from '../../models/User.js';
import { soloLogueadosApi } from '../../middlewares/autorizaciones.js';
import { hashear } from '../../utils/criptografia.js';

export const usuariosRouter = Router();

usuariosRouter.post('/', async (req, res) => {
    try {
        req.body.password = hashear(req.body.password);

        const usuario = await usuariosManager.create(req.body);

        req.login(usuario.toObject(), (error) => {
            if (error) {
                res.status(401).json({
                    status: 'error',
                    message: error.message,
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    payload: usuario.toObject(),
                });
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

usuariosRouter.get('/current', soloLogueadosApi, async (req, res) => {
    // @ts-ignore
    /*se utiliza el metodo findOne para que busque en la DB el primer objeto que coincida con el user extraer del req
  el password : 0 se pasa como argumento para excluir el campo de la contraseña del resultado
  finalmente se envia una respuesta json con el status completado y el payload con los datos obtenidos*/
    const usuario = await usuariosManager
        .findOne({ email: req['user'].email }, { password: 0 })
        .lean();
    res.json({ status: 'success', payload: usuario });
});

usuariosRouter.put('/', async function (req, res) {
    try {
        if (req.body.password) {
            // si hay contraseña, la encripto!
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
