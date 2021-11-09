import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WorkInfo from '../../Components/WorkInfo/WorkInfo';
import './WorkDetail.css';
import WriteReview from '../../Components/WriteReview/WriteReview';
import DetailReview from '../../Components/DetailReview/DetailReview';

const dummyWork = {
  id: 1,
  src: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
  platform: '/images/naver_logo.png',
  completion: false,
  title: 'Study Group',
  artist: 'Shin, Hyeongwook & Yu, Seungyeon',
  createdYear: '2019',
  description: '우등생을 꿈꾸는 최강 소년의 고교액션활극.\n공부를 잘 하고 싶지만 애석하게도 싸움 실력에만 재능이 몰빵된 고등학생 윤가민.\n똥통학교 유성공고에서 스터디그룹을 만드는데….\n그와 스터디 멤버들의 (진짜로) 피튀기는 입시이야기!',
  link: 'https://comic.naver.com/webtoon/list?titleId=721948&weekday=sat',
  tagNames: [
    'Story', 'Action',
  ],
  score: 4.7,
};

class WorkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { reviewNum: 10 };
  }

  render() {
    const { reviewNum } = this.state;
    const { title } = this.props;
    return (
      <div className="work-detail">
        <WorkInfo
          className="work-info"
          src={dummyWork.src}
          platform={dummyWork.platform}
          completion={dummyWork.completion}
          title={dummyWork.title}
          artist={dummyWork.artist}
          createdYear={dummyWork.createdYear}
          description={dummyWork.description}
          link={dummyWork.link}
          tagNames={dummyWork.tagNames}
        />
        <WriteReview className="work-write-review" />
        <div className="work-review-region">
          <h3 id="work-reviews-header">
            Reviews(
            {reviewNum}
            )
          </h3>
          <img id="work-score-star-icon" src="/images/ratingStar.png" alt="rating" />
          <h4 id="work-average-score">{dummyWork.score}</h4>
          <DetailReview className="detail-review" />
        </div>
      </div>
    );
  }
}

WorkDetail.propTypes = {
  title: PropTypes.string.isRequired,
};

export default WorkDetail;
