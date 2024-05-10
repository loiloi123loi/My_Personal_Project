import { Router } from 'express'
import {
  createTweetController,
  getNewFeedsController,
  getTweetChildrenController,
  getTweetController
} from '~/controllers/tweets.controllers'
import {
  audienceValidator,
  createTweetValidator,
  getTweetChildrenValidator,
  paginationValidator,
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
    paginationValidator,
    getTweetChildrenValidator,
    isUserLoggedInValidator(accessTokenValidator),
    isUserLoggedInValidator(verifiedUserValidator),
    audienceValidator,
    wrapRequestHandler(getTweetChildrenController)
  )
tweetsRouter
  .route('/')
  .get(paginationValidator, accessTokenValidator, verifiedUserValidator, wrapRequestHandler(getNewFeedsController))

export default tweetsRouter
