import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Tree } from 'antd'
import menuList from '../../config/menuConfig'
const { TreeNode } = Tree

const Item = Form.Item

/*
添加分类的form组件
 */
class AuthForm extends Component {
  static propTypes = {
    role: PropTypes.object,
  }
  constructor(props) {
    super(props)

    // 根据出入角色的menus生成初始状态
    const { menus } = this.props.role
    this.state = {
      checkedKeys: menus,
    }
  }
  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys })
  }

  /**
   * 为父组件提供最新menus数据
   * @returns
   */
  getMenus = () => this.state.checkedKeys
  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }

  /**
   * 当组件接收到新的属性时自动调用
   */
  componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus,
    })
  }
  render() {
    const { role } = this.props
    const { checkedKeys } = this.state
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 16 }, // 右侧包裹的宽度
    }
    return (
      <Form>
        <Item label="角色名称" {...formItemLayout}>
          <Input placeholder="请输入角色名称" value={role.name} disabled />
        </Item>
        <Tree
          defaultExpandAll
          checkable
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}>
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}

export default AuthForm
