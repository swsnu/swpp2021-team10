import React from 'react';
import PropTypes from 'prop-types';
import './WriteReview.css';

const WriteReview = (props) => {
  const { className } = props;

  return (
    <div className={className}>
      <h3 className="work-write-review-header">Write Review</h3>
      <div className="title-and-score-region">
        <label className="write-review-title-label">
          Title&nbsp;
          <input type="text" className="write-review-title-input" name="review-title" />
        </label>
        <label className="write-review-score-label">
          Score&nbsp;
          <input type="number" className="write-review-score-input" name="review-score" />
        </label>
      </div>
      <div className="content-and-button-region">
        <label className="write-review-content-label">
          Content&nbsp;
          <textarea className="write-review-content-input" name="review-content" />
        </label>
        <button type="button" className="write-review-confirm-button">Confirm</button>
      </div>
    </div>
  );
};

export default WriteReview;
