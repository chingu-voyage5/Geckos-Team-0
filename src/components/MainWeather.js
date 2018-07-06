import React from "react"; 
import Store from "../store";
import "../styles/Weather.css";
import WeatherIcon from "react-icons-weather";



function MainWeather(props) {
  const { handleOpenModal } = props;

  return (
    <div
      className="Weather--Main"
      onClick={() => handleOpenModal()}
    >
      <div className="Weather--Main__Row">
        <WeatherIcon name="yahoo" iconId={"0"} />
        <Temp temp={"temp"} />
      </div>
      <div className="Weather--Main__Row">
        <Location currentCity={"city"} currentCountry={"country"} />
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

export default MainWeather;