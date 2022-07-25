import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import store from './redux/store'
import { Provider } from 'react-redux'


//store内部的状态发生改变时回调，重新渲染App
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
