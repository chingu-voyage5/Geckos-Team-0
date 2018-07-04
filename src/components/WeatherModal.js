import React from "react";
import Weather from ".Weather.js";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";
import Modal from "react-modal";

class WeatherModal extends React.Component {
  render() {
    return (
      <Modal 
        className="Weather__Modal" 
        overlayClassName="Overlay" 
        isOpen={this.state.showModal} 
        onRequestClose={this.handleCloseModal}
      >
        <div className="Modal__Content">
          <div className="Current__Weather__Container">
            <div className="Current__Weather__Wrapper">
              <div className="Current__Weather__Head">
                <span className="current__location">
                  {city}, {countryCode}
                </span>
                <span className="current__weather">{weather}</span>
              </div>
              <div className="Weather__Wrapper">
                <WeatherIcon name="yahoo" iconId={id} />
                <span className="current__temp">{temperature}°</span>
              </div>
            </div>
            <span className="temp__convert">°C</span>
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
    );
  }
}

Modal.setAppElement("#root");
export default Weather;