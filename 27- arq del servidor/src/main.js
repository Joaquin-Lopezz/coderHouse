import express from 'express'
import cookieParser from 'cookie-parser'
import { engine } from 'express-handlebars'


import { connectDb } from './database/mongoose.js'

import { apiRouter } from './routers/api/apirest.router.js'
import { webRouter } from './routers/web/web.router.js'
import { COOKIE_SECRET, PORT } from './config/config.js'
import { authentication } from './middlewares/authentication.js'

connectDb()

export const app = express()

app.engine('handlebars', engine())

app.listen(PORT, () => {
  console.log(`servidor escuchando peticiones en puerto: ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(authentication)
app.use(cookieParser(COOKIE_SECRET))

app.use('/static', express.static('./static'))

app.use('/', webRouter)
app.use('/api', apiRouter)
