import React from "react";
import "../styles/Links.css";

import Modal from "react-modal";
import { FaChrome, FaTh } from "react-icons/lib/fa";

class Links extends React.Component {
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
			<div id="Links">
				<span onClick={this.handleOpenModal}>Links</span>
				<Modal
					className="Links__Modal"
					overlayClassName="Overlay"
					isOpen={this.state.showModal}
					onRequestClose={this.handleCloseModal}
				>
					{/* Modal Content */}
					<div className="Links__Modal__Content">
						<ul>
							<li className="Links__List">
								<a href="#">
									<FaChrome />
									Chrome Tab
								</a>
							</li>
							<li className="Links__List">
								<a href="chrome://apps/">
									<FaTh />
									Apps
								</a>
							</li>
						</ul>
						<p>New Link</p>
					</div>
				</Modal>
			</div>
		);
	}
}

export default Links;
