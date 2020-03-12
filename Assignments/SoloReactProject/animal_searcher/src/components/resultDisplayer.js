import React from 'react';

export default class ResultDisplay extends React.Component {
    // setupHTMLShowAnimal(animal){
    // //put all elements in user array into HTML
    //     if(animal.length > 0){
    //         return (
    //             <ul>Nickname: {animal.nickname}
    //                 <li>ID: {animal.id}</li>
    //                 <li>Common Name: {animal.common_name}</li>
    //                 <li>Scientific Name: {animal.scientific_name}</li>
    //                 <li>Status Code: {animal.status_code}</li>
    //             </ul>
                
    //         );
    //     }else{
    //         return(<ul>There are no animals.</ul>);
    //     }    
    // }

    render(){
        return(
            <div className="col col1">
                <h4>{this.props.listName}</h4>
                <ul>{this.props.data}</ul>
            </div>
        )
    }
}