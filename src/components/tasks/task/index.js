import React, { Component } from 'react';

import './styles.css';

class Task extends Component {

  handleClick = event =>{
    event.stopPropagation();
    this.props.onClickDone();
  }
  render() {
    return (
      <div className={ this.props.taskIsClicked ? 'task-isClicked task-container'  : ' task-container' } onClick={this.props.onClick}>
        <h2> {this.props.name} </h2>
        <button onClick={this.handleClick}>Done</button >
      </div>
    );
  }
}

export default Task;