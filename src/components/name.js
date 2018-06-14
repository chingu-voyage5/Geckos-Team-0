import React from 'react';
// import {Time} from './time';
import '../styles/Name.css';



export class Name extends React.Component {
    constructor(props){
        super(props)
            this.state = {
              html: "___" 
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = evt => {
        this.setState({ html: evt.target.value });
    };

    render() {
        return <div id="greeting" className="transition">
				<h2>
					Good <span className>
                    morning
                    </span>,
					<span className = "single-line" contentEditable={true}  onChange={this.onChange}>
						{this.state.html}
                        .
					</span>
				</h2>
			</div>;
      
               
        
        
    }

}