import React from 'react';
import { shallow } from 'enzyme';

import WorkInfo from './WorkInfo';

describe('<WorkInfo />', () => {
  let component;
  beforeEach(() => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';
    const link = 'TEST_LINK';
    const thumbnailPicture = 'TEST_SRC';
    const platformId = 0;
    const year = 'TEST_YEAR';
    const tags = [
      'TEST_TAG_1', 'TEST_TAG_2',
    ];
    const artists = [
      'TEST_ARTIST',
    ];

    component = shallow(<WorkInfo
      className="work-info"
      title={title}
      description={description}
      link={link}
      thumbnailPicture={thumbnailPicture}
      platformId={platformId}
      year={year}
      tags={tags}
      artists={artists}
    />);
  });

  it('shouold render WorkInfo', () => {
    const wrapper = component.find('.work-info');
    expect(wrapper.length).toBe(1);
  });
});
