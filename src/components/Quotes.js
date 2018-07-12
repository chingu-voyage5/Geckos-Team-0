import React from "react";
import "../styles/Quotes.css";

import { TiHeartOutline, TiHeartFullOutline } from "react-icons/lib/ti";
import FaTwitter from "react-icons/lib/fa/twitter";
import GoQuote from "react-icons/lib/go/quote";

class Quotes extends React.Component {
	render() {
		return (
			<div id="Quotes">
				<div className="Quote__Container">
					<p>
            <span><GoQuote /></span>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
				</div>
        {/* <div className="Quote__Container slide-down"> */}

				<div className="Action__Container">
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
				<span className="Actions__Name">Author Name</span>
        <span className="Actions__Heart" onClick={this.toggleHeart}>
					{isFull ? <TiHeartFullOutline /> : <TiHeartOutline />}
				</span>
        <span className="Actions__Twitter">
					<FaTwitter />
				</span>
			</div>
		);
	}
}

export default Quotes;
