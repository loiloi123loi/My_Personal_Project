import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import databaseService from './services/database.services'
databaseService.connect()
import { initFolder } from './utils/file'
import usersRouter from './routes/users.routes'
import mediasRouter from './routes/medias.routes'
import staticRouter from './routes/static.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'

initFolder()
app.use(cors())
app.use(express.json())
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/medias', mediasRouter)
app.use('/api/v1/static', staticRouter)
app.use('/api/v1/static/video', express.static(UPLOAD_VIDEO_DIR))
app.use(defaultErrorHandler)

const port = process.env.PORT || 5555
app.listen(port, () => console.log(`Server running on port ${port}...`))
