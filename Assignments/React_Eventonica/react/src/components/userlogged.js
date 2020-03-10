import React from 'react';
import Login from './login';
import DisplayResult from './displayResults';
import Logout from './logout';
import DeleteUserEvent from './deleteUserEvent';
import * as generalFunc from './generalFunc';

export default class UserLog extends React.Component {

    hasEvents(currentUser){
        if(currentUser.events.length>0){
            return(
                <div className="manage-user-events">
                    <h3>Delete User Event's</h3>
                    <DeleteUserEvent />
                </div>
            );
        };
    }

    isUserLogged(){
        let currentUser = generalFunc.getLocalStorage("currentUser");
        if(currentUser.length === 0){
            return(
            <div className="row">
                <Login />
            </div>);
        }else{
            const request = async() => {
                const response = await fetch(`/users/${currentUser.name}`);
                const json = await response.json();
                let userData = {//grabbing data from json to form a userobj
                    "name": json[0].name,
                    "events": json[0].events
                }
                generalFunc.setLocalStorage("currentUser",userData);//adding userobj to local storage as current user
                
            }
            request();
            return (
                <div className="row">
                    <DisplayResult listName={currentUser.name} typeOfDisplay={"currentUserEvents"}/>
                    <div className="col">
                        {this.hasEvents(currentUser)}
                        <br></br>
                        <Logout />
                    </div>
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                {this.isUserLogged()}
            </div>            
        )
    }
}