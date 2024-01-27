import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store.jsx'

const root = document.getElementById('root')
createRoot(root).render(
    <Provider store={store}>
        <App />
    </Provider>
)
