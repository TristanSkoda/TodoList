import React, { Component } from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'

import './css/general.css'
import './css/reset.css'
import './css/App.css'

import Tasks from './components/tasks'
import TopBar from './components/topbar'
import BottomBar from './components/bottombar'

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const routes= require('./routes/api')

const app = express();

mongoose.connect('mongodb://localhost/todogo')
mongoose.Promise = global.Promise

app.use(express.static('public'))

app.use(bodyParser.json())

app.use('/api',routes);



app.listen(process.env.port || 3000,()=> console)


app.use((err, req, res, next)=>{
  res.status(422).send({error: err.message})
})



class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: []/*
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

componentDidMount =() =>{
  fetch('/api/todos').then(data=> data.json()).then(json =>{
    this.setState({
      todos: json
    })
  })
}



  addTask = name => {
    const todos = this.state.todos
    todos.push({
      key: 't' + Date.now(),
      data: { name, isDone: false }
    })
    this.setState({ todos })
  }

  handleOnClick = pIndex =>
    this.setState({
      todos: this.state.todos.map((todo, index) => {
        const { key, data: { name, isDone } } = todo
        return index === pIndex
          ? { key, data: { name, isDone: !isDone } }
          : todo
      })
    })

  handleChange = taskName => this.setState({ topBar: taskName })

  handleOnClickDelete = pIndex =>
    this.setState({
      todos: this.state.todos.filter((todo, index) => index !== pIndex)
    })

  handleClearAllDone = () =>
    this.setState({
      todos: this.state.todos.filter(({ data: { isDone } }) => !isDone)
    })

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
