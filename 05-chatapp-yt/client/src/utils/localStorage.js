export const saveUserToLocalStorage = (user) => {
    localStorage.setItem('chat-user', JSON.stringify(user))
}

export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('chat-user')
    const user = result ? JSON.parse(result) : null
    return user
}

export const removeUserFromStorage = () => {
    localStorage.removeItem('chat-user')
}
