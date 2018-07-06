import React from "react"; 
import Store from "../store";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";

function MainWeather(props) {
  const { handleOpenModal } = props;

  return (
    <Store.Consumer>
      {
        store => {
          const { weatherCode, temperature } = store.currentWeather;
          const { city, countryCode } = store.location;

          return (
            <div
              className="Weather--Main"
              onClick={() => handleOpenModal()}
            >
              <div className="Weather--Main__Row">
                <WeatherIcon name="yahoo" iconId={weatherCode || "32"} />
                <Temp temp={temperature} />
              </div>
              <div className="Weather--Main__Row">
                <Location currentCity={city} currentCountry={countryCode} />
              </div>
            </div>
          );
        }      
      }
    </Store.Consumer>
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

export default MainWeather;