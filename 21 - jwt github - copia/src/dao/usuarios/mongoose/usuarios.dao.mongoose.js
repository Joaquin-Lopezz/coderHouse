import { hasheadasSonIguales } from '../../../utils/criptografia.js';
import { toPOJO } from '../../utils.js';
import mongoose from 'mongoose';


export class usuariosDaoMongoose {
    constructor(usuariosModel) {
        this.usuariosModel = usuariosModel;
    }
    async createUsuario(newUser) {
        const usuario = await this.usuariosModel.create(newUser);
        return toPOJO(usuario);
    }

    async findOneUser(datos) {
        const usuario = await this.usuariosModel.find(datos).lean();
        return toPOJO(usuario);
    }

    async login(email, password) {
            let datosUsuario;

            if (
                email === 'adminCoder@coder.com' &&
                password === 'adminCod3r123'
            ) {
                datosUsuario = {
                    email: 'admin',
                    nombre: 'admin',
                    apellido: 'admin',
                    rol: 'admin',
                };
            } else {
                const usuario = await mongoose
                    .model('usuarios')
                    .findOne({ email })
                    .lean();

                if (!usuario) {
                    throw new Error('login failed');
                }

                if (!hasheadasSonIguales(password, usuario['password'])) {
                    throw new Error('login failed');
                }

                datosUsuario = {
                    email: usuario['email'],
                    nombre: usuario['nombre'],
                    apellido: usuario['apellido'],
                    rol: 'usuario',
                };
            }
            return datosUsuario;
    }
}
