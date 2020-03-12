import React from 'react';

export default class AnimalDropDown extends React.Component {
    state = {
        options : [],
        optionsVal: ''
    }

    storeInputValue(event){
        this.props.sendData(event.target.value);
    }

    getListOfAnimalsInSpecies(ID){
        console.log(ID);
        if(ID){
            const request = async() => {
                const response = await fetch(`/individual/species/${ID}`);
                const json = await response.json();
                if(json.length>0){
                    this.setState({options:this.animalsInSpeciesOptionHTML(json)});
                    this.setState({optionsVal : json[0].id});
                }else{
                    this.setState({options : []});
                }
            }
            request();
        }
        
    }

    animalsInSpeciesOptionHTML(array){
        if(array.length !== 0){
            this.setState({optionsVal : array[0].id});
            this.props.sendData(this.state.optionsVal);
            return array.map(function(animal) {
                return (
                    <option key={animal.id} value={animal.id}>{animal.nickname}</option>
                );
            });
        } 
    }

    componentDidUpdate(prevProps){
        if(this.props.speciesID !== prevProps.speciesID){
            this.getListOfAnimalsInSpecies(this.props.speciesID);
        }
    }

    render(){
        return(
            <select onChange={this.storeInputValue.bind(this)}>
                {this.state.options}
            </select>
        )
    }
}