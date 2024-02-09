const express = require('express')
const app = express()
const { createServer } = require('http')
const { Server } = require('socket.io')

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONT_END_URL, true],
        credentials: true,
    },
})

const socketMap = {}

const getReceiverSocketId = (recieverId) => {
    return socketMap[recieverId]
}

io.on('connection', (socket) => {
    console.log('User connected', socket.id)

    const userId = socket.handshake.query.userId
    if (userId != 'undefined') socketMap[userId] = socket.id

    io.emit('getOnlineUsers', Object.keys(socketMap))

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
        delete socketMap[userId]
        io.emit('getOnlineUsers', Object.keys(socketMap))
    })
})

module.exports = { app, io, server, getReceiverSocketId }
