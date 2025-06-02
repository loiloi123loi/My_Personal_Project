import { ObjectId } from 'mongodb'
import databaseService from '@/services/database.services'

class ChatService {
  async getAllConversations(user_id: string) {
    const conversations = await databaseService.conversations
      .aggregate([
        {
          $match: {
            participants: new ObjectId(user_id)
          }
        },
        {
          $lookup: {
            from: 'users',
            let: {
              participantId: '$participants'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$participantId']
                  }
                }
              },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  avatar: 1
                }
              }
            ],
            as: 'participants'
          }
        },
        {
          $lookup: {
            from: 'messages',
            localField: 'messages',
            foreignField: '_id',
            as: 'messages'
          }
        },
        {
          $set: {
            messages: {
              $slice: [
                {
                  $sortArray: {
                    input: '$messages',
                    sortBy: {
                      created_at: -1
                    }
                  }
                },
                0,
                1
              ]
            }
          }
        },
        {
          $set: {
            message: {
              $arrayElemAt: ['$messages', 0]
            }
          }
        },
        {
          $project: {
            messages: 0
          }
        },
        {
          $sort: {
            updated_at: -1
          }
        }
      ])
      .toArray()
    return { conversations }
  }
}

const chatService = new ChatService()
export default chatService
