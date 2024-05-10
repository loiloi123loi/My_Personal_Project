import { PaginationReqQuery } from './Tweet.requests'

export interface SearchQuery extends PaginationReqQuery {
  content: string
  media_type: string
}
