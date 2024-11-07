export enum VerifyStatus {
  BANNED = 'banned',
  UNVERIFIED = 'unverified',
  VERIFIED = 'verified'
}

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  FORGOT_PASSWORD_TOKEN = 'forgot_password_token',
  EMAIL_VERIFY_TOKEN = 'email_verify_token'
}

export enum JobStatus {
  INTERVIEW = 'interview',
  DECLINED = 'declined',
  PENDING = 'pending'
}

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  REMOTE = 'remote',
  INTERNSHIP = 'internship'
}
