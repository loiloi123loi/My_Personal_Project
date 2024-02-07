const authRouter = require('./auth')
const userRouter = require('./user')
const messageRouter = require('./message')
const { authenticationMidd } = require('../middleware')

module.exports = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', authenticationMidd, userRouter)
    app.use('/api/v1/message', authenticationMidd, messageRouter)
}
