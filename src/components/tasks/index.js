import React, { Component } from 'react';
import Task from './task'


class Tasks extends Component {
    
  render() {
   
    return (
      <div>        
        <Task {...props}/>
      </div>
    );
  }
}

export default Tasks;