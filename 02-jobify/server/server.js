require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

// database
const connectDB = require('./configs/db/connect')

// config
const cloudinaryConfig = require('./configs/cloudinary/cloudinaryConfig')
const corsConfig = require('./configs/cors/corsConfig')
const rateLimiterConfig = require('./configs/rateLimiter/rateLimiterConfig')
const fileuploadConfig = require('./configs/fileupload/fileuploadConfig')

// package
const cloudinary = require('cloudinary').v2
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

// routes
const authRouter = require('./routes/authRouter')
const jobsRouter = require('./routes/jobsRouter')

// middleware
const notFoundMiddleware = require('./middleware/not-found-middleware')
const errorHandleMiddleware = require('./middleware/error-handler-middleware')
const authenticationMiddleware = require('./middleware/authentication')

app.set('trust proxy', 1)
// app.use(morgan('combined'))
app.use(cors(corsConfig))
app.use(rateLimiter(rateLimiterConfig))
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(fileupload(fileuploadConfig))
cloudinary.config(cloudinaryConfig)
// app.use(express.static('./public'))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)

const port = process.env.PORT || 5555
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () =>
            console.log(`Server listenning on port ${port}...`)
        )
    } catch (error) {
        console.log('Server run with error: ' + error)
    }
}

start()
