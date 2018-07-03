import React from "react";
import "../styles/Weather.css";

import Shower from "react-icons/lib/ti/weather-shower";
import Modal from "react-modal";

const GEO_CODING_API_KEY = process.env.REACT_APP_GEO_CODING_API_KEY;
const WEATHER_API_KEY    = process.env.REACT_APP_WEATHER_API_KEY;

class Weather extends React.Component {
	constructor() {
		super();
		this.state = {
      showModal: false,
      city: null,
      country: null,
      temperature: null,
      weather: null
		};
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let { latitude, longitude } = position.coords;
      this.callGeoApi(latitude, longitude);
    });
  };

  callGeoApi = (lat, lon) => {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${GEO_CODING_API_KEY}`)
      .then(response => response.json())
      .then(json => {
        let cityName = json.results[0].components.city
        this.getWeather(cityName);
      }
    );
  };

  getWeather = (cityName) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}`)
			.then(response => response.json())
			.then(json => {
        console.log(json)
				this.setState({
          city: json.name,
          country: json.sys.country,
					weather: json.weather[0].main,
					temperature: json.main.temp
				});
			});
  }

	handleOpenModal = () => { this.setState({ showModal: true }); }

	handleCloseModal = () => { this.setState({ showModal: false }); }

	render() {
    const { city, country, weather, temperature } = this.state;
    console.log(city, country, weather, temperature);
		return (
			<div id="Weather">
        <div onClick={this.handleOpenModal}>
          <div className="Weather__Row">
            <Shower />
            <Temp temp={Math.floor(temperature - 273.15)}/>
          </div>
          <div className="Weather__Row">
            <Location currentCity={city} currentCountry={country}/>
          </div>
        </div>

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
                  <span id="Current__Location">{city}, {country}</span>
                  <span id="Current__Weather">{weather}</span>
                </div>
                <div className="Weather__Wrapper">
                  <Shower id="Weather__Icon" />
                  <span id="Current__Temp">{Math.floor(temperature - 273.15)}°</span>
                </div>
              </div>
              <span id="Temp__Convert">°C</span>
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
			</div>
		);
	}
}

function Temp({temp}) {
	return (
		<div id="Temp">
			<span>{temp}°</span>
		</div>
	);
}

function Location({ currentCity, currentCountry }) {
	return (
		<div id="Location">
			<span>
				{currentCity}, {currentCountry}
			</span>
		</div>
	);
}

function DailyWeather() {
  return (
      <div className="Daily__Weather__Wrapper">
        <span className="Day">TUE</span>
        <div className="Daily__Weather">
          <Shower />
          <span id="Temp_High">19°</span>
          <span id="Temp__Low">19°</span>
        </div>
      </div>
  );
}

Modal.setAppElement("#root");
export default Weather;
