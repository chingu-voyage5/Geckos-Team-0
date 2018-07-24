import React, { Fragment } from "react";
import Weather from "./Weather";
import Store from "../store";
import "../styles/Weather.css";

class WeatherContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			location: {},
			currentWeather: {},
			forecastWeather: {},
			// 👇 false: Fahrenheit, true: Celsius
      unit: false,
      error: '',
			handleTempUnit: this.handleTempUnit,
			convertToC: this.convertToC,
			handleChangeLocation: this.handleChangeLocation,
			handleSubmitLocation: this.handleSubmitLocation
		};
	}

	componentDidMount() {
		// Calls the api every hour
		this.intervalId = setInterval(() => this.getGeoLocation(), 3600000);
		this.loadState();
		// console.log(this.state)
	}

	loadState = async () => {
		try {
			const state = await localStorage.getItem("state");
			if (state) {
				const parsedState = JSON.parse(state);
				// console.log(parsedState)
				const { location, currentWeather, forecastWeather, unit } = parsedState;

				this.setState({
					location,
					currentWeather,
					forecastWeather,
					unit
				});
			} else {
				this.getGeoLocation();
			}
		} catch (err) {
			console.log(err);
		}
	};

	saveState = state => {
		localStorage.setItem("state", JSON.stringify(state));
	};

	handleTempUnit = () => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				unit: !this.state.unit
			};
			this.saveState(newState);
			return { ...newState };
		});
	};

	handleChangeLocation = e => {
		// e.preventDefault();
		this.setState({
			location: {
				city: e.target.value,
				countryCode: ""
			}
		});
	};

	handleSubmitLocation = e => {
		e.preventDefault();
    console.log(this.state.location);
    this.getWeatherByCity(this.state.location.city);
	};

	convertToC = temp => parseInt((temp - 32) / 1.8);

	getGeoLocation = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				let { latitude, longitude } = position.coords;
        this.getWeatherByGeo(latitude, longitude);
			},
			error => console.log(error)
		);
	};

	getWeatherByCity = cityName => {
    const searchText = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="(${cityName})")`;
		this.getWeather(searchText);
  };
  
  getWeatherByGeo = (lat, lon) => {
    const searchText = `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${lat},${lon})")`;
    this.getWeather(searchText);
  }

	getWeather = (searchText) => {
		const endPoint = `https://query.yahooapis.com/v1/public/yql?q=${searchText}&format=json`;

		fetch(endPoint)
			.then(response => response.json())
			.then(json => {
				console.log(json);
				// date:"23 Jul 2018"
        if (json.query.results === null || !json.query.results.channel.location) {
          this.setState({ error: "not found"})
          console.log('not found')
        } else {
          let data = json.query.results.channel;
          let { forecast } = data.item;
          console.log(data.item.condition.date);
  
          this.setState({
            location: {
              city: data.location.city,
              countryCode: data.title.split(", ").pop()
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
            }
          });
  
          this.saveState(this.state);
          console.log(this.state);
        }
			});
	};

	render() {
		return (
			<Fragment>
				<Store.Provider value={this.state}>
					<Weather />
				</Store.Provider>
			</Fragment>
		);
	}
}

export default WeatherContainer;