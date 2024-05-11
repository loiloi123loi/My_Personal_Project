import { Router } from 'express'
import {
  likeTweetController,
  unlikeTweetByLikeIdController,
  unlikeTweetController
} from '~/controllers/likes.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const likesRouter = Router()

likesRouter
  .route('/')
  .post(accessTokenValidator, verifiedUserValidator, tweetIdValidator, wrapRequestHandler(likeTweetController))
likesRouter
  .route('/tweets/:tweet_id')
  .delete(accessTokenValidator, verifiedUserValidator, tweetIdValidator, wrapRequestHandler(unlikeTweetController))
likesRouter
  .route('/:like_id')
  .delete(
    accessTokenValidator,
    verifiedUserValidator,
    tweetIdValidator,
    wrapRequestHandler(unlikeTweetByLikeIdController)
  )

export default likesRouter
