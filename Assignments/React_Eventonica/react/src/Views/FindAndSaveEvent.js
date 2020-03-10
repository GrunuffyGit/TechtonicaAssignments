import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header';
import SearchResultDisplay from '../components/searchResultDisplay';
import SearchDate from "../components/searchDate";
import SearchCategory from '../components/searchCategory';
import SaveEventToUsers from '../components/saveEventToUsers';

export default class FindAndSave extends React.Component {
  state = { 
    "pageTitle":"Find and Save Events to Users",
    data:[],
    userData:[]
  }

  storeSearchChildValue(dataArray){
    this.setState({data : dataArray});
  }

  storeUserResultChildValue(dataArray){
    this.setState({userData : dataArray});
  }

  render () {                                   
    return (
      <div id='container'>
        <NaviBar />
        <Header pageTitle={this.state.pageTitle} />
        <div className="page-content row">
          <SearchResultDisplay listName="Seach Results" data={this.state.data} />
          <div className="col">
            <div>
                <h3>Find Events by Date</h3>
                <SearchDate sendData={this.storeSearchChildValue.bind(this)}/>
            </div>
            <br></br>
            <div>
                <h3>Find Events by Category</h3>
                <SearchCategory sendData={this.storeSearchChildValue.bind(this)}/>
            </div>
            <br></br>
            <div>
                <h3>Save Event for User</h3>
                <SaveEventToUsers sendData={this.storeUserResultChildValue.bind(this)}/>
                <br></br>
                <h4>User Events:</h4>
                <ul id="user-saved-events">{this.state.userData}</ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}