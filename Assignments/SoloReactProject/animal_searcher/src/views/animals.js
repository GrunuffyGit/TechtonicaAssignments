import React from 'react';
import NaviBar from '../components/navibar';
import Header from '../components/header';
import AddAnimal from "../components/addAnimal";
import DeleteAnimal from "../components/deleteAnimal";

export default class Animals extends React.Component {
    state = {
        data:[],
        updateType: ""
    }

    storeChildValue(value, type){
        this.setState({data : this.setupHTMLShowAnimal(value)});
        this.setState({updateType: type});
    }

    setupHTMLShowAnimal(animal){
    //put all elements in user array into HTML
        if(animal.length > 0){
            return animal.map(function(animal){
                return(
                    <ul>Nickname: {animal.nickname}
                        <li key={animal.id}>ID: {animal.id}</li>
                    </ul>
                );
            })
        }
    }

    render () {                                   
        return (
            <div id='container'>
                <NaviBar />
                <Header pageTitle = "Animals" />
                <div className = "page-content row">
                    <div className = "col">
                        <h3>Add Animal</h3>
                        <AddAnimal  sendData={this.storeChildValue.bind(this)}/>
                        <h3>Delete Animal</h3>
                        <DeleteAnimal  sendData={this.storeChildValue.bind(this)}/>
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