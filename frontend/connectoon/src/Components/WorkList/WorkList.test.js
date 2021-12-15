import React from 'react';
import { mount } from 'enzyme';

import WorkList from './WorkList';

jest.mock('../WorkObject/WorkObject', () => {
  return jest.fn((props) => {
    return (
      <div className="spyWorkObject">
        <div className="spyWork" onClick={() => props.onClickWork()} />
      </div>
    );
  });
});

describe('<WorkList />', () => {
  let component;
  let spyWorkClick;
  let spyMoreClick;
  beforeEach(() => {
    const className = 'TEST-CLASSNAME';
    const subject = 'TEST_SUBJECT';
    const workList = [
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
    ];
    spyWorkClick = jest.fn((id) => { });
    spyMoreClick = jest.fn(() => { });
    component = mount(<WorkList
      className={className}
      subject={subject}
      workList={workList}
      rows={1}
      worksInRow={4}
      onClickWork={(id) => spyWorkClick(id)}
      onClickMore={() => spyMoreClick()}
    />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render WorkList', () => {
    const wrapper = component.find('.TEST-CLASSNAME');
    expect(wrapper.length).toBe(2);
  });

  it('should handle more click', () => {
    const wrapper = component.find('.more-works-button');
    wrapper.simulate('click');
    expect(spyMoreClick).toHaveBeenCalledTimes(1);
  });

  it('should handle work click', () => {
    const wrapper = component.find('.spyWork');
    wrapper.at(0).simulate('click');
    expect(spyWorkClick).toHaveBeenCalledTimes(1);
    expect(spyWorkClick).toHaveBeenCalledWith(1);
  });
});
