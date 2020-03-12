import React from 'react';
import SpeciesDropDown from '../components/speciesDropdown';

export default class AddAnimal extends React.Component {
    state={
        nickname :'',
        species :'',
        errorMsg :''
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    storeChildValue(value){
        this.setState({species : value});
    }

    addAnimal(event){
        event.preventDefault();
        let nickname = this.state.nickname.toUpperCase();
        let species = parseInt(this.state.species);
        let date = new Date();
        if(nickname.length !== 0){
            if(this.state.species.length !== 0){
                this.setState({errorMsg : ""});
                console.log(nickname, species, date);
                let animalBody = {
                    "nickname": nickname,
                    "species": species,
                    "created" : date
                    }
                const request = async() => {
                    const saveAnimalCall = await fetch(`/individual`,{
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(animalBody)
                    })
                    const saveAnimalCallJSON = await saveAnimalCall.json();
                    this.props.sendData(saveAnimalCallJSON, "Entry Created: ");
                }
                request();
            }else{
                this.setState({errorMsg : "Please select a species."});
            }
        }else{
            this.setState({errorMsg : "Please give a nickname."});
        }

    }

    render(){
        return(
            <form onSubmit={this.addAnimal.bind(this)}>
                <label>Nickname:</label>
                <input type="text" id="nickname" onChange={this.storeInputValue.bind(this)}></input>
                <br/>
                <label>Species:</label>
                <SpeciesDropDown sendData={this.storeChildValue.bind(this)}/>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Add Animal</button>
            </form>
        )
    }
}