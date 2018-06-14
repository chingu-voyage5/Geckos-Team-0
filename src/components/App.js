import React, { Component } from "react";
import "../styles/App.css";
import "../styles/Time.css";

import { Time } from "./Time.js";
import Focus from "./Focus";
import ToDo from "./ToDo.js";
import Weather from "./Weather";
import Links from "./Links";

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App__Top">
					<Links />
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
