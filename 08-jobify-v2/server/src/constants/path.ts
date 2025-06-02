const API_VERSION = '/api/v1'

export const ROUTE = {
  USER: `${API_VERSION}/users`,
  JOB: `${API_VERSION}/jobs`,
  CHAT: `${API_VERSION}/chats`
} as const

export const USER_PATH = {
  REGISTER: '/register',
  LOGIN: '/login',
  LOGOUT: '/logout',
  RESET_PASSWORD: '/reset-password',
  VERIFY_FORGOT_PASSWORD: '/verify-forgot-password'
} as const

export const JOB_PATH = {
  GET_ALL_JOBS: '/',
  DELETE_JOB: '/:job_id'
} as const

export const CHAT_PATH = {
  ALL_CONVERSATIONS: '/'
} as const
