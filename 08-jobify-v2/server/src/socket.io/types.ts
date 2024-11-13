export interface INewMessage {
  user_id: string
  message: string
}

export interface INewConversation {
  user_id: string
  lasted_message: string
  time: Date
}
