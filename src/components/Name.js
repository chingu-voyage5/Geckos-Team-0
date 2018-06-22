import React from 'react';
import '../styles/Name.css';
import ReactDOM from 'react-dom';




export class Name extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            html: " "
        }
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        
        this.setState({ html: event.target.value });
        console.log(this.state.html);
    }


    
 
    componentDidMount() {
        const json = localStorage.getItem('name');
        console.log(json);
        const html = JSON.parse(json);

      

       if(html){
        this.setState(() => ({ html: html }));
       }
        console.log(html);

    }



   componentDidUpdate(prevState){
       if(prevState.html !== this.state.html){
       const json = JSON.stringify(this.state.html);
       console.log(json)
       localStorage.setItem('name', json);
       console.log('Saving Data');
       }
   }



    render = () => {
        return (
        <div id="greeting" className="transition">
				<h2>
					Good <span>morning</span>,
                
                   <ContentEditable html={this.state.html} // innerHTML of the editable div
                        disabled={false}       // use true to disable edition
                        onChange={this.handleChange} 
                         />
					.
				</h2>
            </div>
        )

    }
}

    class ContentEditable extends React.Component{
        constructor(){
            super();
            this.emitChange = this.emitChange.bind(this);

        }
             render(){
            return <span
             className="single-line"
             onInput={this.emitChange} 
             onBlur={this.emitChange}
             ref={function (e) { if (e != null) e.contentEditable = true; }}
             dangerouslySetInnerHTML={{ __html: this.props.html }}> 
             </span>
             }
    
    
             shouldComponentUpdate(nextProps){
                 return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
            }
      
             emitChange(){
                 var html = ReactDOM.findDOMNode(this).innerHTML;
                 if (this.props.onChange && html !== this.lastHtml) {

                     this.props.onChange({
                         target: {
                             value: html
                         }
                     });
                 }
                 this.lastHtml = html;
             }
    }
