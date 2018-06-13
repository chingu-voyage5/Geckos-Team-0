import React, { Component } from 'react';
import ToDoInput from './ToDoInput.js';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello Geckos-0!<span role="img" aria-label="Cool Emoji">😎</span></h1>

        <ToDoInput />
      </div>
    );
  }
}

export default App;