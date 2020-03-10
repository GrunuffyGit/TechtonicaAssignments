import React from 'react';
import * as generalFunc from './generalFunc';

export default class DeleteEvents extends React.Component {
    state={
        "eventId":'',
        "errorMsg":''
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    deleteEvent(event){
    //deleting the event from the db and deleting the event from all users that has event saved
        event.preventDefault();//prevent reload on submit
        let eventId = this.state.eventId;//grab event id
        if(eventId.length !== 0){//find if input is not empty
            let eventIDToDeleteURL = "/events/"+eventId;//building url to delete event using event id
            let getEventAllUsersURL = `/users/events/${eventId}`;//build url to search users with event id
            function deleteEventfromAllUsers(json){
            //deleting deleted event from all users
                console.log(json);
                if(json.length !==0){
                    for(let i=0; i<json.length; i++){//looping through all the array of users containing the event
                        let timesRun = i+1;
                        generalFunc.deleteEventFromUser(json[i].name, eventId, timesRun, json.length);//delete or "updating" user's array
                    };
                }else{
                    // window.location.reload();
                }
            };
            fetch(eventIDToDeleteURL,{
                method: "DELETE"
            })
                .then((res) => res.json())
                .then(
                    fetch(getEventAllUsersURL)
                        .then((res) => res.json())
                        .then((result) => deleteEventfromAllUsers(result))
                );
        }else{
           this.setState({"errorMsg":"Please fill out all field(s)!"});
        };
    }

    render(){
        return(
            <form id="delete-event" onSubmit={this.deleteEvent.bind(this)}>
                <label>Event ID:</label>
                <input type="text" id="eventId" onChange={this.storeInputValue.bind(this)}></input>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Delete Event</button>
            </form>
        )
    }
}