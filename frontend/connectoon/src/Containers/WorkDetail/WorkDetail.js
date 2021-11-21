import React, { Component } from 'react';
import { connect } from 'react-redux';

import WorkInfo from '../../Components/WorkInfo/WorkInfo';
import './WorkDetail.css';
import WriteReview from '../../Components/WriteReview/WriteReview';
import DetailReview from '../../Components/DetailReview/DetailReview';
import * as actionCreators from '../../store/actions/index';

const dummyUser = { id: 1, username: 'user1', email: 'dooly9931@naver.com' };
const dummyReviews = [
  {
    id: 1, title: 'title1', content: 'content1', score: '5', likes: '555', work: { id: 1 }, author: { id: 1, username: 'user1', email: 'email1@email.com' },
  },
  {
    id: 2, title: 'title2', content: 'content2', score: '5', likes: '555', work: { id: 2 }, author: { id: 2, username: 'user2', email: 'email2@email.com' },
  },
];

class WorkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { reviewNum: 4 };

    this.onClickReviewConfirm = this.onClickReviewConfirm.bind(this);
  }

  componentDidMount() {
    this.props.onGetWork(this.props.match.params.id);
    this.props.onGetWorkReviews(this.props.match.params.id);
  }

  onClickReviewConfirm(title, content, score) {
    this.props.onPostReview(this.props.match.params.id, { title, content, score });
  }

  render() {
    const { reviewNum } = this.state;
    const { selectedWork, loggedInUser } = this.props;
    const workInfo = selectedWork ? (
      <WorkInfo
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
      />
    ) : null;
    const detailReviews = [
      <DetailReview key="1" className="detail-review" />,
      <DetailReview key="2" className="detail-review" />,
      <DetailReview key="3" className="detail-review" />,
      <DetailReview key="4" className="detail-review" />,
    ];

    return (
      <div className="work-detail" login={loggedInUser}>
        {workInfo}
        <WriteReview className="work-write-review" loggedInUser={dummyUser} onClickReviewConfirm={this.onClickReviewConfirm} />
        <div className="work-review-region">
          <div className="reviews-header-region">
            <h3 id="work-reviews-header">
              Reviews(
              {reviewNum}
              )
            </h3>
            <img id="work-score-star-icon" src="/images/ratingStar.png" alt="rating" />
            <h4 id="work-average-score">{selectedWork ? selectedWork.score_avg : '0'}</h4>
          </div>
          {detailReviews}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedWork: state.work.selectedWork,
    loggedInUser: state.user.loggedInUser,
    selectedReviews: state.work.selectedReviews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetWork: (id) => dispatch(actionCreators.getWork(id)),
    onPostReview: (id, reviewData) => dispatch(actionCreators.postWorkReview(id, reviewData)),
    onGetWorkReviews: (id) => dispatch(actionCreators.getWorkReviews(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkDetail);
