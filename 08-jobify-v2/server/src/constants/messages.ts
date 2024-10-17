export const COMMON_MESSAGES = {
  ROUTE_NOT_FOUND: 'Route not found',
  VALIDATION_ERROR: 'Validation error'
} as const

export const USERS_MESSAGES = {
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  LOGIN_SUCCESS: 'Login success'
} as const
