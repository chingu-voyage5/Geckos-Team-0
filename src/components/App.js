import React, { Component } from 'react';
import ToDoInput from './ToDoInput.js';
import '../styles/App.css';
import Weather from './Weather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Weather />
        <ToDoInput />
      </div>
    );
  }
}

export default App;