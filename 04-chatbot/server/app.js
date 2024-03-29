require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// database
const { connect } = require('./configs/db/connect')

// config
const {
    sessionConfig,
    cloudinaryConfig,
    fileUploadConfig,
    corsConfig,
} = require('./configs')

// package
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { passport } = require('./utils')
const session = require('express-session')
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const morgan = require('morgan')

// middleware
const {
    notFoundMid,
    errorHandlerMid,
    authenticationMid,
} = require('./middlewares')

// router
const {
    authRouter,
    userRouter,
    chatRouter,
    historyRouter,
} = require('./routes')

app.use(cors(corsConfig))
app.use(
    morgan(
        ':method   :url   :status   :res[content-length]   :response-time ms'
    )
)
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.set('trust proxy', 1)
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
app.use(fileupload(fileUploadConfig))
cloudinary.config(cloudinaryConfig)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', authenticationMid, userRouter)
app.use('/api/v1/chat', authenticationMid, chatRouter)
app.use('/api/v1/history', authenticationMid, historyRouter)

app.use(notFoundMid)
app.use(errorHandlerMid)

const port = process.env.PORT || 5555
const start = async () => {
    try {
        await connect()
        app.listen(port, () =>
            console.log(`Server listenning on port ${port}...`)
        )
    } catch (err) {
        console.log(`Server running with error: ${err}`)
    }
}

start()
