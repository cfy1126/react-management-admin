import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import store from './redux/store'
import { Provider } from 'react-redux'

// 读取local保存的user, 保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
