const authRouter = require('./authRouter')

module.exports = (app) => {
    app.use('/api/v1/auth', authRouter)
}
