import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/work';

import Search from './Search';
import WorkList from '../../Components/WorkList/WorkList';

const stubInitialReviewState = null;
const stubInitialTagState = null;
const stubInitialUserState = null;
const stubInitialWorkState = {
  selectedWork: null,
  selectedWorks: [
    [
      {
        title: 'test',
      },
    ],
    [
      {
        title: 'test',
      },
    ],
  ],
  selectedReviews: [
  ],
};

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<Search />', () => {
  let search;
  let spyGetSearchWorks;
  beforeEach(() => {
    search = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Search className="search" />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetSearchWorks = jest.spyOn(actionCreators, 'getSearchWorks')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Search', () => {
    const component = mount(search);
    const wrapper = component.find('.search');
    expect(wrapper.length).toBe(4);
    const mockedEvent = {
      target: {
        value: 'hello',
      },
    };
    component.find('input').at(0).simulate('change', mockedEvent);
  });
});
