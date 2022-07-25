import React, { Component } from 'react'
import './login.less'
import login from '../../assets/images/mlogo.jpg'
import { Form, Icon, Input, Button, message } from 'antd'
import { reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'
const Item = Form.Item
/**
 * 登录的路由组件
 */
class Login extends Component {
  handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      // 校验成功
      const { username, password } = values
      if (!err) {
        const result = await reqLogin(username, password)
        if (result.status === 0) {
          message.success('登录成功')
          const user = result.data
          memoryUtils.user = user
          storageUtils.savaUser(user)
          this.props.history.replace('/home')
        } else {
          message.error(result.msg)
        }
      } else {
        message.error('校验失败')
      }
    })
  }
  // 对密码进行自定义校验
  validataPwd = (rule, value, callback) => {
    if (!value) {
      callback('密码必须输入')
    } else if (value.length < 4) {
      callback('密码长度不能小于4位')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 验证通过
    }
  }
  render() {
    // 如果用户已经登录，自动跳转到管理页面
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to="/"></Redirect>
    }
    // 得到具强大功能的form对象
    const form = this.props.form
    const { getFieldDecorator } = form
    return (
      <div className="login">
        <header className="login-header">
          <img src={login} alt="" />
          <h1>后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('username', {
                // 声明式验证: 直接使用别人定义好的验证规则进行验证
                rules: [
                  { required: true, message: '用户名必须输入' },
                  { min: 4, message: '用户名至少4位' },
                  { max: 12, message: '用户名最多12位' },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '用户名必须是英文、数字或下划线组成',
                  },
                ],
                initialValue: 'admin',
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.validataPwd,
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
/**
 * 包装Form组件会生成一个新的组件：Form(login)
 * 新组件会向Form组件传递一个强大的对象属性form
 */
const WrapLogin = Form.create()(Login)

export default WrapLogin
