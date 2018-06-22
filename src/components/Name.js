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


    // handleChange = evt => {
    //     evt.preventDefault();
    //     console.log(evt.target.value);
    //     this.setState({ html: evt.target.value });
    //     console.log(evt);
    //     // console.log(this.state.html)
      
    // };


    handleChange = (evt) =>{
      
        console.log(evt.target.value);
       

    };
 


    render() {
        return <div id="greeting" className="transition">
            <h2>
                Good <span>
                    morning
                    </span>,
					{/* <span className="single-line" ref={function (e) { if (e != null) e.contentEditable = true; }} onBlur={this.handleChange}> */}
					<span className="single-line"  contentEditable = "true";  onBlur={this.handleChange}>
                  {this.state.html}
					</span>
                    .
					</span>
            </h2>
        </div>;




    }

}