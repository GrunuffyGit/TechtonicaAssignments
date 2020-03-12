import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header';
import AddSpecies from "../components/addSpecies";
import DeleteSpecies from "../components/deleteSpecies";

export default class Species extends React.Component {
    state = {
        data:[],
        updateType: ""
    }

    storeChildValue(value, type){
        this.setState({data : this.setupHTMLShowSpecies(value)});
        this.setState({updateType: type});
    }

    setupHTMLShowSpecies(species){
    //put all elements in user array into HTML
        if(species.length > 0){
            return species.map(function(species){
                return(
                    <ul>Species: {species.common_name}
                        <li key={species.id}>ID: {species.id}</li>
                        <li key={species.scientific_name}>Scientific Name: {species.scientific_name}</li>
                        <li key={species.population}>Population Size: {species.population}</li>
                        <li key={species.status_code}>Endangered Code: {species.status_code}</li>
                    </ul>
                );
            })
        }
    }

    render () {                                   
        return (
            <div id='container'>
                <NaviBar />
                <Header pageTitle = "Species" />
                <div className = "page-content row">
                    <div className = "col">
                        <h3>Add Species</h3>
                        <AddSpecies  sendData={this.storeChildValue.bind(this)}/>
                        <h3>Delete Species</h3>
                        <DeleteSpecies  sendData={this.storeChildValue.bind(this)}/>
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