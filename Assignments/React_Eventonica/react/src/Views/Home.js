import React from 'react';
import Welcome from '../components/welcome';
import NaviBar from '../components/navibar';

export default class Home extends React.Component {
  getLocalStorage(string){
    //getting local storage
        if(localStorage.getItem(string) !== null){//if local storage is not null
            return JSON.parse(localStorage.getItem(string));//returning obj array of local stoarage (JSON.parse is to turn local storage back into JSON because local storage stores it as a string)
        }else {//if local storage is empty
            return [];//return an empty array
        };
  }

  loadNavBar(currentUser){
    if(currentUser.length === 0){//checking if a user is logged in
      return <a className="navbar-brand login logo">Eventonica</a>;
    }else{//if there is a user logged in
      return <NaviBar />;
    };
  }
  render () {                                   
    return (
      <div id='container' className="homepage">
        {this.loadNavBar(this.getLocalStorage("currentUser"))}  
        <Welcome />
      </div>
    )
  }
}
