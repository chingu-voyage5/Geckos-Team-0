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
    this.loadQuote();
		// this.getQuote();
  }
  
  loadQuote = async () => {
    try {
      const quoteObj = await localStorage.getItem("quoteObj");
      if (quoteObj) {
        const parsedQuote = JSON.parse(quoteObj);
        const { quote, author } = parsedQuote;

        this.setState({ quote, author });
        console.log("loading from local storage", this.state);
      } else {
        this.getQuote();
      }
    } catch (err) {
      console.log(err);
    }
  };

	getQuote = () => {
		const endPoint = "https://talaikis.com/api/quotes/random/";

		fetch(endPoint)
			.then(response => response.json())
			.then(json => {
				console.log(json);
				const { quote, author } = json;
        this.setState({ quote, author });
        this.saveQuote(this.state);
        console.log("loading from state", this.state)
			})
			.catch(err => {
				console.log(err);
			});
	};

	saveQuote = quoteState => {
    localStorage.setItem("quoteObj", JSON.stringify(quoteState));
  };

	render() {
    const { quote, author } = this.state;

		return (
			<div id="Quotes">
				<div className="Quote__Container">
					<p>
						<span>
							<GoQuote />
						</span>{quote}
					</p>
				</div>
				<div className="Action__Container">
					<Actions author={author} />
				</div>
			</div>
		);
	}
}

class Actions extends React.Component {
	constructor(props) {
		super(props);
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
        <span className="Actions__Name">
          {this.props.author}
        </span>
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