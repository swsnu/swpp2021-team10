import React from 'react';
import { shallow } from 'enzyme';

import WorkDetail from './WorkDetail';

describe('<WorkDetail />', () => {
  it('should render WorkDetail', () => {
    const component = shallow(<WorkDetail title="Study Group" />);
    const wrapper = component.find('.work-detail');
    expect(wrapper.length).toBe(1);
  });
});
