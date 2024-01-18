const { Sequelize } = require('sequelize')
const dbConfig = require('./dbConfig')

const sequelize = new Sequelize(dbConfig)

const connect = () => {
    return sequelize
        .authenticate()
        .then(() => {
            sequelize.sync({ alter: true })
            console.log(`Connect database success`)
        })
        .catch((err) => {
            console.log(`Connect DB fail`)
        })
}

module.exports = {
    connect,
    sequelize,
}
