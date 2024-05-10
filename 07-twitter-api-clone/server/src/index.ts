import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import databaseService from './services/database.services'
import { initFolder } from './utils/file'
import usersRouter from './routes/users.routes'
import mediasRouter from './routes/medias.routes'
import staticRouter from './routes/static.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import searchRouter from './routes/search.routes'

databaseService.connect().then(async () => {
  await Promise.all([
    databaseService.indexUsers(),
    databaseService.indexRefreshTokens(),
    databaseService.indexVideoStatus(),
    databaseService.indexFollowers(),
    databaseService.indexTweets()
  ])
})
initFolder()
app.use(cors())
app.use(express.json())
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/medias', mediasRouter)
app.use('/api/v1/tweets', tweetsRouter)
app.use('/api/v1/bookmarks', bookmarksRouter)
app.use('/api/v1/likes', likesRouter)
app.use('/api/v1/search', searchRouter)
app.use('/api/v1/static', staticRouter)
app.use('/api/v1/static/video', express.static(UPLOAD_VIDEO_DIR))
app.use(defaultErrorHandler)

const port = process.env.PORT || 5555
app.listen(port, () => console.log(`Server running on port ${port}...`))
