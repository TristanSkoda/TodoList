import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Tasks from './components/tasks';
import TopBar from './components/topbar';

class App extends Component {
  constructor(){
    super();
    this.state = {
        todos : [{
          name: 'manger',
          isDone: false
        }]
    }
    
}

  handler = event =>{
    
    const todo = {
      name: event.target.value,
      isDone: false
    }
    this.setState({
    todos = this.state.todos.concat([todo])
      todos: array
    });
  }
  render() {
    const {props} = this.state;
    return (
      <div className="App">
        <TopBar handler={this.handler}/> 
        <Tasks {...props} />
      </div>
    );
  }
}

/*export default App;

import React, { Component } from 'react'

const FAKE_TODOS = [{
	title: 'Task1',
	isComplete: false,
}]

class Todo extends Component {
  state = {
  	todos: []
  }

  componentDidMount() {
  	this.setState({ 
  		todos: FAKE_TODOS
  	})
  }

  render() {
    const {  } = this.state
    return (
      <div>
      </div>
    )
  }
}

export default Todo*\
