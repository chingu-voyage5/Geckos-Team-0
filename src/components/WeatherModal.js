import React, { Fragment } from "react";
import Store from "../store";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";
import { FaPencil, FaLocationArrow } from "react-icons/lib/fa";
import Modal from "react-modal";

function WeatherModal(props) {
  const {
    isActive,
    editLocation,
    handleCloseModal,
    handleLocationIcon,
    handleDisplay,
    changeDisplay
  } = props;

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
          const { unit, convertToC, handleChangeLocation, handleSubmitLocation } = store;

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
                  convertToC={convertToC}
                  editLocation={editLocation}
                  handleLocationIcon={handleLocationIcon}
                  handleChangeLocation={handleChangeLocation}
                  handleSubmitLocation={handleSubmitLocation}
                />
                <div className="ForecastWeather__Container">
                  <div className="ForecastWeather__Row">
                    <ForecastWeather 
                      data={day1} 
                      unit={unit} 
                      convertToC={convertToC} 
                      handleDisplay={handleDisplay} 
                      // changeDisplay={changeDisplay}
                    />

                  </div>
                  <ForecastWeather 
                    data={day2} 
                    unit={unit} 
                    convertToC={convertToC} 
                    handleDisplay={handleDisplay}
                    changeDisplay={changeDisplay}
                  />
                  <ForecastWeather
                    data={day3}
                    unit={unit}
                    convertToC={convertToC}
                    handleDisplay={handleDisplay}
                    changeDisplay={changeDisplay}
                  />
                  <ForecastWeather
                    data={day4}
                    unit={unit}
                    convertToC={convertToC}
                    handleDisplay={handleDisplay}
                    changeDisplay={changeDisplay}
                  />
                  <ForecastWeather
                    data={day5}
                    unit={unit}
                    convertToC={convertToC}
                    handleDisplay={handleDisplay}
                    changeDisplay={changeDisplay}
                  />
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
  const {
    city,
    countryCode,
    weatherCode,
    temperature,
    weather,
    unit,
    convertToC,
    handleLocationIcon,
    editLocation,
    handleChangeLocation,
    handleSubmitLocation
  } = props;

  return (
    <div className="CurrentWeather__Container">
      <div className="CurrentWeather__Wrapper">
        <div className="CurrentWeather__Top">
          <div className="current-location">
            {
              editLocation ?
                <RenderForm 
                  city={city}
                  countryCode={countryCode}
                  handleChangeLocation={handleChangeLocation}
                  handleSubmitLocation={handleSubmitLocation}
                />
                :
                <RenderLocation
                  editLocation={editLocation}
                  city={city}
                  countryCode={countryCode}
                />
            }
            <span className="location-icon" onClick={() => handleLocationIcon()}>
              {editLocation ? <FaLocationArrow /> : <FaPencil />}
              {/* 
                When FaPencil clicked, select location which is editable and change to FaLocationArrow
                When clicking outside of the icon, back to FaPencil
                When FaLocationArrow clicked, run getGeoLocation func and change to FaPencil icon
               */}
            </span>
          </div>
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
            {unit ? "°C" : "°F"}
            {/* {console.log(store.unit)} */}
          </span>
        )
        }
      </Store.Consumer>
    </div>
  );
}

function RenderForm(props) {
  const { city, countryCode, handleChangeLocation, handleSubmitLocation } = props;
	return (
		<div>
      <form onSubmit={(e) => handleSubmitLocation(e)}>
        <input 
          className="location-input" 
          type="text" 
          // defaultValue={`${city}, ${countryCode}`}
          value={city}
          onChange={(e) => handleChangeLocation(e)}
        />
      </form>
		</div>
	);
}

function RenderLocation(props) {
	const { city, countryCode } = props;
	return (
		<span>
			{city}, {countryCode}
		</span>
	);
}

function ForecastWeather(props) {
  const { data, unit, convertToC, handleDisplay, changeDisplay } = props;
  // console.log("data", data);
  const addClass = changeDisplay ? "selected" : "";
  return (
    <div 
      className={`ForecastWeather__Wrapper ${addClass}`} 
      onClick={() => {handleDisplay()}}
    >
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


