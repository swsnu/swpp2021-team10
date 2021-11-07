import React from 'react';
import { mount } from 'enzyme';

import WorkList from './WorkList';

describe('<WorkList />', () => {
  let component;
  beforeEach(() => {
    const className = 'TEST-CLASSNAME';
    const subject = 'TEST_SUBJECT';
    const workList = [
      {
        id: 1,
        src: 'https://shared-comic.pstatic.net/thumb/webtoon/721948/thumbnail/thumbnail_IMAG06_eef5b6c4-39dc-46d9-89d1-1a1ee357b696.jpg',
        platform: '/images/naver_logo.png',
        completion: false,
        title: 'Study Group',
        artist: 'Shin, Hyeongwook & Yu, Seungyeon',
        createdYear: '2019',
        score: '4.9',
      },
    ];
    const workNumInRow = 0;
    component = mount(<WorkList
      className={className}
      subject={subject}
      workList={workList}
      workNumInRow={workNumInRow}
    />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render WorkList', () => {
    const wrapper = component.find('.TEST-CLASSNAME');
    expect(wrapper.length).toBe(2);
  });

  it('should handle click more', () => {
    const wrapper = component.find('.more-works-button');
    wrapper.simulate('click');
    expect(component.state('totalDisplayRow')).toBe(3);
  });
});
