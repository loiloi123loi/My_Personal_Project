import { ObjectId } from 'mongodb'

interface IMessage {
  _id?: ObjectId
  sender_user: ObjectId
  reciever_user: ObjectId
  content: string
  created_at?: Date
  updated_at?: Date
}

class Message {
  _id: ObjectId
  sender_user: ObjectId
  reciever_user: ObjectId
  content: string
  created_at: Date
  updated_at: Date

  constructor({ _id, sender_user, reciever_user, content, created_at, updated_at }: IMessage) {
    const now = new Date()
    this._id = _id || new ObjectId()
    this.sender_user = sender_user
    this.reciever_user = reciever_user
    this.content = content
    this.created_at = created_at || now
    this.updated_at = updated_at || now
  }
}

export default Message
