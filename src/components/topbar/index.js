import React, { Component } from 'react';

import './styles.css';

class TopBar extends Component {
 onSubmit = (event) =>{
  event.preventDefault();
  console.log('target value: ', event.target.value)
  this.props.handler(event.target.value);
 }

  render() {
    return (
      <div className="TopBar-container">
          <form onSubmit={this.onSubmit}> 
            <input type="text" name="name" placeholder='enter a task'></input>
            <button >submit</button>
          </form>
      </div>
    )
  }
}

export default TopBar;