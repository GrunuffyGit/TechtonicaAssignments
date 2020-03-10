import React from 'react';
import * as generalFunc from './generalFunc';

export default class Login extends React.Component {
    state = {
        "username":'',
        "password":'',
        "errorMsg":''
    };

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    checkPassWord(userData){
    //checking for userpass being correct
        if(userData.length !== 0){//seeing if user exists in array
            if(userData[0].password === this.state.password){//checking if password match
                userData = {//grabbing data from json to form a userobj
                    "name": userData[0].name,
                    "events": userData[0].events
                }
                generalFunc.setLocalStorage("currentUser",userData);//adding userobj to local storage as current user
                window.location.reload();
            }else{//if password doesn't match
                this.setState({"errorMsg":'Incorrect password'});
            };
        }else{//if user doesn't exist
            this.setState({"errorMsg":'Please enter a valid username'});
        };
    };

    login(event){
        event.preventDefault();//prevent reload on submit
        if(this.state.username.length !== 0 && this.state.password.length !== 0){//no empty input
            let URL = "/users/"+ this.state.username;
            fetch(URL)
                .then((res) => res.json())
                .then((result) => this.checkPassWord(result))
        }else{//if no input
            this.setState({"errorMsg":"Please fill out all field(s)!"});
        };
    }


    render(){
        return(
            <div className="login col1">
                <h3>User Log In</h3>
                <form id="user-login" onSubmit={this.login.bind(this)}>
                    <label>User Name:</label>
                    <input type="text" id="username" onChange={this.storeInputValue.bind(this)}></input>
                    <br/>
                    <label>User Password:</label>
                    <input type="text" id="password" onChange={this.storeInputValue.bind(this)}></input>
                    <div id="user-login-errorMsg">{this.state.errorMsg}</div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        )
    }
}