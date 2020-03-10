import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header';
import DisplayResult from '../components/displayResults';
import AddUsers from "../components/addUsers";
import DeleteUsers from "../components/deleteUsers";

export default class UserManagement extends React.Component {
  state = { 
    "pageTitle":"User Management"
  }
  render () {                                   
    return (
      <div id='container'>
        <NaviBar />
        <Header pageTitle={this.state.pageTitle} />
        <div className="page-content row">
          <DisplayResult listName={"All Users"} typeOfDisplay={"allUsers"}/>
          <div className="col">
              <h3>Add User</h3>
              <AddUsers />
              <h3>Delete User</h3>
              <DeleteUsers />
          </div>
      </div>
      </div>
    )
  }
}