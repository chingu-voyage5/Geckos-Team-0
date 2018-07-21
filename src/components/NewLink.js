import React from 'react'

class NewLink extends React.Component {
    constructor() {
        super()
        this.state = {
            isHidden: true ,
            value :"New Link"
        }
    }
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
            value:" "
        })
    }
    render() {
        return (
            <div>
                <p onClick={this.toggleHidden.bind(this)} >
                   {this.state.value}
            </p>
                {!this.state.isHidden && <Child />}
            </div>
        )
    }
}

const Child = () => (
	<div>
        <input type="text" placeholder="Name" />
        <input type="checkbox" id="nameCheck" name="name-check" />
        <label htmlFor="nameCheck"></label>
        
		<input type="text" placeholder="Url" />
        <input type="checkbox" id="urlCheck" name="url-check" />
        <label htmlFor="urlCheck"></label>
	</div>
);

export default NewLink;

