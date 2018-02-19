import React, { Component } from 'react';


class TopBar extends Component {


  render() {
    return (
      <div>
          {console.log('le this du topbar: ', this)}
          <form onSubmit={this.props.handler}> 
            <input placeholder='enter a task'></input>
            <button type='submit' value='Submit'></button>
          </form>
      </div>
    )
  }
}

export default TopBar;