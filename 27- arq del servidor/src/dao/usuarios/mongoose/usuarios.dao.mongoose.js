import { hasheadasSonIguales,hashear } from '../../../utils/criptografia.js';
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
        const usuario = await this.usuariosModel.find(datos).lean(  )
        return usuario
    }


    async registrar (reqBody) {
        //-------------------------------------------------------------------------------

        ASIGNAR_ROL(reqBody);
        //-------------------------------------------------------------------------------

        reqBody.password = hashear(reqBody.password);

        const creado = await this.usuariosModel.create(reqBody);
        return creado.infoPublica()

    }

    async autenticar (email, password) {
        const usuario = await mongoose
            .model(collection)
            .findOne({ email });
        if (!usuario) {
            throw new Error('usuario no encontrado');
        }
        if (!hasheadasSonIguales(password, usuario['password'])) {
            throw new Error('las contraseñas no coinciden');
        }
        return usuario.infoPublica();
    }

    async actualizar (datos) {
        const actualizado = await mongoose
            .model(collection)
            .findOneAndUpdate(
                { email: datos.email },
                { $set: datos },
                { new: true }
            );
        if (!actualizado) {
            throw new Error('usuario no encontrado');
        }
        return actualizado.infoPublica();
    }

    async resetearContrasenia ({
        email,
        password: newPassword,
    }) {
        const hashedPassword = hashear(newPassword);

        const actualizado = await mongoose
            .model(collection)
            .findOneAndUpdate(
                { email },
                { $set: { password: hashedPassword } },
                { new: true }
            );
        if (!actualizado) {
            throw new Error('usuario no encontrado');
        }
        return actualizado.infoPublica();
    }



}



function ASIGNAR_ROL(obj) {
    if (obj.email === 'admin@admin.com') {
        obj.rol = 'admin';
    } else {
        obj.rol = 'user';
    }
}

