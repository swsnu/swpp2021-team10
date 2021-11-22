import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as workActionCreators from '../../store/actions/work';
import * as userActionCreators from '../../store/actions/user';

import NavBar from './NavBar';

const stubInitialReviewState = null;
const stubInitialTagState = null;
const stubInitialNotLoggedInUserState = {
  loggedInUser: null,
};
const stubInitialWorkState = {
  searchWord: '',
};

const notLoggedInMockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialNotLoggedInUserState, stubInitialWorkState);

const stubInitialLoggedInUserState = {
  loggedInUser: { id: 1 },
};

const loggedInMockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialLoggedInUserState, stubInitialWorkState);

describe('<NavBar />', () => {
  let navbar;
  let spyPutSearchWord;
  let spyHistoryPush;
  let spyLogOut;
  beforeEach(() => {
    navbar = (
      <Provider store={loggedInMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <NavBar className="nav-bar" />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyPutSearchWord = jest.spyOn(workActionCreators, 'putSearchWord')
      .mockImplementation(() => { return (dispatch) => {}; });
    spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => {});
    spyLogOut = jest.spyOn(userActionCreators, 'logOut')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle login click', () => {
    navbar = (
      <Provider store={notLoggedInMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <NavBar className="nav-bar" />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(navbar);
    const wrapper = component.find('#login-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/login');
  });

  it('should handle username click', () => {
    const component = mount(navbar);
    const wrapper = component.find('#username-button');
    wrapper.simulate('click');
    const newNavbarInstance = component.find(NavBar.WrappedComponent).instance();
    expect(newNavbarInstance.state.clickUsername).toBeTruthy();
  });

  it('should handle mypage click', () => {
    const component = mount(navbar);
    let wrapper = component.find('#username-button');
    wrapper.simulate('click');
    wrapper = component.find('#mypage-button');
    wrapper.simulate('click');
    const newNavbarInstance = component.find(NavBar.WrappedComponent).instance();
    expect(newNavbarInstance.state.clickUsername).toBeFalsy();
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/mypage');
  });

  it('should handle myreviews click', () => {
    const component = mount(navbar);
    let wrapper = component.find('#username-button');
    wrapper.simulate('click');
    wrapper = component.find('#myreviews-button');
    wrapper.simulate('click');
    const newNavbarInstance = component.find(NavBar.WrappedComponent).instance();
    expect(newNavbarInstance.state.clickUsername).toBeFalsy();
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/myreviews');
  });

  it('should handle logout click', () => {
    const component = mount(navbar);
    let wrapper = component.find('#username-button');
    wrapper.simulate('click');
    wrapper = component.find('#logout-button');
    wrapper.simulate('click');
    const newNavbarInstance = component.find(NavBar.WrappedComponent).instance();
    expect(newNavbarInstance.state.clickUsername).toBeFalsy();
    expect(spyLogOut).toHaveBeenCalledTimes(1);
  });

  it('should handle search glass click with valid input', () => {
    const component = mount(navbar);
    const mockedEvent = {
      target: {
        value: 'test',
      },
    };
    let wrapper = component.find('#search-input');
    wrapper.simulate('change', mockedEvent);
    const newNavbarInstance = component.find(NavBar.WrappedComponent).instance();
    expect(newNavbarInstance.state.searchWord).toBe('test');
    wrapper = component.find('#search-glass-wrapper');
    wrapper.simulate('click');
    expect(spyPutSearchWord).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/search');
  });

  it('should handle search glass click with empty input', () => {
    const component = mount(navbar);
    const wrapper = component.find('#search-glass-wrapper');
    wrapper.simulate('click');
    expect(spyPutSearchWord).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/search');
  });
});
