import React from 'react';
import * as generalFunc from './generalFunc';

export default class Welcome extends React.Component {
    loadHome(currentUser){
        //loading the home page
            if(currentUser.length === 0){//checking if a user is logged in
                return (
                    <div>
                        <h1 id="user-welcome">Create, Customize and Manage Events</h1>
                        <div className="login">
                            <a id="get-started" href="/AccountManagement">Get Started</a>
                        </div>
                    </div>
                );
            }else{//if there is a user logged in
                return(
                    <div>
                        <h1 id="user-welcome">Welcome {currentUser.name}!</h1>
                    </div>
                );
            };
    }
    render () {                                   
        return (
            <div className="welcome">
            {
                this.loadHome(generalFunc.getLocalStorage("currentUser"))
            }
            </div>
        )
    }
}
