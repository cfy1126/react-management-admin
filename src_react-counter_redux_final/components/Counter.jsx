import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 UI组件
  主要做显示与用户交互
  代码中没有任何redux相关的代码
 */
export default class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
  }

  increment = () => {
    const number = this.numberRef.current.value * 1
    this.props.increment(number)
  }

  decrement = () => {
    const number = this.numberRef.current.value * 1
    this.props.decrement(number)
  }

  /**
   * 数字为奇数时更新
   */
  incrementIfOdd = () => {
    const number = this.numberRef.current.value * 1
    if (this.props.count % 2 === 1) {
      this.props.increment(number)
    }
  }

  /**
   * 等待1s后更新
   */
  incrementAsync = () => {
    const number = this.numberRef.current.value * 1
    this.props.incrementAsync(number)
  }

  constructor(props) {
    super(props)

    this.numberRef = React.createRef()
  }
  render() {
    const count = this.props.count
    return (
      <div className="container">
        <p>click {count} times</p>
        <select ref={this.numberRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>
        &nbsp;&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
