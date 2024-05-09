export interface LikeTweetReqBody {
  tweet_id: string
}

export interface UnlikeTweetReqParams {
  tweet_id: string
}

export interface UnlikeTweetByLikeIdReqParams {
  like_id: string
}
