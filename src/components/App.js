import React, { Component } from 'react';
import '../styles/App.css';

import {Time} from './time.js';
import ToDoInput from './ToDoInput.js';
import Weather from './Weather';

class App extends Component {
 
  
  render() {
   
    return (
      <div className="App">
        <span><Time /></span>
        <Weather />
        <ToDoInput />
      </div>
    )
  }
}

export default App;