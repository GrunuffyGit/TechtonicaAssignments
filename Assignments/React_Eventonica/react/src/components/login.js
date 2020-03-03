import React from 'react';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "username":'',
            "password":'',
            "loggedIn": false
        };
        this.storeInputValue = this.storeInputValue.bind(this);
    }

    storeInputValue(event){
        let target = event.target;
        this.setState =({
            [target.id] : target.value 
        });
    }

    setLocalStorage(string, arrayObj){
        //setting the local storage
            localStorage.setItem(string, JSON.stringify(arrayObj)); 
    }

    checkPassWord(userData){
    //checking for userpass being correct
        if(userData.length !== 0){//seeing if user exists in array
            if(userData[0].password === this.state.password){//checking if password match
                userData = {//grabbing data from json to form a userobj
                    "name": userData[0].name,
                    "events": userData[0].events
                }
                this.setLocalStorage("currentUser",userData);//adding userobj to local storage as current user
                location.reload();
            }else{//if password doesn't match
                $("#user-login-errorMsg").html("Incorrect password");
            };
        }else{//if user doesn't exist
            $("#user-login-errorMsg").html("Please enter a valid username");
        };
    };

    login(event){
        $("#user-login-errorMsg").html("");
        event.preventDefault();//prevent reload on submit
        if(UN.length !== 0 && Pass.length !== 0){//no empty input
            let findUsersURL = buildDBURL("users", UN.toUpperCase());//building url to find user
            callDB_API("GET", findUsersURL, checkPassWord);//calling db to find user and passing checkPassword as a callback func
        }else{//if no input
            $("#user-login-errorMsg").html("Please fill out all field(s)!");
        };
    }

    showlogin

    render(){
        return(
            <div class="login">
                <h3>User Log In</h3>
                <form id="user-login" onSubmit={this.login}>
                    <label>User Name:</label>
                    <input type="text" id="username"></input>
                    <br/>
                    <label>User Password:</label>
                    <input type="text" id="password"></input>
                    <div id="user-login-errorMsg"></div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        )
    }
}