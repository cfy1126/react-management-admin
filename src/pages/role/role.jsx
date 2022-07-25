import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'
import { formateDate } from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'

/**
 * 角色管理路由
 */

export default class Role extends Component {
  state = {
    roles: [], //所有角色恶的列表
    role: {}, //选中的role
    isShowAdd: false, //是否显示添加页面
    isShowAuth: false,
  }

  constructor(props) {
    super(props)

    this.auth = React.createRef()
  }
  initColum = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time),
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (auth_time) => formateDate(auth_time),
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ]
  }
  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles,
      })
    }
  }
  onRow = (role) => {
    return {
      onClick: (event) => {
        //点击行
        this.setState({
          role,
        })
      },
    }
  }
  // 添加角色
  addRole = () => {
    // 隐藏确认框
    this.setState({
      isShowAdd: false,
    })
    // 进行表单验证
    this.form.validateFields(async (error, values) => {
      const { roleName } = values
      // 清空输入框
      this.form.resetFields()

      // 请求添加
      const result = await reqAddRole(roleName)
      if (result.status === 0) {
        message.success('添加角色成功')
        // this.getRoles()
        const role = result.data

        // 更新roles状态：基于原本的状态更新数据
        this.setState((state) => ({
          roles: [...state.roles, role],
        }))
      } else {
        message.error('添加角色失败')
      }
    })
  }

  // 更新角色
  updateRole = async () => {
    // 隐藏确认框
    this.setState({
      isShowAuth: false,
    })
    const role = this.state.role
    // 得到最新的menus
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_name = memoryUtils.user.username

    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      // this.getRoles()    理解简单方法
      /**
       * 如果当前更新的是自己角色的权限，强制退出
       */
      if (role._id === memoryUtils.user.role_id) {
        memoryUtils.user = {}
        storageUtils.removeUser()
        this.props.history.replace('/login')
        message.success('当前用户角色权限修改了,请重新登录')
      } else {
        message.success('设置角色权限成功')
        this.setState({
          roles: [...this.state.roles],
        })
      }
    }
  }
  componentWillMount() {
    this.initColum()
    this.getRoles()
  }
  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state
    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowAdd: true })}>
          创建角色
        </Button>
        &nbsp;&nbsp;
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => this.setState({ isShowAuth: true })}>
          设置角色权限
        </Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: 5 }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              this.setState({
                role,
              })
            },
          }}
          onRow={this.onRow}></Table>
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({
              isShowAdd: false,
            })
            this.form.resetFields()
          }}>
          <AddForm
            setForm={(form) => {
              this.form = form
            }}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({
              isShowAuth: false,
            })
          }}>
          <AuthForm role={role} ref={this.auth} />
        </Modal>
      </Card>
    )
  }
}
