import React from 'react';
import { shallow, mount } from 'enzyme';

import DetailReview from './DetailReview';

describe('<DetailReview />', () => {
  it('should render review in WorkDetail', () => {
    const component = shallow(<DetailReview className="detail-review" />);
    const wrapper = component.find('.detail-review');
    expect(wrapper.length).toBeGreaterThan(0);
  });

  it('should handle click like', () => {
    const component = mount(<DetailReview className="detail-review" />);
    const wrapper = component.find('.review-like-button');
    wrapper.simulate('click');
    expect(component.state('clickLike')).toBeTruthy();
    wrapper.simulate('click');
    expect(component.state('clickLike')).toBeFalsy();
  });

  it('should handle click edit', () => {
    const component = mount(<DetailReview className="detail-review" />);
    let wrapper = component.find('.edit-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeTruthy();
    wrapper = component.find('.back-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle click back', () => {
    const component = mount(<DetailReview className="detail-review" />);
    let wrapper = component.find('.edit-button');
    wrapper.simulate('click');
    wrapper = component.find('.back-button');
    wrapper.simulate('click');
    expect(component.state('editMode')).toBeFalsy();
    wrapper = component.find('.edit-button');
    expect(wrapper.length).toBe(1);
  });
});
