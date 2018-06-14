import React from 'react';
import "../styles/Search.css";

import FaSearch from "react-icons/lib/fa/search";

class Search extends React.Component {
  render() {
    return (
      <div id="Search">
        <span><FaSearch /></span>
      </div>
    );
  }
}

export default Search;