import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { increment, decrement } from './redux/actions'
export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  increment = () => {
    const number = this.numberRef.current.value * 1
    this.props.store.dispatch(increment(number))
  }

  decrement = () => {
    const number = this.numberRef.current.value * 1
    this.props.store.dispatch(decrement(number))
  }

  /**
   * 数字为奇数时更新
   */
  incrementIfOdd = () => {
    const number = this.numberRef.current.value * 1
    if (this.props.store.getState() % 2 === 1) {
      this.props.store.dispatch(increment(number))
    }
  }

  /**
   * 等待1s后更新
   */
  incrementAsync = () => {
    const number = this.numberRef.current.value * 1
    setTimeout(() => {
      this.props.store.dispatch(increment(number))
    }, 1000)
  }

  constructor(props) {
    super(props)

    this.numberRef = React.createRef()
  }
  render() {
    const count = this.props.store.getState()
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
