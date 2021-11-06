import React from 'react';
import { shallow } from 'enzyme';

import MyPage from './MyPage';

describe('<MyPage />', () => {
  it('should render MyPage', () => {
    const component = shallow(<MyPage />);
    const wrapper = component.find('.mypage');
    expect(wrapper.length).toBe(1);
  });
});
