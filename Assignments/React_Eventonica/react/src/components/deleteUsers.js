import React from 'react';

export default class DeleteUsers extends React.Component {
    state={
        "username":'',
        "errorMsg":''
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    deleteUsers(event){
    //deleting users from db
    //searching db for userid and calling db to delete user with id
        event.preventDefault();//prevent reload on submit
        let userName = this.state.username.toUpperCase();//grabbing UN to delete from input
        if(userName.length !==0){//prevent empty input
            function deleteUserWithId(json){
            //deleting user after finding user id
                let userIDToDeleteURL = "/users/"+json[0].id;//building url to delete user using user id
                console.log(userIDToDeleteURL);
                fetch(userIDToDeleteURL,{
                    method: "DELETE"
                })
                    .then((res) => res.json())
                    .then(window.location.reload());
            };
            let findUserURL = "/users/"+userName;//building url to search for user using username
            fetch(findUserURL)
                .then((res) => res.json())
                .then((result) => deleteUserWithId(result))
        }else{
            this.setState({"errorMsg":"Please fill out all field(s)!"});
        };
    }

    render(){
        return(
            <form id="delete-user" onSubmit={this.deleteUsers.bind(this)}>
                <label>User Name:</label>
                <input type="text" id="username" onChange={this.storeInputValue.bind(this)}></input>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Delete User</button>
            </form>
        )
    }
}