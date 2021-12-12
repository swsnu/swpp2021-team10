import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actionCreators from '../../store/actions/index';

import './MyReviews.css';

import BoardReview from '../../Components/BoardReview/BoardReview';

class MyReviews extends Component {
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
    const { myReviews, loggedInUser } = this.props;

    if (!loggedInUser) {
      return <Redirect to="/main" />;
    }

    const reviewLists = myReviews?.map((review) => {
      return (
        <BoardReview
          key={review.id}
          className="myreview"
          review={review}
          onClickReview={(workId) => this.onClickReview(workId)}
          isMyReview={loggedInUser && loggedInUser.id === review.author.id}
          onClickSaveReview={(title, content, score) => this.onClickSaveReview(review.id, title, content, score)}
          onClickDeleteReview={() => this.onClickDeleteReview(review.id)}
          onClickLikeReview={() => this.props.onPostLike(review.id)}
          onClickUnlikeReview={() => this.props.onPostUnlike(review.id)}
          clickedLike={review.clickedLike}
          isLoggedIn={!!loggedInUser}
        />
      );
    });

    return (
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyReviews);
