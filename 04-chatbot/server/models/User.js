const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/db/connect')
const bcrypt = require('bcryptjs')

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'First name cannot be empty.',
            },
            len: {
                args: [1, 20],
                msg: 'First name length must between 1 and 20 characters long.',
            },
            isAlpha: {
                msg: 'First name can only contain letters.',
            },
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Last name cannot be empty.',
            },
            len: {
                args: [1, 20],
                msg: 'Last name length must between 1 and 20 characters long.',
            },
            isAlpha: {
                msg: 'Last name can only contain letters.',
            },
        },
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.firstName + ' ' + this.lastName
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Username is used',
        },
        validate: {
            notEmpty: {
                args: true,
                msg: 'Username cannot be empty.',
            },
            len: {
                args: [6, 20],
                msg: 'Username length must between 6 and 20 characters long.',
            },
            isAlphanumeric: {
                msg: 'Username can only contain letters and numeric.',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Password cannot be empty.',
            },
            len: {
                args: [6],
                msg: 'Password length must more than 5 characters long.',
            },
        },
        set(newPassword) {
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(newPassword, salt)
            this.setDataValue('password', hashedPassword)
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Email is used.',
        },
        validate: {
            isEmail: {
                args: true,
                msg: 'Please provide valid email.',
            },
            notEmpty: {
                args: true,
                msg: 'Email cannot be empty.',
            },
            len: {
                args: [6, 30],
                msg: 'Email length must between 6 and 30 characters long.',
            },
        },
    },
    phone: {
        type: DataTypes.STRING,
        unique: {
            args: true,
            msg: 'Phone number is used.',
        },
        validate: {
            len: {
                args: [10],
                msg: 'Please provide valid phone number.',
            },
        },
    },
    typeLogin: {
        type: DataTypes.STRING,
        defaultValue: 'local',
        validate: {
            isIn: {
                args: [['local', 'google', 'facebook']],
                msg: 'Please provide valid type login',
            },
        },
    },
    role: { type: DataTypes.STRING, defaultValue: 'user' },
    avatar: { type: DataTypes.STRING },
    avatar_public_id: { type: DataTypes.STRING },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verified: { type: DataTypes.DATE },
    verifycationToken: { type: DataTypes.STRING },
    passwordToken: { type: DataTypes.STRING },
    passwordTokenExpirationDate: { type: DataTypes.DATE },
})

User.prototype.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = User
