import { Router } from 'express'
import { uploadImageController, uploadVideoController, uploadVideoHLSController } from '~/controllers/medias.controller'
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

export default mediasRouter
