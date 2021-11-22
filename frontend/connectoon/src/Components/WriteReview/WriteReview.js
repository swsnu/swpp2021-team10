import React, { Component } from 'react';
import './WriteReview.css';

class WriteReview extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', content: '', score: '5.0' };

    this.onClickConfirm = this.onClickConfirm.bind(this);
  }

  onClickConfirm() {
    const { title, content, score } = this.state;
    const { onClickReviewConfirm } = this.props;
    onClickReviewConfirm(title, content, parseFloat(score));
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
            <select className="write-review-score-select" name="review-score" defaultValue="5.0" onChange={(event) => this.setState({ score: event.target.value })}>
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
        <div className="content-and-button-region">
          <label className="write-review-content-label">
            Content&nbsp;
            <textarea className="write-review-content-input" name="review-content" onChange={(event) => this.setState({ content: event.target.value })} />
          </label>
          <button
            type="button"
            className="write-review-confirm-button"
            disabled={title.match(/^\s*$/g) || content.match(/^\s*$/g) || !loggedInUser}
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
