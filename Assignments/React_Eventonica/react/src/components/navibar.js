import React from 'react';

export default class NaviBar extends React.Component {
    render(){
        return(
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark manage-user-events">
                <a className="navbar-brand" href="/">Eventonica</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar1">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/UserManagement">User Management</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/EventManagement">Event Management</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/FindAndSave" >User Events</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/TicketMaster" >Ticket Master Events</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/AccountManagement">User Account</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}