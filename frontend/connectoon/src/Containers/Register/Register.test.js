import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { Simulate } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { getMockStore } from '../../test-utils/mocks';
import store, { history } from '../../store/store';

import Register from './Register';
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
  ],
};
const stubInitialUserState = {
  user: {
    loggedInUser: null,
  },
};
const stubInitialWorkState = null;

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<Register />', () => {
  global.URL.createObjectURL = jest.fn();
  let register;
  let spyGetSearchTags;
  beforeEach(() => {
    const spyToken = jest.spyOn(actionCreatorUser, 'token')
      .mockImplementation(() => { return () => {}; });

    register = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Register} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetSearchTags = jest.spyOn(actionCreatorTag, 'getSearchTags')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Register', () => {
    const component = mount(register);
    const wrapper = component.find('.register-page');
    expect(wrapper.length).toBe(1);
  });

  it('should check email duplication', () => {
    const component = mount(register);
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
          };
          resolve(result);
        });
      });
    const wrapper = component.find('#register-dupchk-email-button');
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should fail email duplication', () => {
    const component = mount(register);
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 400,
          };
          reject(result);
        });
      });
    const wrapper = component.find('#register-dupchk-email-button');
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should check username duplication', () => {
    const component = mount(register);
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
          };
          resolve(result);
        });
      });
    const wrapper = component.find('#register-dupchk-username-button');
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should fail username duplication', () => {
    const component = mount(register);
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation(() => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 400,
          };
          reject(result);
        });
      });
    const wrapper = component.find('#register-dupchk-username-button');
    wrapper.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should change email, username, password and passwordCheck', () => {
    const component = mount(register);
    const emailArea = component.find('#register-email-input');
    emailArea.simulate('change', { target: { value: 'test1@snu.ac.kr' } });
    const usernameArea = component.find('#register-username-input');
    usernameArea.simulate('change', { target: { value: 'usernametest' } });
    const pwArea = component.find('#register-password-input');
    pwArea.simulate('change', { target: { value: 'qwe123' } });
    const pwChkArea = component.find('#register-password-check-input');
    pwChkArea.simulate('change', { target: { value: 'qwe123' } });
  });

  it('should not submit when no changed', () => {
    const spyRegister = jest.spyOn(actionCreatorUser, 'register')
      .mockImplementation((registerData) => { return () => {}; });
    const component = mount(register);

    const submitButton = component.find('#register-submit-button');
    submitButton.simulate('click');
    expect(spyRegister).toHaveBeenCalledTimes(0);
  });

  it('should submit register', () => {
    const spyRegister = jest.spyOn(actionCreatorUser, 'register')
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
    const component = mount(register);
    const emailArea = component.find('#register-email-input');
    emailArea.simulate('change', { target: { value: 'test1@snu.ac.kr' } });
    const emailDupChkButton = component.find('#register-dupchk-email-button');
    emailDupChkButton.simulate('click');
    const usernameArea = component.find('#register-username-input');
    usernameArea.simulate('change', { target: { value: 'usernametest' } });
    const usernameDupChkButton = component.find('#register-dupchk-username-button');
    usernameDupChkButton.simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);
    const pwArea = component.find('#register-password-input');
    pwArea.simulate('change', { target: { value: 'qwe123' } });
    const pwChkArea = component.find('#register-password-check-input');
    pwChkArea.simulate('change', { target: { value: 'qwe123' } });

    component.find('Register').at(0).setState({
      emailDupCheck: true,
      usernameDupCheck: true,
    });

    const submitButton = component.find('#register-submit-button');
    submitButton.simulate('click');
    expect(spyRegister).toHaveBeenCalledTimes(1);
  });

  it('should add image', () => {
    jest.spyOn(URL, 'createObjectURL').mockImplementation(() => { return ''; });
    const component = mount(register);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    const wrapper = component.find('#input-profile-image');
    wrapper.simulate('change', { target: { files: [file] } });
  });

  it('should handle tag methods', () => {
    const component = mount(register);
    component.find('.selected-tag-body').at(0).simulate('click');
    component.find('.tag-delete-button').at(0).simulate('click');
    component.find('.selected-tag-body').at(0).simulate('click');
  });

  it('should redirect to main when logged in', () => {
    const stubInitialUserStateNew = {
      loggedInUser: {
        id: 1,
        email: 'test1@snu.ac.kr',
        username: 'test1',
      },
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
            <Route path="/" exact component={Register} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(registerNew);
    const wrapper = component.find('.register-page');
    expect(wrapper.length).toBe(0);
  });
});
