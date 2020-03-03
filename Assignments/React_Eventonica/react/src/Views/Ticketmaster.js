import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header'

export default class TicketMaster extends React.Component {
  state = { 
    "pageTitle":"Ticket Master"
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