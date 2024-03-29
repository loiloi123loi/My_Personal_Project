require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

// database
const connectDB = require('./configs/db/connect')

// rest package
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const path = require('path')

// middleware
const notFoundMiddlware = require('./middleware/not-found')
const errorHandleMiddleware = require('./middleware/error-handler')
const authenticationMiddleware = require('./middleware/authentication')

// routes
const authRouter = require('./routes/authRouter')
const jobsRouter = require('./routes/jobRouter')

app.set('trust proxy', 1)

app.use(express.static(path.resolve(__dirname, './client/build')))
// app.use(morgan('combined'))
app.use(helmet())
app.use(xss())
app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter)

app.use(notFoundMiddlware)
app.use(errorHandleMiddleware)

const port = process.env.PORT || 5555
const start = async () => {
    try {
        await connectDB(process.env.MONGO_DATABASE)
        app.listen(port, () => {
            console.log(`Server listenning on port ${port}...`)
        })
    } catch (err) {
        console.log(`Server start fail with error: ${err}`)
    }
}

start()
