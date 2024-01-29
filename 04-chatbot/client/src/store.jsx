import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import chatSlice from './features/chat/chatSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        chat: chatSlice,
    },
})
