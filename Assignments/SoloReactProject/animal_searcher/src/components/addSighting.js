import React from 'react';
import SpeciesDropDown from "../components/speciesDropdown";
import AnimalDropDown from "../components/animalDropDown";

export default class AddSighting extends React.Component {
    state={
        speciesID:'',
        individual:'',
        location :'',
        health: '',
        poc: '',
        date_spotted: '',
        errorMsg :''
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    storeSpeciesIDValue(value){
        this.setState({speciesID : value});
    }

    storeAnimalIDValue(value){
        this.setState({individual : value});
    }

    addSighting(event){
        event.preventDefault();
        let individual = parseInt(this.state.individual);
        let location = this.state.location;
        let health = this.state.health;
        let poc = this.state.poc;
        let date_spotted = this.state.date_spotted;
        if(location.length !== 0 || individual || health.length !== 0 || poc.length !== 0 || date_spotted.length !== 0){
            this.setState({errorMsg : ""});
            let sightingBody = {
                "individual" : individual,
                "location" : location,
                "health" : health,
                "poc": poc,
                "date_spotted": date_spotted
                }
            const request = async() => {
                const saveSpeciesCall = await fetch(`/sighting`,{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(sightingBody)
                })
                const saveSpeciesCallJSON = await saveSpeciesCall.json();
                this.props.sendData(saveSpeciesCallJSON, "Entry Created: ");
            }
            request();
        }else{
            this.setState({errorMsg : "Please fill out everything."});
        }

    }

    render(){
        return(
            <form onSubmit={this.addSighting.bind(this)}>
                <label>Species: </label>
                <SpeciesDropDown sendData={this.storeSpeciesIDValue.bind(this)}/>
                <label>Animal ID: </label>
                <AnimalDropDown sendData={this.storeAnimalIDValue.bind(this)} speciesID={this.state.speciesID}/>
                <br/>
                <label>Location: </label>
                <input type="text" id="location" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <label>Health: </label>
                <input type="text" id="health" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <label>Point of Contact</label>
                <input type="text" id="poc" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <label>Date Spotted</label>
                <input type="date" id="date_spotted" onChange={this.storeInputValue.bind(this)}></input>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Add Sighting</button>
            </form>
        )
    }
}