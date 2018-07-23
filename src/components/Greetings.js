import React from 'react';
import './Time';
import '../styles/Greetings.css';


class Greetings extends React.Component {
    constructor(props) {
        super(props)
      
        this.state = { greetings: "morning" }
    
    }
    

  render(){
      return(
          <div>
         <p id="greet-state">{this.state.greetings}</p>
             
        </div>
         
      )
  }
            
        
}

export default Greetings;