import React from "react";
import MainWeather from "./MainWeather";
import "../styles/Weather.css";

import WeatherModal from "./WeatherModal";

class Weather extends React.Component {
  state = {
    showModal: false
  };

  handleOpenModal = () => { this.setState({ showModal: true }); console.log('open') };

  handleCloseModal = () => { this.setState({ showModal: false }); };

  render() {
    const { showModal } = this.state;

    return (
      <div id="Weather">
        <MainWeather handleOpenModal={this.handleOpenModal} />
        <WeatherModal 
          isActive={showModal} 
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}

export default Weather;