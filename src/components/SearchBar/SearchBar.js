import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    value: ""
  };

  timeout = null;

  doSearch = event => {
    this.setState({
      value: event.target.value
    });
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value);
    }, 500);
  };
  render() {
    return (
      <div className="searchBar-container">
        <div className="ui inverted transparent icon input searchBar-content">
          <input
            type="text"
            className="searchBar-input"
            placeholder="Szukaj"
            onChange={this.doSearch}
            value={this.state.value}
            className="searchBar-input"
          />
          <i className="search icon"></i>
        </div>
      </div>
    );
  }
}

export default SearchBar;
