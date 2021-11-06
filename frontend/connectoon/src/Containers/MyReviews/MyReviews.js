import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = { dummyState: true };
  }

  render() {
    const { dummyState } = this.state;
    return (
      <div className="myreviews">
        {dummyState && 'This is MyReviews'}
      </div>
    );
  }
}

export default MyReviews;
