import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Orther'
import { encodeHLSWithMultipleVideoStreams } from '~/utils/video.js'

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const results: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        await sharp(file.filepath).withMetadata().jpeg({ quality: 60 }).toFile(newPath)
        fs.unlinkSync(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newName}.jpg`
            : `http://localhost:${process.env.PORT}/api/v1/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return results
  }

  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const results: Media[] = files.map((file) => {
      const { newFilename } = file
      return {
        url: isProduction
          ? `${process.env.HOST}/static/video/${newFilename}`
          : `http://localhost:${process.env.PORT}/api/v1/static/video/${newFilename}`,
        type: MediaType.Video
      }
    })
    return results
  }

  async uploadVideoHLS(req: Request) {
    const files = await handleUploadVideo(req)
    const results: Media[] = await Promise.all(
      files.map(async (file) => {
        await encodeHLSWithMultipleVideoStreams(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/video/${file.newFilename}`
            : `http://localhost:${process.env.PORT}/api/v1/static/video/${file.newFilename}`,
          type: MediaType.Video
        }
      })
    )
    return results
  }
}

const mediasService = new MediasService()
export default mediasService
