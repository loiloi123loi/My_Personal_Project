require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

// database
const connectDB = require('./configs/db/connectDB')

// rest package
const morgan = require('morgan')

// middleware

// routes

const port = process.env.PORT
const start = async () => {
    try {
        await connectDB(process.env.DB_URI)
        app.listen(port, () =>
            console.log(`Server listenning on port ${port}...`)
        )
    } catch (err) {
        console.log(`Start server with error: ${err}`)
    }
}

start()
