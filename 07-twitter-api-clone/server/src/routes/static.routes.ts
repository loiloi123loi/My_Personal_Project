import { Router } from 'express'
import {
  serveImageController,
  serveVideoStreamController,
  serveM3u8Controller,
  serveSegmentController
} from '~/controllers/medias.controllers'
const staticRouter = Router()

staticRouter.route('/image/:name').get(serveImageController)
staticRouter.route('/video-stream/:name').get(serveVideoStreamController)
staticRouter.route('/video-hls/:id/master.m3u8').get(serveM3u8Controller)
staticRouter.route('/video-hls/:id/:v/:segment').get(serveSegmentController)

export default staticRouter
