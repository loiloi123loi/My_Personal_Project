import { Router } from 'express'
import { CHAT_PATH } from '@/constants/path'
import { getAllConversationController } from '@/controllers/chats.controllers'
import { wrapRequestHandler } from '@/utils/handlers'
const chatsRouter = Router()

chatsRouter.route(CHAT_PATH.ALL_CONVERSATIONS).post(wrapRequestHandler(getAllConversationController))

export default chatsRouter
