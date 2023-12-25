require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// database
const { connect } = require('./configs/db/connect')

// package
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { passport } = require('./utils')

// middleware
const { notFoundMid, errorHandlerMid } = require('./middlewares')

// router
const { authRouter } = require('./routes')

app.use(cors())
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1/auth', authRouter)

app.use(notFoundMid)
app.use(errorHandlerMid)

// const {
//     GoogleGenerativeAI,
//     HarmBlockThreshold,
//     HarmCategory,
// } = require('@google/generative-ai')

// const genAI = new GoogleGenerativeAI(process.env.API_KEY_AI2)

// const safetySettings = [
//     {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_NONE,
//     },
// ]

// const model = genAI.getGenerativeModel({
//     model: 'models/gemini-pro',
//     safetySettings,
// })
// const result = await model.generateContent(prompt)
// const response = await result.response
// const text = response.text()
// res.json({ message: text })

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
