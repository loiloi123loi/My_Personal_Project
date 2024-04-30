import { Router } from 'express'
import { serveImageController, serveVideoStreamController } from '~/controllers/medias.controller'
const staticRouter = Router()

staticRouter.route('/image/:name').get(serveImageController)
staticRouter.route('/video-stream/:name').get(serveVideoStreamController)

export default staticRouter
