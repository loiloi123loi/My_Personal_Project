const CustomError = require('../errors')

const checkPermission = async (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') return
    if (requestUser.role === resourceUserId.toString()) return
    throw new CustomError.UnAuthorizedError(
        'Not authorized to access this route'
    )
}

module.exports = checkPermission
