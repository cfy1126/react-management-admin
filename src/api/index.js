/**
 * 包含应用中所有接口请求函数模块
 */
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''

// 登录
export const reqLogin = (username, password) =>
  ajax(`${BASE}/login`, { username, password }, 'POST')

//获取所有角色列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')

// 添加角色
export const reqAddRole = (roleName) =>
  ajax(BASE + '/manage/role/add', { roleName }, 'POST')

// 更新角色
export const reqUpdateRole = (role) =>
  ajax(BASE + '/manage/role/update', role, 'POST')

// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')

// 删除用户
export const reqDeleteUser = (userId) =>
  ajax(BASE + '/manage/user/delete', { userId }, 'POST')

// 添加/更新用户
export const reqAddOrUpdateUser = (user) =>
  ajax(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST')
