import React from 'react';
import "../styles/Weather.css";

class Focus extends React.Component {
    render() {
      return (
        <div className="ToDoInput">
            <form>
                <h1>What is your main focus for today?</h1>
                <input type="text" name="todo"/>
            </form>
        </div>
      );
    }
}

export default Focus;