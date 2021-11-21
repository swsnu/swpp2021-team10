import React, { Component } from 'react';
import './DetailReview.css';

class DetailReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false, clickLike: false, title: '', content: '', score: '',
    };
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
    const { className, review, editable } = this.props;
    const { editMode, clickLike } = this.state;
    const heart = clickLike ? '/images/fullHeart.png' : '/images/emptyHeart.png';
    const titleElement = editMode ? <input className="detail-review-title-input" /> : <h4 className="detail-review-title">{review.title}</h4>;
    const scoreElement = editMode ? (
      <label className="detail-review-score-label">
        Score&nbsp;
        <input
          type="number"
          id="detail-review-score-input"
          className="detail-review-score-input"
          name="review-score"
          min="0.5"
          max="5.0"
          placeholder="5.0"
          step="0.5"
          required
          onChange={(event) => this.setState({ score: String(event.target.value) })}
        />
      </label>
    ) : (
      <div className="review-score-region">
        <img className="detail-review-score-star-icon" src="/images/ratingStar.png" alt="star" />
        <h5 className="detail-review-score-value">4.9</h5>
        <button className="detail-review-like-button" type="button" onClick={() => this.onClickLike()}>
          <img className="detail-review-like-heart-icon" src={heart} alt="like" />
        </button>
        <h5 className="detail-review-like-value">reviewlikevalue</h5>
      </div>
    );
    const contentElement = editMode ? <textarea className="detail-review-content-input" /> : (
      <div className="review-content-region">
        <p className="detail-review-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br />
          Sed eget urna a orci eleifend pharetra. Fusce mattis nisl lorem, quis vehicula sem auctor eu. Aliquam facilisis molestie libero, vitae rhoncus velit tempor non.
          <br />
          Sed finibus nisl quis sollicitudin tristique. Praesent id molestie tortor. Nam at porttitor enim, sed sodales elit. Morbi vestibulum neque in eleifend lacinia. Vestibulum vitae neque ac justo rutrum dictum.
          <br />
          Donec commodo enim eu lacus malesuada commodo. Nunc dictum metus eget magna finibus consequat.
        </p>
      </div>
    );
    const buttonElement = editMode ? (
      <div className="review-button-region">
        <div className="review-save-back-region">
          <button className="detail-save-button" type="button">save</button>
          <button className="detail-back-button" type="button" onClick={() => this.onClickBack()}>back</button>
        </div>
      </div>
    ) : (
      <div className="review-button-region">
        <div className="review-edit-delete-region">
          <button className="detail-edit-button" type="button" onClick={() => this.onClickEdit()}>edit</button>
          <button className="detail-delete-button" type="button">delete</button>
        </div>
        <div className="review-more-region">
          <button className="detail-review-more-button" type="button">more...</button>
        </div>
      </div>
    );

    return (
      <div className={className}>
        <div className="review-upper-region">
          <img className="detail-user-profile-image" src="/images/dummyAccountIcon.jpeg" alt="user-profile" />
          <h5 className="detail-username">username</h5>
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

export default DetailReview;
