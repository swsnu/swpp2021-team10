import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WorkThumbnail from '../WorkThumbnail/WorkThumbnail';
import './BoardReview.css';

class BoardReview extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false, clickLike: false };

    this.onClickLike = this.onClickLike.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
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
    const {
      className, review,
    } = this.props;
    const {
      editMode, clickLike,
    } = this.state;
    const heart = clickLike ? '/images/fullHeart.png' : '/images/emptyHeart.png';
    const platformMapper = ['/images/naver_logo.png', '/images/kakao_logo.png', '/images/lezhin_logo.png'];
    const reviewTitle = editMode ? <input className="review-title-input" /> : <h4 className="review-title">{review.title}</h4>;
    const buttonElement = editMode ? (
      <div className="board-review-button-region">
        <button className="detail-save-button" type="button">save</button>
        <button className="detail-back-button" type="button" onClick={this.onClickBack}>back</button>
      </div>
    ) : (
      <div className="board-review-button-region">
        <button className="detail-edit-button" type="button" onClick={this.onClickEdit}>edit</button>
        <button className="detail-delete-button" type="button">delete</button>
      </div>
    );

    return (
      <tr className={className}>
        <td className="board-review thumbnail">
          <WorkThumbnail className="work-thumbnail" src={review.work.thumbnail_image} platform={platformMapper[review.work.platform_id]} />
        </td>
        <td className="board-review detail">
          <div className="board-review-header">
            <h3 className="work-title">{review.work.title}</h3>
            <div className="review-score-likes-wrapper">
              <div className="review-score">
                <img className="review-score-star-icon" src="/images/ratingStar.png" alt="star" />
                <h5 className="review-value score">{review.score}</h5>
              </div>
              <div className="review-likes">
                <button className="review-like-button" type="button" onClick={this.onClickLike}>
                  <img className="review-like-heart-icon" src={heart} />
                </button>
                <h5 className="review-value like">{review.likes}</h5>
              </div>
            </div>
          </div>
          <div className="profile-title-button-wrapper">
            <div className="profile-title-wrapper">
              <img className="user-profile-image" src="/images/dummyAccountIcon.jpeg" alt="user-profile" />
              <div className="author-name">{review.author.username}</div>
              {reviewTitle}
            </div>
            {buttonElement}
          </div>
          {
            editMode
              ? <input className="review-content-input" />
              : <p className="review-content">{review.content}</p>
          }

        </td>

      </tr>);
  }
}
BoardReview.propTypes = {
  className: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  likes: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default BoardReview;
