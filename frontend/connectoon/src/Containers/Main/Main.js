import React, { Component } from 'react';
import WorkList from '../../Components/WorkList/WorkList';

let dummyWorks = [
  {
    src: "https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg",
    platform: "/images/naver_logo.png",
    completion: false,
    title: "Study Group",
    artist: 'Shin, HyeongwookYu & Yu, Seungyeon',
    created_year: "2019",
    score: "4.9",
  },
  {
    src: "https://shared-comic.pstatic.net/thumb/webtoon/20853/thumbnail/thumbnail_IMAG06_89061d8c-e491-42f1-8c15-40932e5eb939.jpg",
    platform: "/images/naver_logo.png",
    completion: true,
    title: "Ma Eum Ei So Ri",
    artist: 'Jo, Seok',
    created_year: "2006",
    score: "4.7",
  },
];
class Main extends Component {
  render() {
    return (
      <div className="main-page">
        <WorkList className="most-reviewed-work-list" subject="Most revied works" workList={dummyWorks} workDisplayNum={5} />
        <WorkList className="most-liked-work-list" subject="Most liked works" workList={[...dummyWorks].reverse()} workDisplayNum={5} />
      </div>
    )
  };
}

export default Main;