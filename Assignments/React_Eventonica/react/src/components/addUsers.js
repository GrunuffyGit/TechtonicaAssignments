import React from 'react';

export default class AddUsers extends React.Component {
    state={
        "username":'',
        "password":'',
        "errorMsg":''
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    addUsers(event){
    //adding user to the db
    //search db if there is an user duplication and if there isn't then post to userobj to the db
        event.preventDefault();//prevent reload on submit
            let userName = this.state.username.toUpperCase();//grabbing UN from input
            let userPass = this.state.password;//grabbing UP from input
        if(userName.length !== 0 && userPass.length !== 0){ //find if there are no empty inputs
            let userObj = {//creating userobj for callback function to pass as body when posting to api
                "name": userName,
                "password": userPass
            };
            let findUserURL = "/users/"+userName; //building url to search the db
            fetch(findUserURL)
                .then((res) => res.json())
                .then((result) => {
                    this.findUserDuplication.bind(this);
                    this.findUserDuplication(result, userObj);
                });
        }else{
            this.setState({"errorMsg":"Please fill out all field(s)!"});
        };
    }

    findUserDuplication(dataJson, userObj){
    //checking results of searching the db if username is already taken
        if(dataJson.length !== 0){ //if user already exists or not
            this.setState({"errorMsg":"Username already exists. Please choose another."});
        }else{//if username is not taken
            this.setState({"errorMsg":""});
            fetch("/users",{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userObj)
            })
                .then((res) => res.json())
                .then(window.location.reload());
        };
    };

    render(){
        return(
            <form id="add-user" onSubmit={this.addUsers.bind(this)}>
                <label>User Name:</label>
                <input type="text" id="username" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <label>User Password:</label>
                <input type="text" id="password" onChange={this.storeInputValue.bind(this)}></input>*case-sensitive*
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Add User</button>
            </form>
        )
    }
}