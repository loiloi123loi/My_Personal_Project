const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/db/connect')
const User = require('./User')

const Chat = sequelize.define('Chat', {
    chatname: {
        type: DataTypes.STRING,
        defaultValue: 'New Chat',
        validate: {
            len: [0, 50],
        },
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

Chat.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Chat, { foreignKey: 'userId' })

module.exports = Chat
