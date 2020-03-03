import React from 'react';
import Login from './login';
import DisplayResult from './displayResults';

export default class Login extends React.Component {
    state = {
        "loggedIn": false
    };
    
    isUserLogged(){
        if(this.state.loggedIn === false){
            return(<Login />);
        }else{
            return (<DisplayResult />);
        }
    }

    render(){
        return(
            this.isUserLogged
        )
    }
}