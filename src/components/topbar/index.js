import React, { Component } from 'react';

import './styles.css';

class TopBar extends Component {
  constructor(props){
    super(props);

    this.state= {value: ''}
  }
  handleChange = event =>{
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    if(this.state.value !== ''){
      this.props.handleName(this.state.value);
      this.setState({value : ''})
    }
  }

 

  render() {
    return (
      <div className="topbar-container">
          <form onSubmit={this.handleSubmit} className="topbar-container-form" > 
            <input type="text" value={this.state.value} onChange={this.handleChange} placeholder='Enter a task'></input>
            <button >Submit</button>
          </form>
      </div>
    )
  }
}

export default TopBar;