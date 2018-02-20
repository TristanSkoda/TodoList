import React, { Component } from 'react';

import './styles.css';

class Task extends Component {
  render() {
    return (
      <div className="task-constainer" >
        <h1> {this.props.name} </h1>
      </div>
    );
  }
}

export default Task;