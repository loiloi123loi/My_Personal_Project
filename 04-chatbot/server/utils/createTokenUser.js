const createTokenUser = (user) => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
    }
}

module.exports = createTokenUser
