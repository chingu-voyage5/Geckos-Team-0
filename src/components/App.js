import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/time.css';

import {Time} from './time.js';
import {Name} from './name.js';
import ToDoInput from './ToDoInput.js';
import Weather from './Weather';

class App extends Component {
 
  
  render() {
   
    return (
      <div className="App">
        <Time />
        <Weather />
        <ToDoInput />
      </div>
    )
  }
}

export default App;