import React, { Component } from 'react';
import { batch, connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import './Board.css';

import BoardReview from '../../Components/BoardReview/BoardReview';

class Board extends Component {
  componentDidMount() {
    this.props.onGetBoardReviews();
    // TODO: get isMyReview value by login
  }

  onClickReview = (workId) => {
    console.debug(this.props.history);
    this.props.history.push('/works/' + String(workId));
  }

  render() {
    const { boardReviews } = this.props;
    // const boardReviews = dummyReviews;

    const reviewLists = boardReviews?.map((review) => (
      <BoardReview
        key={String(review.id)}
        className="board-review"
        review={review}
        onClickReview={(workId) => this.onClickReview(workId)}
      />
    ));

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetBoardReviews: () => dispatch(actionCreators.getBoardReviews()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
