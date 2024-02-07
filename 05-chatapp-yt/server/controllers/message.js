const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const Message = require('../models/Message')
const Conversation = require('../models/Conversation')
const { io, getReceiverSocketId } = require('../socket.io')

const sendMessage = async (req, res) => {
    const { content } = req.body
    const { id: receiverId } = req.params
    const { id: senderId } = req.user
    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId],
        },
    })
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        })
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        content,
    })
    if (newMessage) {
        conversation.messages.push(newMessage._id)
    }
    await Promise.all([conversation.save(), newMessage.save()])
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage)
    }
    res.status(201).json(newMessage)
}

const getMessage = async (req, res) => {
    const { id: receiverId } = req.params
    const { id: senderId } = req.user
    const conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId],
        },
    }).populate('messages')
    const { messages } = conversation
    res.status(StatusCodes.OK).json(messages)
}

module.exports = {
    sendMessage,
    getMessage,
}
