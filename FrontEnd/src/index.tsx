import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { socket } from './services/services'
import { toast } from 'react-toastify'
import store from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
socket.on('user_added', (data) => {
  toast.info(data.name +' is added!')
})
socket.on('user_updated', (data) => {
  toast.info(data.name +' is updated!')
})
socket.on('user_removed', () => {
  toast.info('A user is removed!')
})
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>

  ,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
