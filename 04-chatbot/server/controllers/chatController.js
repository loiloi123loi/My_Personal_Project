const { StatusCodes } = require('http-status-codes')
const { Chat, History } = require('../models')
const CustomError = require('../errors')
const { checkPermission } = require('../utils')

const createNewChat = async (req, res) => {
    const chat = await Chat.create({ userId: req.user.id })
    res.status(StatusCodes.OK).json({ msg: chat })
}

const getAllChat = async (req, res) => {
    const chats = await Chat.findAll({
        attributes: ['chatname', 'id'],
        where: {
            userId: req.user.id,
        },
    })
    res.status(StatusCodes.OK).json({
        msg: {
            length: chats.length,
            data: chats,
        },
    })
}

const editChatName = async (req, res) => {
    const { name } = req.body
    const { id } = req.params
    if (!name || !id) {
        throw new CustomError.BadRequestError('Vui lòng cung cấp đủ thông tin')
    }
    const chat = await Chat.findOne({
        where: {
            id,
        },
    })
    if (!chat) {
        throw new CustomError.NotFoundError('Không tồn tại đoạn chat này')
    }
    checkPermission(req.user, chat.userId)
    chat.chatname = name
    await chat.save()
    res.status(StatusCodes.OK).json({ msg: chat })
}

const deleteChat = async (req, res) => {
    const { id } = req.params
    const chat = await Chat.findOne({
        where: {
            id,
        },
    })
    checkPermission(req.user, chat.userId)
    await History.destroy({
        where: {
            chatId: id,
        },
    })
    await chat.destroy()
    res.status(StatusCodes.OK).json({
        msg: 'Xóa đoạn chat thành công',
    })
}

module.exports = {
    createNewChat,
    editChatName,
    deleteChat,
    getAllChat,
}
