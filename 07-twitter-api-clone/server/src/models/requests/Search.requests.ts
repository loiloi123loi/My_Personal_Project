import { MediaTypeQuery, PeopleFollow } from '~/constants/enums'
import { PaginationReqQuery } from './Tweet.requests'
import { Query } from 'express-serve-static-core'

export interface SearchQuery extends PaginationReqQuery, Query {
  content: string
  media_type?: MediaTypeQuery
  people_follow?: PeopleFollow
}
