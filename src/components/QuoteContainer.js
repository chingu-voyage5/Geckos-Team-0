import React from "react";
import Quote from "./Quote";
import "../styles/Quote.css";

class QuoteContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
      quoteText: "", 
      quoteAuthor: "",
      isClicked: false
    };
	}

	componentDidMount() {
    this.loadQuote();
  }

  loadQuote = async () => {
    try {
      const quoteObj = await localStorage.getItem("quoteObj");
      if (quoteObj) {
        const parsedQuote = JSON.parse(quoteObj);
        const { quoteText, quoteAuthor } = parsedQuote;

        this.setState({ quoteText, quoteAuthor });
        console.log("loading from local storage", this.state);
      } else {
        this.getQuote();
      }
    } catch (err) {
      console.log(err);
    }
  };

	getQuote = () => {
    // 👇 Enables cross-origin requests. More info: https://cors-anywhere.herokuapp.com/
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const endPoint = `https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;

    fetch(proxyUrl + endPoint)
			.then(response => response.json())
			.then(json => {
				console.log(json);
        const { quoteText, quoteAuthor } = json;
        this.setState({ quoteText, quoteAuthor });
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
    const { quoteText, quoteAuthor, isClicked } = this.state;

		return (
      <Quote 
        quote={quoteText} 
        author={quoteAuthor} 
        isClicked={isClicked} 
        toggleHeart={this.toggleHeart} 
      />
    );
	}
}

export default QuoteContainer;