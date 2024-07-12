import { getDaoUsuarios } from '../dao/usuarios/usuarios.dao.js';
import { CustomError } from '../utils/CustumErrors.js';
import { TIPOS_ERROR } from '../utils/EError.js';
import { hasheadasSonIguales } from '../utils/criptografia.js';
import { logger } from '../utils/logger.js';

const usuariosDao = getDaoUsuarios();

class UsuariosService {
    async createUsuario(newUser) {
        return await usuariosDao.createUsuario(newUser);
    }

    async findOneUser(datos) {
        try {
            const usuariogit = await usuariosDao.findOneUser(datos);
            const usuario = usuariogit[0];
            const datosUsuario = {
                email: usuario['email'],
                nombre: usuario['nombre'],
                apellido: usuario['apellido'],
                rol: 'usuario',
            };

            return datosUsuario;
        } catch (error) {
            logger.error(`${error}`);
            throw error;
        }
    }

    async login(email, password) {
        let datosUsuario;
        try {
            if (email === 'adminCoder@coder.com' && password === '1234') {
                datosUsuario = {
                    email: 'admin',
                    nombre: 'admin',
                    apellido: 'admin',
                    rol: 'admin',
                };
            } else {
                const usuario = await usuariosDao.login(email);

                if (!usuario) {
                    throw CustomError.createError(
                        'UsuarioNoEncontrado',
                        null,
                        'No se encontró un usuario con ese correo electrónico.',
                        TIPOS_ERROR.NOT_FOUND
                    );
                }

                if (!hasheadasSonIguales(password, usuario['password'])) {
                    logger.error(`Error durante la autenticación local`);
                    throw CustomError.createError(
                        'AutenticacionFallida',
                        null,
                        'La contraseña es incorrecta.',
                        TIPOS_ERROR.AUTENTICATION
                    );
                }

                datosUsuario = {
                    email: usuario['email'],
                    nombre: usuario['nombre'],
                    apellido: usuario['apellido'],
                    rol: 'usuario',
                };
            }
            return datosUsuario;
        } catch (error) {
            logger.error(`${error}`);
            throw error;
        }
    }

    async findOneAndUpdate(datos) {
        try {
            const usuarioActualizado = await usuariosDao.findOneAndUpdate(
                datos
            );

            return usuarioActualizado;
        } catch (error) {
            logger.error(`${error}`);
            throw error;
        }
    }
}

export const usuariosService = new UsuariosService();
