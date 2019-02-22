import React, { Component } from 'react';
import Calculator from './calculator/calculator';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Roshan Calculator</h1>
        <Calculator></Calculator>
      </div>
    );
  }
}

export default App;
