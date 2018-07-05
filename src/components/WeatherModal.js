import React from "react";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";
import Modal from "react-modal";

function WeatherModal(props) {
  const { isActive, handleCloseModal } = props;

  return (
    <Modal 
      className="Weather--Modal" 
      overlayClassName="Overlay" 
      isOpen={isActive} 
      onRequestClose={() => handleCloseModal()}
    >
      <div className="Modal__Content">
        <CurrentWeather />
        <div className="ForecastWeather__Container">
          <ForecastWeather />
          <ForecastWeather />
          <ForecastWeather />
          <ForecastWeather />
          <ForecastWeather />
        </div>
      </div>
    </Modal>
  );
}

function CurrentWeather() {
  return (
    <div className="CurrentWeather__Container">
      <div className="CurrentWeather__Wrapper">
        <div className="CurrentWeather__Top">
          <span className="current-location">
            {/* {city}, {countryCode} */}
          </span>
          <span className="current-weather">
            {/* {weather} */}
          </span>
        </div>
        <div className="CurrentWeather__Bottom">
          <WeatherIcon name="yahoo" iconId={"1"} />
          <span className="current-temp">
            {/* {temperature}° */}
          </span>
        </div>
      </div>
      <span className="temp-unit">
        °C
      </span>
    </div>
  );
}

function ForecastWeather() {
	return (
    <div className="ForecastWeather__Wrapper">
			<span className="day">TUE</span>
      <div className="weather">
				<span className="temp-high">19°</span>
				<span className="temp-low">19°</span>
			</div>
		</div>
	);
}

Modal.setAppElement("#root");
export default WeatherModal;