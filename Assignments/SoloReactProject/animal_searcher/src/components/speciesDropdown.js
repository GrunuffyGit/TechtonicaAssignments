import React from 'react';

export default class SpeciesDropDown extends React.Component {
    state = {
        options : []
    }

    storeInputValue(event){
        this.props.sendData(event.target.value);
    }

    getListOfSpecies(){
        const request = async() => {
            const response = await fetch(`/species`);
            const json = await response.json();
            this.setState({options:this.speciesOptionHTML(json)});
            this.setState({optionsVal : json[0].id});
            console.log(json[0].id);
        }
        request();
    }

    speciesOptionHTML(array){
        if(array.length !== 0){
            this.setState({optionsVal : array[0].id});
            this.props.sendData(this.state.optionsVal);
            return array.map(function(species) {
                return (
                    <option key={species.id} value={species.id}>{species.common_name}</option>
                );
            });
        } 
    }

    componentWillMount(){
        this.getListOfSpecies();
    }

    render(){
        return(
            <select onChange={this.storeInputValue.bind(this)}>
                {this.state.options}
            </select>
        )
    }
}