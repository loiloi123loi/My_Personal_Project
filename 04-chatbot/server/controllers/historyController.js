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
    console.log(history)
    const chat = await Chat.findOne({
        where: {
            id: chatId,
        },
    })
    checkPermission(req.user, chat.userId)
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
            'Message length must between 1 and 2000'
        )
    }
    const olds = await History.findAll({
        where: {
            chatId,
        },
    })
    const history = olds.map((item) => {
        return {
            role: item.who,
            parts: item.content,
        }
    })
    await History.create({
        chatId,
        content,
        who: 'user',
    })
    const modelResp = await getRspGenerative({ history, content })
    await History.create({
        chatId,
        content: modelResp,
        who: 'model',
    })
    res.status(StatusCodes.OK).json({
        msg: {
            content: modelResp,
            who: 'model',
        },
    })
}

module.exports = {
    getHistory,
    ask,
}
