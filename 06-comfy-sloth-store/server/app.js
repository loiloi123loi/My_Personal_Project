require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

// database
const { connectDB } = require('./configs/db/connect')

// package
const cors = require('cors')

// config
const { corsConfig } = require('./configs')

// middleware
const { notFoundMiddle, errorHandleMiddle } = require('./middlewares')

app.use(cors(corsConfig))
app.use(express.json())

require('./routes')(app)

app.use(notFoundMiddle)
app.use(errorHandleMiddle)

const port = process.env.PORT || 5555
const start = async () => {
    try {
        await connectDB()
        app.listen(port, () =>
            console.log(`Server listenning on port ${port}...`)
        )
    } catch (err) {
        console.log(`Server run with error: ${err}`)
    }
}
start()
