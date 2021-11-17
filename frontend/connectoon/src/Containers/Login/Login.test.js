import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

import Login from './Login';
import * as actionCreatorUser from '../../store/actions/user';

const stubInitialReviewState = null;
const stubInitialTagState = null;
const stubInitialUserState = {
  user: {
    loggedInUser: null,
  },
};
const stubInitialWorkState = null;

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<Login />', () => {
  let login;
  beforeEach(() => {
    const spyToken = jest.spyOn(actionCreatorUser, 'token')
      .mockImplementation(() => { return () => {}; });

    login = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Login} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Login', () => {
    const component = mount(login);
    const wrapper = component.find('.login-page');
    expect(wrapper.length).toBe(1);
  });

  it('should call login successful', () => {
    const spyLogin = jest.spyOn(actionCreatorUser, 'logIn')
      .mockImplementation(() => { return () => {}; });
    const component = mount(login);
    const wrapper = component.find('.login-submit-button');
    wrapper.simulate('click');
    expect(spyLogin).toHaveBeenCalledTimes(1);
  });

  it('should change email and password', () => {
    const component = mount(login);
    const emailArea = component.find('.login-email-input');
    emailArea.simulate('change', { target: { value: 'test1@snu.ac.kr' } });
    const pwArea = component.find('.login-password-input');
    pwArea.simulate('change', { target: { value: 'qwe123' } });

    expect(component.state('email')).toEqual('test1@snu.ac.kr');
    expect(component.state('password')).toEqual('qwe123');
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
    const loginNew = (
      <Provider store={mockStoreNew}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Login} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(loginNew);
    const wrapper = component.find('.login-page');
    expect(wrapper.length).toBe(0);
  });
});
