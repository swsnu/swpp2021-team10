import React from 'react';
import { shallow } from 'enzyme';

import NavBar from './NavBar';

describe('<NavBar />', () => {
  it('should handle login click', () => {
    const component = shallow(<NavBar className="nav-ber" />);
    let wrapper = component.find('#login-button');
    wrapper.simulate('click');
    wrapper = component.find('#username-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle username click', () => {
    const component = shallow(<NavBar className="nav-ber" />);
    let wrapper = component.find('#login-button');
    wrapper.simulate('click');
    wrapper = component.find('#username-button');
    wrapper.simulate('click');
    wrapper = component.find('#mypage-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle logout click', () => {
    const component = shallow(<NavBar className="nav-ber" />);
    let wrapper = component.find('#login-button');
    wrapper.simulate('click');
    wrapper = component.find('#username-button');
    wrapper.simulate('click');
    wrapper = component.find('#logout-button');
    wrapper.simulate('click');
    wrapper = component.find('#login-button');
    expect(wrapper.length).toBe(1);
  });
});
