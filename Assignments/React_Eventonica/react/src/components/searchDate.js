import React from 'react';
import * as generalFunc from './generalFunc';

export default class SearchDate extends React.Component {
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
        console.log(this.state.date);
        console.log(`/events/date/${this.state.date}`);
        const request = async() => {
            const response = await fetch(`/events/date/${this.state.date}`);
            const json = await response.json();
            this.setState({data:this.setupHTMLShowAllEvents(json)});
            this.props.sendData(this.state.data);
        }
        request();
    }

    setupHTMLShowAllEvents(array){
    //put all elements in event array into HTML
        if(array.length !== 0){
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
