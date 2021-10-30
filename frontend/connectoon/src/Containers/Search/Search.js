import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { dummyState: true };
  }

  render() {
    const { dummyState } = this.state;
    return (
      <div className="search">
        {dummyState && 'This is search'}
      </div>
    );
  }
}

export default Search;
