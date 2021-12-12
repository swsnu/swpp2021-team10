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

const stubInitialReviewState = null;
const stubInitialTagState = null;
const stubInitialUserState = {
  loggedInUser: { id: 1 },
};
const stubInitialWorkState = {
  recWorkLists: [
    [
      {
        title: 'test1',
        artists: [
          'test1',
        ],
      },
      {
        title: 'test2',
        artists: [
          'test2',
        ],
      },
    ],
    [
      {
        title: 'test1',
        artists: [
          'test1',
        ],
      },
      {
        title: 'test2',
        artists: [
          'test2',
        ],
      },
    ],
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
      .mockImplementation(() => { return (dispatch) => {}; });
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
      recWorkLists: [],
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
    const component = mount(recommendation);
    component.find('.work-object').at(0).simulate('click');
  });
});
