import React from "react";
import "../styles/Quotes.css";

import { TiHeartOutline, TiHeartFullOutline } from "react-icons/lib/ti";
import FaTwitter from "react-icons/lib/fa/twitter";
import GoQuote from "react-icons/lib/go/quote";

class Quotes extends React.Component {
	constructor(props) {
		super(props);
		this.state = { quote: "", author: "" };
	}

	componentDidMount() {
		this.getQuote();
	}

	getQuote = () => {
		const endPoint = "https://talaikis.com/api/quotes/random/";

		fetch(endPoint)
			.then(response => response.json())
			.then(json => {
				console.log(json);
				const { quote, author } = json;
        this.setState({ quote, author });
        console.log(this.state);
				// this.saveQuote(this.state);
			})
			.catch(err => {
				console.log(err);
			});
	};

	// saveQuote = quoteState => {
  //   localStorage.setItem("quote", JSON.stringify(quoteState));
  // }

	render() {
		return (
			<div id="Quotes">
				<div className="Quote__Container">
					<p>
						<span>
							<GoQuote />
						</span>Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
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