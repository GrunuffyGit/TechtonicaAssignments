import React from 'react';

export default class Logout extends React.Component {
    logoutUser(){
    //logging out the user
        localStorage.removeItem("currentUser");
    }

    render(){
        return (
        <div id="logout">
            <h3>Log Out User</h3>
            <form id="user-logout" onSubmit={this.logoutUser}>
                <button type="submit">Log Out</button>
            </form>
        </div>
        )}
}