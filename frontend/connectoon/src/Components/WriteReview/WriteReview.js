import React from 'react';
import PropTypes from 'prop-types';
import './WriteReview.css';

const WriteReview = (props) => {
  const { className } = props;

  return (
    <div className={className}>
      <h3 className="work-write-review-header">Write Review</h3>
      <div className="title-and-score-region">
        <label className="review-title-label">
          Title&nbsp;
          <input type="text" className="review-title-input" name="review-title" />
        </label>
        <label className="review-score-label">
          Score&nbsp;
          <input type="number" className="review-score-input" name="review-score" />
        </label>
      </div>
      <div className="content-and-button-region">
        <label className="review-content-label">
          Content&nbsp;
          <textarea className="review-content-input" name="review-content" rows="5" />
        </label>
        <button type="button" className="confirm-button">Confirm</button>
      </div>
    </div>
  );
};

WriteReview.propTypes = {
  className: PropTypes.string.isRequired,
};

export default WriteReview;
