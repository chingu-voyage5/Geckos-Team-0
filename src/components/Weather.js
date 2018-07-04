import React from "react";
import WeatherModal from "./WeatherModal";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";

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
				<WeatherModal />
      </div>
    );
  }
}

function MainWeather({ handleOpenModal }) {
  return (
    <div 
      className="Weather--Main" 
      onClick={() => handleOpenModal()}
    >
      <div className="Weather--Main__Row">
        <WeatherIcon name="yahoo" iconId={"0"} />
        {/* <Temp temp={temperature} /> */}
      </div>
      <div className="Weather--Main__Row">
        {/* <Location currentCity={city} currentCountry={countryCode} /> */}
      </div>
    </div>
  );
}

function Temp({ temp }) {
  return (
    <div className="temp">
      <span>{temp}°</span>
    </div>
  );
}

function Location({ currentCity, currentCountry }) {
  return (
    <div className="location">
      <span>
        {currentCity}, {currentCountry}
      </span>
    </div>
  );
}

export default Weather;