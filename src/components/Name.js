import React from 'react';
import {Time} from './Time';
import '../styles/Name.css';



export class Name extends React.Component {
    constructor(props){
        super(props)
            this.state = {
              html: "  " ,
            
        }
      
    }


    handleChange = evt => {
        evt.preventDefault();
        this.setState(
            { html: evt.target.value  }
    );
        
        // add local storage so that name remains when page refresh.
        localStorage.getItem('name', this.html);
    };

  

    render() {
        return <div id="greeting" className="transition">
				<h2>
					Good <span> 
                    morning
                    </span>,
	

                <span className="single-line" ref={function (e) { if (e != null) e.contentEditable = true; }} onChange={this.onChange} spellCheck= "false">
                    {   this.state.html}
                        .
					</span>
				</h2>
			</div>;
      
               
        
        
    }

}
