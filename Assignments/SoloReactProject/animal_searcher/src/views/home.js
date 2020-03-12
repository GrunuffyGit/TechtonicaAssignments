import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header';

export default class Sightings extends React.Component {
    render () {                                   
        return (
            <div id='container'>
                <NaviBar />
                <Header pageTitle = "Home" />
                <div className = "page-content">
                    <h4>Welcome to Animal Tracker!</h4>
                </div>
            </div>
        )
    }
}