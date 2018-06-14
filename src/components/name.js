import React from 'react';
import {Time} from './time';
import '../styles/Name.css';



export class Name extends React.Component {
    constructor(props){
        super(props)
            this.state = {
              html: " " 
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = evt => {
        evt.preventDefault();
        this.setState({ html: evt.target.value });
        
    };

    handleTime(){
         
    }

    render() {
        return <div id="greeting" className="transition">
				<h2>
					Good <span> 
                        {Time.getTimeString}
                    </span>,
					<span className = "single-line" contentEditable={true}  onChange={this.onChange}>
						{this.state.html}
                        .
					</span>
				</h2>
			</div>;
      
               
        
        
    }

}