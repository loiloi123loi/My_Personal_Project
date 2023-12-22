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
            throw err
        })
}

module.exports = {
    connect,
    sequelize,
}
