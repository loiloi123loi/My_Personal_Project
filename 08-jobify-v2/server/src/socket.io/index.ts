import { createServer } from 'http'
import express from 'express'
import { Server, Socket } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  path: '/ws',
  cors: {
    origin: '*'
  }
})

const socketMap: { [key: string]: string } = {}

io.on('connection', (socket: Socket) => {
  console.log(socket.id, socket.handshake.query)
  const { user_id } = socket.handshake.query
  if (typeof user_id !== 'string') {
    return
  }
  socketMap[user_id] = socket.id
  io.emit('getOnlineUsers', socketMap)
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
    delete socketMap[user_id]
    io.emit('getOnlineUsers', socketMap)
  })
})

export { app, server, io, socketMap }
