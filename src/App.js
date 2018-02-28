import React, { Component } from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'

import './css/general.css'
import './css/reset.css'
import './css/App.css'

import Tasks from './components/tasks'
import TopBar from './components/topbar'
import BottomBar from './components/bottombar'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      topBar: '',
      option: 'All'
    }
  }

  componentDidMount = () => {
    this.fetchData()
  }

  fetchData = ()=>{
    fetch('http://localhost:4000/api/todos')
      .then(data => data.json())
      .then(json => this.mapData(json))
      .then(goodTodos => {
        this.setState({ todos: goodTodos })
    })
    
  }
  
  mapData = data =>{
    return data.map(todo => ({
      _id: todo._id,
      key: todo._id,
      data: {
        name: todo.name,
        isDone: todo.isDone
      }
    }))
  }
  
  addTask = name => {
    const todos = this.state.todos
    const newTodo = {
      name,
      isDone: false 
    }
    
    fetch('http://localhost:4000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    }).then(todo => todo.json())
    .then(todo => this.mapData([todo]))
    .then(goodTodos => {
      todos.push(goodTodos[0])
      this.setState({ todos })
    })
    

    
  }

  updateTask = todo => {
    const { _id, data: { name, isDone } } = todo
    fetch(`http://localhost:4000/api/todo/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id, data: { name, isDone: !isDone } })
    })
  }

  handleOnClick = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        const { _id, data: { name, isDone } } = todo
        if (_id === id) {
          this.updateTask(todo)
          return { ...todo, data: { name, isDone: !isDone } }
        } else return todo
      })
    })
  }

  handleChange = taskName => this.setState({ topBar: taskName })

  handleOnClickDelete = id => {
    fetch(`http://localhost:4000/api/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.setState({
      todos: this.state.todos.filter(todo => todo._id !== id)
    })
  }

  deleteAllDone = pIdArray => {
    fetch(`http://localhost:4000/api/todo/deleteDone`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pIdArray)
    })
  }

  handleClearAllDone = () => {
    const idArray = []
    this.setState({
      todos: this.state.todos.filter(todo => {
        const { _id, data: { isDone } } = todo
        if (!isDone) {
          return true
        } else {
          idArray.push(_id)
          return false
        }
      })
    })
    this.deleteAllDone(idArray)
  }

  handleOption = pOption => this.setState({ option: pOption })

  getDefaultStyles = () =>
    this.state.todos.map(todo => ({
      ...todo,
      
      style: { height: 0, opacity: 1 }
    }))

  getListTodoAndStyle = () => {
    const { topBar, option, todos } = this.state
    return todos
      .filter(
        ({data: { name, isDone }}) =>
          name.includes(topBar) &&
          ((option === 'Done' && isDone) ||
            (option === 'Active' && !isDone) ||
            option === 'All')
      )
      .map(todo => ({
        ...todo,
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle)
        }
      }))
  }

  willEnter() {
    return {
      height: 0,
      opacity: 1
    }
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0)
    }
  }

  render() {
    const { option } = this.state
    
    return (
      <div className="App">
        <h1>Todo List</h1>
        <div className="app-container">
          <TopBar onChange={this.handleChange} handleAddTask={this.addTask} />

          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getListTodoAndStyle()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}
          >
            {styles => (
              <Tasks
                todos={styles}
                onClickDelete={this.handleOnClickDelete}
                onClick={this.handleOnClick}
                
              />
            )}
          </TransitionMotion>

          <BottomBar
            onClick={this.handleOption}
            option={option}
            onClickClearAllDone={this.handleClearAllDone}
          />
        </div>
      </div>
    )
  }
}
export default App
