import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Tasks from './components/tasks';
import TopBar from './components/topbar';

class App extends Component {
  constructor(){
    super();
    this.state = {
        name: 'manger',
        isDone: false
    }
    
}

  handler = event =>{
    this.setState(s{
      name: event.target.value,
      isDone: flase
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
