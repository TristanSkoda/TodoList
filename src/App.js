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
      todos: [] /*
        { key: '1', data: { name: 'manger', isDone: false } },
        { key: '2', data: { name: 'vaiselle', isDone: false } },
        { key: '3', data: { name: 'marche', isDone: false } },
        { key: '4', data: { name: 'toilette', isDone: false } },
        { key: '5', data: { name: 'meditation', isDone: false } },
        { key: '6', data: { name: 'dormire', isDone: false } },
        { key: '7', data: { name: 'laver le plancher', isDone: false } },
        { key: '8', data: { name: 'manger', isDone: false } },
        { key: '9', data: { name: 'toto', isDone: false } },
        {
          key: '10',
          data: { name: 'manger le salut de coucou', isDone: false }
        }
      */,
      topBar: '',
      option: 'All'
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:4000/api/todos')
      .then(data => data.json())
      .then(json => this.setState({ todos: json }))
  }

  addTask = name => {
    const todos = this.state.todos
    const newTodo = {
      key: 't' + Date.now(),
      data: {
        name,
        isDone: false
      }
    }

    todos.push(newTodo)
    this.setState({ todos })
    
    fetch('http://localhost:4000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
  }

  updateTask = todo => {
    const { key, data: { name, isDone } } = todo
    fetch(`http://localhost:4000/api/todo/${todo.key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key, data: { name, isDone: !isDone } })
    })
  }

  handleOnClick = pIndex => {
    this.setState({
      todos: this.state.todos.map((todo, index) => {
        const { key, data: { name, isDone } } = todo
        if (index === pIndex) {
          this.updateTask(todo)
          return { key, data: { name, isDone: !isDone } }
        } else return todo
      })
    })
  }
  
  handleChange = taskName => this.setState({ topBar: taskName })

  handleOnClickDelete = pKey => {
    fetch(`http://localhost:4000/api/todo/${pKey}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.setState({
      todos: this.state.todos.filter(todo => todo.key !== pKey)
    })
  }

  deleteAllDone = pKeyArray => {
    fetch(`http://localhost:4000/api/todo/deleteDone`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(pKeyArray)
    })
    console.log('body',JSON.stringify(pKeyArray[0]))
  }


  handleClearAllDone = () =>{
    const keyArray = []
    this.setState({
      todos: this.state.todos.filter(todo => {
        const { key, data: { isDone } } = todo
        if(!isDone){
          return todo
        } else keyArray.push(key);
      })
    })
    this.deleteAllDone(keyArray)
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
        ({ data: { name, isDone } }) =>
          name.includes(topBar) &&
          ((option === 'Done' && isDone) ||
            (option === 'Active' && !isDone) ||
            option === 'All')
      )
      .map(todo => {
        return {
          ...todo,
          style: {
            height: spring(60, presets.gentle),
            opacity: spring(1, presets.gentle)
          }
        }
      })
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
