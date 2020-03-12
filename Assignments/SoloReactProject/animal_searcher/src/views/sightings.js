import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header';
import AddSightings from "../components/addSighting";
import DeleteSightings from "../components/deleteSighting";

export default class Sightings extends React.Component {
    state = {
        data:[],
        updateType: ""
    }

    storeChildValue(value, type){
        this.setState({data : this.setupHTMLShowSpecies(value)});
        this.setState({updateType: type});
    }

    setupHTMLShowSpecies(sightings){
    //put all elements in user array into HTML
        if(sightings.length > 0){
            return sightings.map(function(sightings){
                return(
                    <ul>Sighting:
                        <li key={sightings.id}>Sighting ID: {sightings.id}</li>
                        <li key={sightings.individual}>Animal ID spotted: {sightings.individual}</li>
                        <li key={sightings.date_spotted}>Date Spotted: {sightings.date_spotted}</li>
                        <li key={sightings.location}>Location: {sightings.location}</li>
                        <li key={sightings.health}>Health: {sightings.health}</li>
                        <li key={sightings.poc}>Point of Contact: {sightings.poc}</li>
                    </ul>
                );
            })
        }
    }

    render () {                                   
        return (
            <div id='container'>
                <NaviBar />
                <Header pageTitle = "Sightings" />
                <div className = "page-content row">
                    <div className = "col">
                        <h3>Add Sightings</h3>
                        <AddSightings  sendData={this.storeChildValue.bind(this)}/>
                        <h3>Delete Sightings</h3>
                        <DeleteSightings  sendData={this.storeChildValue.bind(this)}/>
                    </div>
                    <div className="col col1">
                        <h4>{this.state.updateType}</h4>
                        {this.state.data}
                    </div>
                </div>
            </div>
        )
    }
}