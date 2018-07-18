import React from 'react';
import "../styles/Focus.css";

class Focus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            focus: '' 
        };

        this.addFocus = this.addFocus.bind(this);
        this.deleteFocus = this.deleteFocus.bind(this);
        this.strikeText = this.strikeText.bind(this);
    }

    componentDidMount() {
        try {
          const value = localStorage.getItem('focus');
          
      
          if (value) {
            this.setState({
                focus: value
            });
          }
        } catch (e) {
          // Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.focus !== this.state.focus.length) {
            localStorage.setItem('focus', this.state.focus);
        }
    }

    // Grabs the input
    addFocus(e) {
        e.preventDefault();

        const { value } = this.input;

        if (value === '') { return }

        this.setState({
            focus: value
        });
    }

    // Handles removal of Focus field
    deleteFocus(e) {
        this.setState({
            focus: ''
        });
    }

    // Strikethrough text
    strikeText() {
        console.log(`Checkbox clicked`);
    }

    render() {
      return (
        <div>   
            {this.state.focus === '' && (
                <div className="FocusInput">
                    <form onSubmit={this.addFocus}>
                        <p id="FocusHeader">What is your main focus for today?</p>
                        <input 
                            id="FocusValue" 
                            type="text" 
                            name="focus" 
                            ref={node => this.input = node}
                        />
                    </form>
                </div>
            )}
            {this.state.focus !== '' && (
                <div className="FocusInput">
                    <p id="FocusItemHeader">TODAY</p>
                    <div className="FocusParent">
                        <div id="CheckboxItem" onClick={this.strikeText}>
                            <input type="checkbox" id="FocusCheck" name="focus-check" />
                            <label htmlFor="FocusCheck"></label>
                        </div>
                        <p id="FocusItem"  >{this.state.focus}</p>
                        <p id="DeleteItem" onClick={this.deleteFocus}>x</p>
                    </div>
                </div>
            )}
            
        </div>
      );
    }
}

export default Focus;