import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
import fs from 'fs'
import fsPromis from 'fs/promises'
import { isProduction } from '~/constants/config'
import { EncodingStatus, MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'
import { encodeHLSWithMultipleVideoStreams } from '~/utils/video'
import databaseService from './database.services'
import VideoStatus from '~/models/schemas/VideoStatus.schema'

class Queue {
  items: string[]
  encoding: boolean
  constructor() {
    this.items = []
    this.encoding = false
  }
  async enqueue(item: string) {
    this.items.push(item)
    let name = item.split('/').pop() as string
    if (!name.includes('/')) {
      name = item.split('\\').pop() as string
    }
    const idName = getNameFromFullname(name)
    await databaseService.videoStatus.insertOne(
      new VideoStatus({
        name: idName,
        status: EncodingStatus.Pending
      })
    )
    this.processEncode()
  }
  async processEncode() {
    if (this.encoding) return
    if (this.items.length > 0) {
      this.encoding = true
      const videoPath = this.items[0]
      let name = videoPath.split('/').pop() as string
      if (!name.includes('/')) {
        name = videoPath.split('\\').pop() as string
      }
      const idName = getNameFromFullname(name)
      console.log('begin', idName)
      await databaseService.videoStatus.updateOne(
        {
          name: idName
        },
        {
          $set: {
            status: EncodingStatus.Processing
          },
          $currentDate: {
            updated_at: true
          }
        }
      )
      try {
        await encodeHLSWithMultipleVideoStreams(videoPath)
        this.items.shift()
        await databaseService.videoStatus.updateOne(
          {
            name: idName
          },
          {
            $set: {
              status: EncodingStatus.Success
            },
            $currentDate: {
              updated_at: true
            }
          }
        )
        await fsPromis.unlink(videoPath)
        console.log('success', idName)
      } catch (error) {
        console.error('err', idName)
        await databaseService.videoStatus
          .updateOne(
            {
              name: idName
            },
            {
              $set: {
                status: EncodingStatus.Failed
              },
              $currentDate: {
                updated_at: true
              }
            }
          )
          .catch((err) => {
            console.log('Update status Video err', idName)
          })
      }
      this.encoding = false
      this.processEncode()
    } else {
      console.log('queue empty')
    }
  }
}
const queue = new Queue()

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
        const newName = getNameFromFullname(file.newFilename)
        queue.enqueue(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/video/${newName}.m3u8`
            : `http://localhost:${process.env.PORT}/api/v1/static/video-hls/${newName}.m3u8`,
          type: MediaType.HLS
        }
      })
    )
    return results
  }

  async getVideoStatus(idVideo: string) {
    const result = await databaseService.videoStatus.findOne({ name: idVideo })
    return result
  }
}

const mediasService = new MediasService()
export default mediasService
