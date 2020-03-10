import React from 'react';
import * as generalFunc from './generalFunc';

export default class SearchResultDisplay extends React.Component {

    render(){
        return(
            <div className="col col1">
                <h4>{this.props.listName}</h4>
                <ul id="search-results-tm">{this.props.data}</ul>
            </div>
        )
    }
}