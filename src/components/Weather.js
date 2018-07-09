import React from "react";
import MainWeather from "./MainWeather";
import "../styles/Weather.css";

import WeatherModal from "./WeatherModal";

class Weather extends React.Component {
	state = {
    showModal: false,
    showForm: false
	};

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
  }; 
  
  handleLocationForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }


	render() {
		const { showModal, showForm } = this.state;

		return (
			<div id="Weather">
				<MainWeather handleOpenModal={this.handleOpenModal} />
				<WeatherModal
					isActive={showModal}
          showForm={showForm}
          handleCloseModal={this.handleCloseModal}
          handleLocationForm={this.handleLocationForm}
				/>
			</div>
		);
	}
}

export default Weather;