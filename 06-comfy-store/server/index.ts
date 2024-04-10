import dotenv from 'dotenv'
import 'express-async-errors'

// express
import express from 'express'
const app = express()

// db
import connectDB from './configs/db/connect'

// package
import cors from 'cors'

// config
import { corsConfig } from './configs'

// middleware
import { notFoundMiddle, errorHandlerMiddle } from './middlewares'

// route
import initRoute from './routes'

dotenv.config()
app.use(cors(corsConfig))
app.use(express.json())

app.get('/', (req: express.Request, res: express.Response) => {
    res.json('Hello, my store api')
})
initRoute(app)

app.use(notFoundMiddle)
app.use(errorHandlerMiddle)

const port = process.env.PORT || 5555
const start = async () => {
    try {
        if (!process.env.DB_URL) {
            throw new Error('DB_URL not exist')
        }
        await connectDB(process.env.DB_URL)
        app.listen(port, () => console.log(`Server listen on port ${port}...`))
    } catch (err) {
        console.log(`Server start with error: ${err}`)
    }
}
start()
