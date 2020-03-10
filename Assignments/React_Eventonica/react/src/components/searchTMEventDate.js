import React from 'react';
import * as generalFunc from './generalFunc';

export default class SearchTMDate extends React.Component {
    state={
        date:"",
        data:[]
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    SearchDate(event){
    //show all events on html
    // callDB_API("GET", URL, setupHTMLShowAllEvents, location);
        event.preventDefault();//prevent reload on submit
        let date = new Date(this.state.date).toISOString();
        date = date.slice(0,date.length-5)+date.slice(date.length-1);
        const request = async() => {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?&startDateTime=${date}&countryCode=US&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`);
            const json = await response.json();
            this.setState({data:this.setupHTMLShowAllEvents(json._embedded.events)});
            this.props.sendData(this.state.data);
        }
        request();
    }

    setupHTMLShowAllEvents(array){
    //put all elements in event array into HTML
        if(array.length !== 0){
            return array.map(function(event) {//looping through array
                let date = generalFunc.formatTime(event.dates.start.localDate);
                return (
                    <li key={event.id} className="list-of-events">{event.name}
                        <ul className="event-info">
                            <li>Event Id: {event.id}</li>
                            <li>Category: {event.classifications[0].genre.name}</li>
                            <li>Date: {date.month}/{date.day}/{date.year}</li>
                        </ul>
                    </li>
                );
            });
        }else{
            return (<li className="list-of-events">There are no events currently.</li>);
        }        
    }
    
    render(){
        return(
            <form id="date-search" onSubmit={this.SearchDate.bind(this)}>
                    <label>Event date:</label>
                    <input type="date" id="date" onChange={this.storeInputValue.bind(this)}></input>
                    <div id="errorMsg"></div>
                    <button type="submit">Search Dates</button>
            </form>
        )
    }
}
