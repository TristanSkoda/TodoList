import React, { Component } from 'react';

import './css/general.css';
import './css/reset.css';
import './css/App.css';

import Tasks from './components/tasks';
import TopBar from './components/topbar';
import BottomBar from './components/bottombar';

console.log("test")


class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [{
        name: 'manger',
        isDone: false,
      },
      {
        name: 'salut',
        isDone: false,
      },
      {
        name: 'allo',
        isDone: false,
      },
      {
        name: 'coucou',
        isDone: false,
      },
      {
        name: 'manger',
        isDone: false,
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
              isDone: !todo.isDone
            } : todo
        )
    })

  handleChange = taskName => this.setState({ topBar: taskName })

  handleOnClickDone = pIndex => this.setState({ todos: this.state.todos.filter((todo, index) => index !== pIndex) })

  handleClearAllDone = () => this.setState({todos: this.state.todos.filter(todo =>!todo.isDone )})

  handleOption = pOption => this.setState({option: pOption})

  render() {

    const { topBar, todos , option} = this.state;

    return (
      <div className="App">
        <h1>Todo List</h1>
        <div className="app-container">
          <TopBar onChange={this.handleChange} handleAddTask={this.addTask} />
          <Tasks todos={ todos.filter(todo => 
            todo.name.includes(topBar) &&
              (option === 'Done' && todo.isDone ||
                option === 'Active' && !todo.isDone ||
                option === 'All'))}
            onClickDone={this.handleOnClickDone} onClick={this.handleOnClick} />
          <BottomBar  onClick={this.handleOption} option={option} onClickClearAllDone={this.handleClearAllDone} />
        </div>
      </div>
    );
  }
}
export default App;