import jwt from 'jsonwebtoken'
import { ITokenUser } from './createTokenUser'

export interface ITokenPayload {
    jwt?: string
    token?: ITokenUser
}

interface IJWTData {
    payload: ITokenPayload
}

const createJWT = ({ payload }: IJWTData) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

const isTokenValid = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!) as ITokenPayload
}

export { createJWT, isTokenValid }
