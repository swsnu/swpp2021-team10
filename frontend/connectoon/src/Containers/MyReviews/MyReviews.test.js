import React from 'react';
import { shallow } from 'enzyme';

import MyReviews from './MyReviews';

describe('<MyReviews />', () => {
  it('should render MyReviews', () => {
    const component = shallow(<MyReviews />);
    const wrapper = component.find('.myreviews');
    expect(wrapper.length).toBe(1);
  });
});
