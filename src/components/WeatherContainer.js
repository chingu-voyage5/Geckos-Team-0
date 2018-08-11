import React, { Fragment } from "react";
import Weather from "./Weather";
import Store from "../store";
import "../styles/Weather.css";

class WeatherContainer extends React.Component {
    constructor() {
        super();
	    this.state = {
            unit: false,
            // 👆 false: Fahrenheit, true: Celsius
            message: '',
	        location: {},
            buildTime: null,
            newLocation: {},
	        currentWeather: {},
            forecastWeather: {},
	        convertToC: this.convertToC,
	        handleTempUnit: this.handleTempUnit,
            handleGeoLocation: this.handleGeoLocation,
	        handleChangeLocation: this.handleChangeLocation,
            handleSubmitLocation: this.handleSubmitLocation
        };
    }

    convertToC = temp => Math.round((temp - 32) * 5 / 9);

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
            newLocation: { city: e.target.value } 
        });
    };

    handleSubmitLocation = e => {
        e.preventDefault();
        this.getWeatherByCity(this.state.newLocation.city);
    };

    handleGeoLocation = () => {
        this.setState({ message: "Loading..." });
        this.getGeoLocation();
    }

    componentDidMount() {
        this.loadWeather();
        this.callEveryHour();
    }

    loadWeather = async () => {
        try {
            const weatherObj = await localStorage.getItem("weatherObj");
            const parsedWeather = JSON.parse(weatherObj);
            const timeNow = this.changeTimeFormat(new Date());

            // If weather has saved from last time, set the data to its state
            if (weatherObj) {
                const {
                    unit, location, buildTime, newLocation, currentWeather, forecastWeather 
                } = parsedWeather;

                this.setState({
                    unit,
                    location,
                    buildTime,
                    newLocation,
                    currentWeather,
                    forecastWeather
                });
                console.log("Loading state - from localStorage", new Date());
                // if the saved weather is older, then get latest weather with a location which is set before. 
                if (buildTime !== timeNow) {
                  this.getWeatherByCity(location.city);
                  console.log("Loading state - getWeatherByCity", this.state, new Date());
                }
            // if it's first time (there is no saved weather), get location and weather
            } else {
                this.getGeoLocation();
                console.log('Loading state - getGeoLocation', new Date())
            }
        } catch (err) {
	        console.log(err);
	    } 
    };

    callEveryHour = () => {
        const currentMinutes = (new Date()).getMinutes();
        const timeLeft = (60 - currentMinutes) * 60000;
        // const cityName = this.state.location.city;
        // console.log('cityName', cityName)

        // console.log("callEveryHour", new Date());
        setTimeout(() => {
            // console.log("callEveryHour - setTimeout - getWeatherByCity", new Date());
            // this.getWeatherByCity(cityName);
            this.getGeoLocation()
            setInterval(() => {
                // console.log("callEveryHour - setInterval - getWeatherByCity", new Date());
                // this.getWeatherByCity(cityName);
                this.getGeoLocation()
            }, 3600000);
        }, timeLeft);
    };

    saveState = weatherState => {
        localStorage.setItem("weatherObj", JSON.stringify(weatherState));
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
	        // console.log(json);
            const data = json.query.results.channel;
            const { forecast } = data.item;
            const buildTime = this.changeTimeFormat(new Date());
  
            this.setState({
                buildTime,
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
            console.log("Loading from new api call", this.state.buildTime, new Date());
        })
        .catch(err => {
            this.setState({ message: 'not found' });
            console.log(err);
        });
    };
  
    setNewLocation = () => {
        this.setState({ newLocation: { ...this.state.location } });
    }

    changeTimeFormat = time => {
        // formatted YYYY-M-D-H or YYYY-MM-DD-HH
        return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}-${time.getHours()}`;
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
