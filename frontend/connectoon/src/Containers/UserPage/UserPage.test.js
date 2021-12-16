import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import UserPage from './UserPage';

import { getMockStore } from '../../test-utils/mocks';
import store, { history } from '../../store/store';

import * as actionCreatorReview from '../../store/actions/review';
import * as actionCreatorUser from '../../store/actions/user';

const stubInitialReviewState = null;
const stubInitialTagState = null;
const stubInitialUserState = {
  selectedUser: {
    email: 'test1@snu.ac.kr',
    username: 'test1',
    tags: [
      {
        key: 1,
        name: 'test1',
        selected: true,
        related: [2],
        prior: true,
      },
    ],
    profile_picture: 'http://testimage',
  },
};
const stubInitialWorkState = null;

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<UserPage />', () => {
  global.URL.createObjectURL = jest.fn();
  let userPage;
  let spyGetUser;
  beforeEach(() => {
    spyGetUser = jest.spyOn(actionCreatorUser, 'getUser')
      .mockImplementation(() => { return (dispatch) => {}; });

    userPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={UserPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render UserPage', () => {
    const component = mount(userPage);
    const wrapper = component.find('.userpage');
    expect(wrapper.length).toBe(1);
  });

  it('should render not UserPage without selectedUser', () => {
    const stubInitialUserStateNew = {
      selectedUser: null,
    };

    const mockStoreNew = getMockStore(
      stubInitialReviewState,
      stubInitialTagState,
      stubInitialUserStateNew,
      stubInitialWorkState,
    );
    const myPageNew = (
      <Provider store={mockStoreNew}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={UserPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPageNew);
    const wrapper = component.find('.userpage');
    expect(wrapper.length).toBe(0);
  });

  it('should render UserPage without profile picture', () => {
    const stubInitialUserStateNew = {
      selectedUser: {
        email: 'test1@snu.ac.kr',
        username: 'test1',
        tags: [
          {
            key: 1,
            name: 'test1',
            selected: true,
            related: [2],
            prior: true,
          },
        ],
        profile_picture: null,
      },
    };

    const mockStoreNew = getMockStore(
      stubInitialReviewState,
      stubInitialTagState,
      stubInitialUserStateNew,
      stubInitialWorkState,
    );
    const myPageNew = (
      <Provider store={mockStoreNew}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={UserPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPageNew);
    const wrapper = component.find('.userpage');
    expect(wrapper.length).toBe(1);
  });

  it('should go to search when click tag', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(userPage);
    component.find('.genre-tag').at(0).simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/search/$test1');
  });
});
