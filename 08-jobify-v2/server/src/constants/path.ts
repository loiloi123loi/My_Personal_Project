const API_VERSION = '/api/v1'

export const ROUTE = {
  USER: `${API_VERSION}/users`
} as const

export const USER_PATH = {
  REGISTER: '/register',
  LOGIN: '/login',
  VERIFY_FORGOT_PASSWORD: '/verify-forgot-password'
} as const
