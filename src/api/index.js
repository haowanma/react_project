// 该文件用于管理项目的ajax请求,每个请求对应一个请求函数

import ajax from './ajax'

// 请求登录的函数
export const reqLogin = (loginObj) => ajax.post('/login',loginObj)