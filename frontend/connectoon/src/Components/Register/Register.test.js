import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

import Register from './Register';
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

describe('<Register />', () => {
  let register;
  beforeEach(() => {
    register = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Register} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Login', () => {
    const component = mount(register);
    const wrapper = component.find('.register-page');
    expect(wrapper.length).toBe(1);
  });
});
