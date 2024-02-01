import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import chatSlice from './features/chat/chatSlice'
import historySlice from './features/history/historySlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        chat: chatSlice,
        history: historySlice,
    },
})
