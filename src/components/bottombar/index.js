import React, { Component } from 'react';

import './styles.css';

class BottomBar extends Component {
  render() {

    const {option ,onClick} = this.props;
    return ( 
      <div className="bottombar-container">
          <button onClick={onClick('All')}>All</button>
          <button onClick={onClick('Active')} >Active</button>
          <button onClick={onClick('Done')} >Done</button>
          <button onClick={} >Delete all Done</button >
      </div>
    )
  }
}

export default BottomBar;