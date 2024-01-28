const CustomError = require('../errors')

const checkPermission = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') return
    if (requestUser.id === resourceUserId) return
    throw new CustomError.UnAuthorizedError('Authentication Fail')
}

module.exports = checkPermission
