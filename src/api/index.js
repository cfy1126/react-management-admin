/**
 * 包含应用中所有接口请求函数模块
 */
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''
// 登录
// export function reqLogin(username,password){
//   ajax('/login',{username,password},'POST')
// }

export const reqLogin = (username, password) =>
  ajax(`${BASE}/login`, { username, password }, 'POST')

// 添加用户
export const reqAdd = (user) => ajax(`${BASE}/manage/user/add`, user, 'POST')
