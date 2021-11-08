import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DetailReview.css';

class DetailReview extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false, clickLike: false };
  }

  onClickLike() {
    const { clickLike } = this.state;
    this.setState({ clickLike: !clickLike });
    // TODO: + or - like number
  }

  onClickEdit() {
    this.setState({ editMode: true });
  }

  onClickBack() {
    this.setState({ editMode: false });
  }

  render() {
    const { className } = this.props;
    const { editMode, clickLike } = this.state;
    const heart = clickLike ? '/images/fullHeart.png' : '/images/emptyHeart.png';
    const titleElement = editMode ? <input className="review-title-input" /> : <h4 className="review-title">reviewtitle</h4>;
    const scoreElement = editMode ? (
      <label className="review-score-label">
        Score&nbsp;
        <input className="review-score-input" />
      </label>
    ) : (
      <div className="review-score-region">
        <h5 className="last-updated-time">lastupdatedtime</h5>
        <img className="review-score-star-icon" src="/images/ratingStar.png" alt="star" />
        <h5 className="review-score-value">4.9</h5>
        <button className="review-like-button" type="button" onClick={() => this.onClickLike()}>
          <img className="review-like-heart-icon" src={heart} alt="like" />
        </button>
        <h5 className="review-like-value">reviewlikevalue</h5>
      </div>
    );
    const contentElement = editMode ? <textarea className="review-content-input" /> : (
      <div className="review-content-region">
        <p className="review-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br />
          Sed eget urna a orci eleifend pharetra. Fusce mattis nisl lorem, quis vehicula sem auctor eu. Aliquam facilisis molestie libero, vitae rhoncus velit tempor non.
          <br />
          Sed finibus nisl quis sollicitudin tristique. Praesent id molestie tortor. Nam at porttitor enim, sed sodales elit.
          <br />
          Morbi vestibulum neque in eleifend lacinia. Vestibulum vitae neque ac justo rutrum dictum.
          <br />
          Donec commodo enim eu lacus malesuada commodo. Nunc dictum metus eget magna finibus consequat.
          <br />
          Etiam euismod ipsum nec blandit aliquam. Vestibulum scelerisque dui ac vehicula placerat.
          <br />
          Nam non libero mi. Nulla nec imperdiet magna. Morbi pulvinar pulvinar massa, ut vehicula risus volutpat euismod.
        </p>
      </div>
    );
    const buttonElement = editMode ? (
      <div className="review-button-region">
        <div className="review-save-back-region">
          <button className="save-button" type="button">save</button>
          <button className="back-button" type="button" onClick={() => this.onClickBack()}>back</button>
        </div>
      </div>
    ) : (
      <div className="review-button-region">
        <div className="review-edit-delete-region">
          <button className="edit-button" type="button" onClick={() => this.onClickEdit()}>edit</button>
          <button className="delete-button" type="button">delete</button>
        </div>
        <div className="review-more-region">
          <button className="review-more-button" type="button">more...</button>
        </div>
      </div>
    );

    return (
      <div className={className}>
        <div className="review-upper-region">
          <img className="user-profile-image" src="/images/dummyAccountIcon.jpeg" alt="user-profile" />
          <h5 className="username">username</h5>
          {titleElement}
          {scoreElement}
        </div>
        <div className="review-lower-region">
          {contentElement}
          {buttonElement}
        </div>
      </div>
    );
  }
}

DetailReview.propTypes = {
  className: PropTypes.string.isRequired,
};

export default DetailReview;
