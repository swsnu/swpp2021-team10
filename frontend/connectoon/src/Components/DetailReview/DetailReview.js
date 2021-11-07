import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DetailReview extends Component {
  constructor(props) {
    super(props);
    this.state = { dummyState: true };
  }

  render() {
    const { className } = this.props;
    const { dummyState } = this.state;
    return (
      <div className={className}>
        {dummyState && 'This is DetailReview.'}
      </div>
    );
  }
}

DetailReview.propTypes = {
  className: PropTypes.string.isRequired,
};

export default DetailReview;
