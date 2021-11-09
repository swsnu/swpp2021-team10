import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WorkList from '../../Components/WorkList/WorkList';
import './Main.css';
import * as actionCreators from '../../store/actions/index';

const dummyWorks = [
  {
    id: 1,
    thumbnail_picture: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform_id: 1,
    completion: false,
    title: 'Study Group',
    artists: 'Shin, Hyeongwook',
    year: '2019',
    score_avg: '4.9',
  },
  {
    id: 2,
    thumbnail_picture: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform_id: 1,
    completion: true,
    title: '마음의 소리',
    artists: '조석',
    year: '2006',
    score_avg: '4.7',
  },
  {
    id: 3,
    thumbnail_picture: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform_id: 1,
    completion: false,
    title: 'Study Group',
    artists: 'Shin, Hyeongwook',
    year: '2019',
    score_avg: '4.9',
  },
  {
    id: 4,
    thumbnail_picture: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform_id: 1,
    completion: true,
    title: '마음의 소리',
    artists: '조석',
    year: '2006',
    score_avg: '4.7',
  },
  {
    id: 5,
    thumbnail_picture: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform_id: 1,
    completion: false,
    title: 'Study Group',
    artists: 'Shin, Hyeongwook',
    year: '2019',
    score_avg: '4.9',
  },
  {
    id: 6,
    thumbnail_picture: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform_id: 1,
    completion: true,
    title: '마음의 소리',
    artists: '조석',
    year: '2006',
    score_avg: '4.7',
  },
  {
    id: 7,
    thumbnail_picture: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform_id: 1,
    completion: false,
    title: 'Study Group',
    artists: 'Shin, Hyeongwook',
    year: '2019',
    score_avg: '4.9',
  },
  {
    id: 8,
    thumbnail_picture: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform_id: 1,
    completion: true,
    title: '마음의 소리',
    artists: '조석',
    year: '2006',
    score_avg: '4.7',
  },
  {
    id: 9,
    thumbnail_picture: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform_id: 1,
    completion: false,
    title: 'Study Group',
    artists: 'Shin, Hyeongwook',
    year: '2019',
    score_avg: '4.9',
  },
  {
    id: 10,
    thumbnail_picture: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform_id: 1,
    completion: true,
    title: '마음의 소리',
    artists: '조석',
    year: '2006',
    score_avg: '4.7',
  },
];
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { workNumInRow: 4 };
  }

  componentDidMount() {
    this.props.onGetMainWorks();
  }

  render() {
    const { workNumInRow } = this.state;
    const { mainWorkLists } = this.props;
    const workLists = mainWorkLists.map((mainWorkList) => {
      return (
        <WorkList
          className={mainWorkList.title.toLowerCase().replace(' ', '-')[-1] + '-list'}
          subject={mainWorkList.title}
          workList={JSON.parse(mainWorkList.works)}
          workNumInRow={workNumInRow}
        />
      );
    });

    return (
      <div className="main-page">
        {workLists}
        {/* <WorkList className="most-reviewed-work-list" subject="Most revied works" workList={dummyWorks} workNumInRow={workNumInRow} />
        <WorkList className="most-liked-work-list" subject="Most liked works" workList={[...dummyWorks].reverse()} workNumInRow={workNumInRow} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mainWorkLists: state.work.mainWorkLists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMainWorks: () => dispatch(actionCreators.getMainWorks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
