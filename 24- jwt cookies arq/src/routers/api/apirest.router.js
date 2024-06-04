import { Router } from 'express'
import { productosRouter } from './productos.router.js'
import { sesionesRouter } from './sesiones.router.js'
import { usuariosRouter } from './usuarios.router.js'
import { respuestasMejoradas } from '../../middlewares/respuestasMejoradas.js'
import { carritoRouter } from './carritos.router.js'

export const apiRouter = Router()

apiRouter.use(respuestasMejoradas)

apiRouter.use('/sesiones', sesionesRouter)
apiRouter.use('/usuarios', usuariosRouter)
apiRouter.use('/productos', productosRouter);
apiRouter.use('/carrito', carritoRouter);

apiRouter.use((error, req, res, next) => {
  res.status(401).json({
    status: 'error',
    message: 'authentication failed'
  })
})