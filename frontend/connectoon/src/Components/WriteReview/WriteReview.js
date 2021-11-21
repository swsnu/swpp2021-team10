import React, { Component } from 'react';
import './WriteReview.css';

class WriteReview extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', content: '', score: '' };

    this.onClickConfirm = this.onClickConfirm.bind(this);
  }

  onClickConfirm() {
    const { title, content, score } = this.state;
    const { onClickReviewConfirm } = this.props;
    onClickReviewConfirm(title, content, score);
  }

  render() {
    const { className, loggedInUser } = this.props;
    const { title, content } = this.state;
    return (
      <div className={className}>
        <h3 className="work-write-review-header">Write Review</h3>
        <div className="title-and-score-region">
          <label className="write-review-title-label">
            Title&nbsp;
            <input type="text" className="write-review-title-input" name="review-title" onChange={(event) => this.setState({ title: event.target.value })} />
          </label>
          <label className="write-review-score-label">
            Score&nbsp;
            <input
              type="number"
              id="write-review-score-input"
              className="write-review-score-input"
              name="review-score"
              min="0.5"
              max="5.0"
              placeholder="5.0"
              step="0.5"
              required
              onChange={(event) => this.setState({ score: String(event.target.value) })}
            />
            <span className="write-review-score-input-validity" />
          </label>
        </div>
        <div className="content-and-button-region">
          <label className="write-review-content-label">
            Content&nbsp;
            <textarea className="write-review-content-input" name="review-content" onChange={(event) => this.setState({ content: event.target.value })} />
          </label>
          <button
            type="button"
            className="write-review-confirm-button"
            disabled={title.match(/^\s*$/g) || content.match(/^\s*$/g) || !document.getElementById('write-review-score-input').validity.valid || !loggedInUser}
            onClick={this.onClickConfirm}
          >
            {loggedInUser ? 'Confirm' : 'Please Login'}
          </button>
        </div>
      </div>
    );
  }
}

export default WriteReview;
