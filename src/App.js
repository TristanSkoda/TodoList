import React, { Component } from 'react';

import './css/general.css';
import './css/reset.css';
import './css/App.css';

import Tasks from './components/tasks';
import TopBar from './components/topbar';
import BottomBar from './components/bottombar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [{
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
      topBar: '',
      option: 'All'
    }

  }


  addTask = (name) => {
    const todos = this.state.todos;
    todos.push({
      name,
      isDone: false
    })
    this.setState({ todos });
  }

  handleOnClick = (pIndex) =>
    this.setState({
      todos:
        this.state.todos.map((todo, index) =>
          index === pIndex ?
            {
              ...todo,
              isClicked: !todo.isClicked
            } : todo
        )
    })

  handleChange = taskName => this.setState({ topBar: taskName })

  handleOnClickDone = pIndex => this.setState({ todos: this.state.todos.filter((todo, index) => index !== pIndex) })

    handleClearAllDone = () => {
      
    }
  handleOption = option => this.setState({option})

  render() {
    const { topBar, todos } = this.state;
    console.log('opiton: ',this.state.option)
    return (
      <div className="App">
        <h1>Todo List</h1>
        <div className="app-container">
          <TopBar onChange={this.handleChange} handleAddTask={this.addTask} />
          <Tasks todos={topBar === '' ? todos : todos.filter(todo => todo.name.includes(topBar))}
            onClickDone={this.handleOnClickDone} onClick={this.handleOnClick} />
          <BottomBar  onClick={this.handleOption}  onClickClearAllDone={this.handleClearAllDone} />
        </div>
      </div>
    );
  }
}
export default App;