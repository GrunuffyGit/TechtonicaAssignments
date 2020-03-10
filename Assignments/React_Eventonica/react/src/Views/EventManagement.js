import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header';
import DisplayResult from '../components/displayResults';
import AddEvents from '../components/addEvents';
import DeleteEvents from '../components/deleteEvents'

export default class EventManagement extends React.Component {
  state = {
    "pageTitle":"Event Management" 
  }
  render () {                                   
    return (
      <div id='container'>
        <NaviBar />
        <Header pageTitle={this.state.pageTitle} />
        <div className="page-content row">
          <DisplayResult listName={"All Events"} typeOfDisplay={"allEvents"}/>
          <div className="col">
              <h3>Add Event</h3>
              <AddEvents />
              <h3>Delete Event</h3>
              <DeleteEvents />
          </div>
        </div>
      </div>
    )
  }
}