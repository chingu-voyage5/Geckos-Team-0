import React from "react";
import Quote from "./Quote";
import "../styles/Quote.css";

class QuoteContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
      quote: "", 
      author: "",
      isClicked: false
    };
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

  toggleHeart = () => {
    this.setState({ isClicked: !this.state.isClicked });
  }

	render() {
    const { quote, author, isClicked } = this.state;

		return <Quote quote={quote} author={author} isClicked={isClicked} toggleHeart={this.toggleHeart} />;
	}
}


export default QuoteContainer;