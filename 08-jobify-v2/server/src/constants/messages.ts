export const COMMON_MESSAGES = {
  ROUTE_NOT_FOUND: 'Route not found',
  VALIDATION_ERROR: 'Validation error'
} as const

export const USERS_MESSAGES = {
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_DOES_NOT_EXIST: 'Email does not exist',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  CHECK_YOUR_EMAIL_AND_FOLLOW_THE_INSTRUCTIONS_TO_RESET_YOUR_PASSWORD:
    'Check your email and follow the instructions to reset your password'
} as const
