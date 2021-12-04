import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import WorkInfo from '../../Components/WorkInfo/WorkInfo';
import './WorkDetail.css';
import WriteReview from '../../Components/WriteReview/WriteReview';
import DetailReview from '../../Components/DetailReview/DetailReview';
import * as actionCreators from '../../store/actions/index';

/* eslint "react/jsx-one-expression-per-line": "off" */

class WorkDetail extends Component {
  constructor(props) {
    super(props);

    this.onClickReviewConfirm = this.onClickReviewConfirm.bind(this);
    this.onClickTag = this.onClickTag.bind(this);
  }

  componentDidMount() {
    this.props.onGetWork(this.props.match.params.id);
    this.props.onGetWorkReviews(this.props.match.params.id);
  }

  onClickReviewConfirm(title, content, score) {
    this.props.onPostReview(this.props.match.params.id, { title, content, score })
      .then(() => {
        this.props.onGetWork(this.props.match.params.id);
        this.props.onGetWorkReviews(this.props.match.params.id);
      });
  }

  onClickDeleteReview(id) {
    this.props.onDeleteReview(id)
      .then(() => {
        this.props.onGetWork(this.props.match.params.id);
        this.props.onGetWorkReviews(this.props.match.params.id);
      });
  }

  onClickSaveReview(id, title, content, score) {
    this.props.onEditReview(id, { title, content, score })
      .then(() => {
        this.props.onGetWork(this.props.match.params.id);
        this.props.onGetWorkReviews(this.props.match.params.id);
      });
  }

  onClickTag(tagName) {
    this.props.history.push('/search/$' + tagName);
  }

  render() {
    const {
      selectedWork, noSuchSelectedWork, loggedInUser, reviews,
    } = this.props;

    if (noSuchSelectedWork) {
      return (
        <div className="work-detail">
          <h2 style={{ textAlign: 'center' }}>No Such Work!</h2>
        </div>
      );
    }

    if (!selectedWork) {
      return <div className="work-detail" />;
    }

    const workInfo = <WorkInfo
      key={selectedWork.title + String(selectedWork.id)}
      className="work-info"
      title={selectedWork.title}
      description={selectedWork.description}
      link={selectedWork.link}
      thumbnailPicture={selectedWork.thumbnail_picture}
      platformId={selectedWork.platform_id}
      year={selectedWork.year}
      tags={selectedWork.tags}
      artists={selectedWork.artists}
      onClickTag={this.onClickTag}
    />;

    const myReview = loggedInUser ? reviews.filter((review) => {
      return review.author.id === loggedInUser.id;
    }) : [];
    const withMyReview = myReview.length === 1;
    const othersReviews = loggedInUser ? reviews.filter((review) => {
      return review.author.id !== loggedInUser.id;
    }) : reviews;

    const myDetailReview = withMyReview ? (
      <div className="my-review-region">
        <h3 id="work-reviews-header">Review{(reviews.length > 1) && 's'}({reviews.length})</h3>
        <img id="work-score-star-icon" src="/images/ratingStar.png" alt="rating" />
        <h4 id="work-average-score">{selectedWork.score_avg.toFixed(2)}</h4>
        <DetailReview
          key={myReview[0].id}
          className="detail-review"
          review={myReview[0]}
          editable
          onClickSaveReview={(title, content, score) => this.onClickSaveReview(myReview[0].id, title, content, score)}
          onClickDeleteReview={() => this.onClickDeleteReview(myReview[0].id)}
        />
      </div>) :
      <WriteReview className="work-write-review" loggedInUser={loggedInUser} onClickReviewConfirm={this.onClickReviewConfirm} />;
    const othersDetailReviews = withMyReview ?
      othersReviews.map((review) => <DetailReview key={review.id} className="detail-review" review={review} editable={false} />) :
      <div>
        <div className="others-review-region">
          <h3 id="work-reviews-header">Review{(reviews.length > 1) && 's'}({reviews.length})</h3>
          <img id="work-score-star-icon" src="/images/ratingStar.png" alt="rating" />
          <h4 id="work-average-score">{selectedWork.score_avg.toFixed(2)}</h4>
        </div>
        {othersReviews.map((review) => <DetailReview key={review.id} className="detail-review" review={review} editable={false} />)}
      </div>;

    return (
      <div className="work-detail" login={loggedInUser}>
        {workInfo}
        {myDetailReview}
        <div className="work-review-region">
          {othersDetailReviews}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedWork: state.work.selectedWork,
    noSuchSelectedWork: state.work.noSuchSelectedWork,
    loggedInUser: state.user.loggedInUser,
    reviews: state.review.reviews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetWork: (id) => dispatch(actionCreators.getWork(id)),
    onPostReview: (id, reviewData) => dispatch(actionCreators.postWorkReview(id, reviewData)),
    onGetWorkReviews: (id) => dispatch(actionCreators.getWorkReviews(id)),
    onEditReview: (id, reviewData) => dispatch(actionCreators.editReview(id, reviewData)),
    onDeleteReview: (id) => dispatch(actionCreators.deleteReview(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WorkDetail));
