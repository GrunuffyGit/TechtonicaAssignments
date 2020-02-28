import React from 'react';
import Todoitem from './Todoitem';

export default class Todos extends React.Component {
   render(){
    console.log(this.props.todos);
    return (
    this.props.todos.map((todo) => (<Todoitem key={todo.id} todo={todo}/>)));
   }
}


