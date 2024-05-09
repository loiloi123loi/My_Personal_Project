import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayload } from '~/models/requests/User.requests'
import { LikeTweetReqBody, UnlikeTweetByLikeIdReqParams, UnlikeTweetReqParams } from '~/models/requests/Like.requests'
import likeService from '~/services/likes.services'
import { LIKES_MESSAGES } from '~/constants/messages'

export const likeTweetController = async (req: Request<ParamsDictionary, any, LikeTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await likeService.likeTweet(user_id, req.body.tweet_id)
  res.status(HTTP_STATUS.OK).json({
    message: LIKES_MESSAGES.LIKE_SUCCESSFULLY,
    result
  })
}

export const unlikeTweetController = async (req: Request<UnlikeTweetReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  await likeService.unlikeTweet(user_id, req.params.tweet_id)
  res.status(HTTP_STATUS.OK).json({
    message: LIKES_MESSAGES.UNLIKE_SUCCESSFULLY
  })
}

export const unlikeTweetByLikeIdController = async (req: Request<UnlikeTweetByLikeIdReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  await likeService.unlikeTweetByLikeId(user_id, req.params.like_id)
  res.status(HTTP_STATUS.OK).json({
    message: LIKES_MESSAGES.UNLIKE_SUCCESSFULLY
  })
}
