import React from 'react';

export default class DeleteSpecies extends React.Component {
    state={
        id :'',
        errorMsg :''
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    deleteSpecies(event){
        event.preventDefault();
        let id = parseInt(this.state.id);
        if(id){
            this.setState({errorMsg : ""});
            const request = async() => {
                const deleteSpeciesCall = await fetch(`/species/${id}`,{
                    method: "DELETE"
                })
                const deleteSpeciesCallJSON = await deleteSpeciesCall.json();
                this.props.sendData(deleteSpeciesCallJSON, "Entry Deleted: ");
            }
            request();
        }else{
            this.setState({errorMsg : "Please give an ID."});
        }

    }

    render(){
        return(
            <form onSubmit={this.deleteSpecies.bind(this)}>
                <label>Species ID: </label>
                <input type="text" id="id" onChange={this.storeInputValue.bind(this)}></input>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Delete Species</button>
            </form>
        )
    }
}