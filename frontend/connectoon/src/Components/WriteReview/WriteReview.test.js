import React from 'react';
import { shallow } from 'enzyme';

import WriteReview from './WriteReview';

describe('<WriteReview />', () => {
  it('should render WriteReview', () => {
    const component = shallow(<WriteReview className="write-review" />);
    const wrapper = component.find('.write-review');
    expect(wrapper.length).toBeGreaterThan(0);
  });
});
