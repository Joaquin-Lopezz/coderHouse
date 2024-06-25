import { getDaoUsuarios } from "../dao/usuarios/usuarios.dao.js";


const usuariosDao = getDaoUsuarios();

class UsuariosService {
    async createUsuario(newUser){
        return await usuariosDao.createUsuario(newUser)
    }



    async findOneUser(datos){
        return await usuariosDao.findOneUser(datos)
    }

    async login(email, password){
        return await usuariosDao.login(email ,password)
    }


    
}


export const usuariosService = new UsuariosService()