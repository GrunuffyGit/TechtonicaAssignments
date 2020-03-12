import React from 'react';

export default class NaviBar extends React.Component {
    render(){
        return(
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark manage-user-events">
                <a className="navbar-brand" href="/">Animal Tracker </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar1">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Species">Species</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Animals">Animals</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Sightings" >Sightings</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}