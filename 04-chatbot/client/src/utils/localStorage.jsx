export const getThemeFromStorage = () => {
    const result = localStorage.getItem('theme')
    if (result) {
        return JSON.parse(result)
    }
}

export const saveThemeToStorage = (theme) => {
    localStorage.setItem('theme', JSON.stringify(theme))
}
