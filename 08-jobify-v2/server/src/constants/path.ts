const API_VERSION = '/api/v1'

export const ROUTE = {
  USER: `${API_VERSION}/users`
} as const

export const USER_PATH = {
  REGISTER: '/register',
  LOGIN: '/login',
  RESET_PASSWORD: '/reset-password'
} as const
