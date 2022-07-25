import { connect } from 'react-redux'
import Counter from '../components/Counter'
import { increment, decrement } from '../redux/actions'

/**
 * 容器组件：通过connect包装UI组件产生组件
 * connect()：高阶函数
 * connect()返回的函数是一个高阶组件：接收一个UI组件，生成一个容器组件
 * 容器组件的责任：向UI组件传入特定的属性
 */

/**
 * 用来将redux管理的state数据映射成UI组件的一般属性的函数
 * 等于执行store.getState()
 */
function mapStateToProps(state) {
  return {
    // 来源于store中的state
    count: state,
  }
}

/**
 * 将包含dispatch语句调用的函数映射成属性传递给UI组件
 * 将对象的方法作为函数属性传入UI组件
 * @param {*} dispatch 
 * @returns 
 */
function mapDispatchToProps(dispatch) {
  return {
    increment: (number) => dispatch(increment(number)),
    decrement: (number) => dispatch(decrement(number)),
  }
}

export default connect(
  mapStateToProps, //一般属性
  mapDispatchToProps //函数属性
)(Counter)
