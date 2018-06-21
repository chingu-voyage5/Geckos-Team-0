import React from 'react';
import Modal from "react-modal";
import "../styles/Settings.css";

class Settings extends React.Component {
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
			<div className="Settings">
				<span onClick={this.handleOpenModal}>Settings</span>
				<Modal
					className="Settings__Modal"
					overlayClassName="Overlay"
					isOpen={this.state.showModal}
					onRequestClose={this.handleCloseModal}
				>
					{/* Modal Content */}
					<div className="Settings__Modal__Content">
                        <div className="Settings__Left">
                            Settings will go here<br/><br/>
                        </div>
                        <div className="Settings__Right">
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur iure voluptas quod sapiente, pariatur dolor autem at ea perferendis ad unde culpa voluptatibus ullam nam fugiat voluptatem veritatis quaerat. Quae dolores minus assumenda nisi sunt doloribus impedit deserunt deleniti soluta placeat. Repellat asperiores necessitatibus numquam beatae, rerum error labore natus.
                            </div>
                            <br/><br/>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur iure voluptas quod sapiente, pariatur dolor autem at ea perferendis ad unde culpa voluptatibus ullam nam fugiat voluptatem veritatis quaerat. Quae dolores minus assumenda nisi sunt doloribus impedit deserunt deleniti soluta placeat. Repellat asperiores necessitatibus numquam beatae, rerum error labore natus.
                            </div>
                            <br/><br/>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur iure voluptas quod sapiente, pariatur dolor autem at ea perferendis ad unde culpa voluptatibus ullam nam fugiat voluptatem veritatis quaerat. Quae dolores minus assumenda nisi sunt doloribus impedit deserunt deleniti soluta placeat. Repellat asperiores necessitatibus numquam beatae, rerum error labore natus.
                            </div>
                            <br/><br/>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur iure voluptas quod sapiente, pariatur dolor autem at ea perferendis ad unde culpa voluptatibus ullam nam fugiat voluptatem veritatis quaerat. Quae dolores minus assumenda nisi sunt doloribus impedit deserunt deleniti soluta placeat. Repellat asperiores necessitatibus numquam beatae, rerum error labore natus.
                            </div>
                        </div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default Settings;