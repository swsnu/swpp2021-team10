import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import * as actionCreators from '../../store/actions/index';
import './Board.css';
import BoardReview from '../../Components/BoardReview/BoardReview';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false, targetReviewId: null };
  }

  componentDidMount() {
    this.props.onGetBoardReviews();
  }

  onClickReview(workId) {
    this.props.history.push(`/works/${workId}`);
  }

  onClickSaveReview(id, title, content, score) {
    this.props.onEditReview(id, { title, content, score });
  }

  onOpenModal(id) {
    this.setState({ modalIsOpen: true, targetReviewId: id });
  }

  onCancelModal() {
    this.setState({ modalIsOpen: false, targetReviewId: null });
  }

  onClickDeleteReview() {
    this.setState({ modalIsOpen: false });
    this.props.onDeleteReview(this.state.targetReviewId)
      .then(() => {
        this.props.onGetBoardReviews();
      });
  }

  render() {
    const { boardReviews, loggedInUser } = this.props;
    const { modalIsOpen } = this.state;

    const modalElement = <Modal
      id="board-modal"
      isOpen={modalIsOpen}
    >
      <h4>Are you sure you want to delete?</h4>
      <div id="board-modal-button-wrapper">
        <button type="button" className="board-modal-button board-modal-cancel" onClick={() => this.onCancelModal()}>Cancel</button>
        <button type="button" className="board-modal-button board-modal-confirm" onClick={() => this.onClickDeleteReview()}>Confirm</button>
      </div>
    </Modal>;

    const reviewLists = boardReviews?.map((review) => {
      return (
        <BoardReview
          key={review.id}
          className="board-review"
          review={review}
          onClickReview={(workId) => this.onClickReview(workId)}
          isMyReview={loggedInUser && loggedInUser.id === review.author.id}
          onClickSaveReview={(title, content, score) => this.onClickSaveReview(review.id, title, content, score)}
          onClickDeleteReview={() => this.onOpenModal(review.id)}
          onClickLikeReview={() => this.props.onPostLike(review.id)}
          onClickUnlikeReview={() => this.props.onPostUnlike(review.id)}
          clickedLike={review.clickedLike && loggedInUser}
          isLoggedIn={!!loggedInUser}
        />
      );
    });

    return (
      <div className="board">
        {modalElement}
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
