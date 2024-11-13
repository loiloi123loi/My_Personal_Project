import databaseService from '@/services/database.services'

class ChatService {
  async getAllConversations(user_id: string) {
    // const conversations = await databaseService.conversations.a
  }
}

const chatService = new ChatService()
export default chatService
