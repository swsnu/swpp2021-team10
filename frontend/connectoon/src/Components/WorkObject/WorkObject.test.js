import React from 'react';
import { shallow, mount } from 'enzyme';

import WorkObject from './WorkObject';

describe('<WorkObject />', () => {
  it('should render work object', () => {
    const component = shallow(<WorkObject className="work-object" artists={['']} />);
    const wrapper = component.find('.work-object');
    expect(wrapper.length).toBeGreaterThan(0);
  });

  it('should render artists name by commas without errors', () => {
    const component = mount(<WorkObject className="work-object" artists={['name1', 'name2']} />);
    const wrapper = component.find('.work-object-artist');
    expect(wrapper.text()).toBe('name1,name2');
  });
});
