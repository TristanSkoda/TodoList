import React, { Component } from 'react'
import Task from './task'

import './styles.css'

class Tasks extends Component {
  
  
  render() {
    // console.log('todos Tasks:  ',this.props.todos )
    return (
      <div className="Tasks-container">
        {this.props.todos.map(({ key, style, data: { name, isDone } }) => (
          <Task
            style={style}
            onClick={() => this.props.onClick(key)}
            onClickDelete={() => this.props.onClickDelete(key)}
            doneIsClicked={isDone}
            key={key}
            name={name}
          />
        ))}
      </div>
    )
  }
}

export default Tasks
