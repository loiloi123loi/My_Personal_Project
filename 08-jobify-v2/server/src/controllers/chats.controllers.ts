import { Request, Response } from 'express'
import { HTTP_STATUS } from '@/constants/httpStatus'
import { CHATS_MESSAGES } from '@/constants/messages'
import { TokenPayload } from '@/models/requests/User.requests'
import chatService from '@/services/chats.services'

export const getAllConversationController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await chatService.getAllConversations(user_id)
  res.status(HTTP_STATUS.OK).json({
    message: CHATS_MESSAGES.GET_ALL_CONVERSATIONS_SUCCESS,
    result
  })
}
