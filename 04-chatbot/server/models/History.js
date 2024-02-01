const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/db/connect')
const Chat = require('./Chat')
const User = require('./User')

const History = sequelize.define('History', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1],
        },
    },
    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Chat,
            key: 'id',
        },
    },
    who: {
        type: DataTypes.STRING,
    },
})

Chat.hasMany(History, { foreignKey: 'chatId' })
History.belongsTo(Chat, { foreignKey: 'chatId' })

module.exports = History
