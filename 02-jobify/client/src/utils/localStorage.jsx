export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem('user')
    if (result) {
        return JSON.parse(result)
    }
    return null
}

export const setThemeToLocalStorage = (value) => {
    localStorage.setItem('darkTheme', JSON.stringify(value))
}

export const getThemeFromLocalStorage = () => {
    try {
        const result = localStorage.getItem('darkTheme')
        if (result) {
            return JSON.parse(result)
        }
    } catch (err) {
        return false
    }
}
