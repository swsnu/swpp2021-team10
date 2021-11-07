import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BoardReview extends Component {
  constructor(props) {
    super(props);
    this.state = { dummyState: true };
  }

  render() {
    const { className } = this.props;
    const { dummyState } = this.state;
    return (
      <div className={className}>
        <img className="user-profile-image" src="/images/dummyAccountIcon.jpeg" alt="user-profile" />
        <h5 className="userrname">username</h5>
        <h5 className="last-updated-time">lastupdatedtime</h5>
        <h4 className="review-title">reviewtitle</h4>
        <input className="review-title-input" />
        <p className="review-content">reviewcontent</p>
        <textarea className="review-content-input" />
        <img className="review-score-star-icon" src={null} alt="star" />
        <h5 className="review-score-value">reviewscorevalue</h5>
        <button className="review-like-button" type="button">reviewlikebutton</button>
        <h5 className="review-like-value">reviewlikevalue</h5>
        <label className="review-score-label">
          reviewscorelabel
          <input className="review-score-input" />
        </label>
        <button className="review-more-button" type="button">reviewmorebutton</button>
        <button className="edit-button" type="button">edit</button>
        <button className="delete-button" type="button">delete</button>
        <button className="save-button" type="button">save</button>
        <button className="back-button" type="button">back</button>
      </div>
    );
  }
}

BoardReview.propTypes = {
  className: PropTypes.string.isRequired,
};

export default BoardReview;
