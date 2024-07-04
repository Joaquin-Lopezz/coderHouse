import { toPOJO } from '../../utils.js';

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

    async login(email) {
        return this.usuariosModel.model('usuarios').findOne({ email }).lean();
    }
    async findOneAndUpdate(datos) {
        return this.usuariosModel.findOneAndUpdate(datos);
    }
}
