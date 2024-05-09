import { Router } from 'express'
import {
  uploadImageController,
  uploadVideoController,
  uploadVideoHLSController,
  videoStatusController
} from '~/controllers/medias.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const mediasRouter = Router()

mediasRouter
  .route('/upload-image')
  .post(accessTokenValidator, verifiedUserValidator, wrapRequestHandler(uploadImageController))
mediasRouter
  .route('/upload-video')
  .post(accessTokenValidator, verifiedUserValidator, wrapRequestHandler(uploadVideoController))
mediasRouter
  .route('/upload-video-hls')
  .post(accessTokenValidator, verifiedUserValidator, wrapRequestHandler(uploadVideoHLSController))
mediasRouter
  .route('/video-status/:id')
  .get(accessTokenValidator, verifiedUserValidator, wrapRequestHandler(videoStatusController))

export default mediasRouter
