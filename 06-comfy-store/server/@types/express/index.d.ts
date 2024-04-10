import express from 'express'
import { IUser } from '../../models/User'
import { ITokenUser } from '../../utils/createTokenUser'

declare global {
    namespace Express {
        interface Request {
            user?: ITokenUser
        }
    }
}
