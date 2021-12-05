import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import MyPage from './MyPage';

import { getMockStore } from '../../test-utils/mocks';
import store, { history } from '../../store/store';

import * as actionCreatorReview from '../../store/actions/review';

const stubWork = {
  id: 1, title: 'TEST_TITLE', thumbnail_image: 'TEST_SRC', platform_id: 0, year: 2000, artists: ['TEST_ARTIST'], score_avg: 0, completion: true,
};

const stubInitialReviewState = {
  reviews: [
    {
      id: 1,
      work: stubWork,
      author: {
        id: 1,
        email: 'dummy@swpp.com',
        profile_img: '',
        username: 'dummyuser',
      },
      score: 3.5,
      likes: 10,
      title: 'Dummy Review Title',
      content: 'Dummy Content\nLong\nLong\nLogn\nLong\nFinish\n',
      clickedLike: false,
    },
  ],
};
const stubInitialTagState = null;
const stubInitialUserState = {
  loggedInUser: {
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

describe('<MyPage />', () => {
  global.URL.createObjectURL = jest.fn();
  let myPage;
  beforeEach(() => {
    const spyToken = jest.spyOn(actionCreatorReview, 'getMyReviews')
      .mockImplementation(() => { return () => {}; });

    myPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={MyPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render MyPage', () => {
    const component = mount(myPage);
    const wrapper = component.find('.mypage');
    expect(wrapper.length).toBe(1);
  });

  it('should render MyPage without profile picture', () => {
    const stubInitialUserStateNew = {
      loggedInUser: {
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
            <Route path="/" exact component={MyPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPageNew);
    const wrapper = component.find('.mypage');
    expect(wrapper.length).toBe(1);
  });

  it('should render MyPage without reviews', () => {
    const stubInitialReviewStateNew = {
      reviews: null,
    };

    const mockStoreNew = getMockStore(
      stubInitialReviewStateNew,
      stubInitialTagState,
      stubInitialUserState,
      stubInitialWorkState,
    );
    const myPageNew = (
      <Provider store={mockStoreNew}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={MyPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPageNew);
    const wrapper = component.find('.mypage');
    expect(wrapper.length).toBe(1);
  });

  it('should go to account settings when click account settings button', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(myPage);
    const wrapper = component.find('#mypage-account-settings');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/mypage/account_settings/');
  });

  it('should go to search when click tag', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(myPage);
    component.find('.genre-tag').at(0).simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/search/$test1');
  });

  it('should go to search when click tag', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(myPage);
    component.find('.work-object').at(0).simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/works/1');
  });

  it('should redirect to main when logged in', () => {
    const stubInitialUserStateNew = {
      loggedInUser: null,
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
            <Route path="/" exact component={MyPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(myPageNew);
    const wrapper = component.find('.mypage');
    expect(wrapper.length).toBe(0);
  });
});
