import React from 'react';

class Todoitem extends React.Component {
    render(){
       return (
       <div>
            <p>{this.props.todo.title}</p>
        </div>
       ); 
   }
}

export default Todoitem;