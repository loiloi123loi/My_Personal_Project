const { Sequelize } = require('sequelize')
const dbConfig = require('./dbConfig')

const sequelize = new Sequelize(dbConfig)

const connectDB = () => {
    return sequelize
        .authenticate()
        .then(() => {
            sequelize.sync({
                force: true,
            })
            console.log(`Connect database success`)
        })
        .catch((err) => {
            console.log(`Connect DB fail`)
            throw err
        })
}

module.exports = {
    connectDB,
    sequelize,
}
