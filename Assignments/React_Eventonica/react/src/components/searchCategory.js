import React from 'react';
import * as generalFunc from './generalFunc';

export default class SearchDate extends React.Component {
    state={
        category:"",
        data:[]
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    searchCategory(event){
    //show all events on html
    // callDB_API("GET", URL, setupHTMLShowAllEvents, location);
        event.preventDefault();//prevent reload on submit
        let category = this.state.category.toUpperCase();
        console.log(`/events/date/${category}`);
        const request = async() => {
            const response = await fetch(`/events/category/${category}`);
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
            <form id="category-search" onSubmit={this.searchCategory.bind(this)}>
                <label>Event category:</label>
                <input type="text" id="category" onChange={this.storeInputValue.bind(this)}></input>
                <div id="errorMsg"></div>
                <button type="submit">Search Category</button>
            </form>
        )
    }
}
