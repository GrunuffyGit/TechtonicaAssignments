import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header'

export default class FindAndSave extends React.Component {
  state = { 
    "pageTitle":"User Events"
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