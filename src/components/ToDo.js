import React from 'react';
import Modal from "react-modal";
import "../styles/ToDo.css";


class ToDo extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			todo: {}
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.addFocus = this.addFocus.bind(this);
        this.deleteFocus = this.deleteFocus.bind(this);
	}

	// Modal
	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	// Local Storage
    componentDidMount() {
        try {
          const value = localStorage.getItem('todo');
      
          if (value) {
            console.log(value);
          }
        } catch (e) {
          // Do nothing
		}
		console.log('test');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.todo !== this.state.todo.length) {
            localStorage.setItem('todo', this.state.todo);
        }
        console.log(`Focus is ${this.state.todo}`);
    }

    // Grabs the input
    addFocus(e) {
        e.preventDefault();
		console.log(`focus added`);
    }

    // Handles removal of Focus field
    deleteFocus() {
        console.log(`focus deleted`);
    }
    
	render() {
		return (
			<div className="ToDo">
				<span onClick={this.handleOpenModal}>Todo</span>
				<Modal
					className="ToDo__Modal"
					overlayClassName="Overlay"
					isOpen={this.state.showModal}
					onRequestClose={this.handleCloseModal}
				>
					{/* Modal Content */}
					<div className="ToDo__Modal__Content">
                        <p>2 to do</p>
                        <div className="ToDo__List">
                            <input type="checkbox" id="react" name="todo" value="Learn React"></input>
                            <label htmlFor="react">Learn React</label>
                        </div>
                        <div className="ToDo__List">
                            <input type="checkbox" id="chingu" name="todo" value="Chingu Project"></input>
                            <label htmlFor="chingu">Chingu Project</label>
                        </div>
						<input type="text" name="todo" placeholder="New Todo"/>
					</div>
				</Modal>
			</div>
		);
	}
}

export default ToDo;