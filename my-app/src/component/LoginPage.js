import React, { Component } from 'react';
import axios from 'axios'

import '../style/LoginPage.css'

class LoginPage extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange0 = this.handleChange0.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.state = {
            name: '',
            pwd: '',
            text: ''
        }
    }
    handleSubmit() {
        if(!this.state.name){
            this.setState({
                text: '！请输入用户名'
            })
            return;
        }else if(!this.state.pwd){
            this.setState({
                text: '!请输入账号密码'
            })
            return;
        }else{
            this.setState({
                text: ''
            })
            let _this = this;
            axios.get(`http://localhost:3033/login/?name=${this.state.name}&pwd=${this.state.pwd}`)
            .then(function(res){
                if(res.data == 1){
                    window.location.replace('/');
                }else{
                    _this.setState({
                        text: '！账号或密码错误'
                    })
                }
            })
            .catch(function(err){
                console.log(err);
            })
        }
    }
    handleChange0(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleChange1(e) {
        this.setState({
            pwd: e.target.value
        })
    }
    render() {
        return (
            <div className="loginPageBox">
                <div className="loginInfoBox">
                    <label htmlFor="name">用户名</label>
                    <input type="text" id="name" placeholder="请输入用户名" onChange={this.handleChange0}/>
                    <label htmlFor="password">账号密码</label>
                    <input type="password" id="password" placeholder="请输入账号密码" onChange={this.handleChange1}/>
                    <button className="loginBotton" onClick={this.handleSubmit}>登陆</button>
                    {this.state.text && 
                        <p>{this.state.text}</p>
                    }
                    
                </div>
            </div>
        )
    }

}

export default LoginPage;