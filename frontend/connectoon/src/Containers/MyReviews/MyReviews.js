import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Modal from 'react-modal';

import * as actionCreators from '../../store/actions/index';
import './MyReviews.css';
import BoardReview from '../../Components/BoardReview/BoardReview';

class MyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false, targetReviewId: null };
  }

  componentDidMount() {
    this.props.onGetMyReviews();
    const { loggedInUser } = this.props;
    if (!loggedInUser) {
      this.props.history.push('/login');
    }
  }

  onClickReview(workId) {
    this.props.history.push(`/works/${workId}`);
  }

  onClickSaveReview(id, title, content, score, workId) {
    this.props.onEditReview(id, { title, content, score })
      .then(() => {
        this.props.onGetMyReviews();
        this.props.onPutImage(workId);
      });
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
        this.props.onGetMyReviews();
      });
  }

  render() {
    const { myReviews, loggedInUser } = this.props;
    const { modalIsOpen } = this.state;

    if (!loggedInUser) {
      return <Redirect to="/main" />;
    }

    const modalElement = <Modal
      id="myreview-modal"
      isOpen={modalIsOpen}
    >
      <h4>Are you sure you want to delete?</h4>
      <div id="myreview-modal-button-wrapper">
        <button type="button" className="myreview-modal-button myreview-modal-cancel" onClick={() => this.onCancelModal()}>Cancel</button>
        <button type="button" className="myreview-modal-button myreview-modal-confirm" onClick={() => this.onClickDeleteReview()}>Confirm</button>
      </div>
    </Modal>;

    const reviewLists = myReviews?.map((review) => {
      return (
        <BoardReview
          key={review.id}
          className="myreview"
          review={review}
          onClickReview={(workId) => this.onClickReview(workId)}
          isMyReview={loggedInUser && loggedInUser.id === review.author.id}
          onClickSaveReview={(title, content, score) => this.onClickSaveReview(review.id, title, content, score, review.work.id)}
          onClickDeleteReview={() => this.onOpenModal(review.id)}
          onClickLikeReview={() => this.props.onPostLike(review.id)}
          onClickUnlikeReview={() => this.props.onPostUnlike(review.id)}
          clickedLike={review.clickedLike}
          isLoggedIn={!!loggedInUser}
        />
      );
    });

    return (
      <div className="myreview">
        {modalElement}
        <h1 className="myreview-page-title">
          My Reviews
        </h1>
        <table className="myreview-table">
          <thead className="myreview-header">
            <tr className="myreview-header-row">
              <th className="myreview-header work">Work</th>
              <th className="myreview-header review">Review</th>
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
    myReviews: state.review.reviews,
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMyReviews: () => dispatch(actionCreators.getMyReviews()),
    onEditReview: (id, reviewData) => dispatch(actionCreators.editReview(id, reviewData)),
    onDeleteReview: (id) => dispatch(actionCreators.deleteReview(id)),
    onPostLike: (id) => dispatch(actionCreators.postLike(id)),
    onPostUnlike: (id) => dispatch(actionCreators.postUnlike(id)),
    onPutImage: (id) => dispatch(actionCreators.putImage(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyReviews);
