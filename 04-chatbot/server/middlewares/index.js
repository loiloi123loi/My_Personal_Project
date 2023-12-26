const notFoundMid = require('./notFoundMid')
const errorHandlerMid = require('./errorHandlerMid')
const {
    authenticaton: authenticationMid,
    authorizePermissions,
} = require('./authenticationMid')

module.exports = {
    notFoundMid,
    errorHandlerMid,
    authenticationMid,
    authorizePermissions,
}
