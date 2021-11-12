import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as workActionCreators from '../../store/actions/work';
import * as tagActionCreators from '../../store/actions/tag';

import Search from './Search';

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
const stubInitialUserState = null;
const stubInitialWorkState = {
  selectedWork: null,
  searchedWorks: [
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
        title: 'test',
        artists: [
          'test',
        ],
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
  let spyGetSearchTags;
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
    spyGetSearchWorks = jest.spyOn(workActionCreators, 'getSearchWorks')
      .mockImplementation(() => { return (dispatch) => {}; });
    spyGetSearchTags = jest.spyOn(tagActionCreators, 'getSearchTags')
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
  it('should handle tag methods', () => {
    const component = mount(search);
    component.find('.selected-tag-body').at(0).simulate('click');
    component.find('.tag-delete-button').at(0).simulate('click');
    component.find('.selected-tag-body').at(0).simulate('click');

    const mockedEvent = {
      target: {
        value: 'test',
      },
    };
    component.find('input').at(1).simulate('change', mockedEvent);
  });
  it('should handle clicking work object and more button', () => {
    const component = mount(search);
    component.find('.work-object').at(0).simulate('click');
  });
});
