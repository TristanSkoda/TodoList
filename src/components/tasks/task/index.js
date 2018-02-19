import React, { Component } from 'react';


class Task extends Component {
  render() {
    return (
      <div>
          {console.log('name of task: ',this.props.name)}
        <h1> {this.props.name} </h1>
      </div>
    );
  }
}

export default Task;