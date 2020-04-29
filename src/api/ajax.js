/*
  对axios这个库进行二次封装
*/

import axios from 'axios' // axios核心库
import qs from 'querystring' // 将对象转为urlencoded字符串
import {message as msg} from 'antd'

// 配置请求的基本路径
axios.defaults.baseURL = 'http://localhost:3000'

// 配置超时时间
axios.defaults.timeout = 2000

// axios的请求拦截器
axios.interceptors.request.use(
  (config) => {
    const {method,data} = config
    // 统一处理post请求json编码问题,转为urlencoded
    if(method.toLowerCase() === 'post' && data instanceof Object){
      config.data = qs.stringify(data)
    }
    return config
  }
)

//响应拦截器
axios.interceptors.response.use(
  // 成功的回调
  response => {
    return response.data
  },
  // 失败的回调
  err => {
    // console.log(error.message);
    // alert(error.message)
    let errmsg = '未知错误'
    const {message} = err
    if(message.indexOf('401') !== -1) errmsg = '未登录或身份过期'
    else if(message.indexOf('Network Error') !== -1) errmsg = '没有网络'
    else if(message.indexOf('timeout') !== -1) errmsg = '连接超时'
    msg.error(errmsg,1)
    return new Promise(() => {})
  }
)

export default axios