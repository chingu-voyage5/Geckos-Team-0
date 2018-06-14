import React from 'react';
import Modal from "react-modal";
import "../styles/ToDo.css";


class ToDo extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}
	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
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
                            <label for="react">Learn React</label>
                        </div>
                        <div className="ToDo__List">
                            <input type="checkbox" id="chingu" name="todo" value="Chingu Project"></input>
                            <label for="chingu">Chingu Project</label>
                        </div>
						<input type="text" name="todo" placeholder="New Todo"/>
					</div>
				</Modal>
			</div>
		);
	}
}

export default ToDo;