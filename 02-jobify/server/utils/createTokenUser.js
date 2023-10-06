const createTokenUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        location: user.location,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
    }
}

module.exports = createTokenUser
