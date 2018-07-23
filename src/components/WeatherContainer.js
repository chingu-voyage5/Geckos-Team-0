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
      unit: false,
      // false: Fahrenheit, true: Celcius
      handleTempUnit: this.handleTempUnit,
      convertToC: this.convertToC
    };
  }
  
  
  componentDidMount() {
    this.getGeoLocation();
    // console.log(this.state)
  }
  
  handleTempUnit = () => {
    this.setState({
      unit: !this.state.unit
    });
  };
  
  convertToC = temp => parseInt((temp - 32) / 1.8); 
   
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
      // console.log(json);
      let data = json.query.results.channel;
      let { forecast } = data.item;
      
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
        },
      });
      // console.log(this.state)
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