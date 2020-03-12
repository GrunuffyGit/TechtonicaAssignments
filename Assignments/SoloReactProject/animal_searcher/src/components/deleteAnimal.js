import React from 'react';

export default class DeleteAnimal extends React.Component {
    state={
        id :'',
        errorMsg :''
    }

    storeInputValue(event){
        let target = event.target;
        this.setState({[target.id] : target.value});
    }

    deleteAnimal(event){
        event.preventDefault();
        let id = parseInt(this.state.id);
        if(id){
            this.setState({errorMsg : ""});
            const request = async() => {
                const deleteAnimalCall = await fetch(`/individual/${id}`,{
                    method: "DELETE"
                })
                const deleteAnimalCallJSON = await deleteAnimalCall.json();
                this.props.sendData(deleteAnimalCallJSON, "Entry Deleted: ");
            }
            request();
        }else{
            this.setState({errorMsg : "Please give an ID."});
        }

    }

    render(){
        return(
            <form onSubmit={this.deleteAnimal.bind(this)}>
                <label>Animal ID:</label>
                <input type="text" id="id" onChange={this.storeInputValue.bind(this)}></input>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <button type="submit">Delete Animal</button>
            </form>
        )
    }
}