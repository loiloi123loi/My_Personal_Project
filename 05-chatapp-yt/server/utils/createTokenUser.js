const createTokenUser = (user) => {
    return {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        profilePic: user.profilePic,
    }
}

module.exports = createTokenUser
