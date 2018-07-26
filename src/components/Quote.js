import React from "react";
import "../styles/Quote.css";

import { TiHeartOutline, TiHeartFullOutline } from "react-icons/lib/ti";
import FaTwitter from "react-icons/lib/fa/twitter";
import GoQuote from "react-icons/lib/go/quote";

function Quote(props) {
  const { quote, author, isClicked, toggleHeart } = props;

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
        <Actions author={author} isClicked={isClicked} toggleHeart={toggleHeart} />
      </div>
    </div>
  );
}

function Actions(props) {
  const { isClicked, author, toggleHeart } = props;

  return (
    <div id="Actions">
      <span className="Actions__Name">
        {author}
      </span>
      <span 
        className="Actions__Heart" 
        onClick={() => toggleHeart()}
      >
        {isClicked ? <TiHeartFullOutline /> : <TiHeartOutline />}
      </span>
      <span className="Actions__Twitter">
        <FaTwitter />
      </span>
    </div>
  );
}

export default Quote;