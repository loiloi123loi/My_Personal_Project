const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/db/connect')
const User = require('./User')

const Token = sequelize.define(
    'Token',
    {
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Please provide refresh token',
                },
            },
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Please provide ip',
                },
            },
        },
        userAgent: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Please provide user agent',
                },
            },
        },
        isValid: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: User,
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Please provide user id',
                },
            },
        },
    },
    {
        paranoid: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
    }
)

Token.belongsTo(User, { foreignKey: 'userId' })
User.hasOne(Token, { foreignKey: 'userId' })

module.exports = Token
