import React, { Fragment } from "react";
import Store from "../store";
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
			<Store.Consumer>
				{store => {
					const { city, countryCode } = store.location;
					const { weatherCode, temperature, weather } = store.currentWeather;
          const { day1, day2, day3, day4, day5 } = store.forecastWeather;
          const { unit, convertToC } = store;

          return (
						<Fragment>
							<div className="Modal__Content">
								<CurrentWeather
									city={city}
									countryCode={countryCode}
									weatherCode={weatherCode}
									temperature={temperature}
                  weather={weather}
                  unit={unit}
                  convertToC={store.convertToC}
								/>
								<div className="ForecastWeather__Container">
									<ForecastWeather data={day1} unit={unit} convertToC={convertToC} />
                  <ForecastWeather data={day2} unit={unit} convertToC={convertToC} />
                  <ForecastWeather data={day3} unit={unit} convertToC={convertToC} />
                  <ForecastWeather data={day4} unit={unit} convertToC={convertToC} />
                  <ForecastWeather data={day5} unit={unit} convertToC={convertToC} />
								</div>
							</div>
						</Fragment>
					);
				}}
			</Store.Consumer>
		</Modal>
	);
}


function CurrentWeather(props) {
  const { city, countryCode, weatherCode, temperature, weather, unit, convertToC } = props;

	return <div className="CurrentWeather__Container">
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
            {unit ? convertToC(temperature) : temperature}°
          </span>
				</div>
			</div>
      <Store.Consumer>
        {store => (
            <span 
              className="temp-unit" 
              onClick={() => store.handleTempUnit()}
            >
              °C
              {console.log(store.unit)}
            </span>
          )
        }
      </Store.Consumer>
		</div>;
}

function ForecastWeather(props) {
  const { data, unit, convertToC } = props;
  console.log("data", data);

	return (
		<div className="ForecastWeather__Wrapper">
      <span className="day">
        {data.day}
      </span>
			<div className="weather">
        <WeatherIcon name="yahoo" iconId={data.code} />
        <span className="temp-high">
          {unit ? convertToC(data.high) : data.high}°
        </span>
        <span className="temp-low">
          {unit ? convertToC(data.low) : data.low}°
        </span>
			</div>
		</div>
	);
}

Modal.setAppElement("#root");
export default WeatherModal;