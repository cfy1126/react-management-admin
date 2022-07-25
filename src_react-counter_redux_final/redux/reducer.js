/**
 * reducer函数模块：根据当前state和指定action返回一个新的store
 */
import { INCREMENT, DECREMENT } from './action-types'
import { combineReducers } from 'redux'
/**
 * 管理count状态
 */
function count(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }
}

const initUser = {}
/**
 * 管理user状态
 */
function user(state = initUser, action) {
  switch (action.type) {
    default:
      return state
  }
}

/**
 * 合并多个reducer函数，接收包含所有reducer函数的对象，返回一个新的reducer函数（总的reducer）总的reducer函数管理的state的结构
 * {
 *    count: 2
 * }
 */
export default combineReducers({
  count,
  user
})
