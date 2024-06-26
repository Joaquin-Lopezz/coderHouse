import { Router } from 'express'
import passport from 'passport'


import { solo } from '../../middlewares/autorizaciones.js'
import { appendJwtAsCookie } from '../../middlewares/authentication.js'
import { usuariosService } from '../../services/usuarios.service.js'

export const usuariosRouter = Router()

usuariosRouter.post('/',
  passport.authenticate('local-register',
    { failWithError: true, session: false }),
  appendJwtAsCookie,
  async function (req, res) {
    res['creado'](req.user)
  },
)

usuariosRouter.put('/current',
  passport.authenticate('jwt',
    { failWithError: true, session: false }),
  async function (req, res, next) {
    try {
      req.user = await usuariosService.actualizar(req.body)
      next()
    } catch (error) {
      res['notFound'](error.message)
    }
  },
  appendJwtAsCookie,
  (req, res, next) => {
    res['ok'](req.user)
  }
)

usuariosRouter.patch('/',
  async function (req, res, next) {
    try {
      req.user = await usuariosService.resetearContrasenia(req.body)
      next()
    } catch (error) {
      res['notFound'](error.message)
    }
  },
  appendJwtAsCookie,
  (req, res, next) => {
    res['ok'](req.user)
  }
)

usuariosRouter.get('/current',
  passport.authenticate('jwt',
    { failWithError: true, session: false }),
  async (req, res) => {
    res['ok'](req.user)
  },
)

usuariosRouter.get('/',
  passport.authenticate('jwt',
    { failWithError: true, session: false }),
  solo(['admin']),
  async (req, res) => {
    const usuarios = await usuariosService.find().lean()
    res['ok'](usuarios)
  },
)
