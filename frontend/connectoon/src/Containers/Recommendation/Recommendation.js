import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = { dummyState: true };
  }

  render() {
    const { dummyState } = this.state;
    return (
      <div className="recommendation">
        {dummyState && 'This is recommendation'}
      </div>
    );
  }
}

export default Recommendation;
