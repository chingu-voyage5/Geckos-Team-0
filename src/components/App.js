import React, { Component } from 'react';
import {Time} from './time.js';
import '../styles/App.css';

class App extends Component {
 
  
  render() {
   
    return (
      <div className="App">
        <span><Time /></span>
      </div>
    )
  }
}



export default App;
