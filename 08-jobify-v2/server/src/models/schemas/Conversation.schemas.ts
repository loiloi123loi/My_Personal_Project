import { ObjectId } from 'mongodb'

interface IConversation {
  _id?: ObjectId
  participants: ObjectId[]
  messages?: ObjectId[]
  created_at?: Date
  updated_at?: Date
}

class Conversation {
  _id: ObjectId
  participants: ObjectId[]
  messages: ObjectId[]
  created_at: Date
  updated_at: Date

  constructor({ _id, participants, messages, created_at, updated_at }: IConversation) {
    const now = new Date()
    this._id = _id || new ObjectId()
    this.participants = participants
    this.messages = messages || []
    this.created_at = created_at || now
    this.updated_at = updated_at || now
  }
}

export default Conversation
