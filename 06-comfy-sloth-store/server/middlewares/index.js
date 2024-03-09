const notFoundMiddle = require('./notFoundMiddle')
const errorHandleMiddle = require('./errorHandleMiddle')
const {
    authentication: authenticationMiddle,
    authorizePermissions,
} = require('./authenticationMiddle')

module.exports = {
    notFoundMiddle,
    errorHandleMiddle,
    authenticationMiddle,
    authorizePermissions,
}
