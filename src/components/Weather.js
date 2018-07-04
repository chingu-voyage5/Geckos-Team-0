import React from "react";
import "../styles/Weather.css";

import Shower from "react-icons/lib/ti/weather-shower";
import Modal from "react-modal";

const GEO_CODING_API_KEY = process.env.REACT_APP_GEO_CODING_API_KEY;

class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
      city: null,
      state: null,
      country_code: null,
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
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${GEO_CODING_API_KEY}`
    )
      .then(response => response.json())
      .then(json => {
        let { city, state, country_code } = json.results[0].components;
        this.setState({ city, state, country_code });
        this.getWeather(city, state);
        // console.log(this.state.city, this.state.state, country_code);
      });
  };

  getWeather = (city, region) => {
    const searchText = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text= "${city}, ${region}")`;
    const endPoint = `https://query.yahooapis.com/v1/public/yql?q=${searchText}&format=json`;
    
    fetch(endPoint)
			.then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({
					temperature: json.query.results.channel.item.condition.temp,
          weather: json.query.results.channel.item.condition.text
        });
        console.log(this.state.temperature, this.state.weather);
      });
  };

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	render() {
    const { city, country_code, weather, temperature } = this.state;
		// console.log(city, country, weather, temperature);
		return (
			<div id="Weather">
				<div onClick={this.handleOpenModal}>
					<div className="Weather__Row">
						<Shower />
						<Temp temp={temperature} />
					</div>
					<div className="Weather__Row">
            <Location currentCity={city} currentCountry={country_code} />
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
									<span className="current__location">
                    {city}, {country_code}
									</span>
									<span className="current__weather">{weather}</span>
								</div>
								<div className="Weather__Wrapper">
									<Shower id="Weather__Icon" />
									<span className="current__temp">
										{temperature}°
									</span>
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
			</div>
		);
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
          <Shower />
          <span className="temp_high">19°</span>
          <span className="temp__low">19°</span>
        </div>
      </div>
  );
}

Modal.setAppElement("#root");
export default Weather;
