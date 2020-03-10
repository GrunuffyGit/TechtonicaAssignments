import React from 'react';

export default class AddEvents extends React.Component {
    state={
        "name":'',
        "category":'',
        "time":'',
        "errorMsg":''
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    addEvents(event){
    //adding event to the db
    //searching if event name already exists in the db and saving the event to db if it doesn't
        event.preventDefault(); //prevent reload on submit
        let eventName = this.state.name.toUpperCase();//grab event name
        let eventCategory = this.state.category.toUpperCase();//grab category
        let eventTime = this.state.time;//grab event date
        if(eventName.length !== 0 && eventCategory.length !== 0 && eventTime !== 0){ //find if there's no empty inputs
            let eventObj = {//eventobj to pass as body in callback func
                "name": eventName,
                "category": eventCategory,
                "time": eventTime
            };
            let findEventURL = "/events/" + eventName;//building url to seach db for event
            fetch(findEventURL)
                .then((res) => res.json())
                .then((result) => {
                    this.findEventDuplication.bind(this);
                    this.findEventDuplication(result, eventObj);
                });
        }else{
            this.setState({"errorMsg":"Please fill out all field(s)!"});
        };
    }

    findEventDuplication(dataJson, eventObj){
    //find event name dplication
        if(dataJson.length !== 0){ //find if event already exists or not
            this.setState({"errorMsg":"Event name already exists. Please choose another."});
        }else{
            fetch("/events",{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(eventObj)
            })
                .then((res) => res.json())
                .then(window.location.reload());
        };
    };    

    render(){
        return(
            <form id="add-event" onSubmit={this.addEvents.bind(this)}>
                <label>Event Name:</label>
                <input type="text" id="name" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <label>Event Category:</label>
                <input type="text" id="category" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <label>Event Date:</label>
                <input type="date" id="time" onChange={this.storeInputValue.bind(this)}></input>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Add Event</button>
            </form>
            )
    }
}