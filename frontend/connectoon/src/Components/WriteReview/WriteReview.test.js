import React from 'react';
import { mount } from 'enzyme';

import WriteReview from './WriteReview';

const stubLoggedInUser = {
  id: 1,
};

describe('<WriteReview />', () => {
  it('should render WriteReview', () => {
    const component = mount(<WriteReview className="write-review" />);
    const wrapper = component.find('div.write-review');
    expect(wrapper.length).toBe(1);
  });

  it('should handle title, content, score changes', () => {
    const component = mount(<WriteReview className="write-review" />);
    let wrapper = component.find('.write-review-title-input');
    wrapper.simulate('change', { target: { value: 'test_title1' } });
    wrapper = component.find('.write-review-score-select');
    wrapper.simulate('change', { target: { value: '3.0' } });
    wrapper = component.find('.write-review-content-input');
    wrapper.simulate('change', { target: { value: 'test_content1' } });
    expect(component.state('title')).toBe('test_title1');
    expect(component.state('content')).toBe('test_content1');
    expect(component.state('score')).toBe('3.0');
  });

  it('should handle click confirm', () => {
    const spyConfirmReview = jest.fn(() => { });
    const component = mount(<WriteReview className="write-review" loggedInUser={stubLoggedInUser} onClickReviewConfirm={spyConfirmReview} />);
    let wrapper = component.find('.write-review-title-input');
    wrapper.simulate('change', { target: { value: 'test_title1' } });
    wrapper = component.find('.write-review-content-input');
    wrapper.simulate('change', { target: { value: 'test_content1' } });
    wrapper = component.find('.write-review-confirm-button');
    wrapper.simulate('click');
    expect(spyConfirmReview).toHaveBeenCalledTimes(1);
  });

  it('should not allow more than one clicks on confirm', () => {
    const spyConfirmReview = jest.fn(() => { });
    const component = mount(<WriteReview className="write-review" loggedInUser={stubLoggedInUser} onClickReviewConfirm={spyConfirmReview} />);
    let wrapper = component.find('.write-review-title-input');
    wrapper.simulate('change', { target: { value: 'test_title1' } });
    wrapper = component.find('.write-review-content-input');
    wrapper.simulate('change', { target: { value: 'test_content1' } });
    wrapper = component.find('.write-review-confirm-button');
    wrapper.simulate('click');
    wrapper.simulate('click');
    expect(spyConfirmReview).toHaveBeenCalledTimes(1);
  });
});
