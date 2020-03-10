import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header';
import UserLog from '../components/userlogged';

export default class AccountManagement extends React.Component {
  state = { 
    "pageTitle": "Account Management"
  }
  
  render () {
    return (
      <div id='container'>
        <NaviBar />
        <Header pageTitle={this.state.pageTitle} />
        <div className="page-content">
          <UserLog />
        </div>
      </div>
    )
  }
}