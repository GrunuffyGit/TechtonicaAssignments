import React from 'react';
import Home from './Views/Home';
import UserManagement from './Views/UserManagement';
import EventManagement from './Views/EventManagement';
import FindAndSave from './Views/FindAndSaveEvent';
import TicketMaster from './Views/Ticketmaster';
import AccountManagement from './Views/AccountManagement';
import './eventonica.css';
import {BrowserRouter, Route} from 'react-router-dom';

class App extends React.Component {
   render(){
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Home />
            </div>
          )}/>
          <Route exact={true} path='/UserManagement' render={() => (
            <div className="App">
              <UserManagement />
            </div>
          )}/>
          <Route exact={true} path='/EventManagement' render={() => (
            <div className="App">
              <EventManagement />
            </div>
          )}/>
          <Route exact={true} path='/FindAndSave' render={() => (
            <div className="App">
              <FindAndSave />
            </div>
          )}/>
          <Route exact={true} path='/TicketMaster' render={() => (
            <div className="App">
              <TicketMaster />
            </div>
          )}/>
          <Route exact={true} path='/AccountManagement' render={() => (
            <div className="App">
              <AccountManagement />
            </div>
          )}/>
        </div>
      </BrowserRouter>
    );
   }
}

export default App;
