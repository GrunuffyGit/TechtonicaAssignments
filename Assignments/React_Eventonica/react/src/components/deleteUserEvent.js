import React from 'react';
import * as generalFunc from './generalFunc';

export default class DeleteUserEvent extends React.Component {
    state = {
        "eventId":'',
        "errorMsg":''
    };

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    deleteCurrentUserEvent(event){
    //deleting event from current user and updating the db
        event.preventDefault();//prevent reload on submit
        let currentUser = generalFunc.getLocalStorage("currentUser");
        let eventId = this.state.eventId;
        generalFunc.deleteEventFromUser(currentUser.name, eventId);//delete current's user event in db
    }

    render(){
        return (
            <form id="delete-user-event" onSubmit={this.deleteCurrentUserEvent.bind(this)}>
                <label>Event ID:</label>
                <input type="text" id="eventId" onChange={this.storeInputValue.bind(this)}></input>
                <div id="delete-user-errorMsg"></div>
                <button type="submit">Delete Event</button>
            </form>
        )}
}