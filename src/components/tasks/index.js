import React, { Component } from 'react'
import Task from './task'

import './styles.css'

class Tasks extends Component {
  render() {
    return (
      <div className="Tasks-container">
        {this.props.todos.map(
          ({ key, style, data: { name, isDone } }, index) => (
            <Task
              style={style}
              onClick={() => this.props.onClick(index)}
              onClickDelete={() => this.props.onClickDelete(index)}
              doneIsClicked={isDone}
              key={index}
              name={name}
            />
          )
        )}
      </div>
    )
  }
}

export default Tasks
