import React from "react";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";
import Modal from "react-modal";

class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      showModal: false,
      id: "0",
      city: null,
      region: null,
      countryCode: null,
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
      this.getWeather(latitude, longitude);
		});
  };
  
  getWeather = (lat, lon) => {
    const searchText = `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${lat},${lon})")`;
    const endPoint = `https://query.yahooapis.com/v1/public/yql?q=${searchText}&format=json`;
    
    fetch(endPoint)
			.then(response => response.json())
      .then(json => {
        console.log(json)
        let data = json.query.results.channel;
        this.setState({
					id: data.item.condition.code,
          city: data.location.city,
          countryCode: data.title.split(", ").pop(),
					temperature: data.item.condition.temp,
					weather: data.item.condition.text
				});
        console.log(this.state.temperature, this.state.weather, this.state.id, this.state.city, this.state.countryCode, json);
      });
  };

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	render() {
    const { id, city, countryCode, weather, temperature } = this.state;
		// console.log(city, country, weather, temperature);
		return <div id="Weather">
				<div onClick={this.handleOpenModal}>
					<div className="Weather__Row">
						<WeatherIcon name="yahoo" iconId={id} />
						<Temp temp={temperature} />
					</div>
					<div className="Weather__Row">
						<Location currentCity={city} currentCountry={countryCode} />
					</div>
				</div>

				<Modal className="Weather__Modal" overlayClassName="Overlay" isOpen={this.state.showModal} onRequestClose={this.handleCloseModal}>
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
			</div>;
	}
}

function Temp({temp}) {
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

function DailyWeather() {
  return (
      <div className="Daily__Weather__Wrapper">
        <span className="day">TUE</span>
        <div className="Daily__Weather">
          
          <span className="temp_high">19°</span>
          <span className="temp__low">19°</span>
        </div>
      </div>
  );
}

Modal.setAppElement("#root");
export default Weather;
