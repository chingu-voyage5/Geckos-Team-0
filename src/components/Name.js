import React from 'react';
import '../styles/Name.css';



export class Name extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            html: " "
        }
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = evt => {
        evt.preventDefault();
        this.setState({ html: evt.target.value });
        console.log(this.html)
    };



    render() {
        return <div id="greeting" className="transition">
            <h2>
                Good <span>
                    morning
                    </span>,
					<span className="single-line" ref={function (e) { if (e != null) e.contentEditable = true; }} onChange={this.onChange} html={this.state.html}>
                    .
					</span>
            </h2>
        </div>;




    }

}