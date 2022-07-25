import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import { reqAddOrUpdateUser, reqDeleteUser, reqUsers } from '../../api'
import UserForm from './user-form'
/**
 * 用户管理路由
 */

export default class User extends Component {
  state = {
    users: [], //所有的用户表
    roles: [],
    isShow: false,
  }

  initColums = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate,
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id],
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        ),
      },
    ]
  }

  /**
   * 根据role的数组，生成包含所有角色名的对象（属性名用角色id值）
   */
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    // 保存
    this.roleNames = roleNames
  }

  getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const { users, roles } = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles,
      })
    }
  }

  /**
   * 添加或者更新用户
   */
  addOrUpdateUser = async () => {
    // 隐藏确认框
    this.setState({
      isShow: false,
    })
    // 1. 收集输入的数据
    const user = this.form.getFieldsValue()
    this.form.resetFields()
    // 如果是更新需要给user指定_id
    if (this.user) {
      user._id = this.user._id
    }

    // 2. 提交添加的请求
    const result = await reqAddOrUpdateUser(user)

    // 3. 更新列表显示
    if (result.status === 0) {
      message.success(`${this.user ? '更新' : '添加'}用户成功`)
      this.getUsers()
    }
  }

  /**
   * 删除指定用户
   */
  deleteUser = (user) => {
    Modal.confirm({
      content: `确定删除${user.username}吗？`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success(`删除用户${user.username}成功！`)
          this.getUsers()
        }
      },
    })
  }

  /*
  显示添加界面
  */
  showAdd = () => {
    this.user = null // 去除前面保存的user
    this.setState({ isShow: true })
  }

  /**
   * 显示修改页面
   */
  showUpdate = (user) => {
    this.setState({
      isShow: true,
    })
    this.user = user
  }

  componentDidMount() {
    this.getUsers()
  }

  componentWillMount() {
    this.initColums()
  }
  render() {
    const title = (
      <Button type="primary" onClick={this.showAdd}>
        创建用户
      </Button>
    )
    const { users, isShow, roles } = this.state
    const user = this.user || {}
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: 5 }}></Table>
        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.setState({
              isShow: false,
            })
            this.form.resetFields()
          }}>
          <UserForm
            setForm={(form) => (this.form = form)}
            roles={roles}
            user={user}></UserForm>
        </Modal>
      </Card>
    )
  }
}
