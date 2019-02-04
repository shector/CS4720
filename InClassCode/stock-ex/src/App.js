import React, { Component } from 'react';
import apple from './download.png'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <img alt="Apple-Logo" src={apple} className="logo-appl"></img>
        <p class="text"> Apple Stock: {this.props.price}</p>
      </div>
      );
  }
}

export default App;