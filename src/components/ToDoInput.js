import React from 'react';

class ToDoInput extends React.Component {
    render() {
      return (
        <div className="ToDoInput">
            <form>
                  <p>what is you main focus today</p>
                <input type="text" name="todo"/>
            </form>
        </div>
      );
    }
}

export default ToDoInput;