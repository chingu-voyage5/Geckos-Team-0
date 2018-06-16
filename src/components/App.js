import React, { Component } from 'react';
import '../styles/App.css';


import {Time} from './Time';
import {Name} from './Name';
import Weather from './Weather';

import "../styles/time.css";


import Focus from "./Focus";
import ToDo from "./ToDo.js";

import Links from "./Links";
import Search from "./Search";

class App extends Component {
 
  
  render() {
   
    return <div className="App">
			<Time />
			<Name />
			
			<Weather />
		</div>;
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
  }
}

export default App;