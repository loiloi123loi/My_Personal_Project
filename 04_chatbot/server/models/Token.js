const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/db/connect')
const User = require('./User')

const Token = sequelize.define('Token', {
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userAgent: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
})

Token.belongsTo(User, { foreignKey: 'userId' })
User.hasOne(Token, { foreignKey: 'userId' })

module.exports = Token
