import React from "react";
import "../styles/Quotes.css";

import { TiHeartOutline, TiHeartFullOutline } from "react-icons/lib/ti";
import FaTwitter from "react-icons/lib/fa/twitter";
import GoQuote from "react-icons/lib/go/quote";

class Quotes extends React.Component {
	constructor() {
		super();
		this.state = { isHovered: false };

		this.toggleHover = this.toggleHover.bind(this);
	}

	toggleHover() {
		this.setState({ isHovered: !this.state.isHovered });
	}

	render() {
		const actionClass = this.state.isHovered ? "slide-down" : "";
		const quoteClass = this.state.isHovered ? "slide-up" : "";
		return (
			<div
				id="Quotes"
				onMouseEnter={this.toggleHover}
				onMouseLeave={this.toggleHover}
			>
        {/* 👇 When mouse enters #Quotes, add "slide-down" and "slide-up" classes */}
        {/* <div className="Quote__Container slide-up"> */}
        
				<div className={`Quote__Container ${quoteClass}`}>
					<span>
						<GoQuote />
					</span>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</div>
        {/* <div className="Quote__Container slide-down"> */}

				<div className={`Action__Container ${actionClass}`}>
					<Actions />
				</div>
			</div>
		);
	}
}

class Actions extends React.Component {
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
			<div id="Actions">
				<span id="Name">Author Name</span>
				<span className="Heart" onClick={this.toggleHeart}>
					{isFull ? <TiHeartFullOutline /> : <TiHeartOutline />}
				</span>
				<span id="Twitter">
					<FaTwitter />
				</span>
			</div>
		);
	}
}

export default Quotes;
