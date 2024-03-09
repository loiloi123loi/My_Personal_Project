const authRouter = require('./authRouter')
const userRouter = require('./userRouter')

module.exports = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)
}
