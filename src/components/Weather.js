import React from "react";
import MainWeather from "./MainWeather";
import "../styles/Weather.css";

import WeatherModal from "./WeatherModal";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      editLocation: false,
    };
  }

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
  }; 
  
  handleLocationIcon = () => {
    this.setState({ editLocation: !this.state.editLocation });
    console.log(this.state.editLocation)
  }

	render() {
    const { showModal, editLocation } = this.state;

		return (
			<div id="Weather">
				<MainWeather handleOpenModal={this.handleOpenModal} />
				<WeatherModal
					isActive={showModal}
          editLocation={editLocation}
          handleCloseModal={this.handleCloseModal}
          handleLocationIcon={this.handleLocationIcon}
				/>
			</div>
		);
	}
}

export default Weather;