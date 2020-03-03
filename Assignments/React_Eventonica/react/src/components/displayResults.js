import React from 'react';

export default class DisplayResult extends React.Component {
    render(){
        return(
            <div class="col col1">
                <h4>{this.props.listName}</h4>
                <ul id="search-results-tm"></ul>
            </div>
        )
    }
}