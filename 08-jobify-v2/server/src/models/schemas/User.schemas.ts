import { ObjectId } from 'mongodb'
import { VerifyStatus } from '@/constants/enums'

interface IUser {
  _id?: ObjectId
  email: string
  date_of_birth: Date
  password: string
  name?: string
  username?: string
  verify?: VerifyStatus
  bio?: string
  location?: string
  avatar?: string
  cover_photo?: string
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id?: ObjectId
  email: string
  date_of_birth: Date
  password: string
  name: string
  username: string
  verify: VerifyStatus
  bio: string
  location: string
  avatar: string
  cover_photo: string
  created_at: Date
  updated_at: Date

  constructor({
    _id,
    email,
    date_of_birth,
    password,
    name,
    username,
    verify,
    bio,
    location,
    avatar,
    cover_photo,
    created_at,
    updated_at
  }: IUser) {
    const now = new Date()
    this._id = _id
    this.email = email
    this.date_of_birth = date_of_birth
    this.password = password
    this.name = name || ''
    this.username = username || ''
    this.verify = verify || VerifyStatus.UNVERIFIED
    this.bio = bio || ''
    this.location = location || ''
    this.avatar = avatar || ''
    this.cover_photo = cover_photo || ''
    this.created_at = created_at || now
    this.updated_at = updated_at || now
  }
}
