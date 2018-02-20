import React, { Component } from 'react';

import './css/general.css';
import './css/reset.css';

import Tasks from './components/tasks';
import TopBar from './components/topbar';

class App extends Component {
  constructor(){
    super();
    this.state = {
        todos : [{
          name: 'manger',
          isDone: false
        },
        {
          name: 'salut',
          isDone: false
        },
        {
          name: 'allo',
          isDone: false
        },
        {
          name: 'coucou',
          isDone: false
        },
        {
          name: 'manger',
          isDone: false
        },
      ]
    }
    
}

  handler = (name) =>{
    console.log('name : ',name)
    const todos = this.state.todos;
    todos.push({
      name,
      isDone: false    
    })
    
    this.setState({todos});
  }
  render() {
    return (
      <div className="App">
        <div className="app-container">
          <TopBar handler={this.handler}/> 
          <Tasks {...this.state} />
        </div>
      </div>
    );
  }
}
export default App;