import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '@/api'
import logo from './images/logo.png'
import './css/login.less'


const {Item} = Form

export default class Login extends Component {

  // 提交表单且数据验证成功后回调事件
  onFinish = async values => {
    // `username=${values.username}&password=${values.password}`
    let result = await reqLogin(values)
    const {status,data,msg} = result
    if(status === 0){
      message.success('登录成功!',1)
      console.log(data);
      this.props.history.replace('/admin')
    }else{
      message.error(msg)
    }
  };

  // 密码的验证器pwdValidator
  pwdValidator = (_,value="") => {
    let errMsgArr = []
    if(!value.trim()) return Promise.reject('请输入密码!')
    if(value.length < 4) errMsgArr.push('密码需大于等于4位!')
    if(value.length > 12) errMsgArr.push('密码需小于12位')
    if(!(/^\w+$/).test(value)) errMsgArr.push('密码只能由英文,数字,下划线组成!')
    if(errMsgArr.length !== 0) return Promise.reject(errMsgArr)
    else return Promise.resolve()
  }

  render() {
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo"/>
          <h1>商品管理系统</h1>
        </header>

        <section>
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >

            <Item
              name="username"
              rules={[
                {required:true,message:'请输入用户名!'}, //必填样式设置
                {min:4,message:'用户名需大于等于4位!'},
                {max:12,message:'用户名需小于等于12位!'},
                {pattern:/^\w+$/,message:'用户名只能由英文,数字,下划线组成!'}
              ]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="用户名" 
              />
            </Item>

            <Item
              name="password"
              rules={[
                {validator:this.pwdValidator}, //自定义校验
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Item>

            <Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="login-form-button"
              >
                登录
              </Button>
            </Item>

          </Form>
        </section>
      </div>
    )
  }
}
