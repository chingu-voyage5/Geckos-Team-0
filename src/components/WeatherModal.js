import React, { Fragment } from "react";
import Store from "../store";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";
import Modal from "react-modal";

function WeatherModal(props) {
  const {
    isActive,
    showForm,
    handleCloseModal,
    handleLocationForm,
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
                  showForm={showForm}
                  handleLocationForm={handleLocationForm}
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
  const {
    city,
    countryCode,
    weatherCode,
    temperature,
    weather,
    unit,
    convertToC,
    handleLocationForm,
    showForm
  } = props;

  // handleFocus: function(event) {
  //   event.target.select();
  // },

  // render: function() {
  //   return (
  //     <input type='text' value='Some something' onFocus={this.handleFocus} />
  //   );
  // },
  return (
    <div className="CurrentWeather__Container">
      <div className="CurrentWeather__Wrapper">
        <div className="CurrentWeather__Top">
          <div className="current-location">
            <span>
              {city}, {countryCode}
              {/* {showForm ? <LocationForm /> : `${city}, ${countryCode}`} */}
            </span>
            <span onClick={(e) => console.log(e.currentTarget)}>
              O
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

function LocationForm() {
  return (
    <form onSubmit={(e) => { e.preventDefault; console.log(e.target.value) }}>
      <input type="text" name="current-city" />
    </form>
  );
}

function ForecastWeather(props) {
  const { data, unit, convertToC } = props;
  // console.log("data", data);

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