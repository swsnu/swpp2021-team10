import React from 'react';
import { shallow } from 'enzyme';

import WorkInfo from './WorkInfo';

describe('<WorkInfo />', () => {
  let component;
  beforeEach(() => {
    const src = 'TEST_SRC';
    const platform = 'TEST_PLATFORM';
    const completion = true;
    const title = 'TEST_TITLE';
    const artist = 'TEST_ARTIST';
    const createdYear = 'TEST_YEAR';
    const description = 'TEST_DESCRIPTION';
    const link = 'TEST_LINK';
    const tagNames = [
      'TEST_TAG_1', 'TEST_TAG_2',
    ];
    component = shallow(<WorkInfo
      className="work-info"
      src={src}
      platform={platform}
      completion={completion}
      title={title}
      artist={artist}
      createdYear={createdYear}
      description={description}
      link={link}
      tagNames={tagNames}
    />);
  });

  it('shouold render WorkInfo', () => {
    const wrapper = component.find('.work-info');
    expect(wrapper.length).toBe(1);
  });
});
