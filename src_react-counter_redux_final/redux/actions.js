/**
 * 包含n个用来创建action的工厂函数(action creator)
 */
import { INCREMENT, DECREMENT } from './action-types'

//增加action
export const increment = (number) => ({ type: INCREMENT, data: number })

//减少action
export const decrement = (number) => ({ type: DECREMENT, data: number })

// 异步增加的action
export const incrementAsync = (number) => {
  return (dispatch) => {
    // 执行异步（定时器，promise）
    setTimeout(() => {
      dispatch(increment(number))
    }, 1000)
  }
}
