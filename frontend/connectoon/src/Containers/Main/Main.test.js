import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import Main from './Main';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as workActionCreator from '../../store/actions/work';

jest.mock('../../Components/WorkList/WorkList', () => {
  return jest.fn((props) => {
    return (
      <div className="spyWorkList">
        <div className="spyWork" onClick={() => props.onClickWork(props.workList[0].id)} />
        <div className="spyMore" onClick={() => props.onClickMore(0)} />
      </div>
    );
  });
});

const stubInitialReviewState = {
};

const stubInitialTagState = {
};

const stubInitialUserState = {
};

const stubInitialWorkState = {
  mainWorkLists: [
    { title: 'Test Works', works: [{ id: 1 }] },
    { title: 'Test Works', works: [{ id: 1 }] },
  ],
};

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<Main />', () => {
  let main;
  let spyGetMainWork;
  beforeEach(() => {
    main = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Main} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetMainWork = jest.spyOn(workActionCreator, 'getMainWorks')
      .mockImplementation((requestWorks) => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Main page and works', () => {
    const component = mount(main);
    expect(spyGetMainWork).toHaveBeenCalledTimes(1);
    let wrapper = component.find('.main-page');
    expect(wrapper.length).toBe(1);
    wrapper = component.find('.spyWorkList');
    expect(wrapper.length).toBe(2);
  });

  it('should handle work click', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(main);
    const wrapper = component.find('.spyWork');
    wrapper.at(0).simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/works/1');
  });

  it('should handle more click', () => {
    const spyHistoryReplace = jest.spyOn(history, 'replace')
      .mockImplementation((path, state) => { });
    const component = mount(main);
    const wrapper = component.find('.spyMore');
    wrapper.at(0).simulate('click');
    const newMainInstance = component.find(Main.WrappedComponent).instance();
    expect(newMainInstance.state.subjectRows[0]).toBe(3);
    expect(spyHistoryReplace).toHaveBeenCalledTimes(1);
    expect(spyHistoryReplace).toHaveBeenCalledWith('/main', { subjectRows: [3, 1] });
  });

  it('should fetch more works when enough more clicks are given', () => {
    const spyHistoryReplace = jest.spyOn(history, 'replace')
      .mockImplementation((path, state) => { });
    const stubWorks = Array.from({ length: 48 }).map((idx) => {
      return { id: idx };
    });
    const stubInitialManyWorkState = {
      mainWorkLists: [
        { title: 'Test Works', works: stubWorks },
        { title: 'Test Works', works: stubWorks },
      ],
    };
    const manyWorksMockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialManyWorkState);
    main = (
      <Provider store={manyWorksMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Main} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(main);
    const wrapper = component.find('.spyMore');
    expect(spyGetMainWork).toHaveBeenCalledTimes(1);
    expect(spyGetMainWork).toHaveBeenCalledWith([[0, 24], [0, 24]]);
    wrapper.at(0).simulate('click');
    wrapper.at(0).simulate('click');
    expect(spyGetMainWork).toHaveBeenCalledTimes(2);
    expect(spyGetMainWork).toHaveBeenLastCalledWith([[24, 44], [24, 24]]);
  });

  // it('should keep more clicked state after visiting other urls and comming back', () => {
  //   const otherPage = (props) => {
  //     return <div className="other-page" />;
  //   };
  //   history.push('/main');
  //   main = (
  //     <Provider store={mockStore}>
  //       <ConnectedRouter history={history}>
  //         <Switch>
  //           <Route path="/main" exact component={Main} />
  //           <Route path="/other" exact component={otherPage} />
  //         </Switch>
  //       </ConnectedRouter>
  //     </Provider>
  //   );
  //   const component = mount(main);
  //   console.log(component.debug());
  //   history.push('/main');
  //   console.log(component.debug());
  //   const wrapper = component.find('.spyMore');
  //   wrapper.at(0).simulate('click');
  //   console.log(component.debug());
  //   history.push('/other');
  //   console.log(component.debug());
  // });
});
