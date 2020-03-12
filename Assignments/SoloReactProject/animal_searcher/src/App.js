import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from './views/home';
import Animals from './views/animals';
import Species from './views/species';
import Sightings from './views/sightings';

function App() {
  return (
    <BrowserRouter>
      <Route exact={true} path='/' render={() => (
              <div className="App">
                <Home />
              </div>
            )}/>
      <Route exact={true} path='/Animals' render={() => (
            <div className="App">
              <Animals />
            </div>
          )}/>
      <Route exact={true} path='/Species' render={() => (
            <div className="App">
              <Species />
            </div>
          )}/>
      <Route exact={true} path='/Sightings' render={() => (
            <div className="App">
              <Sightings />
            </div>
          )}/>
    </BrowserRouter>
    
  );
}

export default App;
