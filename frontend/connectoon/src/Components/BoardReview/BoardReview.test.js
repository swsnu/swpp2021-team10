import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';

import BoardReview from './BoardReview';

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

describe('<BoardReview />', () => {
  let component;
  const spyReviewClick = jest.fn();
  const spySaveReview = jest.fn();
  const spyDeleteReview = jest.fn();
  const spyClickLike = jest.fn();
  const spyClickUnike = jest.fn();
  beforeEach(() => {
    component = mount(
      <BoardReview
        key={dummyReview.id}
        className="board-review"
        review={dummyReview}
        onClickReview={spyReviewClick}
        isMyReview={true}
        onClickDeleteReview={spyDeleteReview}
        onClickSaveReview={spySaveReview}
        onClickLikeReview={spyClickLike}
        onClickUnlikeReview={spyClickUnike}
        clickedLike={false}
        isLoggedIn={true}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render review in BoardReview', () => {
    const wrapper = component.find('.board-review');
    expect(wrapper.length).toBeGreaterThan(0);
  });

  it('should handle click like and unlike', () => {
    const wrapper = component.find('.review-like-button');
    wrapper.simulate('click');
    expect(component.state().clickedLike).toBeTruthy();
    wrapper.simulate('click');
    expect(component.state().clickedLike).toBeFalsy();
  });

  it('should not handle click like and unlike when not logged in', () => {
    component = mount(
      <BoardReview
        key={dummyReview.id}
        className="board-review"
        review={dummyReview}
        onClickReview={spyReviewClick}
        isMyReview={true}
        onClickDeleteReview={spyDeleteReview}
        onClickSaveReview={spySaveReview}
        onClickLikeReview={spyClickLike}
        onClickUnlikeReview={spyClickUnike}
        clickedLike={false}
        isLoggedIn={false}
      />,
    );
    const wrapper = component.find('.review-like-button');
    wrapper.simulate('click');
    expect(component.state().clickedLike).toBeFalsy();
  });

  it('should handle click edit', () => {
    let wrapper = component.find('.board-edit-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeTruthy();
    wrapper = component.find('.board-back-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click back', () => {
    let wrapper = component.find('.board-edit-button');
    wrapper.simulate('click');
    wrapper = component.find('.board-back-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeFalsy();
    wrapper = component.find('.board-edit-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle review click', () => {
    const wrapper = component.find('.board-review').first();
    wrapper.simulate('click');
    expect(spyReviewClick).toHaveBeenCalledTimes(1);
  });

  it('should not show buttons when different user', () => {
    component = mount(<BoardReview
      key={1}
      className="board-review"
      review={dummyReview}
      onClickReview={spyReviewClick}
      isMyReview={false}
    />);
    const wrapper = component.find('.board-review-button-region');
    expect(wrapper.get(0)).toBeFalsy();
  });

  it('should handle click edit, not go to work-detail', () => {
    let wrapper = component.find('.board-edit-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeTruthy();

    wrapper = component.find('.review-title-input');
    wrapper.simulate('click');
    expect(spyReviewClick).toHaveBeenCalledTimes(0);

    wrapper = component.find('.review-content-input');
    wrapper.simulate('click');
    expect(spyReviewClick).toHaveBeenCalledTimes(0);

    wrapper = component.find('.board-back-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click delete', () => {
    const wrapper = component.find('.board-delete-button');
    wrapper.simulate('click');
    expect(spyDeleteReview).toHaveBeenCalledTimes(1);
  });

  it('should handle title, content, score changes', () => {
    let wrapper = component.find('.board-edit-button');
    wrapper.simulate('click');
    wrapper = component.find('.review-title-input');
    wrapper.simulate('change', { target: { value: 'edit_title1' } });
    wrapper = component.find('.detail-review-score-select');
    wrapper.simulate('change', { target: { value: '4.0' } });
    wrapper = component.find('.review-content-input');
    wrapper.simulate('change', { target: { value: 'edit_content1' } });
    expect(component.state('title')).toBe('edit_title1');
    expect(component.state('content')).toBe('edit_content1');
    expect(component.state('score')).toBe('4.0');
  });

  it('should handle click save', () => {
    let wrapper = component.find('.board-edit-button');
    wrapper.simulate('click');
    wrapper = component.find('.review-title-input');
    wrapper.simulate('change', { target: { value: 'edit_title1' } });
    wrapper = component.find('.board-save-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeFalsy();
    expect(spySaveReview).toHaveBeenCalledTimes(1);
  });

  it('should handle click back, returning to initial review data', () => {
    let wrapper = component.find('.board-edit-button');
    wrapper.simulate('click');
    wrapper = component.find('.review-title-input');
    wrapper.simulate('change', { target: { value: 'edit_title1' } });
    wrapper = component.find('.board-back-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeFalsy();
    expect(component.state('title')).toBe('Dummy Review Title');
  });
});
