require('dotenv').config()
const connectDB = require('./configs/db/connect')
const Job = require('./models/Job')
const dataRen = require('./generated.json').jobs

const startRen = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        await Job.create(dataRen)
        console.log('OK')
    } catch (err) {
        console.log(err)
    }
}

startRen()
