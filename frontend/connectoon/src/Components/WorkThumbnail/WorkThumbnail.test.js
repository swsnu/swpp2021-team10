import React from 'react';
import { shallow, mount } from 'enzyme';

import WorkThumbnail from './WorkThumbnail';

describe('<WorkThumbnail />', () => {
  it('should render work thumbnail', () => {
    const component = shallow(<WorkThumbnail className="work-thumbnail" />);
    const wrapper = component.find('.work-thumbnail');
    expect(wrapper.length).toBeGreaterThan(0);
  });

  it('should render completion mark without errors', () => {
    const component = mount(<WorkThumbnail className="work-thumbnail" completion />);
    const wrapper = component.find('.work-completion');
    expect(wrapper.length).toBe(1);
  });
});
