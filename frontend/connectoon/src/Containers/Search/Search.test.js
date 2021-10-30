import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';

describe('<Search />', () => {
  it('should render Search', () => {
    const component = shallow(<Search />);
    const wrapper = component.find('.search');
    expect(wrapper.length).toBe(1);
  });
});
