const API_VERSION = '/api/v1'

export const ROUTE = {
  USER: `${API_VERSION}/users`,
  JOB: `${API_VERSION}/jobs`
} as const

export const USER_PATH = {
  REGISTER: '/register',
  LOGIN: '/login',
  LOGOUT: '/logout'
} as const

export const JOB_PATH = {
  GET_ALL_JOBS: '/'
} as const
