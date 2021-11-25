import React, { Component } from 'react';
import { batch, connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import './Board.css';

import BoardReview from '../../Components/BoardReview/BoardReview';

const dummyWorks = [
  {
    id: 1,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform: '/images/naver_logo.png',
    platform_id: 1,
    completion: false,
    thumbnail_image: 'https://ccdn.lezhin.com/v2/comics/5/images/tall.webp?updated=1602829186999&width=720',
    title: 'Study Group',
    artist: 'Shin, Hyeongwook & Yu, Seungyeon',
    createdYear: '2019',
    score: '4.9',
  },
  {
    id: 2,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform: '/images/naver_logo.png',
    platform_id: 2,
    completion: true,
    thumbnail_image: 'https://ccdn.lezhin.com/v2/comics/5/images/tall.webp?updated=1602829186999&width=720',
    title: '마음의 소리',
    artist: '조석',
    createdYear: '2006',
    score: '4.7',
  },
  {
    id: 3,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform: '/images/naver_logo.png',
    platform_id: 3,
    completion: false,
    title: 'Study Group',
    thumbnail_image: 'https://ccdn.lezhin.com/v2/comics/5/images/tall.webp?updated=1602829186999&width=720',
    artist: 'Shin, Hyeongwook & Yu, Seungyeon',
    createdYear: '2019',
    score: '4.9',
  },
];

const dummyAuthor = [
  {
    id: 1,
    email: 'dummy@swpp.com',
    profile_img: '',
    username: 'dummyuser',
  },
];

const dummyReviews = [
  {
    id: 1,
    work: dummyWorks[1],
    author: dummyAuthor[0],
    score: 3.5,
    likes: 10,
    title: 'Dummy Review Title',
    content: 'Dummy Content\nLong\nLong\nLogn\nLong\nFinish\n',
  },
  {
    id: 2,
    work: dummyWorks[1],
    author: dummyAuthor[0],
    score: 5.0,
    likes: 10,
    title: 'Dummy Review Title',
    content: 'Dummy Content',
  },
  {
    id: 3,
    work: dummyWorks[1],
    author: dummyAuthor[0],
    score: 3.5,
    likes: 10,
    title: 'Dummy Review Title',
    content: 'Dummy Content',
  },
];

class Board extends Component {
  /*
  constructor(props) {
    super(props);
  } */

  componentDidMount() {
    this.props.onGetBoardReviews();
    // TODO: get isMyReview value by login
  }

  render() {
    const { boardReviews } = this.props;
    console.log(boardReviews);
    // const boardReviews = dummyReviews;

    const reviewLists = boardReviews.map((review) => (
      <BoardReview
        key={review.id}
        className="board-review"
        review={review}
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
