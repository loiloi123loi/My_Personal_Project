import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenPayload } from '@/models/requests/User.requests'

export const signToken = ({
  payload,
  secret = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object | TokenPayload
  secret?: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, key) => {
      if (err) {
        throw reject(err)
      }
      resolve(key as string)
    })
  })
}

export const verifyToken = ({
  token,
  secretPublicKey = process.env.JWT_SECRET as string
}: {
  token: string
  secretPublicKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretPublicKey, (err, payload) => {
      if (err) {
        throw reject(err)
      }
      resolve(payload as TokenPayload)
    })
  })
}
