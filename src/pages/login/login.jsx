import React, { Component } from 'react'
import './login.less'
import login from './images/mlogo.jpg'
import { Form, Icon, Input, Button } from 'antd'
const Item = Form.Item
/**
 * 登录的路由组件
 */
class Login extends Component {
  handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      // 校验成功
      if (!err) {
        console.log('Received values of form: ', values)
      }else{
        console.log('校验失败');
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
                initialValue: 'admin'
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
