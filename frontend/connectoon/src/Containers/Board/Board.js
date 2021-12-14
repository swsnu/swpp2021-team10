import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import './Board.css';

import BoardReview from '../../Components/BoardReview/BoardReview';

class Board extends Component {
  componentDidMount() {
    this.props.onGetBoardReviews();
  }

  onClickReview(workId) {
    this.props.history.push(`/works/${workId}`);
  }

  onClickSaveReview(id, title, content, score) {
    this.props.onEditReview(id, { title, content, score });
  }

  onClickDeleteReview(id) {
    this.props.onDeleteReview(id)
      .then(() => {
        this.props.onGetBoardReviews();
      });
  }

  render() {
    const { boardReviews, loggedInUser } = this.props;

    const reviewLists = boardReviews?.map((review) => {
      return (
        <BoardReview
          key={review.id}
          className="board-review"
          review={review}
          onClickReview={(workId) => this.onClickReview(workId)}
          isMyReview={loggedInUser && loggedInUser.id === review.author.id}
          onClickSaveReview={(title, content, score) => this.onClickSaveReview(review.id, title, content, score)}
          onClickDeleteReview={() => this.onClickDeleteReview(review.id)}
          onClickLikeReview={() => this.props.onPostLike(review.id)}
          onClickUnlikeReview={() => this.props.onPostUnlike(review.id)}
          clickedLike={review.clickedLike && loggedInUser}
          isLoggedIn={!!loggedInUser}
        />
      );
    });

    return (
      <div className="board">
        <h1 className="board-page-title">
          Review board
        </h1>
        <table className="board-table">
          <thead className="board-header">
            <tr className="board-header-row">
              <th className="board-header work">Work</th>
              <th className="board-header review">Review</th>
            </tr>
          </thead>
          <tbody>
            {reviewLists}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boardReviews: state.review.reviews,
    loggedInUser: state.user.loggedInUser,
    clickedLike: state.review.clickedLike,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetBoardReviews: () => dispatch(actionCreators.getBoardReviews()),
    onEditReview: (id, reviewData) => dispatch(actionCreators.editReview(id, reviewData)),
    onDeleteReview: (id) => dispatch(actionCreators.deleteReview(id)),
    onPostLike: (id) => dispatch(actionCreators.postLike(id)),
    onPostUnlike: (id) => dispatch(actionCreators.postUnlike(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
