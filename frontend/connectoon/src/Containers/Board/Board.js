import React, { Component } from 'react';
import { batch, connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import './Board.css';

import BoardReview from '../../Components/BoardReview/BoardReview';

class Board extends Component {
  componentDidMount() {
    this.props.onGetBoardReviews();
  }

  onClickReview = (workId) => {
    this.props.history.push('/works/' + String(workId));
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

  onClickLikeReview(id) {
    this.props.onPutLike(id)
      .then(() => {
        this.props.onGetBoardReviews();
      });
  }

  onClickUnlikeReview(id) {
    this.props.onUnputLike(id)
      .then(() => {
        this.props.onGetBoardReviews();
      });
  }

  render() {
    const { boardReviews, loggedInUser } = this.props;

    const reviewLists = boardReviews?.map((review) => {
      return (
        <BoardReview
          key={String(review.id)}
          className="board-review"
          review={review}
          onClickReview={(workId) => this.onClickReview(workId)}
          isMyReview={loggedInUser && loggedInUser.id === review.author.id}
          onClickSaveReview={(title, content, score) => this.onClickSaveReview(review.id, title, content, score)}
          onClickDeleteReview={() => this.onClickDeleteReview(review.id)}
          onClickLikeReview={() => this.onClickLikeReview(review.id)}
          onClickUnlikeReview={() => this.onClickUnlikeReview(review.id)}
          clickedLike={review.clickedLike}
        />);
    });

    return (
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boardReviews: state.review.boardReviews,
    loggedInUser: state.user.loggedInUser,
    clickedLike: state.review.clickedLike,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetBoardReviews: () => dispatch(actionCreators.getBoardReviews()),
    onEditReview: (id, reviewData) => dispatch(actionCreators.editReview(id, reviewData)),
    onDeleteReview: (id) => dispatch(actionCreators.deleteReview(id)),
    onPutLike: (id) => dispatch(actionCreators.putLike(id)),
    onUnputLike: (id) => dispatch(actionCreators.unputLike(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
