import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      const user = { ...action }
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify())
    },
    logoutUser: (state) => {
      state.user = null
    },
    toggleTheme: (state) => {
      const { dracula, winter } = themes
      state.theme = state.theme === dracula ? winter : dracula
      document.documentElement.setAttribute('data-theme', state.theme)
      localStorage.setItem('theme', state.theme)
    }
  }
})

export const {} = userSlice.actions

export default userSlice.reducer
