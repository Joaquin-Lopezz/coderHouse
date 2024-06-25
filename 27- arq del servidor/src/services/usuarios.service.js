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

  
    async registrar(usuario){
        return await usuariosDao.registrar(usuario)

    }

    async autenticar(usuario){
        return await usuariosDao.autenticar(usuario)
    }
    
    async actualizar(usuario){
        return await usuariosDao.actualizar(usuario)
    }

    async resetearContrasenia(datos){
        return await usuariosDao.resetearContrasenia(datos)
    }
}


export const usuariosService = new UsuariosService()