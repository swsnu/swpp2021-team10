import React from 'react';
import { mount } from 'enzyme';

import DetailReview from './DetailReview';

const stubReview = {
  title: 'test_title1',
  content: 'test_content1',
  score: 5.0,
  likes: 100,
  author: 'test_author1',
};

describe('<DetailReview />', () => {
  it('should render review in WorkDetail', () => {
    const component = mount(<DetailReview className="detail-review" review={stubReview} editable={false} />);
    const wrapper = component.find('div.detail-review');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click like when logged in', () => {
    const component = mount(<DetailReview
      className="detail-review"
      review={stubReview}
      editable={false}
      onClickLikeReview={jest.fn()}
      onClickUnlikeReview={jest.fn()}
      clickedLike={false}
      isLoggedIn={true}
    />);
    const wrapper = component.find('.detail-review-like-button');
    wrapper.simulate('click');
    expect(component.state().clickedLike).toBeTruthy();
    wrapper.simulate('click');
    expect(component.state().clickedLike).toBeFalsy();
  });

  it('should handle click like when not logged in', () => {
    const mockClickLike = jest.fn();
    const component = mount(<DetailReview
      className="detail-review"
      review={stubReview}
      editable={false}
      onClickLikeReview={mockClickLike}
      onClickUnlikeReview={jest.fn()}
      clickedLike={false}
      isLoggedIn={false}
    />);
    const wrapper = component.find('.detail-review-like-button');
    wrapper.simulate('click');
    expect(mockClickLike).toHaveBeenCalledTimes(0);
  });

  it('should handle click edit', () => {
    const component = mount(<DetailReview className="detail-review" review={stubReview} editable />);
    let wrapper = component.find('.detail-edit-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeTruthy();
    wrapper = component.find('.detail-back-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click delete', () => {
    const spyDeleteReview = jest.fn(() => { });
    const component = mount(<DetailReview className="detail-review" review={stubReview} editable onClickDeleteReview={() => spyDeleteReview()} />);
    const wrapper = component.find('.detail-delete-button');
    wrapper.simulate('click');
    expect(spyDeleteReview).toHaveBeenCalledTimes(1);
  });

  it('should handle title, content, score changes', () => {
    const component = mount(<DetailReview className="detail-review" review={stubReview} editable />);
    let wrapper = component.find('.detail-edit-button');
    wrapper.simulate('click');
    wrapper = component.find('.detail-review-title-input');
    wrapper.simulate('change', { target: { value: 'edit_title1' } });
    wrapper = component.find('.detail-review-score-select');
    wrapper.simulate('change', { target: { value: '4.0' } });
    wrapper = component.find('.detail-review-content-input');
    wrapper.simulate('change', { target: { value: 'edit_content1' } });
    expect(component.state('title')).toBe('edit_title1');
    expect(component.state('content')).toBe('edit_content1');
    expect(component.state('score')).toBe('4.0');
  });

  it('should handle click save', () => {
    const spySaveReview = jest.fn(() => { });
    const component = mount(<DetailReview className="detail-review" review={stubReview} editable onClickSaveReview={() => spySaveReview()} />);
    let wrapper = component.find('.detail-edit-button');
    wrapper.simulate('click');
    wrapper = component.find('.detail-review-title-input');
    wrapper.simulate('change', { target: { value: 'edit_title1' } });
    wrapper = component.find('.detail-save-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeFalsy();
    expect(spySaveReview).toHaveBeenCalledTimes(1);
  });

  it('should handle click back, returning to initial review data', () => {
    const component = mount(<DetailReview className="detail-review" review={stubReview} editable />);
    let wrapper = component.find('.detail-edit-button');
    wrapper.simulate('click');
    wrapper = component.find('.detail-review-title-input');
    wrapper.simulate('change', { target: { value: 'edit_title1' } });
    wrapper = component.find('.detail-back-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeFalsy();
    expect(component.state('title')).toBe('test_title1');
  });
});
