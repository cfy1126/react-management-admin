/**
 * 用来根据老的state和指定的action生成返回新的stage
 */
import storageUtils from '../utils/storageUtils'
import { combineReducers } from 'redux'
import { SET_HEAD_TITLE } from './action-types'
/**
 * 用来管理头部标题的reducer函数
 */
const initHeadTitle = '首页'
function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

/**
 * 用来管理头部标题的reducer函数
 */
const initUser = storageUtils.getUser()
function User(state = initUser, action) {
  switch (action.type) {
    default:
      return state
  }
}

/**
 * 向外暴露的是合并产生的总的reducer函数管理的总的state的结构：
 {
  headTitle: '首页',
  user: {}
 }
 */
export default combineReducers({
  headTitle,
  User,
})
