import React from "react";
import "../styles/Quotes.css";

import { FaTwitter, FaHeartO, FaHeart } from "react-icons/lib/fa";

class Quotes extends React.Component {
  render() {
    return (
      <div id="Quotes">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <Actions />
      </div>
    );
  }
}

class Actions extends React.Component {
  constructor() {
    super();
    this.state = {
      isFull: false
    };

    this.toggleHeart = this.toggleHeart.bind(this);
  }

  toggleHeart() {
    this.setState({
      isFull: !this.state.isFull
    });
  }

  render() {
    const { isFull } = this.state;
  
    return (
      <div id="Actions">
        <span id="Name">Author Name</span>
        <span 
          className="Heart" 
          onClick={this.toggleHeart}
        >
          { isFull ? <FaHeart /> : <FaHeartO /> }
        </span>
        <span id="Twitter"><FaTwitter /></span>
      </div>
    );
  }
}

export default Quotes;