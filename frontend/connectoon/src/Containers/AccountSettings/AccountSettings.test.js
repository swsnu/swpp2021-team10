import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { getMockStore } from '../../test-utils/mocks';
import store, { history } from '../../store/store';

import AccountSettings from './AccountSettings';
import * as actionCreatorUser from '../../store/actions/user';
import * as actionCreatorTag from '../../store/actions/tag';

const stubInitialReviewState = null;
const stubInitialTagState = {
  tags: [
    {
      key: 1,
      name: 'test1',
      selected: false,
      related: [2],
      prior: true,
    },
    {
      key: 2,
      name: 'test2',
      selected: false,
      related: [],
      prior: false,
    },
    {
      key: 3,
      name: 'test3',
      selected: false,
      related: [],
      prior: true,
    },
  ],
};
const stubInitialUserState = {
  loggedInUser: {
    email: 'test1@snu.ac.kr',
    username: 'test1',
    tags: [
    ],
  },
};
const stubInitialWorkState = null;

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<AccountSettings />', () => {
  global.URL.createObjectURL = jest.fn();
  let accountSettings;
  beforeEach(() => {
    const spyToken = jest.spyOn(actionCreatorUser, 'token')
      .mockImplementation(() => { return () => {}; });

    accountSettings = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={AccountSettings} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const spyGetSearchTags = jest.spyOn(actionCreatorTag, 'getSearchTags')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render AccountSettings', () => {
    const component = mount(accountSettings);
    const wrapper = component.find('.setting-page');
    expect(wrapper.length).toBe(1);
  });

  it('should check username duplication', () => {
    const component = mount(accountSettings);
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
          };
          resolve(result);
        });
      });
    const wrapper = component.find('#setting-dupchk-button');
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(0);
    const usernameArea = component.find('#setting-username-input');
    usernameArea.simulate('change', { target: { value: 'usernametest' } });
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not check username duplication', () => {
    const component = mount(accountSettings);
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
          };
          resolve(reject);
        });
      });
    const wrapper = component.find('#setting-dupchk-button');
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(0);
    const usernameArea = component.find('#setting-username-input');
    usernameArea.simulate('change', { target: { value: 'usernametest' } });
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should handle tag methods', () => {
    const component = mount(accountSettings);
    component.find('.selected-tag-body').at(0).simulate('click');
    component.find('.tag-delete-button').at(0).simulate('click');
    component.find('.selected-tag-body').at(0).simulate('click');
  });

  it('should submit register', () => {
    const spySettings = jest.spyOn(actionCreatorUser, 'editMyUser')
      .mockImplementation((registerData) => { return () => {}; });
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
          };
          resolve(result);
        });
      });
    const component = mount(accountSettings);
    const usernameArea = component.find('#setting-username-input');
    usernameArea.simulate('change', { target: { value: 'usernametest' } });
    const usernameDupChkButton = component.find('#setting-dupchk-button');
    usernameDupChkButton.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    const pwArea = component.find('#setting-password-input');
    pwArea.simulate('change', { target: { value: 'qwe123' } });
    const pwChkArea = component.find('#setting-password-check-input');
    pwChkArea.simulate('change', { target: { value: 'qwe123' } });

    component.find('AccountSettings').at(0).setState({
      usernameDupCheck: true,
    });

    const submitButton = component.find('#setting-submit-button');
    submitButton.simulate('click');
    expect(spySettings).toHaveBeenCalledTimes(1);
  });

  it('should add image', () => {
    jest.spyOn(URL, 'createObjectURL').mockImplementation(() => { return ''; });
    const component = mount(accountSettings);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    const wrapper = component.find('#setting-input-profile-image');
    wrapper.simulate('change', { target: { files: [file] } });
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
    const registerNew = (
      <Provider store={mockStoreNew}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={AccountSettings} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(registerNew);
    const wrapper = component.find('.setting-page');
    expect(wrapper.length).toBe(0);
  });
});
