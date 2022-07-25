import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'

ReactDOM.render(<App store={store} />, document.getElementById('root'))

// 给store绑定状态更新的监听
store.subscribe(() => {
  //store内部的状态发生改变时回调，重新渲染App
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
})
