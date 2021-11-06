import React, { Component } from 'react';
import WorkList from '../../Components/WorkList/WorkList';

const dummyWorks = [
  {
    id: 1,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform: '/images/naver_logo.png',
    completion: false,
    title: 'Study Group',
    artist: 'Shin, Hyeongwook & Yu, Seungyeon',
    createdYear: '2019',
    score: '4.9',
  },
  {
    id: 2,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform: '/images/naver_logo.png',
    completion: true,
    title: '마음의 소리',
    artist: '조석',
    createdYear: '2006',
    score: '4.7',
  },
  {
    id: 3,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform: '/images/naver_logo.png',
    completion: false,
    title: 'Study Group',
    artist: 'Shin, Hyeongwook & Yu, Seungyeon',
    createdYear: '2019',
    score: '4.9',
  },
  {
    id: 4,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform: '/images/naver_logo.png',
    completion: true,
    title: '마음의 소리',
    artist: '조석',
    createdYear: '2006',
    score: '4.7',
  },
  {
    id: 5,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform: '/images/naver_logo.png',
    completion: false,
    title: 'Study Group',
    artist: 'Shin, Hyeongwook & Yu, Seungyeon',
    createdYear: '2019',
    score: '4.9',
  },
  {
    id: 6,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform: '/images/naver_logo.png',
    completion: true,
    title: '마음의 소리',
    artist: '조석',
    createdYear: '2006',
    score: '4.7',
  },
  {
    id: 7,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform: '/images/naver_logo.png',
    completion: false,
    title: 'Study Group',
    artist: 'Shin, Hyeongwook & Yu, Seungyeon',
    createdYear: '2019',
    score: '4.9',
  },
  {
    id: 8,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform: '/images/naver_logo.png',
    completion: true,
    title: '마음의 소리',
    artist: '조석',
    createdYear: '2006',
    score: '4.7',
  },
  {
    id: 9,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
    platform: '/images/naver_logo.png',
    completion: false,
    title: 'Study Group',
    artist: 'Shin, Hyeongwook & Yu, Seungyeon',
    createdYear: '2019',
    score: '4.9',
  },
  {
    id: 10,
    src: 'https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg',
    platform: '/images/naver_logo.png',
    completion: true,
    title: '마음의 소리',
    artist: '조석',
    createdYear: '2006',
    score: '4.7',
  },
];
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { displayNum: 4 };
  }

  render() {
    const { displayNum } = this.state;
    return (
      <div className="main-page">
        <WorkList className="most-reviewed-work-list" subject="Most revied works" workList={dummyWorks} workNumInRow={displayNum} />
        <WorkList className="most-liked-work-list" subject="Most liked works" workList={[...dummyWorks].reverse()} workNumInRow={displayNum} />
      </div>
    );
  }
}

export default Main;
