<<<<<<< HEAD
import React, { Component } from 'react';
import '../styles/App.css';
import '../styles/Time.css';
=======
import React, { Component } from "react";
import "../styles/App.css";
>>>>>>> 0e21c2263223d94b484eb7bbbb76aea52c41cd98


import {Time} from './Time';
import {Name} from './Name';
import Weather from './Weather';
<<<<<<< Updated upstream

import "../styles/time.css";


import Focus from "./Focus";
import ToDo from "./ToDo.js";

=======
import Focus from "./Focus";
import ToDo from "./ToDo.js";
>>>>>>> Stashed changes
import Links from "./Links";
import Search from "./Search";
import Quotes from "./Quotes";

class App extends Component {
<<<<<<< HEAD
 
  
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
=======
	render() {
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
					<Quotes />
>>>>>>> 0e21c2263223d94b484eb7bbbb76aea52c41cd98
					<ToDo />
				</div>
			</div>
		);
	}
}

export default App;