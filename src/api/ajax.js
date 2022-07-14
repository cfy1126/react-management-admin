/**
 * 能发送异步请求的函数模块
 * 封装axios
 * 函数返回值是promise对象
 *      1. 统一处理请求异常
 *      2. 异步直接得到data: resolve(response.data)
 */
import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data = {}, type = 'GET') {
  let promise
  return new Promise((resolve, reject) => {
    // 执行异步ajax请求
    if (type === 'GET') {
      promise = axios.get(url, {
        params: {
          data,
        },
      })
    } else {
      promise = axios.post(url, data)
    }
    // 如果成功了，调用resolve(value)
    promise
      .then((response) => {
        resolve(response.data)
        // 如果失败了，不调用reject(reason), 而是提示异常信息
      })
      .catch((error) => {
        message.error('请求出错了：' + error.message)
      })
  })
}

// 请求登录接口
// ajax('/login',{username: 'Tom',password: '123456'},'POST').then()

// 添加用户接口
// ajax('/manage/user/add',{username: 'Tom',password: '123456'},'POST').then()
