/**
 * reducer函数模块：根据当前state和指定action返回一个新的store
 */
import { INCREMENT, DECREMENT } from './action-types'
/**
 * 管理count状态
 */
export default function count(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }
}