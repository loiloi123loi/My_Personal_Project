import cors from 'cors'
import express from 'express'
import createRoutes from './routers'
import databaseService from '@/services/database.services'
import logger from '@/utils/logger'
const app = express()

app.use(cors())
app.use(express.json())
createRoutes(app)

const start = async () => {
  try {
    logger.info('Server starting...')
    await databaseService.connect()
    const port = process.env.PORT
    app.listen(port, () => logger.info(`Server listening on port ${port}...`))
  } catch (err) {
    logger.error('Start server failed: ' + err)
  }
}
start()
