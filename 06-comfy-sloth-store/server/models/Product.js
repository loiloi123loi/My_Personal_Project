const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/db/connect')

const Product = sequelize.define(
    'Product',
    {
        name: {
            type: DataTypes.STRING,
            values: trim,
            validate: {},
        },
    },
    {
        paranoid: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
    }
)

module.exports = Product
