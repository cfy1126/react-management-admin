import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
// import menuList from '../../config/menuConfig'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button'
import { connect } from 'react-redux'

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()), //当前时间
  }

  // 退出登录
  logout = () => {
    Modal.confirm({
      content: '确定退出吗？',
      onOk: () => {
        // 删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
      },
    })
  }

  // getTitle = () => {
  //   // 得到当前请求路径
  //   const path = this.props.location.pathname
  //   let title

  //   menuList.forEach((item) => {
  //     if (item.key === path) {
  //       //如果当前item对象的key与path一样，item的title就是需要显示的title
  //       title = item.title
  //     } else if (item.children) {
  //       const cItem = item.children.find((cItem) => cItem.key === path)
  //       if (cItem) {
  //         title = cItem.title
  //       }
  //     }
  //   })
  //   return title
  // }

  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
  /**
   * 第一次render之后执行一次
   * 一般在此执行异步操作：发ajax请求 / 启动定时器
   * @returns
   */
  componentDidMount() {
    // 获取当前时间
    this.getTime()
  }
  /**
   * 当前组件卸载之前
   */
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  render() {
    const { currentTime } = this.state
    const { username } = memoryUtils.user
    // const title = this.getTitle()
    const title = this.props.headTitle
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎！{username}</span>
          <LinkButton href="#" onClick={this.logout}>
            退出
          </LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img
              src="http://api.map.baidu.com/images/weather/day/qing.png"
              alt=""
            />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({ headTitle: state.headTitle }),
  {}
)(withRouter(Header))
