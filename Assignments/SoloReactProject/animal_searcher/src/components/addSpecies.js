import React from 'react';

export default class AddSpecies extends React.Component {
    state={
        common_name :'',
        scientific_name :'',
        population: '',
        status_code: '',
        errorMsg :''
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    addSpecies(event){
        event.preventDefault();
        let common_name = this.state.common_name.toUpperCase();
        let scientific_name = this.state.scientific_name.toUpperCase();
        let population = parseInt(this.state.population);
        let status_code = this.state.status_code;
        let date = new Date();
        if(common_name.length !== 0 || population || scientific_name.length !== 0 || status_code.length !== 0){
            if(status_code.length <= 2){
                this.setState({errorMsg : ""});
                let speciesBody = {
                    "common_name" : common_name,
                    "scientific_name" : scientific_name,
                    "population" : population,
                    "status_code" : status_code,
                    "created" : date
                    }
                const request = async() => {
                    const saveSpeciesCall = await fetch(`/species`,{
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(speciesBody)
                    })
                    const saveSpeciesCallJSON = await saveSpeciesCall.json();
                    this.props.sendData(saveSpeciesCallJSON, "Entry Created: ");
                }
                request();
            }else{
                this.setState({errorMsg : "Status code can only be 2 Letters."});
            }
        }else{
            this.setState({errorMsg : "Please fill out everything."});
        }

    }

    render(){
        return(
            <form onSubmit={this.addSpecies.bind(this)}>
                <label>Common Name: </label>
                <input type="text" id="common_name" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <label>Scientific Name: </label>
                <input type="text" id="scientific_name" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <label>Population: </label>
                <input type="text" id="population" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <label>Endangered Code</label>
                <input type="text" id="status_code" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Add Species</button>
            </form>
        )
    }
}