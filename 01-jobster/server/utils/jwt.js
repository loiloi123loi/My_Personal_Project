const jwt = require('jsonwebtoken')

const creatJWT = async ({ email, _id }) => {
    const token = jwt.sign(
        {
            id: _id,
            email,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
    return token
}

module.exports = creatJWT
