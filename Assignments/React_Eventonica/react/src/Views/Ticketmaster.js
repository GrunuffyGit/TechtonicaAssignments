import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header';
import SearchResultDisplay from '../components/searchResultDisplay'
import SearchTMDate from '../components/searchTMEventDate';
import SearchTMKeyword from '../components/searchTMEventKeyword';
import SaveTMEventToUsers from '../components/saveTMEventToUser';

export default class TicketMaster extends React.Component {
  state = { 
    "pageTitle":"Ticket Master",
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
                <SearchTMDate sendData={this.storeSearchChildValue.bind(this)}/>
            </div>
            <br></br>
            <div>
                <h3>Find Events by Keyword</h3>
                <SearchTMKeyword sendData={this.storeSearchChildValue.bind(this)}/>
            </div>
            <br></br>
            <div>
                <h3>Save Event for User</h3>
                <SaveTMEventToUsers sendData={this.storeUserResultChildValue.bind(this)}/>
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