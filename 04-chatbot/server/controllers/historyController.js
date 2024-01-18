const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { Chat, History } = require('../models')
const { checkPermission, getRspGenerative } = require('../utils')

const getHistory = async (req, res) => {
    const { id: chatId } = req.query
    const history = await History.findAll({
        attributes: ['id', 'content', 'who'],
        where: {
            chatId,
        },
        order: [['createdAt', 'ASC']],
    })
    const chat = await Chat.findOne({
        where: {
            id: chatId,
        },
    })
    checkPermission(req.user, chat.id)
    res.status(StatusCodes.OK).json({
        msg: {
            length: history.length,
            data: history,
        },
    })
}

const ask = async (req, res) => {
    const { id: chatId } = req.query
    const { content } = req.body
    if (!content || content?.length > 2000) {
        throw new CustomError.BadRequestError(
            'Độ dài tin nhắn từ 1 - 2000 kí tự'
        )
    }
    await History.create({
        chatId,
        content,
        who: 'user',
    })
    const modelResp = await getRspGenerative(content)
    await History.create({
        chatId,
        content: modelResp,
        who: 'model',
    })
    await res.status(StatusCodes.OK).json({ msg: modelResp })
}

module.exports = {
    getHistory,
    ask,
}
