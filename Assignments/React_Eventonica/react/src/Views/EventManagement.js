import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header';

export default class EventManagement extends React.Component {
  state = {
    "pageTitle":"Event Management" 
  }
  render () {                                   
    return (
      <div id='container'>
        <NaviBar />
        <Header pageTitle={this.state.pageTitle} />
      </div>
    )
  }
}