import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetType } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { CreateTweetReqBody, GetTweetChilrenReqQuery, GetTweetReqParams } from '~/models/requests/Tweet.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, CreateTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.createTweet(user_id, req.body)
  res.status(HTTP_STATUS.OK).json({
    message: TWEETS_MESSAGES.CREATE_TWEET_SUCCESS,
    result
  })
}

export const getTweetController = async (req: Request<GetTweetReqParams>, res: Response) => {
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  const tweet = { ...req.tweet, ...result }
  res.status(HTTP_STATUS.OK).json({
    message: TWEETS_MESSAGES.GET_TWEET_SUCCESS,
    result: tweet
  })
}

export const getTweetChildrenController = async (
  req: Request<GetTweetReqParams, any, any, GetTweetChilrenReqQuery>,
  res: Response
) => {
  const tweet_type = Number(req.query.tweet_type as string) as TweetType
  const limit = Number(req.query.limit as string)
  const page = Number(req.query.page as string)
  const user_id = req.decoded_authorization?.user_id
  const { total, tweets } = await tweetsService.getTweetChildren({
    tweet_id: req.params.tweet_id,
    tweet_type,
    limit,
    page,
    user_id
  })
  res.status(HTTP_STATUS.OK).json({
    message: TWEETS_MESSAGES.GET_TWEET_CHILDREN_SUCCESS,
    result: {
      total,
      tweets
    }
  })
}

export const getNewFeedsController = async (
  req: Request<ParamsDictionary, any, any, GetTweetChilrenReqQuery>,
  res: Response
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const result = await tweetsService.getNewFeeds({
    user_id,
    limit,
    page
  })
  res.status(HTTP_STATUS.OK).json({
    message: TWEETS_MESSAGES.GET_NEW_FEEDS_SUCCESS,
    result
  })
}
