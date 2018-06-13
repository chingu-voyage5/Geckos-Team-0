import React from 'react';
import '../styles/Weather.css';

import Shower from "react-icons/lib/ti/weather-shower";
import ReactModal from "react-modal";

class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
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
      <div id="Weather">
				<div className="Weather__Row" onClick={this.handleOpenModal}>
					<Shower />
					<Degree />
				</div>
				<div className="Weather__Row">
					<Location />
				</div>
        <ReactModal
          isOpen={this.state.showModal} 
          onRequestClose={this.handleCloseModal}
          className="Modal"
          overlayClassName="Overlay" 
        >
          <p>Weather</p>
        </ReactModal>
      </div>
    );
  }
}

function Degree() {
  return (
    <div id="Degree">
      <span>19°</span>
    </div>
  );
}

function Location() {
  return (
    <div id="Location__Name">
      <span>Location</span>
    </div>
  );
}

export default Weather;