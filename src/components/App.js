<<<<<<< HEAD
import React, { Component } from 'react';
import '../styles/App.css';


import {Time} from './time';
import {Name} from './name';
import ToDoInput from './ToDoInput.js';
import Weather from './Weather';
=======
import React, { Component } from "react";
import "../styles/App.css";
import "../styles/Time.css";

import { Time } from "./Time.js";
import Focus from "./Focus";
import ToDo from "./ToDo.js";
import Weather from "./Weather";
import Links from "./Links";
import Search from "./Search";
>>>>>>> origin

class App extends Component {
 
  
  render() {
<<<<<<< HEAD
   
    return <div className="App">
			<Time />
			<Name />
			<ToDoInput />
			<Weather />
		</div>;
=======
    return (
      <div className="App">
        <div className="App__Top">
          <div className="APP__Top__Left">
            <Links />
            <Search />
          </div>
          <Weather />
        </div>
        <div className="App__Center">
          <span>
	          <Time />
          </span>
          <Focus />
        </div>
        <div className="App__Footer">
          <h3>Setting button Here</h3>
          <h3>Quotes Here</h3>
					<ToDo />
        </div>
      </div>
    );
>>>>>>> origin
  }
}

export default App;