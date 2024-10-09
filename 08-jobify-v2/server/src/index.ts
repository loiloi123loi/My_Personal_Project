import express from 'express'
import logger from './utils/logger'
const app = express()

const start = async () => {
  try {
    logger.info('Server started')
  } catch (err) {
    logger.error('Start server error: ' + err)
  }
}
start()
