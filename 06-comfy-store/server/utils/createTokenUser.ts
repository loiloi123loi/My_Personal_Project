import mongoose from 'mongoose'
import { IUser } from '../models/User'

export interface ITokenUser {
    id: mongoose.Types.ObjectId
    username: string
    email: string
    role: string
}

export default (user: IUser): ITokenUser => {
    const { _id: id, username, email, role } = user
    return {
        id,
        username,
        email,
        role,
    }
}
