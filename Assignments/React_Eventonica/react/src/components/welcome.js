import React from 'react';
import NaviBar from '../components/navibar';

export default class Welcome extends React.Component {
    getLocalStorage(string){
        //getting local storage
            if(localStorage.getItem(string) !== null){//if local storage is not null
                return JSON.parse(localStorage.getItem(string));//returning obj array of local stoarage (JSON.parse is to turn local storage back into JSON because local storage stores it as a string)
            }else {//if local storage is empty
                return [];//return an empty array
            };
    }
    loadHome(currentUser){
        //loading the home page
            if(currentUser.length === 0){//checking if a user is logged in
                return (
                    <div>
                        <h1 id="user-welcome">Create, Customize and Manage Events</h1>
                        <div class="login">
                            <a id="get-started" href="/AccountManagement">Get Started</a>
                        </div>
                    </div>
                );
            }else{//if there is a user logged in
                return(
                    <div>
                        <NaviBar />
                        <h1 id="user-welcome">Welcome {currentUser.name}!</h1>
                    </div>
                );
            };
    }
    render () {                                   
        return (
            <div class="welcome">
            {
                this.loadHome(this.getLocalStorage("currentuser"))
            }
            </div>
        )
    }
}
