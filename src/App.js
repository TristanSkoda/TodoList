import React, { Component } from 'react';

import './css/general.css';
import './css/reset.css';
import './css/App.css';

import Tasks from './components/tasks';
import TopBar from './components/topbar';

class App extends Component {
  constructor(){
    super();
    this.state = {
        todos : [{
          name: 'manger',
          isDone: false,
          isClicked: false
        },
        {
          name: 'salut',
          isDone: false,
          isClicked: false
        },
        {
          name: 'allo',
          isDone: false,
          isClicked: false
        },
        {
          name: 'coucou',
          isDone: false,
          isClicked: false
        },
        {
          name: 'manger',
          isDone: false,
          isClicked: false
        },
      ]
    }
    
}

  handleName = (name) =>{
    console.log('name : ',name)
    const todos = this.state.todos;
    todos.push({
      name,
      isDone: false    
    })
    
    this.setState({todos});
  }

  handleOnClick = ()=>{
    if(this.state.todos.isClicked === false){
      this.setState({})
    }
  }

  render() {
    return (
      <div className="App">
      <h1>Todo List</h1>
        <div className="app-container">
          <TopBar handleName={this.handleName}/> 
          <Tasks {...this.state} onClick={this.handleOnClick} />
        </div>
      </div>
    );
  }
}
export default App;