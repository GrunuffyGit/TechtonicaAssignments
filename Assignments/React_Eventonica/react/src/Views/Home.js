import React from 'react';
import Welcome from '../components/welcome';

export default class Home extends React.Component {
  state = { 
  }
  render () {                                   
    return (
      <div id='container' className="homepage">
        <a class="navbar-brand login logo">Eventonica</a>
        <Welcome />
      </div>
    )
  }
}
