import React from 'react';
import "../styles/Focus.css";

class Focus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            focus: '' 
        };

        this.handleChange = this.handleChange.bind(this);
        this.addFocus = this.addFocus.bind(this);
        this.deleteFocus = this.deleteFocus.bind(this);
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
            const html = this.state.focus;

            localStorage.setItem('focus', html);
            console.log('I\'m here', html);
        }
        console.log('It Updated!');
    }

    // Grabs the input
    handleChange(e) {
        this.setState({
            focus: e.target.value
        });
        console.log(`change handled`);
    }

    // Changes the focus item 
    addFocus(focus) {
        if (focus.length > 0) {
            this.props.addFocus(focus);
            this.setState({focus: ''});
        }
        console.log(`focus added`);
    }

    // Handles removal of Focus field
    deleteFocus(e) {
        console.log(`focus deleted`);
    }

    render() {
      return (
        <div>   
            <div className="FocusInput">
                <form onSubmit={() => this.addFocus(this.state.value)}>
                    <p id="FocusHeader">What is your main focus for today?</p>
                    <input 
                        id="  " 
                        type="text" 
                        name="focus" 
                        onChange={this.handleChange}
                        value={this.state.focus}
                    />
                </form>
            </div>
            <div className="FocusInput ">
                <p id="FocusItemHeader">TODAY</p>
                <input type="checkbox" id="FocusCheck" name="focus-check" />
                <p id="FocusItem"  >{this.state.focus}</p>
            </div>
        </div>
      );
    }
}

export default Focus;