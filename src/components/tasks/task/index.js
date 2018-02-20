import React, { Component } from 'react';

import './styles.css';

class Task extends Component {
  
  render() {
    return (
      <div className="task-container"  onClick={this.props.handleClick}>
        <h2> {this.props.name} </h2>
        <button>Done</button>
      </div>
    );
  }
}

export default Task;