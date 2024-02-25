const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/db/connect')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const User = sequelize.define('User', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Tên không được để trống',
            },
            len: {
                args: [1, 20],
                msg: 'Tên phải từ 1 đến 20 kí tự',
            },
            isAlpha: {
                args: true,
                msg: 'Tên chỉ gồm chữ và dấu cách',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Email đã tồn tại trên hệ thống',
        },
        validate: {
            notEmpty: {
                args: true,
                msg: 'Vui lòng cung cấp email',
            },
            isEmail: {
                args: true,
                msg: 'Email không hợp lệ',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Vui lòng cung cấp mật khẩu',
            },
            len: {
                args: [60, 320],
                msg: 'Mật khẩu từ 6 đến 32 kí tự, bao gồm chữ thường, chữ hoa, số và kí tự đặc biệt',
            },
        },
    },
    role: {
        type: DataTypes.ENUM,
        values: ['admin', 'user'],
        defaultValue: 'user',
    },
})
User.beforeSave(async function (user, options) {
    if (user.changed('password')) {
        const isStrong = validator.isStrongPassword(user.password)
        if (!isStrong) {
            throw new Error(
                'Mật khẩu phải chứa ít nhất 8 ký tự và bao gồm ít nhất một chữ cái và một ký tự số.'
            )
        }
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }
})

module.exports = User
