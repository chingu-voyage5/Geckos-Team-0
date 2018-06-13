import React from "react";
import "../styles/Weather.css";

import Shower from "react-icons/lib/ti/weather-shower";
import Modal from "react-modal";

class Weather extends React.Component {
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
			<div id="Weather">
        <div onClick={this.handleOpenModal}>
          <div className="Weather__Row">
            <Shower />
            <Temp />
          </div>
          <div className="Weather__Row">
            <Location />
          </div>
        </div>

				<Modal
					className="Modal"
					overlayClassName="Overlay"
					isOpen={this.state.showModal}
					onRequestClose={this.handleCloseModal}
				>
					<div className="Modal__Content">
            <div className="Current__Weather__Container">
              <div className="Current__Weather__Wrapper">
                <div className="Current__Weather__Head">
                  <span id="Current__Location">Location</span>
                  <span id="Current__Weather">Rain</span>
                </div>
                <div className="Weather__Wrapper">
                  <Shower id="Weather__Icon" />
                  <span id="Current__Temp">19°</span>
                </div>
              </div>
              <span id="Temp__Convert">°C</span>
            </div>
            <div className="Daily__Weather__Container">
              <DailyWeather /> 
              <DailyWeather /> 
              <DailyWeather /> 
              <DailyWeather /> 
              <DailyWeather /> 
             </div>
					</div>
				</Modal>     
			</div>
		);
	}
}

function Temp() {
	return (
		<div id="Temp">
			<span>19°</span>
		</div>
	);
}

function Location() {
	return (
		<div id="Location">
			<span>Location</span>
		</div>
	);
}

function DailyWeather() {
  return (
      <div className="Daily__Weather__Wrapper">
        <span className="Day">TUE</span>
        <div className="Daily__Weather">
          <Shower />
          <span id="Temp_High">19°</span>
          <span id="Temp__Low">19°</span>
        </div>
      </div>
  );
}

Modal.setAppElement("#root");
export default Weather;
