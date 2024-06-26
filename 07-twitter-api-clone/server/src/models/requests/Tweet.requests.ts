import { TweetAudience, TweetType } from '~/constants/enums'
import { Media } from '../Other'

export interface CreateTweetReqBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string
  hashtags: string[]
  mentions: string[]
  medias: Media[]
}

export interface GetTweetReqParams {
  tweet_id: string
}

export interface GetTweetChilrenReqQuery extends PaginationReqQuery {
  tweet_type: string
}

export interface PaginationReqQuery {
  limit: string
  page: string
}
