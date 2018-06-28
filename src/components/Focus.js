import React from 'react';
import "../styles/Weather.css";

class Focus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            focus: '' 
        };
    }

    componentDidMount() {
        try {
          const json = localStorage.getItem('focus');
          const options = JSON.parse(json);
      
          if (options) {
            // this.setState(() => ({ focus }));
          }
        } catch (e) {
          // Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.focus !== this.state.focus.length) {
            localStorage.setItem('focus', this.state.focus);
        }
        console.log('It Updated!');
    }

    render() {
      return (
        <div className="FocusInput">
            <form>
                <h1>What is your main focus for today?</h1>
                <input id="FocusValue" type="text" name="todo" value={'Value'}/>
            </form>
        </div>
      );
    }
}

export default Focus;