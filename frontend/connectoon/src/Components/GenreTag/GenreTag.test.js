import React from 'react';
import { shallow } from 'enzyme';

import GenreTag from './GenreTag';

describe('<GenreTag />', () => {
  it('should render GenreTag', () => {
    const tagName = 'TEST_TAG_NAME';
    const component = shallow(<GenreTag tagName={tagName} deletable={false} />);
    const wrapper = component.find('.tag-name');
    expect(wrapper.length).toBe(1);
    expect(wrapper.at(0).text()).toEqual(tagName);
  });

  it('should show delete button', () => {
    const component = shallow(<GenreTag tagName="tagName" deletable />);
    const wrapper = component.find('.tag-delete-button');
    expect(wrapper.length).toBe(1);
  });
});
