import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
/**
 * 主界面路由组件
 */
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    // 如果内存没有储存user ==> 当前没有登录
    if (!user || !user._id) {
      // 自动跳转到登录（在render()中）
      return <Redirect to="/login"></Redirect>
    }
    return <div>欢迎登录！{user.username}</div>
  }
}
