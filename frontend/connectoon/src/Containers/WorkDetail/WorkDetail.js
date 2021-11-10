import React, { Component } from 'react';
import { connect } from 'react-redux';

import WorkInfo from '../../Components/WorkInfo/WorkInfo';
import './WorkDetail.css';
import WriteReview from '../../Components/WriteReview/WriteReview';
import DetailReview from '../../Components/DetailReview/DetailReview';
import * as actionCreators from '../../store/actions/index';

class WorkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { reviewNum: 4 };
  }

  componentDidMount() {
    this.props.onGetWork(this.props.match.params.id);
  }

  render() {
    const { reviewNum } = this.state;
    const { selectedWork } = this.props;
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
      <div className="work-detail">
        {workInfo}
        <WriteReview className="work-write-review" />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetWork: (id) => dispatch(actionCreators.getWork(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkDetail);
