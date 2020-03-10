import React from 'react';
import * as generalFunc from './generalFunc';

export default class DisplayResult extends React.Component {
    state = {
        data:[]
    }

    showAllEvents(URL){
    //show all events on html
    // callDB_API("GET", URL, setupHTMLShowAllEvents, location);
        fetch(URL)
            .then((res) => res.json())
            .then((result) => this.setState({data:this.setupHTMLShowAllEvents(result)}));
    }

    setupHTMLShowAllEvents(array){
    //put all elements in event array into HTML
        if(typeof array[0].events !== "undefined"){//for nested events (when calling for user events)
            if(array[0].events.length !== 0 ){//make sure there is something in array
                return array[0].events.map(function(event) {//looping through array
                    let date = generalFunc.formatTime(event.time);
                    // html += `<li class="list-of-events">${event.name}<ul class="event-info"><li>Event Id: ${event.id}</li><li>Category: ${event.category}</li><li>Date: ${date.month}/${date.day}/${date.year}</li></ul></li><br>`;
                    return (
                        <li key={event.id} className="list-of-events">{event.name}
                            <ul className="event-info">
                                <li>Event Id: {event.id}</li>
                                <li>Category: {event.category}</li>
                                <li>Date: {date.month}/{date.day}/{date.year}</li>
                            </ul>
                        </li>
                    );
                });
            }else{//if there's nothing in array
                return (<li className="list-of-events">There are no events currently.</li>);
            };
        }else{//calling general events
            return array.map(function(event) {//looping through array
                let date = generalFunc.formatTime(event.time);
                return (
                    <li key={event.id} className="list-of-events">{event.name}
                        <ul className="event-info">
                            <li>Event Id: {event.id}</li>
                            <li>Category: {event.category}</li>
                            <li>Date: {date.month}/{date.day}/{date.year}</li>
                        </ul>
                    </li>
                );
            });
        };
    }

    setupHTMLShowAllUsers(array){
    //put all elements in user array into HTML
        if(array.length > 0){
            return array.map(function(user) {//looping through array
                return (
                    <li key={user.id}>{user.name}</li>
                );
            });
        }else{
            return(<li>There are no users currently.</li>);
        }
        
    }
    
    showAllUsers(){
    //show all users on html
        fetch("/users")
            .then((res) => res.json())
            .then((result) => this.setState({data:this.setupHTMLShowAllUsers(result)}));
    }

    displayResults(){
        if(this.props.typeOfDisplay === "currentUserEvents"){
            let currentUser = generalFunc.getLocalStorage("currentUser");
            let userEventsURL = `/users/${currentUser.name}/events`;//find all events belonging to the the user in the db
            this.showAllEvents(userEventsURL);
        }else if(this.props.typeOfDisplay === "allUsers")
        {
            this.showAllUsers();
        }
        else if(this.props.typeOfDisplay === "allEvents"){
            this.showAllEvents("/events");
        }
        
    }

    componentWillMount(){
        this.displayResults();
    }


    render(){
        return(
            <div className="col col1">
                <h4>{this.props.listName}</h4>
                <ul id="search-results-tm">{this.state.data}</ul>
            </div>
        )
    }
}