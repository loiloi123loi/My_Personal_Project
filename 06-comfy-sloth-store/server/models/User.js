const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/db/connect')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const CustomError = require('../errors')

const User = sequelize.define(
    'User',
    {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Name cannot be blank',
                },
                len: {
                    args: [1, 20],
                    msg: 'Name must be from 1 to 20 characters',
                },
                isAlphaSpace: function (value) {
                    if (!validator.isAlpha(value.replace(' ', ''))) {
                        throw new Error(
                            'The name must contain letters and spaces'
                        )
                    }
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email already exists on the system',
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Please provide email',
                },
                isEmail: {
                    args: true,
                    msg: 'Invalid email',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Please provide your password',
                },
                len: {
                    args: [6, 32],
                    msg: 'Password from 8 to 32 characters, including lowercase letters, uppercase letters, numbers and special characters',
                },
            },
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'user'],
            defaultValue: 'user',
            allowNull: false,
            validate: {
                isIn: {
                    args: [['admin', 'user']],
                    msg: 'Only admin or user roles',
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
User.beforeSave(async function (user, options) {
    if (user.changed('password')) {
        const isStrong = validator.isStrongPassword(user.password)
        if (!isStrong) {
            throw new CustomError.BadRequestError('Invalid fields value', {
                password:
                    'Password from 8 to 32 characters, including lowercase letters, uppercase letters, numbers and special characters',
            })
        }
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }
})
User.prototype.comparePassword = async function (plainPassword) {
    const isMatch = await bcrypt.compare(plainPassword, this.password)
    return isMatch
}

module.exports = User
