import React from "react";
import Store from "../store";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";
import Modal from "react-modal";

/*
location: {
  city: data.location.city,
    countryCode: data.title.split(", ").pop()
},
currentWeather: {
  weatherCode: data.item.condition.code,
    temperature: data.item.condition.temp,
      weather: data.item.condition.text
},
*/

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
				<Store.Consumer>
					{store => {
						// let data = JSON.stringify(store);
						const { city, countryCode } = store.location;
						const { weatherCode, temperature, weather } = store.currentWeather;
						// console.log("data", data["location"]);
						// console.log(city, countryCode);
						return (
							<CurrentWeather
								city={city}
								countryCode={countryCode}
								weatherCode={weatherCode}
								temperature={temperature}
								weather={weather}
							/>
						);
					}}
				</Store.Consumer>
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

function CurrentWeather(props) {
  const {city, countryCode, weatherCode, temperature, weather} = props;

	return (
		<div className="CurrentWeather__Container">
			<div className="CurrentWeather__Wrapper">
				<div className="CurrentWeather__Top">
					<span className="current-location">
						{city}, {countryCode}
					</span>
          <span className="current-weather">
            {weather}
          </span>
				</div>
				<div className="CurrentWeather__Bottom">
					<WeatherIcon name="yahoo" iconId={weatherCode} />
          <span className="current-temp">
            {temperature}°
          </span>
				</div>
			</div>
			<span className="temp-unit">°C</span>
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
