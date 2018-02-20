import React, { Component } from 'react';
import Task from './task'

import './styles.css';


class Tasks extends Component {
  constructor(){
    super();

    
  }


  
  render() {
   
    return (
      <div className="Tasks-container" >         
      {this.props.todos.map((todo, index)=> <Task className={ this.props.isClicked ? 'task-isClicked' : '' } onClick={() => this.props.onClick(index)}  key={index} name={todo.name} /> )}
      </div>
    );
  }
}

export default Tasks;


