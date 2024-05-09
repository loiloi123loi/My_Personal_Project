import { Router } from 'express'
import { createTweetController, getTweetChildrenController, getTweetController } from '~/controllers/tweets.controllers'
import {
  audienceValidator,
  createTweetValidator,
  getTweetChildrenValidator,
  tweetIdValidator
} from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, isUserLoggedInValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const tweetsRouter = Router()

tweetsRouter
  .route('/')
  .post(accessTokenValidator, verifiedUserValidator, createTweetValidator, wrapRequestHandler(createTweetController))
tweetsRouter
  .route('/:tweet_id')
  .get(
    tweetIdValidator,
    isUserLoggedInValidator(accessTokenValidator),
    isUserLoggedInValidator(verifiedUserValidator),
    audienceValidator,
    wrapRequestHandler(getTweetController)
  )
tweetsRouter
  .route('/:tweet_id/children')
  .get(
    tweetIdValidator,
    getTweetChildrenValidator,
    isUserLoggedInValidator(accessTokenValidator),
    isUserLoggedInValidator(verifiedUserValidator),
    audienceValidator,
    wrapRequestHandler(getTweetChildrenController)
  )

export default tweetsRouter
