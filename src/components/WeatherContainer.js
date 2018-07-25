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
      newLocation: {},
      message: '',
      unit: false,
			// 👆 false: Fahrenheit, true: Celsius
			convertToC: this.convertToC,
			handleTempUnit: this.handleTempUnit,
			handleChangeLocation: this.handleChangeLocation,
      handleSubmitLocation: this.handleSubmitLocation,
      handleGeoLocation: this.handleGeoLocation
		};
  }

  convertToC = temp => parseInt((temp - 32) / 1.8);
  
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
    this.setState({
      newLocation: { city: e.target.value } });
  };

  handleSubmitLocation = e => {
    e.preventDefault();
    this.getWeatherByCity(this.state.newLocation.city);
  };

  handleGeoLocation = () => {
    console.log('c')
    this.setState({ message: "Loading..." });
    this.getGeoLocation();
  }

	componentDidMount() {
		// Calls the api every hour
		this.intervalId = setInterval(() => this.getGeoLocation(), 3600000);
		this.loadState();
  }

	loadState = async () => {
		try {
			const state = await localStorage.getItem("state");
			if (state) {
				const parsedState = JSON.parse(state);
				const { location, currentWeather, forecastWeather, unit, newLocation } = parsedState;

				this.setState({
					location,
					currentWeather,
					forecastWeather,
          unit,
          newLocation
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
        let data = json.query.results.channel;
        let { forecast } = data.item;
        console.log(data.item.condition.date);
  
        this.setState({
          message: '',
          location: {
            city: data.location.city,
            countryCode: `, ${data.title.split(", ").pop()}`
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
        this.setNewLocation();
        this.saveState(this.state);
        console.log(this.state);
      })
      .catch(err => {
        this.setState({ message: 'not found' });
        console.log(err);
      });
  };
  
  setNewLocation = () => {
    this.setState({ newLocation: {...this.state.location} });
  }

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