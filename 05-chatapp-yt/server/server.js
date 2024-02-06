require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// db
const connectDB = require('./db/connectDB')

// package
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// middleware
const { notFoundMidd, errHandleMidd } = require('./middleware')

// routes
const initRoute = require('./routes')

const server = createServer(app)
const io = new Server(server)

app.use(cors())
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

initRoute(app)

app.use(notFoundMidd)
app.use(errHandleMidd)

const port = process.env.PORT || 5555
const start = async () => {
    try {
        await connectDB(process.env.DB_URL)
        server.listen(port, () =>
            console.log(`Server listenning on port ${port}...`)
        )
    } catch (err) {}
}
start()
