import React, { Fragment } from "react";
import Store from "../store";
import PropTypes from "prop-types";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";
import { FaPencil, FaLocationArrow } from "react-icons/lib/fa";
import Modal from "react-modal";

class WeatherModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: '',
            selected: null,
            editLocation: false
        };
    }

    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        handleCloseModal: PropTypes.func.isRequired
    };

    handleEditLocation = () => {
        this.setState({ editLocation: !this.state.editLocation });
    };

    handleDisplay = e => {
        const day = e.currentTarget.dataset.key;
        this.setState({ selected: day, day });
    };

    render() {
        const { isActive, handleCloseModal } = this.props;
        const { editLocation, day, selected } = this.state;

        return (
            <Modal
                className="Weather--Modal"
                overlayClassName="Overlay"
                isOpen={isActive}
                onRequestClose={() => handleCloseModal()}
            >
            <Store.Consumer>
                {store => {
                    const { unit, convertToC, forecastWeather } = store;

                    return (
                        <Fragment>
                            <div className="Modal__Content">
                                <CurrentWeather
                                    unit={unit}
                                    convertToC={convertToC}
                                    editLocation={editLocation}
                                    handleEditLocation={this.handleEditLocation}
                                    day={day}
                                />
                                <ul className="ForecastWeather__Container">
                                    {Object.keys(forecastWeather).map((key, index) => {
                                        const data = forecastWeather[key];
                                        const addClass = selected === key && "selected";

                                        return (
                                            <li
                                                className={`ForecastWeather__Column ${addClass}`}
                                                data-key={key}
                                                onClick={e => this.handleDisplay(e)}
                                                key={index}
                                            >
                                                <ForecastWeather
                                                    data={data}
                                                    unit={unit}
                                                    convertToC={convertToC}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </Fragment>
                    );
                }}
            </Store.Consumer>
            </Modal>
        );
    }
}

function CurrentWeather(props) {
    const { day, unit, convertToC, editLocation, handleEditLocation } = props;

    return (
        <Store.Consumer>
            {store => {
                const { currentWeather, handleTempUnit, handleGeoLocation, message } = store;
                const { city, countryCode } = store.location;
                const forecastWeather = store.forecastWeather[day];
                
                return (
                    <div className="CurrentWeather__Container">
                        <div className="CurrentWeather__Wrapper">
                            <div className="CurrentWeather__Top">
                                <div className="current-location">
                                    {editLocation ?
                                        <RenderForm 
                                            city={city}
                                            countryCode={countryCode}
                                            handleEditLocation={handleEditLocation}
                                        />
                                        :
                                        <span>
                                            {city}{countryCode}
                                        </span>
                                    }
                                    {message && 
                                        <span className="message">
                                            {message}
                                        </span>
                                    } 
                                    {editLocation ? (
                                        <span 
                                            className="location-icon" 
                                            onClick={() => {handleGeoLocation(); handleEditLocation()}}
                                        >
                                            <FaLocationArrow />
                                        </span>
                                    ) : (
                                        <span className="location-icon" onClick={() => handleEditLocation()}>
                                            <FaPencil />
                                        </span>
                                    )}
                                </div>
                            </div>
                            {forecastWeather && (day !== "day1") ? 
                                <RenderForecastData 
                                    forecastWeather={forecastWeather} 
                                    unit={unit} 
                                    convertToC={convertToC} 
                                />
                            : 
                                <RenderCurrentData 
                                    currentWeather={currentWeather} 
                                    unit={unit} 
                                    convertToC={convertToC} 
                                />
                            }
                        </div>
                            <span className="temp-unit" onClick={() => handleTempUnit()} >
                                {unit ? "°C" : "°F"}
                            </span>
                    </div>
                );
            }}
        </Store.Consumer>
    );
}

function RenderForm({ city, countryCode, handleEditLocation }) {
    return (
        <Store.Consumer>
            {store => {
                const { handleChangeLocation, handleSubmitLocation } = store;
                return (
                    <div>
                        <form onSubmit={(e) => { handleSubmitLocation(e); handleEditLocation() }}>
                            <input
                                className="location-input"
                                type="text"
                                placeholder={`${city}${countryCode}`}
                                onChange={(e) => handleChangeLocation(e)}
                            />
                        </form>
                    </div>
                );
            }}
        </Store.Consumer>
    );
}

function RenderForecastData({ unit, convertToC, forecastWeather }) {
    const { text, code, high, low } = forecastWeather;

    return (
        <Fragment>
            <span className="current-weather">
                {text}
            </span>
            <div className="CurrentWeather__Bottom">
                <WeatherIcon name="yahoo" iconId={code} />
                <span className="current-temp-high">
                    {unit ? convertToC(high) : high}°
                </span>
                <span className="current-temp-low">
                    {unit ? convertToC(low) : low}°
                </span>
            </div>
        </Fragment>
    );
}

function RenderCurrentData({ currentWeather, unit, convertToC }) {
    const { weatherCode, temperature, weather } = currentWeather;

    return (
        <Fragment>
            <span className="current-weather">{weather}</span>
            <div className="CurrentWeather__Bottom">
                <WeatherIcon name="yahoo" iconId={weatherCode} />
                <span className="current-temp">
                    {unit ? convertToC(temperature) : temperature}°
                </span>
            </div>
        </Fragment>
    );
}

function ForecastWeather({ data, unit, convertToC }) { 
    const { code, high, low } = data;
    return (
        <div className="ForecastWeather__Wrapper">
        <span className="day">
            {data.day}
        </span>
        <div className="weather">
            <WeatherIcon name="yahoo" iconId={code} />
            <span className="temp-high">
                {unit ? convertToC(high) : high}°
            </span>
            <span className="temp-low">
                {unit ? convertToC(low) : low}°
            </span>
        </div>
        </div>
    );
}

// PropTypes for the functional components

CurrentWeather.propTypes = {
    day: PropTypes.string.isRequired,
    unit: PropTypes.bool.isRequired,
    convertToC: PropTypes.func.isRequired,
    editLocation: PropTypes.bool.isRequired,
    handleEditLocation: PropTypes.func.isRequired
};

RenderForm.propTypes = {
    city: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    handleEditLocation: PropTypes.func.isRequired
};

RenderForecastData.propTypes = {
    unit: PropTypes.bool.isRequired,
    convertToC: PropTypes.func.isRequired,
    forecastWeather: PropTypes.shape({
        text: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        high: PropTypes.string.isRequired,
        low: PropTypes.string.isRequired
    })
};

RenderCurrentData.propTypes = {
    unit: PropTypes.bool.isRequired,
    convertToC: PropTypes.func.isRequired,
    currentWeather: PropTypes.shape({
        weatherCode: PropTypes.string.isRequired,
        temperature: PropTypes.string.isRequired,
        weather: PropTypes.string.isRequired
    })
};

ForecastWeather.propTypes = {
    unit: PropTypes.bool.isRequired,
    convertToC: PropTypes.func.isRequired,
    data: PropTypes.shape({
        code: PropTypes.string.isRequired,
        high: PropTypes.string.isRequired,
        low: PropTypes.string.isRequired
    })
};

Modal.setAppElement("#root");
export default WeatherModal;