import React from 'react';
import { shallow, mount } from 'enzyme';

import BoardReview from './BoardReview';

describe('<BoardReview />', () => {
  let component;
  let spyReviewClick;
  beforeEach(() => {
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
    ];
    const dummyAuthor = [
      {
        id: 1,
        email: 'dummy@swpp.com',
        profile_img: '',
        username: 'dummyuser',
      },
    ];
    const dummyReview =
    {
      id: 1,
      work: dummyWorks[0],
      author: dummyAuthor[0],
      score: 3.5,
      likes: 10,
      title: 'Dummy Review Title',
      content: 'Dummy Content\nLong\nLong\nLogn\nLong\nFinish\n',
    };
    spyReviewClick = jest.fn();
    component = mount(<BoardReview
      key={dummyReview.id}
      className="board-review"
      review={dummyReview}
      onClickReview={spyReviewClick}
    />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render review in BoardReview', () => {
    const wrapper = component.find('.board-review');
    expect(wrapper.length).toBeGreaterThan(0);
  });

  it('should handle click like', () => {
    const wrapper = component.find('.review-like-button');
    wrapper.simulate('click');
    expect(component.state('clickLike')).toBeTruthy();
    wrapper.simulate('click');
    expect(component.state('clickLike')).toBeFalsy();
  });

  it('should handle click edit', () => {
    let wrapper = component.find('.detail-edit-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeTruthy();
    wrapper = component.find('.detail-back-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click back', () => {
    let wrapper = component.find('.detail-edit-button');
    wrapper.simulate('click');
    wrapper = component.find('.detail-back-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeFalsy();
    wrapper = component.find('.detail-edit-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle review click', () => {
    const wrapper = component.find('.board-review').first();
    wrapper.simulate('click');
    expect(spyReviewClick).toHaveBeenCalledTimes(1);
  });
});
