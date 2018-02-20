import React, { Component } from 'react';

import './styles.css';

class Task extends Component {

  render() {
    return (
      <div className={ this.props.taskIsClicked ? 'task-isClicked task-container'  : ' task-container' } onClick={this.props.onClick}>
        <h2> {this.props.name} </h2>
        <button>Done</button >
      </div>
    );
  }
}

export default Task;