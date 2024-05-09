import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response) => {
  const urls = await mediasService.uploadImage(req)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: urls
  })
}

export const serveImageController = (req: Request, res: Response) => {
  const { name } = req.params
  res.status(HTTP_STATUS.OK).sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (error) => {
    if (error) {
      res.status((error as any).status).send('Not found')
    }
  })
}

export const uploadVideoController = async (req: Request, res: Response) => {
  const url = await mediasService.uploadVideo(req)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const uploadVideoHLSController = async (req: Request, res: Response) => {
  const url = await mediasService.uploadVideoHLS(req)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const videoStatusController = async (req: Request, res: Response) => {
  const { id } = req.params
  const url = await mediasService.getVideoStatus(id)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.GET_VIDEO_STATUS_SUCCESS,
    result: url
  })
}

export const serveVideoStreamController = async (req: Request, res: Response) => {
  const range = req.headers.range
  if (!range) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send('Requires Range header')
  }
  const { name } = req.params
  const videoPath = path.resolve(UPLOAD_VIDEO_DIR, name)
  const videoSize = fs.statSync(videoPath).size
  const CHUNK_SIZE = 10 ** 6
  const start = Number(range.replace(/\D/g, ''))
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
  const contentLength = end - start + 1
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4'
  }
  res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers)
  const videoStream = fs.createReadStream(videoPath, { start, end })
  videoStream.pipe(res)
}

export const serveM3u8Controller = (req: Request, res: Response) => {
  const { id } = req.params
  res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, id, 'master.m3u8'), (err) => {
    if (err) {
      res.status(404).send('Not Found')
    }
  })
}

export const serveSegmentController = (req: Request, res: Response) => {
  const { id, v, segment } = req.params
  res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, id, v, segment), (err) => {
    if (err) {
      res.status(404).send('Not Found')
    }
  })
}
