import React, { Component } from 'react';
import Task from './task'

import './styles.css';


class Tasks extends Component {
  render() {
    return (
      <div className="Tasks-container" >         
      {this.props.todos.map((todo, index)=> <Task onClick={() => this.props.onClick(index)} taskIsClicked={todo.isClicked}  key={index} name={todo.name} /> )}
      </div>
    );
  }
}

export default Tasks;


