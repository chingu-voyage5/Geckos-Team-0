import React, { Component } from 'react';
import '../styles/App.css';


import {Time} from './time';
import {Name} from './Name';
import ToDoInput from './ToDoInput.js';
import Weather from './Weather';

class App extends Component {
 
  
  render() {
   
    return <div className="App">
			<Time />
			<Name />
			<ToDoInput />
			<Weather />
		</div>;
  }
}

export default App;