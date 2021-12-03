import React, { Component } from 'react';
import './DetailReview.css';

class DetailReview extends Component {
  constructor(props) {
    super(props);
    const { review, clickedLike } = this.props;
    this.state = {
      editMode: false,
      clickedLike,
      title: review.title,
      content: review.content,
      score: String(review.score.toFixed(1)),
      likes: review.likes,
    };
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickUnlike = this.onClickUnlike.bind(this);
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

  onClickDelete() {
    const { onClickDeleteReview } = this.props;
    onClickDeleteReview();
  }

  onClickSave() {
    this.setState({ editMode: false });
    const { title, content, score } = this.state;
    const { onClickSaveReview } = this.props;
    onClickSaveReview(title, content, parseFloat(score));
  }

  onClickBack() {
    const { review } = this.props;
    this.setState({
      editMode: false, title: review.title, content: review.content, score: String(review.score.toFixed(1)),
    });
  }

  render() {
    const { className, review, editable } = this.props;
    const {
      editMode, title, content, score, likes, clickedLike,
    } = this.state;
    const heart = clickedLike ? '/images/fullHeart.png' : '/images/emptyHeart.png';
    const titleElement = editMode ?
      <input
        className="detail-review-title-input"
        value={title}
        onChange={(event) => this.setState({ title: event.target.value })}
      /> : <h4 className="detail-review-title">{title}</h4>;
    const scoreElement = editMode ? (
      <label className="detail-review-score-label">
        Score&nbsp;
        <select className="detail-review-score-select" name="review-score" defaultValue={score} onChange={(event) => this.setState({ score: event.target.value })}>
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
    ) : (
      <div>
        <img className="detail-review-score-star-icon" src="/images/ratingStar.png" alt="star" />
        <h5 className="detail-review-score-value">{parseFloat(score).toFixed(1)}</h5>
        <button className="detail-review-like-button" type="button" onClick={clickedLike ? this.onClickUnlike : this.onClickLike}>
          <img className="detail-review-like-heart-icon" src={heart} alt="like" />
        </button>
        <h5 className="detail-review-like-value">{likes}</h5>
      </div>
    );
    const contentElement = editMode ?
      <textarea
        className="detail-review-content-input"
        value={content}
        onChange={(event) => this.setState({ content: event.target.value })}
      /> : <p className="detail-review-content">{content}</p>;
    const buttonElement = editMode ?
      <div className="detail-review-save-back-region">
        <button
          className="detail-save-button"
          type="button"
          disabled={title.match(/^\s*$/g) || content.match(/^\s*$/g)}
          onClick={() => this.onClickSave()}
        >
          save
        </button>
        <button className="detail-back-button" type="button" onClick={() => this.onClickBack()}>back</button>
      </div> :
      <div className="detail-review-edit-delete-region">
        <button className="detail-edit-button" type="button" onClick={() => this.onClickEdit()}>edit</button>
        <button className="detail-delete-button" type="button" onClick={() => this.onClickDelete()}>delete</button>
      </div>;

    return (
      <div className={className}>
        <table className="detail-review-table">
          <tbody>
            <tr className="detail-review-row-1">
              <td className="detail-review-col">
                <img className="detail-user-profile-image" src="/images/dummyAccountIcon.jpeg" alt="user-profile" />
                <h5 className="detail-username">{review.author.username}</h5>
                {titleElement}
              </td>
              <td className="detail-review-col">
                {scoreElement}
              </td>
            </tr>
            <tr className="detail-review-row-2">
              <td className="detail-review-col">
                {contentElement}
              </td>
              <td className="detail-review-col">
                {editable && buttonElement}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DetailReview;
