import React from "react";
import "../styles/Weather.css";

import Shower from "react-icons/lib/ti/weather-shower";
import Modal from "react-modal";

const GEO_CODING_API_KEY = process.env.REACT_APP_GEO_CODING_API_KEY;

class Weather extends React.Component {
	constructor() {
		super();
		this.state = {
      showModal: false,
      currentCity: null
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude);
      this.getCityName(position.coords.latitude, position.coords.longitude);
    });
  };

  getCityName = (lat, lon) => {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${GEO_CODING_API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        currentCity: json.results[0].components.city
      });
    });
  };

	handleOpenModal() {
		this.setState({ showModal: true });
	}

	handleCloseModal() {
		this.setState({ showModal: false });
	}

	render() {
    const { currentCity } = this.state;
		return (
			<div id="Weather">
        <div onClick={this.handleOpenModal}>
          <div className="Weather__Row">
            <Shower />
            <Temp />
          </div>
          <div className="Weather__Row">
            <Location location={currentCity}/>
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
                  <span id="Current__Location">{currentCity}</span>
                  <span id="Current__Weather">Rain</span>
                </div>
                <div className="Weather__Wrapper">
                  <Shower id="Weather__Icon" />
                  <span id="Current__Temp">19°</span>
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

function Temp() {
	return (
		<div id="Temp">
			<span>19°</span>
		</div>
	);
}

function Location({location}) {
	return (
		<div id="Location">
      <span>{location}</span>
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
