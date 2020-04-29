import React, { Component } from 'react'
import Admin from './pages/admin/Admin'
import Login from './pages/login/Login'
import{Switch,Route,Redirect} from 'react-router-dom'
// import {Button} from 'antd'

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/Login" component={Login}/>
                <Route path="/Admin" component={Admin}/>
                <Redirect to='login'/>
            </Switch>
        )
    }
}