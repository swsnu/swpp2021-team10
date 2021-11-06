import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import NavBar from './NavBar';

const stubInitialReviewState = null;
const stubInitialTagState = null;
const stubInitialUserState = null;
const stubInitialWorkState = null;

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<NavBar />', () => {
  let navbar;
  beforeEach(() => {
    navbar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <NavBar className="nav-bar" />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle login click', () => {
    const component = mount(navbar);
    let wrapper = component.find('#login-button');
    wrapper.simulate('click');
    wrapper = component.find('#username-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle username click', () => {
    const component = mount(navbar);
    let wrapper = component.find('#login-button');
    wrapper.simulate('click');
    wrapper = component.find('#username-button');
    wrapper.simulate('click');
    wrapper = component.find('#mypage-button');
    expect(wrapper.length).toBe(1);
  });

  it('should handle mypage click', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => {});
    const component = mount(navbar);
    let wrapper = component.find('#login-button');
    wrapper.simulate('click');
    wrapper = component.find('#username-button');
    wrapper.simulate('click');
    wrapper = component.find('#mypage-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/mypage');
  });

  it('should handle myreviews click', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => {});
    const component = mount(navbar);
    let wrapper = component.find('#login-button');
    wrapper.simulate('click');
    wrapper = component.find('#username-button');
    wrapper.simulate('click');
    wrapper = component.find('#myreviews-button');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/myreviews');
  });

  it('should handle logout click', () => {
    const component = mount(navbar);
    let wrapper = component.find('#login-button');
    wrapper.simulate('click');
    wrapper = component.find('#username-button');
    wrapper.simulate('click');
    wrapper = component.find('#logout-button');
    wrapper.simulate('click');
    wrapper = component.find('#login-button');
    expect(wrapper.length).toBe(1);
  });
});
