const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/db/connect')
const Chat = require('./Chat')

const History = sequelize.define('History', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 2000],
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
})

Chat.hasMany(History, { foreignKey: 'chatId' })
History.belongsTo(Chat, { foreignKey: 'chatId' })

module.exports = History
