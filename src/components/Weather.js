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
      changeDisplay: false
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

  handleDisplay = () => {
    this.setState({ changeDisplay: !this.state.changeDisplay });
    console.log(this.state.changeDisplay)
  }

	render() {
    const { showModal, editLocation, changeDisplay } = this.state;

		return (
			<div id="Weather">
				<MainWeather handleOpenModal={this.handleOpenModal} />
				<WeatherModal
					isActive={showModal}
          editLocation={editLocation}
          changeDisplay={changeDisplay}
          handleCloseModal={this.handleCloseModal}
          handleLocationIcon={this.handleLocationIcon}
          handleDisplay={this.handleDisplay}
				/>
			</div>
		);
	}
}

export default Weather;