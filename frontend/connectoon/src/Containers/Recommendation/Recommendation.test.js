import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as workActionCreators from '../../store/actions/work';
import * as tagActionCreators from '../../store/actions/tag';

import Recommendation from './Recommendation';

jest.mock('../../Components/WorkList/WorkList', () => {
  return jest.fn((props) => {
    return (
      <div className="spyWorkList">
        <div className="spyWork" onClick={() => props.onClickWork(props.workList[0].id)} />
        <div className="spyMore" onClick={() => props.onClickMore()} />
      </div>
    );
  });
});

const stubInitialReviewState = null;
const stubInitialTagState = null;
const stubInitialUserState = {
  loggedInUser: { id: 1 },
};
const stubInitialWorkState = {
  recommWorks: [
    [{ id: 1 }, { id: 2 }],
    [{ id: 3 }, { id: 4 }],
  ],
};

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<Recommendation />', () => {
  let recommendation;
  let spyGetRecWorks;
  beforeEach(() => {
    recommendation = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Recommendation className="recommendation" />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetRecWorks = jest.spyOn(workActionCreators, 'getRecWorks')
      .mockImplementation((requestWorks) => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render please login message when not logged in', () => {
    const stubInitialNoUserState = {
      loggedInUser: null,
    };
    const noUserMockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialNoUserState, stubInitialWorkState);
    recommendation = (
      <Provider store={noUserMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Recommendation className="recommendation" />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(recommendation);
    const wrapper = component.find('h3');
    expect(wrapper.text()).toBe('Please Login!');
  });

  it('should render Recommendation', () => {
    const component = mount(recommendation);
    const wrapper = component.find('.recommendation');
    expect(wrapper.length).toBe(3);
  });

  it('should render Recommendation with empty workList', () => {
    const stubInitialWorkStateTest = {
      recommWorks: [[], []],
    };
    const mockStoreTest = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkStateTest);
    recommendation = (
      <Provider store={mockStoreTest}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Recommendation className="recommendation" />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    mount(recommendation);
  });

  it('should handle clicking work object', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(recommendation);
    const wrapper = component.find('.spyWork');
    wrapper.at(0).simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/works/1');
  });

  it('should handle more click', () => {
    const spyHistoryReplace = jest.spyOn(history, 'replace')
      .mockImplementation((path, state) => { });
    const component = mount(recommendation);
    const wrapper = component.find('.spyMore');
    wrapper.at(0).simulate('click');
    const newRecommInstance = component.find(Recommendation.WrappedComponent).instance();
    expect(newRecommInstance.state.subjectRows[0]).toBe(3);
    expect(spyHistoryReplace).toHaveBeenCalledTimes(1);
    expect(spyHistoryReplace).toHaveBeenCalledWith('/recommendation', { subjectRows: [3, 1] });
  });
});
