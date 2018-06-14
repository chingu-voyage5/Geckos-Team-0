import React, { Component } from "react";
import "../styles/App.css";
import "../styles/time.css";

import { Time } from "./time.js";
import ToDoInput from "./ToDoInput.js";
import Weather from "./Weather";
import Links from "./Links";
import Search from "./Search";

class App extends Component {
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
          <ToDoInput />
        </div>
        <div className="App__Footer">
          <h3>Setting button Here</h3>
          <h3>Quotes Here</h3>
          <h3>Todo Here</h3>
        </div>
      </div>
    );
  }
}

export default App;
