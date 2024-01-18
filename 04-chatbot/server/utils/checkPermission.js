const CustomError = require('../errors')

const checkPermission = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') return
    if (requestUser.id === resourceUserId.toString()) return
    throw new CustomError.UnAuthorizedError('Chưa xác thực để tiếp tục')
}

module.exports = checkPermission
