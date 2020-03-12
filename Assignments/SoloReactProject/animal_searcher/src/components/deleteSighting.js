import React from 'react';

export default class DeleteSightings extends React.Component {
    state={
        id :'',
        errorMsg :''
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    deleteSighting(event){
        event.preventDefault();
        let id = parseInt(this.state.id);
        if(id){
            this.setState({errorMsg : ""});
            const request = async() => {
                const deleteSightingCall = await fetch(`/sighting/${id}`,{
                    method: "DELETE"
                })
                const deleteSightingCallJSON = await deleteSightingCall.json();
                this.props.sendData(deleteSightingCallJSON, "Entry Deleted: ");
            }
            request();
        }else{
            this.setState({errorMsg : "Please give an ID."});
        }

    }

    render(){
        return(
            <form onSubmit={this.deleteSighting.bind(this)}>
                <label>Sighting ID: </label>
                <input type="text" id="id" onChange={this.storeInputValue.bind(this)}></input>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Delete Sighting</button>
            </form>
        )
    }
}