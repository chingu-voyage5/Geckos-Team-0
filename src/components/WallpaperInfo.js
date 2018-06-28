import React from 'react';
import "../styles/WallpaperInfo.css";

import { TiHeartOutline, TiHeartFullOutline } from "react-icons/lib/ti";

class WallpaperInfo extends React.Component {
	constructor() {
		super();
		this.state = { isFull: false };

		this.toggleHeart = this.toggleHeart.bind(this);
	}

	toggleHeart() {
    this.setState({ isFull: !this.state.isFull });
  }
  
	render() {
    const { isFull } = this.state;

		return (
      <div id="WallpaperInfo">
        <div className="place">
          <span>Mexico city, Mexico</span>
        </div>
				<div className="source">
          <a className="wiki-link" href="#"> 
            <span className="name">Photo by, Full Name</span>
          </a>
					<span className="icon" onClick={this.toggleHeart}>
						{isFull ? <TiHeartFullOutline /> : <TiHeartOutline />}
					</span>
				</div>
      </div>
    );
	}
}

export default WallpaperInfo;