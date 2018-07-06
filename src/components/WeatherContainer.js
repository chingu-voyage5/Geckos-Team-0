import React, { Fragment } from "react";
import Weather from "./Weather";
import Store from "../store.js";
import "../styles/Weather.css";

class WeatherContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      location: {},
      currentWeather: {},
      forecastWeather: {}
		};
	}

	componentDidMount() {
		this.getGeoLocation();
	}

	getGeoLocation = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				let { latitude, longitude } = position.coords;
				this.getWeather(latitude, longitude);
			},
			error => console.log(error)
		);
	};

	getWeather = (lat, lon) => {
		const searchText = `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${lat},${lon})")`;
		const endPoint = `https://query.yahooapis.com/v1/public/yql?q=${searchText}&format=json`;

		fetch(endPoint)
			.then(response => response.json())
			.then(json => {
				console.log(json);
        let data = json.query.results.channel;
        let { forecast } = data.item;
        // location 
        // countryCode: data.title.split(", ").pop(),
				// city: data.location.city,
        // 
        // currentWeather 
        // weatherCode: data.item.condition.code,
        // temperature: data.item.condition.temp,
        // weather: data.item.condition.text
        this.setState({
          location: {
            countryCode: data.title.split(", ").pop(),
            city: data.location.city
          },
          currentWeather: {
            weatherCode: data.item.condition.code,
            temperature: data.item.condition.temp,
            weather: data.item.condition.text
          },
          forecastWeather: {
            day1: forecast[0],
            day2: forecast[1],
            day3: forecast[2],
            day4: forecast[3],
            day5: forecast[4]
          },
        });
        console.log(this.state)

				// this.setState({
        //   weatherCode: data.item.condition.code,
				// 	city: data.location.city,
				// 	countryCode: data.title.split(", ").pop(),
				// 	temperature: data.item.condition.temp,
				// 	weather: data.item.condition.text
				// });
				// console.log(
				// 	this.state.temperature,
				// 	this.state.weather,
				// 	this.state.id,
				// 	this.state.city,
				// 	this.state.countryCode,
				// 	json
				// );
			});
	};

	render() {
		// console.log(city, country, weather, temperature);
		return ( 
      <Fragment>
        <p>hi</p>
        {/* <Weather 
          city={city}
          country={countryCode}
          weather={weather}
          temp={temperature}
        /> */}
      </Fragment>
    );
	}
}

export default WeatherContainer;

/*
		this.state = {
			currentWeather: {
				weatherCode: "0",
				city: null,
				region: null,
				countryCode: null,
				temperature: null,
				weather: null
      },
      forecastWeather: {
        day1: currentWeather,
        day2: {},
        day3: {},
        day4: {},
        day5: {}
      }
*/