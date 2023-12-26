const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { User } = require('../models')
const { attachCookiesToResponse } = require('../utils')

const getAllUsers = async (req, res) => {}

const getSingleUser = async (req, res) => {}

const currentUser = async (req, res) => {}

const updateProfile = async (req, res) => {}

const updateUserPassword = async (req, res) => {}

module.exports = {
    getAllUsers,
    getSingleUser,
    currentUser,
    updateProfile,
    updateUserPassword,
}
