import React from 'react';
import * as generalFunc from './generalFunc';

export default class SaveTMEventToUsers extends React.Component {
    state={
        username:"",
        eventId:"",
        errorMsg:"",
        data:[]
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    addTMEventToUser(event){
    //show all events on html
    // callDB_API("GET", URL, setupHTMLShowAllEvents, location);
        event.preventDefault();//prevent reload on submit
        let username = this.state.username.toUpperCase();
        let eventId = this.state.eventId;
        const request = async() => {
            const findUser = await fetch(`/users/${username}`);
            const findUserJson = await findUser.json();
            const findEvent = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?&id=${eventId}&countryCode=US&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`);
            const findEventJson = await findEvent.json();
            if(findUserJson.length !== 0){
                if(findEventJson.length !==0){
                    if(findUserJson[0].events.findIndex((event) => event.id === findEventJson._embedded.events[0].id) === -1){
                        let eventArray = findUserJson[0].events;
                        let TMEventObj ={
                            "id": findEventJson._embedded.events[0].id,
                            "name": findEventJson._embedded.events[0].name,
                            "category" : findEventJson._embedded.events[0].classifications[0].genre.name,
                            "time": new Date (findEventJson._embedded.events[0].dates.start.localDate)
                        }
                        eventArray.push(TMEventObj);
                        let eventArrayObj ={
                            "events": eventArray
                        }
                        const saveEventToUser = await fetch(`/users/${findUserJson[0].id}`,{
                            method: "PUT",
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(eventArrayObj)
                        })
                        const saveEventToUserJson = await saveEventToUser.json();
                        this.setState({data:this.setupHTMLShowAllUserEvents(saveEventToUserJson)});
                        this.props.sendData(this.state.data);
                        this.setState({errorMsg : "User events updated to below: "});
                    }else{
                        this.setState({errorMsg : "User already has this event! Look below:"});
                        this.setState({data:this.setupHTMLShowAllUserEvents(findUserJson)});
                        this.props.sendData(this.state.data);
                    }
                }else{
                    this.setState({errorMsg : "Event Id doesn't exist!"});
                }
            }else{
                this.setState({errorMsg : "User doesn't exist!"});
            }
        }
        request();
    }

    setupHTMLShowAllUserEvents(array){
    //put all elements in event array into HTML
        if(array[0].events.length !== 0 ){//make sure there is something in array
          return array[0].events.map(function(event) {//looping through array
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
        }else{//if there's nothing in array
          return (<li className="list-of-events">There are no events currently.</li>);
        };    
    }
    
    render(){
        return(
            <form id="save-user-event" onSubmit={this.addTMEventToUser.bind(this)}>
                <label>User Name:</label>
                <input type="text" id="username" onChange={this.storeInputValue.bind(this)}></input>
                <br></br>
                <label>Event ID:</label>
                <input type="text" id="eventId" onChange={this.storeInputValue.bind(this)}></input>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Save Event</button>
            </form>
        )
    }
}
