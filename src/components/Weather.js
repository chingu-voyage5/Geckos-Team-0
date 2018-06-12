import React from 'react';
import '../styles/Weather.css';
import Shower from "react-icons/lib/ti/weather-shower";

class Weather extends React.Component {
  render() {
    return (
      <div id="Weather">
        <div class="Weather__Row">
          <Shower />
          <Degree />
        </div>
        <div class="Weather__Row">
          <Location />
        </div>
      </div>
    );
  }
}

function Degree() {
  return (
    <div id="Degree">
      <span>19°</span>
    </div>
  );
}

function Location() {
  return (
    <div id="Location__Name">
      <span>Location</span>
    </div>
  );
}

export default Weather;
