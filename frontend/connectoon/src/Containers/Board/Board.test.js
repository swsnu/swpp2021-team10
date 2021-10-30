import React from 'react';
import { shallow } from 'enzyme';

import Board from './Board';

describe('<Board />', () => {
  it('should render Board', () => {
    const component = shallow(<Board />);
    const wrapper = component.find('.board');
    expect(wrapper.length).toBe(1);
  });
});
