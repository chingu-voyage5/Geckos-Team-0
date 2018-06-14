import React from 'react';
import "../styles/Search.css";

import FaSearch from "react-icons/lib/fa/search";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
    };
    this.toggleShowForm = this.toggleShowForm.bind(this);
  }

  toggleShowForm(e) {
    e.preventDefault();
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    const { showForm } = this.state;

    return (
      <div id="Search">
        <span onClick={this.toggleShowForm}>
          <FaSearch />
        </span>
        {showForm && <SearchForm />}
      </div>
    );
  }
}

class SearchForm extends React.Component {
  render() {
    return (
      <div id="Search__Form">
        <form action="#">
          <input type="text" name="search"/>
        </form>
      </div>
    );
  }
}

export default Search;