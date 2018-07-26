import React from "react";
import "../styles/Quote.css";

import { TiHeartOutline, TiHeartFullOutline } from "react-icons/lib/ti";
import FaTwitter from "react-icons/lib/fa/twitter";
import GoQuote from "react-icons/lib/go/quote";

function Quote({ quote, author, isClicked, toggleHeart, shareOnTwitter }) {
	return (
		<div id="Quotes">
			<div className="Quote__Container">
				<p>
					<span>
						<GoQuote />
					</span>
					{quote}
				</p>
			</div>
			<div className="Action__Container">
				<Actions
					author={author}
					isClicked={isClicked}
          toggleHeart={toggleHeart}
          shareOnTwitter={shareOnTwitter}
				/>
			</div>
		</div>
	);
}

function Actions({ isClicked, author, toggleHeart, shareOnTwitter }) {
	return (
		<div id="Actions">
			<span className="Actions__Name">{author}</span>
			<span className="Actions__Heart" onClick={() => toggleHeart()}>
				{isClicked ? <TiHeartFullOutline /> : <TiHeartOutline />}
			</span>
      <span className="Actions__Twitter" onClick={() => shareOnTwitter()}>
				<FaTwitter />
			</span>
		</div>
	);
}



export default Quote;