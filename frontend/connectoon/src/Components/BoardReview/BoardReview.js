import React, { Component } from 'react';
import WorkThumbnail from '../WorkThumbnail/WorkThumbnail';
import './BoardReview.css';

class BoardReview extends Component {
  constructor(props) {
    super(props);
    const { review, clickedLike } = this.props;
    this.state = {
      editMode: false,
      title: review.title,
      content: review.content,
      score: String(review.score.toFixed(1)),
      likes: review.likes,
      clickedLike,
    };

    this.onClickLike = this.onClickLike.bind(this);
    this.onClickUnlike = this.onClickUnlike.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickLike() {
    const { onClickLikeReview, isLoggedIn } = this.props;
    if (isLoggedIn) {
      onClickLikeReview();
      const { likes, clickedLike } = this.state;
      this.setState({ likes: likes + 1, clickedLike: !clickedLike });
    }
  }

  onClickUnlike() {
    const { onClickUnlikeReview } = this.props;
    onClickUnlikeReview();
    const { likes, clickedLike } = this.state;
    this.setState({ likes: likes - 1, clickedLike: !clickedLike });
  }

  onClickEdit() {
    this.setState({ editMode: true });
  }

  onClickBack() {
    const { review } = this.props;
    this.setState({
      editMode: false, title: review.title, content: review.content, score: String(review.score.toFixed(1)),
    });
  }

  onClickThisReview = (workId) => {
    const { onClickReview } = this.props;
    onClickReview(workId);
  }

  onClickSave() {
    this.setState({ editMode: false });
    const { title, content, score } = this.state;
    const { onClickSaveReview } = this.props;
    onClickSaveReview(title, content, parseFloat(score));
  }

  onClickDelete() {
    const { onClickDeleteReview } = this.props;
    onClickDeleteReview();
  }

  render() {
    const {
      className, review, isMyReview,
    } = this.props;
    const {
      editMode, title, content, score, clickedLike, likes,
    } = this.state;
    const heart = clickedLike ? '/images/fullHeart.png' : '/images/emptyHeart.png';
    const platformMapper = ['/images/naver_logo.png', '/images/kakao_logo.png', '/images/lezhin_logo.png'];
    const reviewTitle = editMode ?
      <div className="review-title-input-wrapper" onClick={(e) => e.stopPropagation()}>
        <input
          className="review-title-input"
          value={title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />
      </div>
      : <h4 className="review-title">{title}</h4>;
    const buttonElement = editMode ? (
      <div className="board-review-button-region" onClick={(e) => e.stopPropagation()}>
        <button className="board-save-button" type="button" onClick={this.onClickSave}>save</button>
        <button className="board-back-button" type="button" onClick={this.onClickBack}>back</button>
      </div>
    ) : (
      <div className="board-review-button-region" onClick={(e) => e.stopPropagation()}>
        <button className="board-edit-button" type="button" onClick={this.onClickEdit}>edit</button>
        <button className="board-delete-button" type="button" onClick={this.onClickDelete}>delete</button>
      </div>
    );
    const reviewContent = editMode
      ? <div onClick={(e) => e.stopPropagation()}>
        <textarea
          className="review-content-input"
          value={content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
      </div>
      : <p className="review-content">{content}</p>;

    const reviewScore = editMode ? (
      <div>
        <label className="detail-review-score-label">
          Score&nbsp;
          <select className="detail-review-score-select" key={score} name="review-score" defaultValue={score} onChange={(event) => this.setState({ score: event.target.value })}>
            <option value="0.5">0.5</option>
            <option value="1.0">1.0</option>
            <option value="1.5">1.5</option>
            <option value="2.0">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
            <option value="4.5">4.5</option>
            <option value="5.0">5.0</option>
          </select>
        </label>
      </div>
    ) : (
      <div>
        <div className="review-score">
          <img className="review-score-star-icon" src="/images/ratingStar.png" alt="star" />
          <h5 className="review-value score">{score}</h5>
        </div>
        <div className="review-likes">
          <button className="review-like-button" type="button" onClick={clickedLike ? this.onClickUnlike : this.onClickLike}>
            <img className="review-like-heart-icon" src={heart} />
          </button>
          <h5 className="review-value like">{likes}</h5>
        </div>
      </div>
    );

    return (
      <tr className={className} onClick={() => this.onClickThisReview(review.work.id)}>
        <td className="board-review thumbnail">
          <WorkThumbnail className="work-thumbnail" src={review.work.thumbnail_picture} platform={platformMapper[review.work.platform_id]} />
        </td>
        <td className="board-review detail">
          <h3 className="work-title">{review.work.title}</h3>
          <div className="review-score-likes-wrapper" onClick={(e) => e.stopPropagation()}>
            {reviewScore}
          </div>
          <div className="profile-title-wrapper">
            <img className="user-profile-image" src="/images/dummyAccountIcon.jpeg" alt="user-profile" />
            <div className="author-name">{review.author.username}</div>
            {reviewTitle}
            {isMyReview ? buttonElement : null}
          </div>
          {reviewContent}

        </td>

      </tr>);
  }
}

export default BoardReview;
