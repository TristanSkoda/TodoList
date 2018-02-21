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
      ],
      topBar : ''
    }
    
}


  addTask = (name) =>{
    const todos = this.state.todos;
    todos.push({
      name,
      isDone: false    
    })
    this.setState({todos});
  }

  handleOnClick = (pIndex)=>
    this.setState({todos :
      this.state.todos.map((todo, index)=>
        index === pIndex?
        {
          ...todo,
          isClicked: todo.isClicked? false : true
        } : todo
      )
    })

    handleChange = taskName => this.setState({ topBar: taskName })



    handleOnClickDone = pIndex =>{
      let array = this.state.todos.slice();
      array.splice(pIndex, 1);
      this.setState({
        todos: array
      })
    }

  render() {
    const {topBar, todos} = this.state;
    return (
      <div className="App">
      <h1>Todo List</h1>
        <div className="app-container">
          <TopBar onChange={this.handleChange} handleAddTask={this.addTask}/> 
          <Tasks todos={topBar === ''? todos : this.state.todos.filter(todo => todo.name.includes(topBar))}
           onClickDone={this.handleOnClickDone} onClick={this.handleOnClick} />
        </div>
      </div>
    );
  }
}
export default App;