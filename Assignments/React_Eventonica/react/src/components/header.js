import React from 'react';

export default class Header extends React.Component {
    render(){
        return(
            <div class="gheader jumbotron jumbotron-fluid">
                <h1>{this.props.pageTitle}</h1>
            </div>
        )
    }
}