import React from 'react';
import { shallow } from 'enzyme';

import Recommendation from './Recommendation';

describe('<Recommendation />', () => {
  it('should render Recommendation', () => {
    const component = shallow(<Recommendation />);
    const wrapper = component.find('.recommendation');
    expect(wrapper.length).toBe(1);
  });
});
