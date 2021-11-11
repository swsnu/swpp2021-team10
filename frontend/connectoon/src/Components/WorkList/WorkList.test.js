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
  beforeEach(() => {
    const className = 'TEST-CLASSNAME';
    const subject = 'TEST_SUBJECT';
    const workList = [
      { id: 1 }, { id: 2 },
    ];
    const workNumInRow = 1;
    spyWorkClick = jest.fn((id) => { });
    component = mount(<WorkList
      className={className}
      subject={subject}
      workList={workList}
      workNumInRow={workNumInRow}
      onClickWork={(id) => spyWorkClick(id)}
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

  it('should handle work click', () => {
    const wrapper = component.find('.spyWork');
    wrapper.simulate('click');
    expect(spyWorkClick).toHaveBeenCalledTimes(1);
    expect(spyWorkClick).toHaveBeenCalledWith(1);
  });
});
