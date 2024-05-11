import { Router } from 'express'
import {
  bookmarkTweetController,
  unbookmarkTweetByBookmarkIdController,
  unbookmarkTweetController
} from '~/controllers/bookmarks.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const bookmarksRouter = Router()

bookmarksRouter
  .route('/')
  .post(accessTokenValidator, verifiedUserValidator, tweetIdValidator, wrapRequestHandler(bookmarkTweetController))
bookmarksRouter
  .route('/tweets/:tweet_id')
  .delete(accessTokenValidator, verifiedUserValidator, tweetIdValidator, wrapRequestHandler(unbookmarkTweetController))
bookmarksRouter
  .route('/:bookmark_id')
  .delete(
    accessTokenValidator,
    verifiedUserValidator,
    tweetIdValidator,
    wrapRequestHandler(unbookmarkTweetByBookmarkIdController)
  )

export default bookmarksRouter
